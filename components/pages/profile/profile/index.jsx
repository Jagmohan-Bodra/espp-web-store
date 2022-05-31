import moment from 'moment';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Row, Col} from 'reactstrap';
import CheckboxCustom from '~/components/public/checkbox-custom';
import Form from '~/components/public/form/Form';
import InputGroupHorizontal from '~/components/public/input-group/input-group-horizontal';
import SelectGroupHorizontal from '~/components/public/input-group/input-group-horizontal/SelectGroupHorizontal';
import TimePickerHorizontal from '~/components/public/input-group/input-group-horizontal/TimePickerHorizontal';
import Loading from '~/components/public/loading';
import {notif} from '~/components/public/notification/common';
import uploadImageService from '~/lib/services/upload';
import {updateMeUserService, updateMeSettingsService} from '~/lib/services/me';
import {reqGetMe} from '~/reduxs/me/action';
import {convertToCurrencyList} from '~/handler';

const ProfilePage = (props) => {
  const dispatch = useDispatch();
  const [params, setParams] = useState({});
  const [file, setFile] = useState();
  const [err, setErr] = useState({});
  const [loading, setLoading] = useState(false);
  const me = useSelector((state) => state.me.data);

  const currencySetting = props.currencySetting || {};
  const currencyOptions = currencySetting.options || [];
  const currencyList = convertToCurrencyList(currencyOptions);
  const currencyDefault = currencyList.find((item) => item.isDefault === true);

  useEffect(() => {
    me &&
      setParams({
        avatar: me.avatar,
        firstName: me.firstName,
        lastName: me.lastName,
        email: me.email,
        phone: me.phone,
        birthday: new Date(me.birthday),
        currency: me.settings?.currency || currencyDefault?.code,
      });
  }, [me]);

  const onChangeData = (value) => {
    setParams({
      ...params,
      ...value,
    });
  };

  const onChangeCurrency = async (dataCurrency) => {
    if (dataCurrency) {
      setLoading(true);
      await updateMeSettingsService(dataCurrency).then(() => {
        dispatch(reqGetMe());
        setLoading(false);
        notif({message: 'Update Currency successfully'});
      });
    }
    setParams({...params, ...dataCurrency});
  };

  const onFinish = async () => {
    setLoading(true);
    if (params.avatar != me.avatar) {
      await uploadImageService(file);
    }
    await updateMeUserService(params)
      .then(() => {
        dispatch(reqGetMe());
        setLoading(false);
        notif({message: 'Update profile successfully'});
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const handleCancel = () => {
    me &&
      setParams({
        avatar: me.avatar,
        firstName: me.firstName,
        lastName: me.lastName,
        email: me.email,
        phone: me.phone,
        birthday: new Date(me.birthday),
        currency: me?.settings?.currency || currencyDefault?.code,
      });
  };

  const avatarOnChange = (event) => {
    if (event.target.files[0]) {
      const avatar = URL.createObjectURL(event.target.files[0]);
      onChangeData({avatar: avatar});
      setFile(event.target.files[0]);
    }
  };

  return (
    <div className={`profile-page`}>
      <Loading isLoading={loading}>
        <Form
          data={params}
          rules={{
            firstName: ['required'],
            lastName: ['required'],
            phone: ['required'],
            email: ['required', 'email'],
          }}
          setError={setErr}
          onFinish={onFinish}>
          <div className={`profile-page_avatar`}>
            <div className={`profile-page_avatar_title`}>{`${
              me.firstName || ''
            } ${me.lastName || ''}`}</div>
            <div className={`profile-page_avatar_img`}>
              <img src={params.avatar} />
              <div className={`profile-page_avatar_img_link`}>
                <label htmlFor="customFile">Change</label>
                <input
                  accept="image/*"
                  type="file"
                  id="customFile"
                  style={{display: 'none'}}
                  onChange={avatarOnChange}
                />
              </div>
            </div>
          </div>
          <div className={`profile-page_form`}>
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
              <Col xl={12} className="profile-page_form_col_email">
                <InputGroupHorizontal
                  label={`Email`}
                  value={params.email}
                  onChange={(e) => onChangeData({email: e.target.value})}
                  feedback={err.email}
                  important
                  disabled
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
                  important
                />
              </Col>
            </Row>

            <Row>
              <Col xl={6}>
                <TimePickerHorizontal
                  label={`Date of Birth`}
                  placeholder={`DD-MM-YYYY`}
                  selected={
                    moment(params.birthday).isValid() ? params.birthday : ''
                  }
                  onChange={(date) => onChangeData({birthday: date})}
                  feedback={err.birthday}
                  important
                  dateFormat="dd-MM-yyyy"
                />
              </Col>
              <Col xl={6}>
                <SelectGroupHorizontal
                  label={`Currency`}
                  data={currencyList}
                  value={params?.currency}
                  onChange={(e) => onChangeCurrency({currency: e.target.value})}
                />
              </Col>
            </Row>
            <Row>
              <Col xl={12}>
                <CheckboxCustom label={`Sign up for our newsletter`} />
              </Col>
            </Row>
          </div>
          <div className={`profile-page_footer`}>
            <button
              className={`profile-page_footer_cancel`}
              type={`button`}
              onClick={handleCancel}>
              Cancel
            </button>
            <button className={`profile-page_footer_submit`} type={`submit`}>
              Save
            </button>
          </div>
        </Form>
      </Loading>
    </div>
  );
};

export default ProfilePage;
