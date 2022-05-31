import {isArray} from 'validate.js';
import {Row, Col} from 'reactstrap';

const Criteria = (props) => {
  const cols = props?.data?.values?.value || [];
  return (
    <div className={`criteria-corporate-profile`}>
      <Row className={`criteria-corporate-profile_container container`}>
        {isArray(cols) &&
          cols.map((item, index) => (
            <Col
              key={index}
              md={3}
              xs={6}
              className={`criteria-corporate-profile_container_content`}>
              <div
                dangerouslySetInnerHTML={{
                  __html: item?.content || '',
                }}></div>
              {/* <h3
              className={`criteria-corporate-profile_container_content_title-st`}>
              0{index + 1}
            </h3>
            <span
              className={`criteria-corporate-profile_container_content_bold`}>
              {item.title}
            </span>
            <span
              className={`criteria-corporate-profile_container_content_text`}>
              {item.description}
            </span> */}
            </Col>
          ))}
      </Row>
    </div>
  );
};

export default Criteria;
