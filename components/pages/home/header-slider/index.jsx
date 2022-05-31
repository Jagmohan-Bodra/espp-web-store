import {isArray} from 'validate.js';
import {Button} from 'reactstrap';
import {Swipers} from '~/components/public/swiper';

const HeaderSlider = (props) => {
  const data = props?.data?.values?.value || [];
  return (
    <div className={`home-header-slider`}>
      <Swipers
        className={`home-header-slider_swiper`}
        navigation={false}
        pagination
        data={
          isArray(data) &&
          data.map((item, index) => (
            <div className={`home-header-slider_swiper_item`} key={index}>
              <img
                className={`home-header-slider_swiper_item_image`}
                width="100%"
                src={item.imageFullPath}
              />
              <div className="home-header-slider_swiper_item_content">
                <div dangerouslySetInnerHTML={{__html: item.content}}></div>
                <a href={item.url} style={{textAlign: 'center'}}>
                  <Button className="home-header-slider_swiper_item_content_submit">
                    See More
                  </Button>
                </a>
              </div>
            </div>
          ))
        }
      />
    </div>
  );
};

export default HeaderSlider;
