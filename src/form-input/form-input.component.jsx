import "./form-input.styles.scss";

const FormInput = ({ label, ...inputProps }) => {
  return (
    <div className="group">
      {label && (
        <label
          className={`${
            inputProps.value && inputProps.value.length ? "shrink" : ""
          } form-input-label`}
        >
          {label}
        </label>
      )}
      <input className="form-input" {...inputProps} />
    </div>
  );
};

export default FormInput;
