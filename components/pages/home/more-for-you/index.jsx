import {isArray} from 'validate.js';
import PostCard from '~/components/public/post-card';
import {Swipers} from '~/components/public/swiper';

const MoreForYou = (props) => {
  const posts = props?.posts || [];
  return (
    <div className={`home-more-for-you`}>
      <div className={`home-more-for-you_title`}>
        <h2>More For You</h2>
      </div>
      <div className={`container`}>
        <Swipers
          className={`home-more-for-you_swiper`}
          slidesPerView={[1, 1, 2, 2]}
          spaceBetween={[0, 0, 80, 80]}
          data={
            isArray(posts) &&
            posts.map((item, index) => <PostCard item={item} key={index} />)
          }
        />
      </div>
    </div>
  );
};

export default MoreForYou;
