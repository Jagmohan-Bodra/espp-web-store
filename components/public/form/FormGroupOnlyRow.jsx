import {FormGroup, Col, FormFeedback, FormText} from 'reactstrap';

const FormGroupOnlyRow = (props) => {
  const {name, remains, feedback} = props;

  return (
    <FormGroup row>
      <Col sm={12}>
        {props.children}
        <FormFeedback>{(feedback || '').replace(':name', name)}</FormFeedback>
        <FormText>{remains}</FormText>
      </Col>
    </FormGroup>
  );
};

export default FormGroupOnlyRow;
