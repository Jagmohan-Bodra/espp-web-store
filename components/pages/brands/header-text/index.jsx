const HeaderText = (props) => {
  return (
    <div className={`header-text-brands`}>
      <div className={`header-text-brands_container`}>
        {/* <h2 className={`header-text-brands_container_title`}>BRANDS</h2> */}
        <h1 className="common-page-title">BRANDS</h1>
        <div className={`header-text-brands_container_content`}>
          <div
            dangerouslySetInnerHTML={{
              __html: props?.data?.values?.value || '',
            }}></div>
        </div>
      </div>
    </div>
  );
};

export default HeaderText;
