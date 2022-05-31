const Table = (props) => {
  const {columns, dataSource, onRowClick} = props;
  return (
    <div className={`table-component table-responsive-xl`}>
      <table className="table">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th scope="col" key={index}>
                {column.title || ''}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataSource.map((data, index) => (
            <tr
              key={index}
              onClick={() => onRowClick && onRowClick(data)}
              className={`table-component-tr`}>
              {columns.map((column, cIndex) => (
                <td scope="col" key={cIndex}>
                  {column.render(data[column.dataIndex], data, index)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
