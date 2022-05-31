import React from 'react';
const cssClass = 'product-details-cms';

const PrductDetailCMS = (props) => {
  const {title, data} = props;

  // TODO: check cmsVariants.isPublish
  return (
    <div className={`${cssClass}`}>
      <div className={`product-details-cms_container container`}>
        <span className={`product-details-cms_container_title`}>{title}</span>
        <div className={`product-details-cms_container_content`}>
          <div dangerouslySetInnerHTML={{__html: data?.cmsVariants?.content}} />
        </div>
      </div>
    </div>
  );

  // TODO: check cmsVariants.isPublish

  // return data?.cmsVariants?.isPublish ? (
  //   <div className={`${cssClass}`}>
  //     <div className={`product-details-cms_container container`}>
  //       <span className={`product-details-cms_container_title`}>{title}</span>
  //       <div className={`product-details-cms_container_content`}>
  //         <div dangerouslySetInnerHTML={{__html: data?.cmsVariants?.content}} />
  //       </div>
  //     </div>
  //   </div>
  // ) : (
  //   <div></div>
  // );
};

export default PrductDetailCMS;
