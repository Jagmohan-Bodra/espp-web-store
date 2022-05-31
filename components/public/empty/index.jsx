import {EmptyIcon} from '~/lib/icons';

const Empty = (props) => {
  const {description, children} = props;
  return (
    <div className={`empty-component`}>
      <div className={`empty-component_icon`}>
        <EmptyIcon />
      </div>
      <div className={`empty-component_description`}>
        {description ? description : `No Data`}
      </div>
      {children && <div className={`empty-component_footer`}>{children}</div>}
    </div>
  );
};

export default Empty;
