const texts =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum';
const image = 'https://placeimg.com/640/480/nature/grayscale';
const RemixingaClassic = () => {
  return (
    <div className={`our-story-remixing-a-classic`}>
      <div className={`our-story-remixing-a-classic_container`}>
        <h4 className={`our-story-remixing-a-classic_container_title`}>
          REMIXING A CLASSIC
        </h4>
        <img
          className={`our-story-remixing-a-classic_container_image`}
          width="100%"
          src={image}
          alt="image-our-story-remixing-a-classic"
        />
      </div>
      <div className={`our-story-remixing-a-classic_container`}>
        <p className={`our-story-remixing-a-classic_container_content`}>
          {texts}
        </p>
        <p className={`our-story-remixing-a-classic_container_content`}>
          {texts}
        </p>
        <p className={`our-story-remixing-a-classic_container_content`}>
          {texts}
        </p>
      </div>
    </div>
  );
};

export default RemixingaClassic;
