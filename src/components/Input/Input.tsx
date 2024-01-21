import React, { useRef, useState } from "react";
import styles from "./Input.module.scss";
import SvgEyeOpen from "../../assets/svg/ui-eye-open.svg";
import SvgEyeClose from "../../assets/svg/ui-eye-close.svg";

interface IPropsInput
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}

export const EyeInput: React.FC<IPropsInput> = (props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [eyeState, setEyeState] = useState<"password" | "text">("password");
  const hadleClickEye = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setEyeState(eyeState === "text" ? "password" : "text");
  };
  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className={styles.input} onClick={handleClick} {...props}>
      <input type={eyeState} ref={inputRef} {...props} />

      <button className={styles.eye} onClick={(e) => hadleClickEye(e)}>
        {eyeState === "text" ? (
          <img src={SvgEyeClose} alt="Hide" />
        ) : (
          <img src={SvgEyeOpen} alt="Open" />
        )}
      </button>
    </div>
  );
};

const Input: React.FC<IPropsInput> = (props) => {
  return <input className={styles.input} {...props} />;
};

export const InputSimple: React.FC<IPropsInput> = (props) => {
  return <input className={styles.inputSimple} {...props}/>
}

export default Input;
