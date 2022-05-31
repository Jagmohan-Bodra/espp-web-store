const Steps = (props) => {
  const {step} = props;
  return (
    <div className={`component-steps`}>
      <div className={`component-steps_container`}>
        <div
          className={
            step === 'STEP_1'
              ? `component-steps_container_number_active`
              : `component-steps_container_number_inactive`
          }>
          <span
            className={
              step === 'STEP_1'
                ? `component-steps_container_number_active_span`
                : `component-steps_container_number_inactive_span`
            }>
            1
          </span>
        </div>
        <div className={`component-steps_container_description`}>
          <span className={`component-steps_container_description_span`}>
            Account Detail
          </span>
        </div>
      </div>
      <div className={`component-steps_container_inline`} />
      <div className={`component-steps_container`}>
        <div
          className={
            step === 'STEP_2'
              ? `component-steps_container_number_active`
              : `component-steps_container_number_inactive`
          }>
          <span
            className={
              step === 'STEP_2'
                ? `component-steps_container_number_active_span`
                : `component-steps_container_number_inactive_span`
            }>
            2
          </span>
        </div>
        <div className={`component-steps_container_description`}>
          <span className={`component-steps_container_description_span`}>
            Profile Detail
          </span>
        </div>
      </div>
    </div>
  );
};

export default Steps;
