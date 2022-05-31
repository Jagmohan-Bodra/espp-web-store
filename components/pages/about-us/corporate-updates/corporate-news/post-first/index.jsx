import {Row, Col} from 'reactstrap';
import Link from 'next/link';
import moment from 'moment';
import {checkImage} from '~/helpers/common';
const cssClass = 'post-first-corporate-new';

const PostFirst = (props) => {
  const post = props.post || {};

  return (
    <div className={`${cssClass}`}>
      <Row className={`${cssClass}_row`}>
        <Col md={6} sm={12} lassName={`${cssClass}_col_box`}>
          <Link href={`/post/${post.shortCode}`}>
            <a>
              <div
                className={`${cssClass}_col_box_img`}
                style={{
                  backgroundImage: `url(${checkImage(post.imageFullPath)})`,
                }}></div>
            </a>
          </Link>
        </Col>
        <Col md={6} sm={12} lassName={`${cssClass}_col_box`}>
          <div className={`${cssClass}_col_box_text`}>
            <p className={`${cssClass}_col_box_text_date`}>
              {post.createdAt && moment(post.createdA).format('MMMM DD, YYYY')}
            </p>
            <p>
              <Link href={`/post/${post.shortCode}`}>
                <a className={`${cssClass}_col_box_text_title`}>{post.name}</a>
              </Link>
            </p>
            <p className={`${cssClass}_col_box_text_description`}>
              {post.description}
            </p>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default PostFirst;
