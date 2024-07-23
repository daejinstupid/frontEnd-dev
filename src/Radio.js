import "./Radio.css";

const Radio = ({ children, value, name, defaultChecked, disabled }) => {
  return (
    <label>
      <input className="radio-class" type="radio" value={value} name={name} defaultChecked={defaultChecked} disabled={disabled}/>
      {children}
    </label>
  );
}

export default Radio;