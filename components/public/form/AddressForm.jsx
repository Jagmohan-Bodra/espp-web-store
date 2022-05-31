import {useEffect, useState} from 'react';
import {Row, Col} from 'reactstrap';
import Form from '~/components/public/form/Form';
import InputGroupHorizontal from '~/components/public/input-group/input-group-horizontal';
import SelectGroupHorizontal from '~/components/public/input-group/input-group-horizontal/SelectGroupHorizontal';
import countryJson from '~/lib/resource/country-region-data';
import {
  closePublicModal,
  submitPublicModal,
} from '~/components/modals/public-modal/common';
import CheckboxCustom from '../checkbox-custom';

const AddressForm = (props) => {
  const [params, setParams] = useState({});
  const [err, setErr] = useState({});
  useEffect(() => {
    props.data && setParams(props.data);
  }, [props.data]);

  const handleCancel = () => {
    closePublicModal();
  };

  const onFinish = () => {
    submitPublicModal(params);
  };

  const onChangeData = (value) => {
    setParams({
      ...params,
      ...value,
    });
  };

  return (
    <div className={`information-tab_form`}>
      <Form
        data={params}
        rules={{
          firstName: ['required'],
          lastName: ['required'],
          phone: ['required'],
          stresstName: ['required'],
          floor: ['required'],
          unitNo: ['required'],
          buildingName: ['required'],
          state: ['required'],
          country: ['required'],
          city: ['required'],
          postCode: ['required'],
        }}
        setError={setErr}
        onFinish={onFinish}>
        <Row>
          <Col xl={6}>
            <InputGroupHorizontal
              label={`First Name`}
              value={params.firstName}
              onChange={(e) => onChangeData({firstName: e.target.value})}
              feedback={err.firstName}
              important
            />
          </Col>
          <Col xl={6}>
            <InputGroupHorizontal
              label={`Last Name`}
              value={params.lastName}
              onChange={(e) => onChangeData({lastName: e.target.value})}
              feedback={err.lastName}
              important
            />
          </Col>
        </Row>
        <Row>
          <Col xl={12}>
            <InputGroupHorizontal
              label={`Phone`}
              value={params.phone}
              onChange={(e) => onChangeData({phone: e.target.value})}
              feedback={err.phone}
            />
          </Col>
        </Row>
        <Row>
          <Col xl={12}>
            <InputGroupHorizontal
              label={`Block No.`}
              value={params.blockNo}
              onChange={(e) => onChangeData({blockNo: e.target.value})}
              feedback={err.blockNo}
            />
          </Col>
        </Row>
        <Row>
          <Col xl={12}>
            <InputGroupHorizontal
              label={`Street Name`}
              value={params.stresstName}
              onChange={(e) => onChangeData({stresstName: e.target.value})}
              feedback={err.stresstName}
              important
            />
          </Col>
        </Row>
        <Row>
          <Col xl={12}>
            <InputGroupHorizontal
              label={`Floor`}
              value={params.floor}
              onChange={(e) => onChangeData({floor: e.target.value})}
              feedback={err.floor}
              important
            />
          </Col>
        </Row>
        <Row>
          <Col xl={12}>
            <InputGroupHorizontal
              label={`Unit Number`}
              value={params.unitNo}
              onChange={(e) => onChangeData({unitNo: e.target.value})}
              feedback={err.unitNo}
              important
            />
          </Col>
        </Row>
        <Row>
          <Col xl={12}>
            <InputGroupHorizontal
              label={`Building Name`}
              value={params.buildingName}
              onChange={(e) => onChangeData({buildingName: e.target.value})}
              feedback={err.buildingName}
              important
            />
          </Col>
        </Row>
        <Row>
          <Col xl={6}>
            <InputGroupHorizontal
              label={`State`}
              value={params.state}
              onChange={(e) => onChangeData({state: e.target.value})}
              feedback={err.state}
              important
            />
          </Col>
          <Col xl={6}>
            <InputGroupHorizontal
              label={`Post code`}
              value={params.postCode}
              onChange={(e) => onChangeData({postCode: e.target.value})}
              feedback={err.postCode}
              important
            />
          </Col>
        </Row>
        <Row>
          <Col xl={6}>
            <SelectGroupHorizontal
              label={`Country`}
              data={countryJson}
              value={params.country}
              onChange={(e) =>
                onChangeData({
                  country: e.target.value,
                  city: '',
                })
              }
              feedback={err.country}
              important
            />
          </Col>
          <Col xl={6}>
            <SelectGroupHorizontal
              label={`City`}
              data={[
                {
                  text: 'City',
                  value: '',
                },
                ...((
                  countryJson.find((item) => item.value == params.country) || {}
                ).regions || []),
              ]}
              value={params.city}
              onChange={(e) => onChangeData({city: e.target.value})}
              feedback={err.city}
              important
            />
          </Col>
        </Row>
        {params.default && (
          <Row>
            <Col xl={12}>
              <CheckboxCustom
                label={`Set as default address`}
                checked={params.isDefault}
                onChange={(e) => onChangeData({isDefault: e.target.checked})}
              />
            </Col>
          </Row>
        )}
        <div className={`information-tab_form_btn`}>
          <button
            className={`information-tab_form_btn_cancel`}
            onClick={handleCancel}
            type={`button`}>
            Cancel
          </button>
          <button className={`information-tab_form_btn_submit`} type={`submit`}>
            Save
          </button>
        </div>
      </Form>
    </div>
  );
};

export default AddressForm;
