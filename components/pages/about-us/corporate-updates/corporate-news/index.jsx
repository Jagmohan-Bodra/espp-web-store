import React from 'react';
import {isEmpty} from 'validate.js';
import PostFirst from './post-first';
import PostList from './post-list';
import {getValueVariant} from '~/helpers/common';

const cssClass = 'corporate-news-page';

const CorporateNews = (props) => {
  const data = props.data || [];
  const posts = props.posts || [];
  const pageTitle = getValueVariant(data, 'corporate-news-title');
  const content = getValueVariant(data, 'corporate-news-content') || {};
  const listTitle = getValueVariant(data, 'corporate-news-list-tile');
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
        <h2>{listTitle || ''}</h2>
        <div className={`${cssClass}_list`}>
          <PostList data={posts} />
        </div>
      </div>
    </div>
  );
};

export default CorporateNews;
