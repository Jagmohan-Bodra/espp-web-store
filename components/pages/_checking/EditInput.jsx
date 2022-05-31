import {useState} from 'react';
import {Row, Col, Input, Button} from 'reactstrap';

const EditInput = (props) => {
  const {value, setValue, text, icon} = props;
  const [isEdit, setEdit] = useState(false);
  return (
    <Row style={{marginTop: '10px'}}>
      <Col xl={9}>
        {isEdit && (
          <Input value={value} onChange={setValue} placeholder={text} />
        )}
        {!isEdit && (
          <div style={{height: '40px'}}>
            <span>{icon}</span>
            <span>{value || text}</span>
          </div>
        )}
      </Col>
      <Col xl={3} style={{textAlign: 'right'}}>
        <div style={{height: '40px'}}>
          {isEdit && (
            <Button onClick={() => setEdit(false)} style={{width: '100%'}}>
              Save
            </Button>
          )}
          {!isEdit && (
            <span onClick={() => setEdit(true)} style={{lineHeight: '2.4em'}}>
              Edit
            </span>
          )}
        </div>
      </Col>
    </Row>
  );
};

export default EditInput;
