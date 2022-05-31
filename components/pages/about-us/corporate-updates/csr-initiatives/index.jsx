import React from 'react';
import {isEmpty} from 'validate.js';
import PostFirst from './post-first';
import PostList from './post-list';
import {getValueVariant} from '~/helpers/common';

const cssClass = 'csr-initiatives-page';

const CsrInitiatives = (props) => {
  const data = props.data || [];
  const posts = props.posts || [];
  const pageTitle = getValueVariant(data, 'csr-initiatives-title');
  const content = getValueVariant(data, 'csr-initiatives-content') || {};
  const postFirst = !isEmpty(posts) && posts[0] ? posts[0] : {};

  return (
    <div className={`${cssClass} container`}>
      <div className={`${cssClass}_content`}>
        <h1 className="common-page-title">{pageTitle || ''}</h1>
        <div dangerouslySetInnerHTML={{__html: content || ''}}></div>
      </div>
      <div className={`${cssClass}_post_first`}>
        <PostFirst post={postFirst} />
      </div>
      <div className={`${cssClass}_wrap_list`}>
        <div className={`${cssClass}_list`}>
          <PostList data={posts} />
        </div>
      </div>
    </div>
  );
};

export default CsrInitiatives;
