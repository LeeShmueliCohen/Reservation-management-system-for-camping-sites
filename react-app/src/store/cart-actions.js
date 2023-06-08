import { cartActions } from './cart-slice';

const apiCartSession = async (body = null) => {
  const sessionId = localStorage.getItem('SessionId');
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/booking/session`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_id: sessionId,
          ...body,
        }),
      }
    );
    if (response.status === 501) {
      const errorData = await response.json();
      throw new Error(`Error 501: ${errorData.message}`);
    }
    const data = await response.json();
    const newSession_id = data.session.id;
    // set session from checkfront if its not valid
    if (sessionId !== newSession_id) {
      localStorage.setItem('SessionId', newSession_id);
    }
    console.log(`session id: ${localStorage.getItem('SessionId')}`);
    // map the current items session
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export function fetchCartData() {
  return async function (dispatch) {
    dispatch(cartActions.setIsLoad());

    try {
      const cartData = await apiCartSession();
      dispatch(
        cartActions.replaceCart({
          items: cartData.session.items || [],
          totalPrice: cartData.session.total,
          packages: cartData.session.package || [],
        })
      );
    } catch (error) {
      //todo
      console.log(error);
    } finally {
      dispatch(cartActions.setIsLoad());
    }
  };
}

//toChange
export function removeItemFromCart(id) {
  return async function (dispatch) {
    dispatch(cartActions.removeItemFromCart({ id }));
    try {
      const data = await apiCartSession({ remove: id });
      dispatch(
        cartActions.replaceCart({
          items: data.session.items || [],
          packages: data.session.package || [],
          totalPrice: data.session.total,
        })
      );
    } catch (error) {
      console.error(error);
    }
  };
}

export function addItemCart(id, slip) {
  return async function (dispatch, getState) {
    dispatch(cartActions.addItemToCart());
    const items = getState().cart.items;
    const itemExists = items.some(
      (item) => String(item.item_id) === String(id)
    );
    if (!itemExists) {
      try {
        dispatch(cartActions.setIsLoad());
        const data = await apiCartSession({ slip });
        dispatch(
          cartActions.replaceCart({
            items: data.session.items || [],
            packages: data.session.package,
            totalPrice: data.session.total,
          })
        );
      } catch (error) {
        console.error(error);
      } finally {
        dispatch(cartActions.setIsLoad());
      }
    } else {
      // Handle the case where the item is already in the cart
      console.log('Item already exists in the cart.');
    }
  };
}

export function changePackageOption(key, opt) {
  return async function (dispatch) {
    dispatch(cartActions.changePackageOption({ key, opt }));
    try {
      await apiCartSession({ key, opt });
    } catch (error) {
      console.error(error);
    }
  };
}

export function changePeopleAmount({
  key,
  placeId,
  startDate,
  endDate,
  adult,
  child,
  toddler,
}) {
  return async function (dispatch) {
    dispatch(
      cartActions.changePeopleAmount({
        key,
        adults: adult,
        children: child,
        toddler,
        flag: false,
      })
    );
    try {
      const data = await apiCartSession({
        key,
        modify: { placeId, startDate, endDate, adult, child, toddler },
      });
      dispatch(
        cartActions.replaceCart({
          items: data.session.items || [],
          packages: data.session.package || [],
          totalPrice: data.session.total,
        })
      );
    } catch (error) {
      if (error.message.startsWith('Error 501:')) {
        dispatch(
          cartActions.setErrorMessage({
            errorMessage: error.message.replace('Error 501: ', ''),
            key,
          })
        );
        dispatch(
          cartActions.changePeopleAmount({
            key,
            adults: adult,
            children: child,
            toddler,
            flag: true,
          })
        );
      } else {
        console.error(error);
      }
    }
  };
}

export function changePackageAmount({ key, slip, guest }) {
  return async function (dispatch) {
    dispatch(
      cartActions.changePackageAmount({
        key,
        guest,
      })
    );
    try {
      await apiCartSession({
        key,
        modify: { slip, guest },
      });
    } catch (error) {
      console.error(error);
    }
  };
}

export function changePackageOptionOld(key, opt) {
  return async function (dispatch) {
    dispatch(cartActions.changePackageOptionOld({ key, opt }));
    try {
      const data = await apiCartSession({ key, opt });
      dispatch(
        cartActions.replacePackages({
          packages: data.session.package || [],
          totalPrice: data.session.total,
        })
      );
    } catch (error) {
      console.error(error);
    }
  };
}
