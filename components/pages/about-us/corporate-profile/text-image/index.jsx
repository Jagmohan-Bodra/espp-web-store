import {Row, Col} from 'reactstrap';

const TextImage = (props) => {
  const [text, image] = props.data || [];
  return (
    <div className={`text-image-corporate-profile container`}>
      <Row className={`text-image-corporate-profile_container`}>
        <Col
          md={6}
          xs={12}
          className={`text-image-corporate-profile_container_left`}>
          <div className={`h-100`}>
            <div dangerouslySetInnerHTML={{__html: text?.values?.value}}></div>
          </div>
          {/* <p className={`text-image-corporate-profile_container_left_content`}>
            {texts}
          </p>
          <p className={`text-image-corporate-profile_container_left_content`}>
            {texts}
          </p>
          <p className={`text-image-corporate-profile_container_left_content`}>
            {texts}
          </p> */}
        </Col>
        <Col
          md={6}
          xs={12}
          className={`text-image-corporate-profile_container_right`}>
          <div className={`h-100`}>
            <img
              className={`text-image-corporate-profile_container_right_image`}
              src={image?.values?.value}
              alt="image-text-image-corporate-profile"
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default TextImage;
