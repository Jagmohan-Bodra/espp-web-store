import {useRouter} from 'next/router';
import {useEffect} from 'react';
import {Row, Col} from 'reactstrap';
import ProductList from './product-list';
import Loading from '~/components/public/loading';
import {parse, stringify} from '~/helpers/queryString';
import MenuLeft from './menu-left';
import MenuTop from './menu-top';
import {treeArray} from '~/helpers/common';

const ShopPage = (props) => {
  const {categories, brands, colors, tags} = props.data || {};
  const router = useRouter();
  const query = router.query || {};
  //const [data, setData] = useState(props.products || []);
  // const [meta, setMeta] = useState([]);
  //const [loading, setLoading] = useState(false);

  useEffect(() => {
    let queryBuilder = parse(router.query) || {};
    delete queryBuilder.reset;
    ///  getList(queryBuilder);
  }, [query]);

  // const getList = (params) => {
  //   setLoading(true);
  //   funcAwait(() =>
  //     getProductList(params)
  //       .then((data) => {
  //         setData(data.data);
  //         setMeta(data.meta);
  //         setLoading(false);
  //       })
  //       .catch(() => setLoading(false)),
  //   );
  // };

  const changeUrlQuery = (data) => {
    router.push(
      {
        query: stringify(data),
      },
      null,
      {shallow: true},
    );
  };

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
    delete data._id;
    delete data.name;
    changeUrlQuery(data);
  };

  const onChangeFilter = (params) => {
    setFilterQueryData({
      meta: {
        page: 1,
      },
      ...params,
    });
  };

  const onPageChange = (page) => {
    setFilterQueryData({
      meta: {page},
    });
  };

  return (
    <div className={`shop-page container`}>
      <h1 className="common-page-title">SHOP</h1>
      <div className={`shop-page_body`}>
        <Loading isLoading={props?.loading}>
          <Row>
            <Col xl={4}>
              <div className={`shop-page_body_menu_left`}>
                <MenuLeft
                  onChange={(obj) => onChangeFilter(obj)}
                  data={[
                    {
                      name: 'Categories',
                      children: treeArray(categories || []),
                    },
                    {
                      name: 'Brands',
                      children: brands,
                    },
                    {
                      name: 'Colors',
                      children: colors,
                    },
                    {
                      name: 'Tags',
                      children: tags,
                    },
                  ]}
                />
              </div>
            </Col>
            <Col xl={8}>
              <div className={`shop-page_body_menu_top`}>
                <MenuTop
                  onChange={(obj) => onChangeFilter(obj)}
                  categories={[
                    {value: '', text: 'CATEGORIES'},
                    ...(categories || []).map((item) => ({
                      value: item.id,
                      text: item.name,
                    })),
                  ]}
                  brands={[
                    {value: '', text: 'BRANDS'},
                    ...(brands || []).map((item) => ({
                      value: item._id,
                      text: item.name,
                    })),
                  ]}
                  colors={[
                    {value: '', text: 'COLORS'},
                    ...(colors || []).map((item) => ({
                      value: item._id,
                      text: item.name,
                    })),
                  ]}
                  meta={props.meta || {}}
                />
              </div>
              <div className={`shop-page_body_menu_top`}>
                <ProductList
                  data={props.products || []}
                  meta={props.meta || {}}
                  onPageChange={onPageChange}
                />
              </div>
              {/* <div className={`shop-page_body_menu_top mt-5`}>
                <MenuBottom
                  onChange={(obj) => onChangeFilter(obj)}
                  meta={meta}
                />
              </div> */}
            </Col>
          </Row>
        </Loading>
      </div>
    </div>
  );
};

export default ShopPage;
