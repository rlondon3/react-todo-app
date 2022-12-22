import Form from 'react-bootstrap/Form';

function UrgencySwitch({ onChange, checked }) {

  return (
    <Form>
      <Form.Check
        name='is_urgent' 
        type="switch"
        id="custom-switch"
        label="Urgent"
        onChange={onChange}
        checked={!checked}
      />
    </Form>
  );
}

export default UrgencySwitch;