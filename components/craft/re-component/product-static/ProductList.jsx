import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import {getPageFilter, parse, stringify} from '../../../../helpers/queryString';
import {getBrandList} from '../../../../lib/services/brand';
import {getCategoryList} from '../../../../lib/services/category';
import {getColorList} from '../../../../lib/services/color';
import {getProductList} from '../../../../lib/services/product';
import CardProduct, {Card} from '../../../public/CardProduct';
import MennuList from '../../../public/MenuList';
import PaganitionBlock from '../../../public/Pagination';
import SelectBlock from '../../../public/Select';
import {isEmpty} from 'validate.js';
import styles from './styles.module.scss';
import {Space, Spin} from 'antd';
import {getTagList} from '../../../../lib/services/tag';
import SelectMultiple from '../../../public/Select/SelectMultiple';
import InputBlock from '../../../public/input-block';

const ProductList = () => {
  const router = useRouter();
  const query = router.query || {};
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [meta, setMeta] = useState([]);
  const [category, setCategory] = useState([]);
  const [brand, setBrand] = useState([]);
  const [color, setColor] = useState([]);
  const [tag, setTag] = useState([]);
  const [filterTag, setFilterTag] = useState('');
  const [filterName, setFilterName] = useState('');
  const [filterSort, setFilterSort] = useState('');
  const [filterColor, setFilterColor] = useState('');
  const [filterBrand, setFilterBrand] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterPageSize, setFilterPageSizeColor] = useState('');
  const [viewAll, setViewAll] = useState('');

  const getDataViewAll = () => {
    let newData;
    switch (viewAll) {
      case 'productCategories':
        newData = category;
        break;
      case 'brands':
        newData = brand;
        break;
      case 'colors':
        newData = color;
        break;
      default:
        newData = [];
    }
    return newData;
    // const page = parseInt((meta.paginate || {}).page || 1);
    // return newData.slice((page  - 1) * 10, page * 10);
  };

  const filterPrice = [
    {key: 'ASCENDING', name: 'Price Ascending'},
    {key: 'DESCENDING', name: 'Price Descending'},
    {key: 'name', name: 'Name A-Z'},
    {key: '-name', name: 'Name Z-A'},
  ];

  const filterPage = [
    {key: '50', name: '50'},
    {key: '100', name: '100'},
  ];

  const changeUrlQuery = (data) => {
    if (data.id) {
      router.push({
        query: stringify({...data, id: data.id.join('/')}),
      });
      return;
    }
    router.push({
      query: stringify({...data, id: 'products'}),
    });
  };

  useEffect(() => {
    let queryBuilder = parse(router.query) || {};
    delete queryBuilder.reset;
    const {pageSize} = queryBuilder.meta || {};
    setFilterColor((queryBuilder.colors || {}).in);
    setFilterCategory((queryBuilder.productCategories || {}).in);
    setFilterBrand((queryBuilder.brands || {}).in);
    setFilterTag((queryBuilder.tags || {}).in);
    setFilterName((queryBuilder.name || {}).regex || '');
    setFilterSort(((queryBuilder.meta || {}).sort || [])[0]);
    setFilterPageSizeColor(pageSize == '10' ? undefined : pageSize);
    // setMeta(queryBuilder.meta ? queryBuilder.meta : meta);
    setViewAll(queryBuilder.viewAll);
    getList({
      ...queryBuilder,
    });
  }, [query]);

  const setFilterQueryData = (value = {}) => {
    const queryBuilder = parse(router.query);
    const data = {
      ...queryBuilder,
      ...value,
      meta: {
        ...(queryBuilder.meta || {}),
        ...(value.meta || {}),
      },
    };
    delete data.viewAll;
    changeUrlQuery(data);
  };

  useEffect(() => {
    getCategoryList({meta: {pageSize: 1000}}).then((data) => setCategory(data));
    getBrandList({meta: {pageSize: 1000}}).then((data) => setBrand(data));
    getColorList({meta: {pageSize: 1000}}).then((data) => setColor(data));
    getTagList({meta: {pageSize: 1000}}).then((data) => setTag(data));
  }, []);

  const getList = (params) => {
    setLoading(true);
    return getProductList(params)
      .then((data) => {
        setData(data.data);
        setMeta(data.meta);
        setLoading(false);
      })
      .catch(() => setLoading(false));
    // setMeta(await getProductList(params).then((data) => data.meta));
  };

  const onChangeFilter = (params) => {
    setFilterQueryData({
      meta: {page: '1'},
      ...params,
    });
  };

  const onPageChange = (page) => {
    setFilterQueryData({
      ...getPageFilter(page),
    });
  };

  const hanldeViewAll = (key) => {
    changeUrlQuery({
      viewAll: key,
      // meta: {
      //   paginate: {
      //     pageSize: 10,
      //     page: 1,
      //   }
      // }
    });
  };

  return (
    <div className={`empty-component craft-block`}>
      <Spin spinning={loading}>
        <div className={`container`}>
          <div className={styles.containerMain}>
            <div className={styles.menuLeft}>
              <MennuList
                name="Category"
                value={filterCategory}
                data={category}
                onChange={(value) =>
                  onChangeFilter({productCategories: {in: value}})
                }
                viewAll={() => hanldeViewAll('productCategories')}
              />
              <MennuList
                name="Brand"
                value={filterBrand}
                data={brand}
                onChange={(value) => onChangeFilter({brands: {in: value}})}
                viewAll={() => hanldeViewAll('brands')}
              />
              <MennuList
                name="Color"
                value={filterColor}
                data={color}
                onChange={(value) => onChangeFilter({colors: {in: value}})}
                viewAll={() => hanldeViewAll('colors')}
              />
            </div>
            <div className={styles.listRight}>
              {!viewAll && (
                <div className={styles.selectBox}>
                  <InputBlock
                    value={filterName}
                    onChange={(e) =>
                      onChangeFilter({name: {regex: e.target.value}})
                    }
                    className={styles.input_block}
                  />
                  <SelectMultiple
                    value={filterTag}
                    onChange={(value) =>
                      onChangeFilter({tags: value && {in: value}})
                    }
                    data={tag}
                    placeholder={`TAGS`}
                    style={{minWidth: '100%', marginBottom: '15px'}}
                  />
                  <Space size={`small`}>
                    <SelectBlock
                      value={filterSort}
                      onChange={(value) =>
                        onChangeFilter({meta: {sort: value && [value]}})
                      }
                      data={filterPrice}
                      placeholder={`SORT BY`}
                      style={{width: '130px'}}
                    />
                    <SelectBlock
                      value={filterCategory}
                      onChange={(value) =>
                        onChangeFilter({
                          productCategories: value && {in: value},
                        })
                      }
                      data={category}
                      placeholder={`CATEGORIES`}
                      style={{minWidth: '130px'}}
                    />
                    <SelectBlock
                      value={filterBrand}
                      onChange={(value) =>
                        onChangeFilter({brands: value && {in: value}})
                      }
                      data={brand}
                      placeholder={`BRANDS`}
                      style={{minWidth: '130px'}}
                    />
                    <SelectBlock
                      value={filterColor}
                      onChange={(value) =>
                        onChangeFilter({colors: value && {in: value}})
                      }
                      data={color}
                      placeholder={`COLORS`}
                      style={{minWidth: '130px'}}
                    />
                    <SelectBlock
                      value={filterPageSize}
                      onChange={(value) =>
                        onChangeFilter({
                          meta: {page: '1', pageSize: value ? value : 10},
                        })
                      }
                      data={filterPage}
                      placeholder={`SHOW`}
                      style={{minWidth: '130px'}}
                    />
                  </Space>
                </div>
              )}
              <div className={styles.listRightProduct}>
                {!viewAll &&
                  (data || []).map((item, index) => (
                    <CardProduct
                      key={index}
                      name={item.name}
                      image={!isEmpty(item.images[0]) ? item.images[0] : ''}
                      url={item.url}
                      id={item._id}
                      data={item}
                      checkCompares={
                        !isEmpty(localStorage[item._id]) ? true : false
                      }
                    />
                  ))}
                {viewAll &&
                  getDataViewAll().map((item, index) => (
                    <Card
                      key={index}
                      name={item.name}
                      image={item.image}
                      onClick={() =>
                        onChangeFilter({[viewAll]: {in: item._id}})
                      }
                    />
                  ))}
              </div>
              <div className={styles.paganition}>
                {!viewAll && (
                  <PaganitionBlock
                    pageSize={parseInt(((meta || {}).paginate || {}).pageSize)}
                    current={
                      ((meta || {}).paginate || {}).page
                        ? parseInt(((meta || {}).paginate || {}).page)
                        : 1
                    }
                    total={((meta || {}).paginate || {}).total}
                    onChange={onPageChange}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </Spin>
    </div>
  );
};

ProductList.craft = {
  displayName: 'ProductList',
};

export default ProductList;
