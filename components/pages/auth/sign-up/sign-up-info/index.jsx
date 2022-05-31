import ReCAPTCHA from 'react-google-recaptcha';
import {FormGroup, Button, Input, Label, Row, Col} from 'reactstrap';
import InputRow from '~/components/public/form/InputRow';
import SelectRow from '~/components/public/form/SelectRow';
import Steps from '~/components/public/Steps';
import HeaderAuth from '../../header-auth';
import {SALUTATION_OPTION, DESIGNATIONS} from '~/constants/master-data';
import {useRef, useState} from 'react';
import config from '~/config';
import Form from '~/components/public/form/Form';
import countryJson from '~/lib/resource/country-region-data';

const SignUpInfo = (props) => {
  const {setStep, onFinish} = props;
  const [data, setData] = useState({});
  const [captcha, setCaptcha] = useState();
  const [err, setErr] = useState({});
  const ref = useRef(null);

  const onChangeData = (value) => {
    setData({...data, ...value});
  };

  const onCopyContact = () => {
    let dataCopy = {
      financeSalutation: data.salutation,
      financeFirstName: data.firstName,
      financeLastName: data.lastName,
      financeContactNo: data.contactNo,
      financeEmail: data.personalEmail,
    };
    setData({...data, ...dataCopy});
  };

  const handleFinish = () => {
    onFinish(data, captcha);
    ref.current.reset();
    setCaptcha('');
  };

  return (
    <div className={`sign-up-info`}>
      <HeaderAuth signUp />
      <div className={`sign-up-info_container`}>
        <div className={`sign-up-info_container_step`}>
          <Steps step="STEP_2" />
        </div>
        <div className={`sign-up-info_container_form`}>
          <Form
            className={`form-login`}
            data={{
              ...data,
              captcha,
            }}
            rules={{
              salutation: ['required'],
              firstName: ['required'],
              lastName: ['required'],
              designation: ['required'],
              contactNo: ['required'],
              phone: ['required'],
              personalEmail: ['required', 'email'],

              addressStresstName: ['required'],
              addressBuildingName: ['required'],
              addressPostCode: ['required'],
              addressCountry: ['required'],

              financeSalutation: ['required'],
              financeFirstName: ['required'],
              financeLastName: ['required'],
              financeContactNo: ['required'],
              financeEmail: ['required', 'email'],
              captcha: ['required'],

              companyName: ['required'],
              companyRegNo: ['required'],
              companyContactNo: ['required'],
              companyFax: ['required'],
              companyNatureOfBusiness: ['required'],
            }}
            setError={setErr}
            onFinish={handleFinish}>
            <Row className={`sign-up-info_container_form_row`}>
              <Col md={6} xs={12} className={`border_right mb-4`}>
                <span className={`sign-up-info_container_form_title`}>
                  <b>CONTACT INFORMATION</b>
                </span>
                <SelectRow
                  data={SALUTATION_OPTION}
                  name={'Salutation'}
                  id={'salutation'}
                  value={data.salutation}
                  onChange={(value) => onChangeData({salutation: value})}
                  feedback={err.salutation}
                  important
                />

                <InputRow
                  name={`First Name`}
                  id={`firstName`}
                  value={data.firstName}
                  onChange={(value) => onChangeData({firstName: value})}
                  feedback={err.firstName}
                  important
                />
                <InputRow
                  name={`Last Name`}
                  id={`lastName`}
                  value={data.lastName}
                  onChange={(value) => onChangeData({lastName: value})}
                  feedback={err.lastName}
                  important
                />
                <SelectRow
                  data={DESIGNATIONS}
                  name={'Designation'}
                  id={'designation'}
                  value={data.designation}
                  onChange={(value) => onChangeData({designation: value})}
                  feedback={err.designation}
                  important
                />
                <InputRow
                  name={`Contact No.`}
                  id={`contactNo`}
                  value={data.contactNo}
                  onChange={(value) => onChangeData({contactNo: value})}
                  feedback={err.contactNo}
                  important
                />
                <InputRow
                  name={`Mobile Number`}
                  id={`phone`}
                  value={data.phone}
                  onChange={(value) => onChangeData({phone: value})}
                  feedback={err.phone}
                  important
                />
                <InputRow
                  name={`Email Address`}
                  id={`personalEmail`}
                  value={data.personalEmail}
                  onChange={(value) => onChangeData({personalEmail: value})}
                  feedback={err.personalEmail}
                  important
                />
              </Col>

              <Col md={6} xs={12} className="mb-5">
                <span className={`sign-up-info_container_form_title`}>
                  <b>BILLING INFORMATION</b>
                </span>
                <InputRow
                  name={`Block No.`}
                  id={`addressBlockNo`}
                  value={data.addressBlockNo}
                  onChange={(value) => onChangeData({addressBlockNo: value})}
                  feedback={err.addressBlockNo}
                />
                <InputRow
                  name={`Street Name`}
                  id={`addressStresstName`}
                  value={data.addressStresstName}
                  onChange={(value) =>
                    onChangeData({addressStresstName: value})
                  }
                  feedback={err.addressStresstName}
                  important
                />
                <InputRow
                  name={`Floor`}
                  id={`addressFloor`}
                  value={data.addressFloor}
                  onChange={(value) => onChangeData({addressFloor: value})}
                  feedback={err.addressFloor}
                />
                <InputRow
                  name={`Unit Number`}
                  id={`addressUnitNo`}
                  value={data.addressUnitNo}
                  onChange={(value) => onChangeData({addressUnitNo: value})}
                  feedback={err.addressUnitNo}
                />
                <InputRow
                  name={`Building Name`}
                  id={`addressBuildingName`}
                  value={data.addressBuildingName}
                  onChange={(value) =>
                    onChangeData({addressBuildingName: value})
                  }
                  feedback={err.addressBuildingName}
                  important
                />
                <InputRow
                  name={`Postcode`}
                  id={`addressPostCode`}
                  value={data.addressPostCode}
                  onChange={(value) => onChangeData({addressPostCode: value})}
                  feedback={err.addressPostCode}
                  important
                />
                <InputRow
                  name={`City`}
                  id={`addressCity`}
                  value={data.addressCity}
                  onChange={(value) => onChangeData({addressCity: value})}
                  feedback={err.addressCity}
                />
                <InputRow
                  name={`State`}
                  id={`addressState`}
                  value={data.addressState}
                  onChange={(value) => onChangeData({addressState: value})}
                  feedback={err.addressState}
                />
                <SelectRow
                  data={countryJson}
                  name={'Country'}
                  id={'addressCountry'}
                  value={data.addressCountry}
                  onChange={(value) => onChangeData({addressCountry: value})}
                  feedback={err.addressCountry}
                  important
                />
              </Col>

              <Col md={6} xs={12} className={`border_right mb-5`}>
                <span className={`sign-up-info_container_form_title`}>
                  <b>COMPANY INFORMATION</b>
                </span>
                <InputRow
                  name={`Company Name`}
                  id={`companyName`}
                  value={data.companyName}
                  onChange={(value) => onChangeData({companyName: value})}
                  feedback={err.companyName}
                  important
                />
                <InputRow
                  name={`Company Reg. No`}
                  id={`companyRegNo`}
                  value={data.companyRegNo}
                  onChange={(value) => onChangeData({companyRegNo: value})}
                  feedback={err.companyRegNo}
                  important
                />
                <InputRow
                  name={`Company Contact Number`}
                  id={`companyContactNo`}
                  value={data.companyContactNo}
                  onChange={(value) => onChangeData({companyContactNo: value})}
                  feedback={err.companyContactNo}
                  important
                />
                <InputRow
                  name={`Company Fax`}
                  id={`companyFax`}
                  value={data.companyFax}
                  onChange={(value) => onChangeData({companyFax: value})}
                  feedback={err.companyFax}
                  important
                />
                <InputRow
                  name={`Company Nature`}
                  id={`companyNatureOfBusiness`}
                  value={data.companyNatureOfBusiness}
                  onChange={(value) =>
                    onChangeData({companyNatureOfBusiness: value})
                  }
                  feedback={err.companyNatureOfBusiness}
                  important
                />
              </Col>

              <Col md={6} xs={12}>
                <div className="d-flex">
                  <span className={`sign-up-info_container_form_title w-50`}>
                    <b>FINANCE INFORMATION</b>
                  </span>
                  <div className="w-50 text-right">
                    <Button color="link" onClick={onCopyContact}>
                      Copy form contact information
                    </Button>
                  </div>
                </div>

                <SelectRow
                  data={SALUTATION_OPTION}
                  name={'Salutation'}
                  id={'financeSalutation'}
                  value={data.financeSalutation}
                  onChange={(value) => onChangeData({financeSalutation: value})}
                  feedback={err.financeSalutation}
                  important
                />

                <InputRow
                  name={`First Name`}
                  id={`financeFirstName`}
                  value={data.financeFirstName}
                  onChange={(value) => onChangeData({financeFirstName: value})}
                  feedback={err.financeFirstName}
                  important
                />
                <InputRow
                  name={`Last Name`}
                  id={`financeLastName`}
                  value={data.financeLastName}
                  onChange={(value) => onChangeData({financeLastName: value})}
                  feedback={err.financeLastName}
                  important
                />
                <InputRow
                  name={`Contact No.`}
                  id={`financeContactNo`}
                  value={data.financeContactNo}
                  onChange={(value) => onChangeData({financeContactNo: value})}
                  feedback={err.financeContactNo}
                  important
                />
                <InputRow
                  name={`Email Address`}
                  id={`financeEmail`}
                  value={data.financeEmail}
                  onChange={(value) => onChangeData({financeEmail: value})}
                  feedback={err.financeEmail}
                  important
                />

                <FormGroup row>
                  <Label check sm={3} />
                  <Col sm={8} className="pl-5 mb-3">
                    <Input type="checkbox" /> Subscribe our latest newsletter
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Col sm={3}></Col>
                  <Col sm={9}>
                    <ReCAPTCHA
                      ref={ref}
                      sitekey={config.RE_CAPTCHA_SITEKEY}
                      onChange={setCaptcha}
                    />
                    <div
                      className="invalid-feedback"
                      style={{display: 'block'}}>
                      {(err.captcha || '').replace(':name', 'ReCAPTCHA')}
                    </div>
                  </Col>
                </FormGroup>
              </Col>
            </Row>
            <Row className="mt-5">
              <Col xs={6}>
                <div className={`sign-up-info_container_form_boxBtn`}>
                  <Button
                    onClick={setStep}
                    className={`sign-up-info_container_form_boxBtn_btnPre`}>
                    PREVIOUS
                  </Button>
                </div>
              </Col>

              <Col xs={6}>
                <Button
                  className={`sign-up-info_container_form_boxBtn_btnSubmit`}
                  type={`submit`}>
                  REGISTER
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </div>
  );
};

SignUpInfo.defaultProps = {
  onFinish: () => {},
};

export default SignUpInfo;
