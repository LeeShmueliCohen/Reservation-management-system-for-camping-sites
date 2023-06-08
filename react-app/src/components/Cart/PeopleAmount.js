import React from 'react';
import { useDispatch } from 'react-redux';
import { changePeopleAmount } from '../../store/cart-actions';

function PeopleAmount({ placeObj }) {
  const dispatch = useDispatch();

  const handleChangePeople = (obj) => {
    dispatch(changePeopleAmount(obj));
  };

  const buttonClassName = 'third-button add-people';
  return (
    <table className="peoples-text">
      <tbody>
        <tr>
          <td>בוגר:</td>
          <td>
            <button
              className={buttonClassName}
              onClick={() => {
                handleChangePeople({
                  key: placeObj.key,
                  placeId: placeObj.item_id,
                  startDate: placeObj.date.start_date,
                  endDate: placeObj.date.end_date,
                  adult: placeObj.adults + 1,
                  child: placeObj.children,
                  toddler: placeObj.toddler,
                });
              }}
            >
              +
            </button>
          </td>
          <td>{placeObj.adults}</td>
          <td>
            <button
              className={buttonClassName}
              onClick={() => {
                handleChangePeople({
                  key: placeObj.key,
                  placeId: placeObj.item_id,
                  startDate: placeObj.date.start_date,
                  endDate: placeObj.date.end_date,
                  adult: placeObj.adults - 1,
                  child: placeObj.children,
                  toddler: placeObj.toddler,
                });
              }}
            >
              -
            </button>
          </td>
        </tr>
        <tr>
          <td>ילד:</td>
          <td>
            <button
              className={buttonClassName}
              onClick={() => {
                handleChangePeople({
                  key: placeObj.key,
                  placeId: placeObj.item_id,
                  startDate: placeObj.date.start_date,
                  endDate: placeObj.date.end_date,
                  adult: placeObj.adults,
                  child: placeObj.children + 1,
                  toddler: placeObj.toddler,
                });
              }}
            >
              +
            </button>
          </td>
          <td>{placeObj.children}</td>
          <td>
            <button
              className={buttonClassName}
              onClick={() => {
                handleChangePeople({
                  key: placeObj.key,
                  placeId: placeObj.item_id,
                  startDate: placeObj.date.start_date,
                  endDate: placeObj.date.end_date,
                  adult: placeObj.adults,
                  child: placeObj.children - 1,
                  toddler: placeObj.toddler,
                });
              }}
            >
              -
            </button>
          </td>
        </tr>
        {placeObj.toddler !== null && (
          <tr>
            <td>פעוט:</td>
            <td>
              <button
                className={buttonClassName}
                onClick={() => {
                  handleChangePeople({
                    key: placeObj.key,
                    placeId: placeObj.item_id,
                    startDate: placeObj.date.start_date,
                    endDate: placeObj.date.end_date,
                    adult: placeObj.adults,
                    child: placeObj.children,
                    toddler: placeObj.toddler + 1,
                  });
                }}
              >
                +
              </button>
            </td>
            <td>{placeObj.toddler}</td>
            <td>
              <button
                className={buttonClassName}
                onClick={() => {
                  handleChangePeople({
                    key: placeObj.key,
                    placeId: placeObj.item_id,
                    startDate: placeObj.date.start_date,
                    endDate: placeObj.date.end_date,
                    adult: placeObj.adults,
                    child: placeObj.children,
                    toddler: placeObj.toddler - 1,
                  });
                }}
              >
                -
              </button>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default PeopleAmount;
