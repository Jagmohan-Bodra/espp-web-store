import {Row, Col} from 'reactstrap';

const texts =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum';
const text =
  '“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute…”';
const image = 'https://placeimg.com/640/480/nature/grayscale';
const HedonistRoots = () => {
  return (
    <div className={`our-story-hedonist-roots`}>
      <Row className={`our-story-hedonist-roots_container`}>
        <Col
          md={6}
          xs={12}
          className={`our-story-hedonist-roots_container_left`}>
          <h4 className={`our-story-hedonist-roots_container_left_title`}>
            HEDONIST ROOTS
          </h4>
          <p className={`our-story-hedonist-roots_container_left_content`}>
            {texts}
          </p>
          <p className={`our-story-hedonist-roots_container_left_content`}>
            {texts}
          </p>
          <p className={`our-story-hedonist-roots_container_left_content`}>
            {texts}
          </p>
        </Col>
        <Col
          md={6}
          xs={12}
          className={`our-story-hedonist-roots_container_right`}>
          <img
            className={`our-story-hedonist-roots_container_right_image`}
            width="100%"
            src={image}
            alt="image-our-story-hedonist-roots"
          />
        </Col>
        <div className={`our-story-hedonist-roots_container_bold`}>
          <span className="our-story-hedonist-roots_container_bold_content">
            {text}
          </span>
        </div>
      </Row>
    </div>
  );
};

export default HedonistRoots;
