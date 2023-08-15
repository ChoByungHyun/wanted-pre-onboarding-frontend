import React, { FC, HTMLProps } from "react";
import styled from "styled-components";

interface InputProps extends HTMLProps<HTMLInputElement> {
  label: string;
  labelHtmlFor: string;
  isValid?: boolean;
}

const Input: FC<InputProps> = ({ label, labelHtmlFor, isValid, ...props }) => {
  let errorMessage = "";
  if (!isValid) {
    errorMessage =
      label === "이메일"
        ? "이메일에는 @가 붙어야합니다."
        : "비밀번호는 8자리 이상이어야합니다.";
  }

  return (
    <SInputForm>
      <label htmlFor={labelHtmlFor}>{label}</label>
      <SInputStyle {...props} />
      {errorMessage && <SErrorMessage>{errorMessage}</SErrorMessage>}
    </SInputForm>
  );
};

const SErrorMessage = styled.div`
  color: red;
  font-size: 12px;
  margin-top: 5px;
`;
const SInputForm = styled.div`
  display: flex;
  flex-direction: column;
  color: gray;
  margin: 16px 34px;
  font-size: 12px;
  label {
    color: gray;
  }
`;

const SInputStyle = styled.input`
  border: none;
  outline: none;
  border-bottom: 1px solid gray;
  padding: 5px 0;
  color: black;
  font-size: 14px;
  &:focus {
    transition: all 0.5s;
    border-bottom: 1px solid orange;
  }
  &::placeholder {
    color: gray;
  }
`;

export default Input;
