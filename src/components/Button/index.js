import Block from "../Block";
import styles from "./styles.css";

const Button = ({ children, btn, type, onClick }) => {
  const buttonType = btn || "default";
  const buttonClass = "button " + buttonType;

  return (
    <Block>
      <button className={buttonClass} type={type} onClick={onClick}>
        {children}
      </button>
    </Block>
  );
};

export default Button;
