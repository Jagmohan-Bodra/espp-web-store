import {Radio, Table} from 'antd';
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

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
            render: (_, data) => <Radio checked={value == data._id} />,
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
            render: (_, data) => `${data.type} ${data.address}`,
          },
          {
            title: 'Area code',
            dataIndex: 'name',
            ellipsis: true,
            render: (_, data) => `${data.wards}-${data.district}-${data.city}`,
          },
          {
            title: 'Phone number',
            dataIndex: 'phone',
            ellipsis: true,
            render: (text) => `${text}`,
          },
        ]}
        dataSource={addresses || []}
        rowKey={(row) => row._id || row.id}
        size={'small'}
        onRow={(record) => {
          return {
            onClick: () => {
              setData(record._id), setValue(record._id);
            },
          };
        }}
      />
    </div>
  );
};

export default AddressesModal;
