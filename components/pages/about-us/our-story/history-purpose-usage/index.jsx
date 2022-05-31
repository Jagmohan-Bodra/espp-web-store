const texts =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum';
const text =
  '“Lorem ipsum began as scrambled, nonsensical Latin derived from Cicero’s 1st-century BC text De Finibus Bonorum et Malorum”.';
const HistoryPurposeUsage = () => {
  return (
    <div className={`our-story-history-purpose-usage`}>
      <div className={`our-story-history-purpose-usage_container container`}>
        <h4 className={`our-story-history-purpose-usage_container_title`}>
          HISTORY, PURPOSE AND USAGE
        </h4>
        <p className={`our-story-history-purpose-usage_container_content`}>
          {texts}
        </p>
        <p className={`our-story-history-purpose-usage_container_content`}>
          {texts}
        </p>
        <p className={`our-story-history-purpose-usage_container_content`}>
          {texts}
        </p>
      </div>
      <div className={`our-story-history-purpose-usage_container_bold`}>
        <span className="our-story-history-purpose-usage_container_bold_content">
          {text}
        </span>
      </div>
    </div>
  );
};

export default HistoryPurposeUsage;
