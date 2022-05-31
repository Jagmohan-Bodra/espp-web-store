const PaginationNew = (props) => {
  const {current, pageSize, total, onChange} = props;
  const params = {
    current: current ? parseInt(current, 10) : 1,
    pageSize: pageSize ? parseInt(pageSize, 10) : 1,
    total: parseInt(total, 10) || 0,
  };
  const totalPage = Math.ceil(params.total / params.pageSize);
  const from = params.current - 2 < 2 ? 2 : params.current - 2;
  const to = from + 4 > totalPage ? totalPage : from + 4;

  const handleChange = (page) => {
    onChange && onChange(page);
  };

  const arr = [];
  for (let i = from; i <= to; i++) {
    arr.push(
      <div
        className={`pagination-new-component_item ${
          params.current == i ? 'active' : ''
        }`}
        key={i}
        onClick={() => handleChange(i)}>
        {i}
      </div>,
    );
  }

  return (
    <div className={`pagination-new-component`}>
      <div
        className={`pagination-new-component_item ${
          params.current <= 1 ? 'visible' : ''
        }`}
        onClick={() => handleChange(params.current - 1)}>
        {`<`}
      </div>

      <div
        className={`pagination-new-component_item ${
          params.current == 1 ? 'active' : ''
        }`}
        onClick={() => handleChange(1)}>
        {' '}
        1{' '}
      </div>

      {from > 2 && (
        <div className={`pagination-new-component_item visible`}> ... </div>
      )}

      {arr.map((item) => item)}
      {to < totalPage - 1 && totalPage > 7 && (
        <div className={`pagination-new-component_item visible`}> ... </div>
      )}
      {to < totalPage && (
        <div
          className={`pagination-new-component_item ${
            params.current == totalPage ? 'active' : ''
          }`}
          onClick={() => handleChange(totalPage)}>
          {' '}
          {totalPage}{' '}
        </div>
      )}
      <div
        className={`pagination-new-component_item  ${
          params.current >= totalPage ? 'visible' : ''
        }`}
        onClick={() => handleChange(params.current + 1)}>
        {`>`}
      </div>
    </div>
  );
};

export default PaginationNew;
