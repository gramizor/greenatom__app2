import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import styles from "./Input.module.scss";
import SvgEyeOpen from "../../assets/svg/ui-eye-open.svg";
import SvgEyeClose from "../../assets/svg/ui-eye-close.svg";
import { inputfilestore } from "../../store/components/inputfile.store";
import { isEmpty } from "lodash";

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

export const InputFile: React.FC<IPropsInput> = (props) => {

  const [docxFile, setDocxFile] = useState<File | null>(null);

  const handleDocxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedDocx = event.target.files?.[0];
    if (selectedDocx) {
      setDocxFile(selectedDocx);
      const reader = new FileReader();
      reader.onloadend = () => {
        // console.log(reader.result);
        inputfilestore.set(props.name || "default", reader.result);
      };
      reader.readAsDataURL(selectedDocx);
    }
  };

  useEffect(() => {
    return () => {
      inputfilestore.rm(props.name || "default");
    }
  }, [])

  return <Input {...props} type="file" onChange={(e) => handleDocxChange(e)}/>
}

export const InputSimple: React.FC<IPropsInput> = (props) => {
  return <input className={styles.inputSimple} {...props}/>
}

export default Input;
