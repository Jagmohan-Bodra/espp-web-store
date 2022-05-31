const OurStory = (props) => {
  const value = props?.data?.values?.value;
  return (
    <div className={`page-our-story`}>
      <div className={`page-our-story_container container`}>
        <div dangerouslySetInnerHTML={{__html: value}}></div>
        {/* <h2 className={`page-our-story_container_title`}>Our Story</h2>
        <p className={`page-our-story_container_content`}>{text}</p> */}
        {/* <button className={`page-our-story_container_submit`}>READ MORE</button> */}
      </div>
    </div>
  );
};

export default OurStory;
