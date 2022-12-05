import Form from 'react-bootstrap/Form';

function UrgencySwitch({ handleChange, value }) {
  return (
    <Form>
      <Form.Check
        name='isUrgent' 
        type="switch"
        id="custom-switch"
        label="isUrgent"
        onChange={handleChange}
        checked={!value}
      />
    </Form>
  );
}

export default UrgencySwitch;