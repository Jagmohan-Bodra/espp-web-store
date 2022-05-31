const OurStoryComponent = (props) => {
  const value = props?.data?.values?.value;
  return (
    <div
      className={`our-story-component container`}
      style={{lineHeight: '2em', padding: '15px'}}>
      {/* <div className={`our-story-component_title`}>title</div> */}
      <div dangerouslySetInnerHTML={{__html: value || ''}}></div>
    </div>
  );
};

export default OurStoryComponent;
