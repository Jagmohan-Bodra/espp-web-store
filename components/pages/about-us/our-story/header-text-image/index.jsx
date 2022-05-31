const text =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum';
const image = 'https://placeimg.com/640/480/nature/grayscale';
const OurStory = () => {
  return (
    <div className={`header-page-our-story`}>
      <div className={`header-page-our-story_container container`}>
        <h2 className={`header-page-our-story_container_title`}>Our Story</h2>
        <p className={`header-page-our-story_container_content`}>{text}</p>
      </div>
      <img
        className={`header-page-our-story_image`}
        width="100%"
        src={image}
        alt="image-header-our-story"
      />
    </div>
  );
};

export default OurStory;
