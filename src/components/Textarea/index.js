import Block from "../Block";
import "./styles.css";

const Textarea = ({ placeholder, value, onChange, rows }) => {
  return (
    <Block>
      <textarea
        className="textarea-input"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={rows}
        required
      />
    </Block>
  );
};

export default Textarea;
