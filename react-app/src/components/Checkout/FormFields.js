import Form from 'react-bootstrap/Form';

const FormFields = ({ register, errors }) => {
  const mustStar = <span style={{ color: 'red' }}>*</span>;

  return (
    <>
      <Form.Group controlId="firstName">
        <Form.Label>
          {mustStar}
          {'שם פרטי'}
        </Form.Label>
        <Form.Control
          type="text"
          placeholder="שם פרטי"
          isInvalid={errors.firstName}
          {...register('firstName')}
        />
        {errors.firstName && (
          <Form.Text className="text-danger">
            {errors.firstName.message}
          </Form.Text>
        )}
      </Form.Group>

      <Form.Group controlId="lastName">
        <Form.Label>
          {mustStar}
          {'שם משפחה'}
        </Form.Label>
        <Form.Control
          type="text"
          placeholder="שם משפחה"
          isInvalid={errors.lastName}
          {...register('lastName')}
        />
        {errors.lastName && (
          <Form.Text className="text-danger">
            {errors.lastName.message}
          </Form.Text>
        )}
      </Form.Group>

      <Form.Group controlId="email">
        <Form.Label>
          {mustStar}
          {'דוא"ל'}
        </Form.Label>
        <Form.Control
          type="email"
          placeholder="user@email.com"
          isInvalid={errors.email}
          {...register('email')}
        />
        {errors.email && (
          <Form.Text className="text-danger">{errors.email.message}</Form.Text>
        )}
      </Form.Group>

      <Form.Group controlId="phoneNumber">
        <Form.Label>
          {mustStar}
          {'מספר טלפון'}
        </Form.Label>
        <Form.Control
          type="text"
          placeholder="0534567890"
          isInvalid={errors.phoneNumber}
          {...register('phoneNumber')}
        />
        {errors.phoneNumber && (
          <Form.Text className="text-danger">
            {errors.phoneNumber.message}
          </Form.Text>
        )}
      </Form.Group>
    </>
  );
};

export default FormFields;
