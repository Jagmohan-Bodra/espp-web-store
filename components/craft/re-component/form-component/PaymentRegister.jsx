import React, {useState} from 'react';
import {Form, Input, Button, Checkbox, Space} from 'antd';
import {SelectForm} from './ControlForm';
import {approvalRequestCreate} from '../../../../lib/approvalRequest';
import {APPROVAL_TYPES} from '../../../../constants/master-data';

import {
  SALUTATION_OPTION,
  YEAR_OPTION,
  MONTH_OPTION,
  DAY_OPTION,
  NUMBER_OF_CHILDREN_OPTION,
  COURSE_OPTION,
  LEVEL_AT_SCHOOL_OPTION,
} from './data-form';

const ChildForm = (props) => {
  const {childLength, setData} = props;
  const [students, setStudents] = useState([]);

  const handleSetstudentData = (index, key, value) => {
    let newStudents = [...students];
    let child = {...(newStudents[index] || {})};
    child[key] = value;
    newStudents[index] = child;
    setStudents(newStudents);
    setData && setData(newStudents);
  };

  const childs = Array.from(Array(parseInt(childLength)).keys());
  return childs.map((_, index) => (
    <div key={index}>
      <div className="form-children">
        <div className="form-group">
          <label>CHILD - FIRST NAME</label>
          <Form.Item
            name={`CHILD - FIRST NAME ${index}`}
            rules={[{required: true}]}>
            <Input
              className="form-control"
              value={(students[index] || {}).firstName}
              onChange={(e) =>
                handleSetstudentData(index, 'firstName', e.target.value)
              }
              placeholder={``}
            />
          </Form.Item>
        </div>

        <div className="form-group">
          <label>CHILD - LAST NAME</label>
          <Form.Item
            name={`CHILD - LAST NAME ${index}`}
            rules={[{required: true}]}>
            <Input
              className="form-control"
              value={(students[index] || {}).lastName}
              onChange={(e) =>
                handleSetstudentData(index, 'lastName', e.target.value)
              }
              placeholder={``}
            />
          </Form.Item>
        </div>

        <div className="form-group">
          <label>CHILD - LEVEL</label>
          <Form.Item name={`CHILD - LEVEL ${index}`} rules={[{required: true}]}>
            <SelectForm
              className="form-control"
              data={COURSE_OPTION}
              value={(students[index] || {}).course}
              onChange={(value) => handleSetstudentData(index, 'course', value)}
            />
          </Form.Item>
        </div>

        <div className="form-group">
          <label>CHILD - SELECT CLASS TERM</label>
          <Form.Item
            name={`CHILD - SELECT CLASS TERM ${index}`}
            rules={[{required: true}]}>
            <SelectForm
              className="form-control"
              data={[
                {
                  value: '',
                  title: '- Please select -',
                },
                {
                  value:
                    'TERM 2 Thursday 18 March 2021 to Wednesday 26 May 2021',
                  title:
                    'TERM 2 Thursday 18 March 2021 to Wednesday 26 May 2021',
                },
              ]}
              value={(students[index] || {}).term}
              onChange={(value) => handleSetstudentData(index, 'term', value)}
            />
          </Form.Item>
        </div>

        <div className="form-group">
          <label>CHILD - EMAIL (A different email address is required)</label>
          <Form.Item
            name={`CHILD - EMAIL ${index}`}
            rules={[{type: 'email'}, {required: true}]}>
            <Input
              className="form-control"
              value={(students[index] || {}).email}
              onChange={(e) =>
                handleSetstudentData(index, 'email', e.target.value)
              }
              placeholder={``}
            />
          </Form.Item>
        </div>

        <div className="form-group">
          <label>CHILD - WHICH SCHOOL IS YOUR CHILD FROM ?</label>
          <Form.Item
            name={`CHILD - WHICH SCHOOL ${index}`}
            rules={[{required: true}]}>
            <Input
              className="form-control"
              value={(students[index] || {}).schoolName}
              onChange={(e) =>
                handleSetstudentData(index, 'schoolName', e.target.value)
              }
              placeholder={``}
            />
          </Form.Item>
        </div>
        <div className="form-group">
          <label>CHILD - SELECT YOUR CLASS SCHEDULE</label>
          <Form.Item
            name={`CHILD - YOUR CLASS SCHEDULE ${index}`}
            rules={[{required: true}]}>
            <SelectForm
              className="form-control"
              data={LEVEL_AT_SCHOOL_OPTION}
              value={(students[index] || {}).levelAtchool}
              onChange={(value) =>
                handleSetstudentData(index, 'levelAtchool', value)
              }
            />
          </Form.Item>
        </div>
      </div>
    </div>
  ));
};

