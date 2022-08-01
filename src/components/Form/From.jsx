import { useState, useRef, useEffect } from "react";
import { useClickOutside } from "~/hooks";
import "./From.scss";
import { v4 as uuidv4 } from "uuid";

const FormCheckbox = ({ id, className, checked, onChange }) => {
  return (
    <span className={`${"form-checkbox"} ${className ? className : ""}`}>
      <input
        onChange={() => onChange()}
        type="checkbox"
        id={id}
        checked={checked}
        className={"form-checkbox__input"}
      />
      <span className={"form-checkbox__checkmark"}></span>
    </span>
  );
};

const FormText = ({
  id,
  name,
  placeholder,
  onChange,
  size,
  classNames,
  label,
  error,
  value,
  type
}) => {
  return (
    <div className={`${"form-text"} ${classNames ? classNames : ""} ${size}`}>
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <input
        onChange={onChange}
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        value={value}
        className={"form-text__input"}
      />
      {error && <span className={"form-text__error"}>{error}</span>}
    </div>
  );
};

FormText.defaultProps = {
  size: "md",
  type: 'text'
};

const FormSelect = ({ defaultValue, onChange, classNames, opts, label }) => {
  const [openOpts, setOpenOpts] = useState(false);
  const [selected, setSelected] = useState(defaultValue);

  const selectRef = useRef(null);
  useClickOutside(selectRef, () => setOpenOpts(false));

  const handleSelect = (opt) => {
    setSelected(opt);
    setOpenOpts(false);
    onChange(opt);
  };

  useEffect(() => {
    setSelected(defaultValue)
  }, [defaultValue])

  return (
    <>
      <div ref={selectRef} className={`${"form-select"} ${classNames}`}>
        <label className="form-label">{label}</label>
        <li
          onClick={() => setOpenOpts(!openOpts)}
          className="form-select--selected"
        >
          {selected.name}
        </li>
        <ul className={`form-select__list ${openOpts ? "active" : ""}`}>
          <li
            key={uuidv4()}
            onClick={() => handleSelect({ name: "Trống", value: "" })}
            className="form-select__item"
          >
            Trống
          </li>
          {opts.map((opt) => (
            <li
              key={uuidv4()}
              onClick={() => handleSelect(opt)}
              className="form-select__item"
            >
              {opt.name}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export { FormCheckbox, FormText, FormSelect };
