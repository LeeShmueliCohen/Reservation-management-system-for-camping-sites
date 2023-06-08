const axios = require('axios');

async function extractValues(str) {
  const matches = str.match(
    /^(\d+)\.(\d+)X(\d+)(?:-qty\.(\d+))?(?:-adult\.(\d+))?(?:-child\.(\d+))?(?:-toddler\.(\d+))?(?:-guest\.(\d+))?$/
  );
  if (matches === null) {
    // If the string doesn't match the expected pattern, return null or throw an error
    return null;
  }
  const [
    fullMatch,
    id,
    startDateStr,
    durationStr,
    qty,
    adults,
    children,
    toddler,
    guest,
  ] = matches;
  const startDate = new Date(
    startDateStr.substring(0, 4),
    parseInt(startDateStr.substring(4, 6)) - 1,
    startDateStr.substring(6, 8)
  );
  const endDate = new Date(
    startDate.getTime() + parseInt(durationStr) * 86400000
  ); // 86400000 = 24 hours * 60 minutes * 60 seconds * 1000 milliseconds
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  return {
    id: id,
    // זה חשוב להשאיר את התאריך כרגע ככה בשביל צ'קפרונט
    startDate: startDate.toLocaleDateString('en-US', options),
    endDate: endDate.toLocaleDateString('en-US', options),
    qty: qty ? parseInt(qty) : 0,
    adults: adults ? parseInt(adults) : 0,
    children: children ? parseInt(children) : 0,
    toddler: toddler ? parseInt(toddler) : null,
    guest: guest ? parseInt(guest) : null,
    nights: parseInt(durationStr),
  };
}

async function getBookingItemKey(sessionId, itemId) {
  try {
    const response = await axios.get(
      `${process.env.API_DIR}/booking/session?session_id=${sessionId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: process.env.API_TOKEN,
        },
      }
    );
    const items = response.data.booking.session.item;
    for (itemKey in items) {
      if (String(items[itemKey].item_id) === String(itemId)) {
        return itemKey;
      }
    }
  } catch (error) {
    console.log(error);
  }
}

async function getExtraDataItem(slip) {
  const slipValues = await extractValues(slip);
  if (!slipValues) {
    return;
  }
  try {
    const response = await axios.get(
      `${process.env.API_DIR}/item/${slipValues.id}`,
      {
        params: {
          start_date: slipValues.startDate,
          end_date: slipValues.endDate,
          'param[adult]': slipValues.adults,
          'param[child]': slipValues.children,
          'param[toddler]': slipValues.toddler,
        },
        headers: {
          'Content-Type': 'application/json',
          Authorization: process.env.API_TOKEN,
        },
      }
    );
    const item = response.data.item;
    delete slipValues.id;

    // change it to GB format
    const startDateGbFormat = new Date(slipValues.startDate).toLocaleDateString(
      'en-GB',
      {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }
    );
    const endDateGbFormat = new Date(slipValues.endDate).toLocaleDateString(
      'en-GB',
      {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }
    );

    return {
      ...slipValues,
      startDate: startDateGbFormat,
      endDate: endDateGbFormat,
      image: item?.image ?? null,
      summary: item?.summary ?? null,
    };
  } catch (error) {
    console.log(error);
  }
}

const createBookingSession = async (req, res) => {
  try {
    const { remove, key, opt, modify, ...restData } = req.body;
    let data = { ...restData };
    if (remove) {
      const key = await getBookingItemKey(restData.session_id, remove);
      data = {
        ...data,
        alter: {
          [key]: 'remove',
        },
      };
    }

    if (opt) {
      data = {
        ...data,
        alter: {
          [key]: opt,
        },
      };
    }

    /* modify = {
      placeId, startDate, endDate,
      adult, child, toddler, guest,
      slip
    }*/
    if (modify) {
      let slip = '';
      // is package?
      if (String(key).includes('.')) {
        slip = modify.slip.replace(/(guest\.)(.+)/, '$1' + modify.guest);
      } else {
        // regular item
        slip = await getNewSlip(modify);
      }
      if (slip) {
        data = {
          ...data,
          line_id: key,
          slip: slip,
        };
      } else if (slip.error) {
        return res.status(501).json({ message: slip.error });
      } else {
        res.status(500);
      }
    }

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${process.env.API_DIR}/booking/session`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: process.env.API_TOKEN,
      },
      data: data,
    };

    const response = await axios.request(config);
    const items = response.data.booking.session.item;
    const result = {
      items: [],
      package: [],
    };

    for (const key in items) {
      const extraData = await getExtraDataItem(items[key].slip);
      const itemObj = {
        key: key,
        ...extraData,
        ...items[key],
      };

      if (key.includes('.')) {
        // add unit price to package
        itemObj.rate.price = (itemObj.rate.total / itemObj.rate.qty).toFixed(2);
        if (itemObj.opt === 'out') {
          itemObj.guest = 0;
          itemObj.rate.total = '0.00';
        }
        result.package.push(itemObj);
      } else {
        result.items.push(itemObj);
      }
    }
    delete response.data.booking.session.item;
    response.data.booking.session = Object.assign(
      {},
      response.data.booking.session,
      result
    );
    res.json(response.data.booking);
  } catch (error) {
    res.status(500).json({ message: 'Error creating booking session', error });
  }
};

const getNewSlip = async ({
  placeId,
  startDate,
  endDate,
  adult = 0,
  child = 0,
  toddler = 0,
}) => {
  try {
    // Step1 check if we can add/reduce
    const isAvailableResponse = await axios.get(
      `${process.env.API_DIR}/item/${placeId}`,
      {
        params: {
          start_date: startDate,
          end_date: endDate,
          'param[adult]': adult,
          'param[child]': child,
          'param[toddler]': toddler,
        },
        headers: {
          Accept: 'application/json',
          Authorization: `${process.env.API_TOKEN}`,
        },
      }
    );
    if (isAvailableResponse.data.item.rate.status === 'AVAILABLE') {
      return isAvailableResponse.data.item.rate.slip;
    } else {
      return { error: isAvailableResponse.data.item.rate.error.title };
    }
  } catch {
    return false;
  }
};

const clearBookingSession = async (req, res) => {
  try {
    const data = req.body;

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${process.env.API_DIR}/booking/session/clear`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: process.env.API_TOKEN,
      },
      data: data,
    };

    const response = await axios.request(config);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error clear booking session', error });
  }
};

module.exports = {
  createBookingSession,
  clearBookingSession,
};
