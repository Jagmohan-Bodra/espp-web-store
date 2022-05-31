import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {Input} from 'reactstrap';
import Table from '~/components/public/table';

const AddressesModal = ({data, setData}) => {
  const me = useSelector((state) => state.me.data);
  const [value, setValue] = useState();
  const {addresses} = (me || {}).customer || {};

  useEffect(() => {
    setValue(data);
  }, [data]);

  return (
    <div>
      <Table
        columns={[
          {
            title: '',
            dataIndex: 'name',
            ellipsis: true,
            render: (_, data) => (
              <Input type="radio" checked={value == data._id} />
            ),
            width: 40,
          },
          {
            title: 'Name',
            dataIndex: 'name',
            ellipsis: true,
            render: (text) => text,
          },
          {
            title: 'Address',
            dataIndex: 'name',
            ellipsis: true,
            render: (_, data) =>
              `${data.addressUnitNo || ''} ${data.addressStresstName || ''} ${
                data.addressCity || ''
              } ${data.addressState || ''} ${data.addressCountry || ''}`,
          },
          {
            title: 'Area code',
            dataIndex: 'addressPostCode',
            ellipsis: true,
            render: (_, data) => `${data.addressPostCode}`,
          },
          {
            title: 'Phone number',
            dataIndex: 'phone',
            ellipsis: true,
            render: (text) => `${text}`,
          },
        ]}
        dataSource={addresses || []}
        onRowClick={(record) => {
          setData(record._id);
          setValue(record._id);
        }}
      />
    </div>
  );
};

export default AddressesModal;
