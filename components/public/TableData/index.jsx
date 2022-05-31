import React from 'react';
import {Spin, Table, Row} from 'antd';
import styles from './styles.module.scss';
import PaganitionBlock from '../Pagination';
import {META_DATA} from '../../../config';
const {PAGE_SIZE} = META_DATA.PAGINATION;

const TableData = (props) => {
  const {
    data,
    columns,
    metadata,
    loading,
    pageSize,
    onPageChange,
    paginationCheck,
  } = props;
  const pagination = (metadata || {}).paginate || {} || {};
  return (
    <div className={styles.tableComponent}>
      <Row>
        <Spin spinning={loading}>
          <Table
            pagination={paginationCheck || false}
            columns={columns(props)}
            dataSource={data || []}
            rowKey={(row) => row._id || row.id}
            size={'small'}
            showSorterTooltip={false}
            // onRow={(record) => {
            //     return {
            //       onDoubleClick: () => path && props.history.push(path.replace(":id", record._id)),
            //     };
            //   }}
          />
        </Spin>
      </Row>
      <Row>
        {metadata && (
          <PaganitionBlock
            onChange={onPageChange}
            pageSize={pagination.pageSize || pageSize || PAGE_SIZE}
            current={pagination.page ? parseInt(pagination.page) : 1}
            total={pagination.total || 0}
            // showTotal={(total, range) => `${range[0]} -> ${range[1]} of ${total} items`}
          />
        )}
      </Row>
    </div>
  );
};

export default TableData;
