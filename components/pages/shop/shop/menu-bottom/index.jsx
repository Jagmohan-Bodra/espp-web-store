import {useRouter} from 'next/router';
import Select from '~/components/public/select-bootstrap';
import {parse} from '~/helpers/queryString';

const MenuBottom = (props) => {
  const {onChange, meta} = props;
  const {pageSize, page, total} = (meta || {}).paginate || {};
  const from = parseInt(pageSize) * (parseInt(page) - 1) + 1;
  const to = from + parseInt(pageSize) - 1;

  const router = useRouter();
  const queryBuilder = parse(router.query) || {};

  return (
    <div className={`shop-page_menu_top`}>
      <div className={`shop-page_menu_top_on_left`}></div>
      <div className={`shop-page_menu_top_on_right`}>
        <div className={`shop-page_menu_top_on_right_group`}>
          <div className={`shop-page_menu_top_on_right_group_content`}>
            {`Showing ${from || 0} - ${to > parseInt(total) ? total : to} of ${
              total || 0
            } items`}
          </div>
          <Select
            data={[
              {value: 10, text: '10'},
              {value: 15, text: '15'},
              {value: 20, text: '20'},
              {value: 30, text: '30'},
              {value: 50, text: '50'},
            ]}
            value={(queryBuilder.meta || {}).pageSize || 10}
            onChange={(value) =>
              onChange && onChange({meta: {pageSize: value, page: 1}})
            }
          />
        </div>
      </div>
    </div>
  );
};

export default MenuBottom;
