const HeaderText = (props) => {
  const [title, description, content] = props.data || [];
  return (
    <div className={`header-page-corporate-profile container`}>
      <div className={`header-page-corporate-profile_container`}>
        <div
          dangerouslySetInnerHTML={{__html: title?.values?.value || ''}}></div>
        {/* <h2 className={`header-page-corporate-profile_container_title`}>
          CORPORATE PROFILE
        </h2> */}
        <div className={`header-page-corporate-profile_container_bold`}>
          <div
            dangerouslySetInnerHTML={{
              __html: description?.values?.value || '',
            }}></div>
          {/* <span
            className={`header-page-corporate-profile_container_bold_content`}>
            5 Decades.
          </span>
          <span
            className={`header-page-corporate-profile_container_bold_content`}>
            Same Passion
          </span> */}
        </div>
      </div>
      <div className={`header-page-corporate-profile_container_content`}>
        <div
          dangerouslySetInnerHTML={{
            __html: content?.values?.value || '',
          }}></div>
        {/* <p className={`header-page-corporate-profile_container_content_text`}>
          {texts}
          
        </p>
        <p className={`header-page-corporate-profile_container_content_text`}>
          {text}
        </p> */}
      </div>
    </div>
  );
};

export default HeaderText;
