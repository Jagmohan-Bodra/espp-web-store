import {Row, Col} from 'reactstrap';
import Link from 'next/link';
import moment from 'moment';
import {checkImage} from '~/helpers/common';
const cssClass = 'post-list-csr-initiatives';

const PostList = (props) => {
  const data = props.data || [];

  return (
    <div className={`${cssClass}`}>
      {(data || []).map((item, index) => {
        if (index != 0) {
          return (
            <Row className={`${cssClass}_row`} key={index}>
              <Col md={6} xs={12} className={`${cssClass}_col`}>
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
                </div>
              </Col>
              <Col md={6} xs={12} className={`${cssClass}_col`}>
                <div className={`${cssClass}_col_box`}>
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
            </Row>
          );
        }
      })}
    </div>
  );
};

export default PostList;
