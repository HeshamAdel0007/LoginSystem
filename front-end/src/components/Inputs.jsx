const Inputs = (props) => {
  const LabelName = props.LabelName;
  const InputClass = props.InputClass;
  const Id = props.Id;
  const Type = props.Type;
  const Placeholder = props.Placeholder;
  const InputValue = props.InputValue;

  return (
    <>
      <label>{LabelName} </label>
      <input
        className={InputClass + " text-black"}
        id={Id}
        type={Type}
        placeholder={Placeholder}
        value={InputValue}
      />
    </>
  );
};
export default Inputs;
