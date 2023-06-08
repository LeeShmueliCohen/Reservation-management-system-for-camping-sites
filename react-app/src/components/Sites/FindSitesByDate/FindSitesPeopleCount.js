import { Button, Dropdown, DropdownButton, ButtonGroup } from 'react-bootstrap';
import './FindSitesByDate.css';

const FindSitesPeopleCount = ({ peoplesProps }) => {
  const adults = peoplesProps.peoples.adults;
  const children = peoplesProps.peoples.children;
  const toddlers = peoplesProps.peoples.toddlers;

  // update specific age
  const updatePeopleCount = (
    newAdults = null,
    newChildren = null,
    newToddlers = null
  ) => {
    peoplesProps.setPeoples((prevState) => {
      const adults = newAdults !== null ? newAdults : prevState.adults;

      const children = newChildren !== null ? newChildren : prevState.children;

      const toddlers = newToddlers !== null ? newToddlers : prevState.toddlers;

      return { ...prevState, adults, children, toddlers };
    });
  };

  const incrementAdults = () => updatePeopleCount(adults + 1);
  const decrementAdults = () =>
    updatePeopleCount(Math.max(adults - 1, 1), null, null);
  const incrementChildren = () => updatePeopleCount(null, children + 1, null);
  const decrementChildren = () =>
    updatePeopleCount(null, Math.max(children - 1, 0), null);
  const incrementToddlers = () => updatePeopleCount(null, null, toddlers + 1);
  const decrementToddlers = () =>
    updatePeopleCount(null, null, Math.max(toddlers - 1, 0));

  let title = `מבוגרים: ${adults}`;
  if (children > 0) title += `, ילדים: ${children}`;
  if (toddlers > 0) title += `, פעוטות: ${toddlers}`;

  return (
    <DropdownButton
      className='position'
      variant="Warning"
      autoClose="outside"
      as={ButtonGroup}
      title={`${title} `}
      id="travlers-dropdown"
      drop="down-centered"
    >
      <div className="travlers-part">
        <span className="mx-2" style={{padding:"3px"}}>מבוגר</span>
        <Button variant="outline-secondary" onClick={decrementAdults}>
          -
        </Button>
        <span className="mx-2">{adults}</span>
        <Button variant="outline-secondary" onClick={incrementAdults}>
          +
        </Button>
      </div>
      <Dropdown.Divider />
      <div className="travlers-part">
        <span className="mx-2" style={{padding:"10px"}}> ילד </span>
        <Button variant="outline-secondary" onClick={decrementChildren}>
          -
        </Button>
        <span className="mx-2">{children}</span>
        <Button variant="outline-secondary" onClick={incrementChildren}>
          +
        </Button>
      </div>
      <Dropdown.Divider />
      <div className="travlers-part">
        <span className="mx-2" style={{padding:"6.5px"}}>פעוט</span>
        <Button variant="outline-secondary" onClick={decrementToddlers}>
          -
        </Button>
        <span className="mx-2">{toddlers}</span>
        <Button variant="outline-secondary" onClick={incrementToddlers}>
          +
        </Button>
      </div>
      
    </DropdownButton>
  );
};

export default FindSitesPeopleCount;
