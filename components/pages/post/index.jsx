import React from 'react';
import moment from 'moment';

const cssClass = 'post-details-page';

const PostDetails = (props) => {
  const post = props.post || {};
  return (
    <div className={`${cssClass} container mt-5 pt-5`}>
      <div className={`${cssClass}_title`}>
        <h1 className="text-center">{post.name || ''}</h1>
      </div>
      <div className={`${cssClass}_time`}>
        <p className="text-center">
          {post.createdAt && moment(post.createdA).format('MMMM DD, YYYY')}
        </p>
      </div>
      <div className={`${cssClass}_content`}>
        <div dangerouslySetInnerHTML={{__html: post.content || ''}}></div>
      </div>
    </div>
  );
};

export default PostDetails;
