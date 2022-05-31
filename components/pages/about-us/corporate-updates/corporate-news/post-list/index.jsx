import {Row, Col} from 'reactstrap';
import Link from 'next/link';
import moment from 'moment';
import {isArray} from 'validate.js';
import {checkImage} from '~/helpers/common';
const cssClass = 'list-corporate-new';

const ListCorporateNew = (props) => {
  const data = props.data || [];

  return (
    <div className={`${cssClass}`}>
      <Row className={`${cssClass}_row`}>
        {isArray(data) &&
          data.map((item, index) => {
            if (index != 0) {
              return (
                <Col key={index} md={4} xs={12} className={`${cssClass}_col`}>
                  <div className={`${cssClass}_col_box`}>
                    <Link href={`/post/${item.shortCode}`}>
                      <a>
                        <div
                          className={`${cssClass}_col_box_img`}
                          style={{
                            backgroundImage: `url(${checkImage(
                              item.imageFullPath,
                            )})`,
                          }}></div>
                      </a>
                    </Link>
                    <div className={`${cssClass}_col_box_text`}>
                      <p className={`${cssClass}_col_box_text_date`}>
                        {item.createdAt &&
                          moment(item.createdA).format('MMMM DD, YYYY')}
                      </p>
                      <p className={`${cssClass}_col_box_text_title`}>
                        <Link href={`/post/${item.shortCode}`}>
                          <a>{item.name}</a>
                        </Link>
                      </p>
                      <p className={`${cssClass}_col_box_text_description`}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Col>
              );
            }
          })}
      </Row>
    </div>
  );
};

export default ListCorporateNew;
