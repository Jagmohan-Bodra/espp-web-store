import React from 'react';
import {useRouter} from 'next/router';
import {Input} from 'reactstrap';
import Select from '~/components/public/select-bootstrap';
import {parse} from '~/helpers/queryString';

const filterPrice = [
  {value: '', text: 'SORT BY'},
  {value: 'publicPrice', text: 'Price Ascending'},
  {value: '-publicPrice', text: 'Price Descending'},
  {value: 'name', text: 'Name A-Z'},
  {value: '-name', text: 'Name Z-A'},
  {value: '-createdAt', text: 'New Arrivals'},
  {value: '-view', text: 'Most Viewed'},
  {value: '-sold', text: 'Top Sellers'},
];

const MenuTop = (props) => {
  const {onChange} = props;
  const router = useRouter();
  const queryBuilder = parse(router.query) || {};

  const onChangeNumber = (e) => {
    onChange && onChange({meta: {pageSize: e.target.value, page: 1}});
  };

  return (
    <div className={`shop-page_menu_top`}>
      <div className={`shop-page_menu_top_on_left`}>
        <div className={`shop-page_menu_top_on_right_group`}>
          <div className={`shop-page_menu_top_on_right_group_content`}>
            <span>Show</span>
          </div>
          <Input
            min={12}
            max={200}
            type="number"
            step="1"
            value={(queryBuilder.meta || {}).pageSize || 12}
            onChange={onChangeNumber}
            className="shop-page_menu_top_on_right_group_select"
          />
        </div>
        {/* <Select
          data={categories}
          value={(queryBuilder['productCategories._id'] || {}).objectId}
          onChange={(value) =>
            onChange &&
            onChange({'productCategories._id': value && {objectId: value}})
          }
        /> */}
        {/* <Select
          data={brands}
          value={(queryBuilder['brands._id'] || {}).objectId}
          onChange={(value) =>
            onChange && onChange({'brands._id': {objectId: value}})
          }
        />
        <Select
          data={colors}
          value={(queryBuilder['colors._id'] || {}).objectId}
          onChange={(value) =>
            onChange && onChange({'colors._id': {objectId: value}})
          }
        /> */}
      </div>
      <div className={`shop-page_menu_top_on_right`}>
        <Select
          data={filterPrice}
          value={((queryBuilder.meta || {}).sort || [])[0]}
          onChange={(value) =>
            onChange &&
            onChange({
              meta: {
                page: 1,
                sort: value && [value],
              },
            })
          }
        />
      </div>
    </div>
  );
};

export default MenuTop;
