import {isArray} from 'validate.js';
import {Card, CardImg, CardText, CardBody, CardTitle} from 'reactstrap';
import {Swipers} from '~/components/public/swiper';
import {getImagePath} from '~/helpers/common';
const classMain = 'page-our-journey';

const OurJourney = (props) => {
  const [title, sliders] = props.data || [];
  const list = sliders?.values?.value || [];
  return (
    <div className={`${classMain}`}>
      <section className={`${classMain}_section_1`}>
        <div
          className={`container text-center`}
          dangerouslySetInnerHTML={{__html: title?.values?.value || ''}}
        />
      </section>

      <section className={`${classMain}_section_2`}>
        <div className={`container`}>
          <Swipers
            className={`${classMain}_swipers`}
            slidesPerView={[1, 2, 4, 4]}
            spaceBetween={[20, 35, 35, 35]}
            data={
              isArray(list) &&
              list.map((item, index) => (
                <Card key={index} className="border-0">
                  <CardImg
                    className={`${classMain}_section_2_image`}
                    // width="100%"
                    src={getImagePath(item.image)}
                    alt={item.title}
                  />
                  <CardBody>
                    <CardTitle tag="h5">{item.title}</CardTitle>
                    <CardText>
                      <div dangerouslySetInnerHTML={{__html: item.content}} />
                    </CardText>
                  </CardBody>
                </Card>
              ))
            }
          />
        </div>
      </section>
    </div>
  );
};

export default OurJourney;