export const PaymentRegister = () => {
  const [data, setData] = useState({parent: {}, child_length: 1});

  const handleSetData = (obj) => {
    setData({
      ...data,
      ...obj,
      parent: {
        ...(data.parent || {}),
        ...(obj.parent || {}),
      },
    });
  };

  const onChangCheckbox = () => {
    // console.log('checked: ', e.target.checked )
  };

  const onFinish = async () => {
    const {address, postal_code, year, month, day} = data;
    data.date = year + '-' + month + '-' + day;
    data.address = address + ', ' + postal_code;
    delete data.postal_code;
    delete data.year;
    delete data.month;
    delete data.day;

    const dataForm = {
      type: APPROVAL_TYPES.REGISTER_ACCOUNT,
      form: data,
    };
    const result = await approvalRequestCreate(dataForm);
    if (result && result.success) {
      window.location.href = '/page/thank-you';
    }
  };

  return (
    <div className="payment-form block-page-payment">
      <Form className="was-validated-off" onFinish={onFinish}>
        <div className="form-group">
          <label>SALUTATION</label>

          <Form.Item name="SALUTATION" rules={[{required: true}]}>
            <SelectForm
              className="form-control"
              data={SALUTATION_OPTION}
              value={data.parent.salutation}
              onChange={(value) => handleSetData({parent: {salutation: value}})}
            />
          </Form.Item>
        </div>

        <div className="form-group">
          <label>PARENT - FIRST NAME</label>
          <Form.Item name="PARENT - FIRST NAME" rules={[{required: true}]}>
            <Input
              className="form-control"
              value={data.parent.firstName}
              onChange={(e) =>
                handleSetData({parent: {firstName: e.target.value}})
              }
              placeholder={`First name`}
            />
          </Form.Item>
        </div>

        <div className="form-group">
          <label>PARENT - LAST NAME</label>
          <Form.Item name="PARENT - LAST NAME" rules={[{required: true}]}>
            <Input
              className="form-control"
              value={data.parent.lastName}
              onChange={(e) =>
                handleSetData({parent: {lastName: e.target.value}})
              }
              placeholder={`Last name`}
            />
          </Form.Item>
        </div>

        <div className="form-group">
          <label>EMAIL</label>
          <Form.Item
            name="PARENT - EMAIL"
            rules={[{type: 'email'}, {required: true}]}>
            <Input
              className="form-control"
              value={data.parent.email}
              onChange={(e) => handleSetData({parent: {email: e.target.value}})}
              placeholder={`Email`}
            />
          </Form.Item>
        </div>

        <div className="form-group">
          <label>MOBILE</label>
          <Form.Item name="PARENT - MOBILE" rules={[{required: true}]}>
            <Input
              className="form-control"
              value={data.parent.phone}
              onChange={(e) => handleSetData({parent: {phone: e.target.value}})}
              placeholder={`Moblie`}
            />
          </Form.Item>
        </div>

        <div className="form-group ">
          <label>DATE OF BIRTH</label>
          <div className="payment-box-form-date">
            <Form.Item name="Year" rules={[{required: true}]}>
              <SelectForm
                className="form-control"
                data={YEAR_OPTION()}
                value={data.parent.year}
                onChange={(value) => handleSetData({parent: {year: value}})}
              />
            </Form.Item>
            <Form.Item name="month" rules={[{required: true}]}>
              <SelectForm
                className="form-control"
                data={MONTH_OPTION()}
                value={data.parent.month}
                onChange={(value) => handleSetData({parent: {month: value}})}
              />
            </Form.Item>
            <Form.Item name="day" rules={[{required: true}]}>
              <SelectForm
                className="form-control"
                data={DAY_OPTION()}
                value={data.parent.day}
                onChange={(value) => handleSetData({parent: {day: value}})}
              />
            </Form.Item>
          </div>
        </div>

        <div className="form-group">
          <div className="payment-box-form-address">
            <div className="payment-input-address">
              <label>ADDRESS</label>
              <Form.Item name="ADDRESS" rules={[{required: true}]}>
                <Input
                  className="form-control"
                  value={data.parent.address}
                  onChange={(e) =>
                    handleSetData({parent: {address: e.target.value}})
                  }
                  placeholder={``}
                />
              </Form.Item>
            </div>
            <div className="payment-input-postal-code">
              <label>POSTAL CODE</label>
              <Form.Item name="POSTAL CODE" rules={[{required: true}]}>
                <Input
                  className="form-control"
                  value={data.parent.postal_code}
                  onChange={(e) =>
                    handleSetData({parent: {postal_code: e.target.value}})
                  }
                  placeholder={``}
                />
              </Form.Item>
            </div>
          </div>
        </div>

        <div className="form-group">
          <Space align="baseline">
            <label style={{display: 'block'}}>NUMBER OF CHILDREN </label>
            <Form.Item name="NUMBER OF CHILDREN" rules={[{required: true}]}>
              <SelectForm
                className="form-control change-number"
                data={NUMBER_OF_CHILDREN_OPTION()}
                value={data.child_length}
                onChange={(value) => handleSetData({child_length: value})}
              />
            </Form.Item>
          </Space>
        </div>
        {
          <ChildForm
            childLength={data.child_length || 0}
            setData={(value) => handleSetData({students: value})}
          />
        }

        {/* Privacy Policy  */}
        <div className="form-group form-check">
          <div className="form-checkbox-agree">
            <Checkbox
              className="checkbox-agree"
              //checked={data.agree}
              onChange={onChangCheckbox}
            />
            <label className="form-check-label">
              <p>
                I agree that TutorBuddy may collect, use and disclose my
                personal date to receive marketing, advertising and promotional
                material from TutorBuddy in accordance with our
                <a
                  href="https://tutorbuddy.sg/upload/Tutorbuddy_-_Privacy_Policy.pdf"
                  target="_blank"
                  rel="noopener noreferrer">
                  Privacy Policy
                </a>
                and our full terms
                <a
                  href="https://tutorbuddy.sg/upload/Tutorbuddy_-_Terms_&amp;_Conditions_for_Enrolment.pdf"
                  target="_blank"
                  rel="noopener noreferrer">
                  T&amp;C
                </a>
                .
              </p>
            </label>
          </div>
        </div>
        <div className="btn-payment-content">
          <Button className="btn btn-outline-secondary" htmlType={'submit'}>
            SUBMIT
          </Button>
        </div>
      </Form>
    </div>
  );
};
