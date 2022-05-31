import Link from 'next/link';
const cssClass = 'component-post-cart';

const PostCard = (props) => {
  const {name, description, imageFullPath, shortCode} = props.item || {};
  const link = `/post/${shortCode}`;
  return (
    <div className={`${cssClass}`}>
      <div className={`${cssClass}_image_group`}>
        <Link href={link}>
          <a title={name}>
            <img
              className={`${cssClass}_image_group_img`}
              src={imageFullPath}
              alt={name}
            />
          </a>
        </Link>
      </div>

      <div className={`${cssClass}_content_group`}>
        <div className={`${cssClass}_content_group_name`}>
          <Link href={link}>
            <a title={name}>{name}</a>
          </Link>
        </div>
        <div className={`${cssClass}_content_group_description`}>
          <span className={`${cssClass}_content_group_description_span`}>
            {description}
          </span>
        </div>
        <div className={`${cssClass}_content_group_read_more`}>
          <Link href={link}>
            <a title={name} className={`${cssClass}_content_group_read_more_a`}>
              READ MORE
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
