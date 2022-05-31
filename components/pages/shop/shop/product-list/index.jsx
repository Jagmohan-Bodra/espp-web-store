import {Col, Row} from 'reactstrap';
import ProductCard from '~/components/public/CardProduct/ProductCard';
import PaginationNew from '~/components/public/pagination-new';

const ProductList = (props) => {
  const {data, meta, onPageChange} = props;
  return (
    <div className={`shop-page_product`}>
      <div className={`shop-page_product_list`}>
        <Row>
          {(data || []).map((item, index) => (
            <Col
              xl={4}
              xs={6}
              className={`shop-page_product_list_item`}
              key={index}>
              <ProductCard item={item} />
            </Col>
          ))}
        </Row>
      </div>
      <div className={`shop-page_product_meta`}>
        <PaginationNew
          current={((meta || {}).paginate || {}).page}
          pageSize={((meta || {}).paginate || {}).pageSize}
          total={((meta || {}).paginate || {}).total}
          onChange={(page) => onPageChange && onPageChange(page)}
        />
      </div>
    </div>
  );
};

export default ProductList;
