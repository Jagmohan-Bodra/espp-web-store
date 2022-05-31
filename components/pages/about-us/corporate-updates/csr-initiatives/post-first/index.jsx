import {Row, Col} from 'reactstrap';
import Link from 'next/link';
import moment from 'moment';
import {checkImage} from '~/helpers/common';
const cssClass = 'post-first-csr-initiatives';

const PostFirst = (props) => {
  const post = props.post || {};

  return (
    <div className={`${cssClass}`}>
      <Row className={`${cssClass}_row`}>
        <Col md={12} sm={12} lassName={`${cssClass}_col_box`}>
          <div className={`${cssClass}_col_box_img`}>
            <Link href={`/post/${post.shortCode}`}>
              <a>
                <img
                  className="img-fluid"
                  src={checkImage(post.imageFullPath)}
                  alt={post.name}
                />
              </a>
            </Link>
          </div>
        </Col>
      </Row>
      <Row className={`${cssClass}_row`}>
        <Col md={6} sm={12} lassName={`${cssClass}_col_box`}>
          <div className={`${cssClass}_col_box_text`}>
            <p className={`${cssClass}_col_box_text_title`}>
              <Link href={`/post/${post.shortCode}`}>
                <a>{post.name}</a>
              </Link>
            </p>
            <p className={`${cssClass}_col_box_text_date`}>
              {post.createdAt && moment(post.createdA).format('MMMM DD, YYYY')}
            </p>
          </div>
        </Col>
        <Col md={6} sm={12} lassName={`${cssClass}_col_box`}>
          <div className={`${cssClass}_col_box_text`}>
            <p className={`${cssClass}_col_box_text_description`}>
              {post.description}
            </p>
            <p className={`${cssClass}_col_box_text_link`}>
              <Link href={`/post/${post.shortCode}`}>
                <a>{'See more >>>'}</a>
              </Link>
            </p>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default PostFirst;
