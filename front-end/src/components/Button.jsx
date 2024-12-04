const Button = (props) => {
  const ButtonName = props.ButtonName;
  const ButtonType = props.ButtonType;
  const ButtonClass = props.ButtonClass;
  const ButtonValue = props.ButtonValue;

  return (
    <>
      <button type={ButtonType} className={ButtonClass} value={ButtonValue}>
        {ButtonName}
      </button>
    </>
  );
};
export default Button;
