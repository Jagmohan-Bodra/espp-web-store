import {isArray} from 'validate.js';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardImgOverlay,
} from 'reactstrap';
import {Swipers} from '~/components/public/swiper';
import {getImagePath} from '~/helpers/common';
const classMain = 'mission-vision-values';

const MissionVisionValues = (props) => {
  const [title, description, sliders] = props.data || [];
  const list = sliders?.values?.value || [];
  return (
    <div className={`${classMain}`}>
      <section className={`${classMain}_section_1`}>
        <div className={`container text-center`}>
          <div dangerouslySetInnerHTML={{__html: title?.values?.value}} />
          <div className={`${classMain}_double_mark_bg`} />
          <div
            dangerouslySetInnerHTML={{__html: description?.values?.value}}
            className={`${classMain}_double_mark_text`}
          />
        </div>
      </section>

      <section className={`${classMain}_section_2`}>
        <div className={`container`}>
          <Swipers
            className={`${classMain}_swipers`}
            slidesPerView={[1, 1, 1, 1]}
            spaceBetween={[0, 0, 5, 5]}
            data={
              isArray(list) &&
              list.map((item, index) => (
                <Card key={index} className="border-0">
                  <CardImg
                    className="img-fluid"
                    src={getImagePath(item.image)}
                    alt={item.title}
                  />
                  <CardImgOverlay className={`${classMain}_overlay`}>
                    <CardTitle
                      className={`${classMain}_overlay_title`}
                      tag="h3">
                      {item.title}
                    </CardTitle>
                  </CardImgOverlay>
                  <CardBody>
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

export default MissionVisionValues;
