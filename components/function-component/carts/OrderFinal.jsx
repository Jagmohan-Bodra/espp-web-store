import {Button, Col, Divider, Row, Space, Image} from 'antd';
import Link from 'next/link';
import {CheckIcon} from '../../../lib/icons';
import style from './styles.module.scss';
import PATH from '../../../constants/path-router';

const OrderFinal = () => {
  return (
    <div className={`container`}>
      <div className={style.order_final_header}>
        <CheckIcon
          style={{width: '100px', height: '100px', color: '#57c176'}}
        />
        <div className={style.order_final_header_title}>ORDER SUCCESS</div>
        <div className={style.order_final_header_title}>
          Thank you for your purchare!
        </div>
      </div>
      <Divider style={{margin: '23px 0'}} />
      <div className={style.order_final_body}>
        <div className={style.order_final_body_order_no}>
          Order No: 34322343
        </div>
        <div className={style.order_final_body_group}>
          <div className={style.order_final_body_title}>
            Your Delivery Dates
          </div>
          <div className={style.order_final_body_box}>
            <Space>
              <div>
                <Image className={style.order_final_body_image} />
              </div>
              <div> This is a text </div>
            </Space>
          </div>
          <div className={style.order_final_body_info}>
            <Row style={{justifyContent: 'space-between'}}>
              <Col>
                <div>
                  For more details, track your delivery status under{' '}
                  <span className={style.order_final_body_link}>
                    My Account {'>'} My Order
                  </span>
                </div>
              </Col>
              <Col>
                <Button className={style.button_blue}>View Order</Button>
              </Col>
            </Row>
          </div>
        </div>
        <div className={style.order_final_body_group}>
          <Space>
            <div>
              <Image className={style.order_final_body_image} />
            </div>
            <div>
              {' '}
              A notification about your Order request received has been sent to
              abc@gmail.com{' '}
            </div>
          </Space>
        </div>
      </div>

      <div className={style.order_final_footer}>
        <div className={style.order_final_header_title}>
          Order summary : SGD $$,$$
        </div>
        <div style={{textAlign: 'center', marginTop: '50px'}}>
          <Link href={PATH.PRODUCT_LIST}>
            <Button
              className={style.button_blue}
              style={{height: '40px', width: '150px'}}>
              Shop More
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderFinal;
