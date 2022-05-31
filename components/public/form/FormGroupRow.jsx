import {FormGroup, Label, Col, FormFeedback, FormText} from 'reactstrap';
import Star from './Star';

const FormGroupRow = (props) => {
  const {id, name, remains, feedback, important} = props;

  return (
    <FormGroup row>
      <Label for={id} sm={3}>
        {name} <Star none={!important} />
      </Label>
      <Col sm={9}>
        {props.children}
        <FormFeedback>{(feedback || '').replace(':name', name)}</FormFeedback>
        <FormText>{remains}</FormText>
      </Col>
    </FormGroup>
  );
};

export default FormGroupRow;
