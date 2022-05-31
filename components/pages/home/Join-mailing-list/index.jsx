import {useState} from 'react';
import {Input, Button, FormFeedback} from 'reactstrap';
import Form from '~/components/public/form/Form';
import {notif} from '~/components/public/notification/common';
import {createSubscriptionService} from '~/lib/services/subscription';

const JoinMailingList = (props) => {
  const values = props?.data?.values?.value;
  const [err, setErr] = useState({});
  const [params, setParams] = useState({});

  const onFinish = () => {
    createSubscriptionService(params).then(() => {
      notif({message: `Successfully`});
      setParams({});
    });
  };

  const onChangeData = (value) => {
    setParams({
      ...params,
      ...value,
    });
  };

  return (
    <div
      className={`home-join-mailing-list`}
      style={
        values
          ? {
              background: `url('${values}') no-repeat`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
            }
          : {}
      }>
      <div className={`home-join-mailing-list_header`}>
        <div className={`home-join-mailing-list_header_title`}>
          Join Mailing List!
        </div>
        <div className={`home-join-mailing-list_header_content`}>
          Subscribe to receive updates, store offers and more!
        </div>
      </div>

      <div className={`home-join-mailing-list_form`}>
        <Form
          onFinish={onFinish}
          data={params}
          rules={{
            name: ['required'],
            email: ['required', 'email'],
          }}
          setError={setErr}>
          <Input
            className={`home-join-mailing-list_form_input`}
            placeholder="Name"
            value={params.name}
            onChange={(e) => onChangeData({name: e.target.value})}
            invalid={!!err.name}
          />
          <FormFeedback>
            {(err.name || '').replace(':name', 'Name')}
          </FormFeedback>
          <Input
            className={`home-join-mailing-list_form_input`}
            type="email"
            placeholder="Email Address"
            value={params.email}
            onChange={(e) => onChangeData({email: e.target.value})}
            invalid={!!err.email}
          />
          <FormFeedback>
            {(err.email || '').replace(':name', 'Email')}
          </FormFeedback>

          <Button
            className={`home-join-mailing-list_form_submit`}
            type={'submit'}>
            SUBSCRIBE
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default JoinMailingList;
