import React, { FC, useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "./Common/Button";
import Input from "./Common/SignInput";
import useAPI from "API/API";
interface AuthFormProps {
  isSignUp: boolean;
}

const SignForm: FC<AuthFormProps> = ({ isSignUp }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const api = useAPI();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!isEmailValid || !isPasswordValid) {
      return;
    }

    try {
      if (isSignUp) {
        const response = await api.signup(email, password);
      } else {
        const response = await api.signin(email, password);
      }

      if (isSignUp) {
        navigate("/signin");
      } else {
        navigate("/todolist");
      }
    } catch (error) {
      console.error("Authentication error:", error);
    }
  };

  return (
    <SLayout>
      <STitle>{isSignUp ? "회원가입" : "로그인"}</STitle>
      <form onSubmit={handleSubmit}>
        <Input
          label="이메일"
          labelHtmlFor="email"
          type="email"
          data-testid="email-input"
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setEmail(e.target.value);
            setIsEmailValid(e.target.value.includes("@"));
          }}
          isValid={isEmailValid}
        />
        <Input
          label="비밀번호"
          labelHtmlFor="password"
          type="password"
          data-testid="password-input"
          value={password}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setPassword(e.target.value);
            setIsPasswordValid(e.target.value.length >= 8);
          }}
          isValid={isPasswordValid}
        />

        <SBtnLayout>
          <Button
            $width="90%"
            $fontSize="18px"
            type="submit"
            data-testid={isSignUp ? "signup-button" : "signin-button"}
            $isDisabled={!isEmailValid || !isPasswordValid}
          >
            {isSignUp ? "회원가입" : "로그인"}
          </Button>
          {isSignUp ? (
            <SAlternateButton
              onClick={() => navigate("/signin")}
              $fontSize="14px"
            >
              로그인
            </SAlternateButton>
          ) : (
            <SAlternateButton
              onClick={() => navigate("/signup")}
              $fontSize="14px"
            >
              회원가입
            </SAlternateButton>
          )}
        </SBtnLayout>
      </form>
    </SLayout>
  );
};

const SBtnLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

const SAlternateButton = styled.button<{ $fontSize?: string }>`
  width: 100%;
  background-color: transparent;
  color: black;
  font-size: ${(props) => props.$fontSize || "15px"};
  font-weight: 600;
  border: none;
  cursor: pointer;
`;

const STitle = styled.div`
  font-size: 20px;
  text-align: center;
`;

const SLayout = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 50%;
  border: 1px solid #000;
  border-radius: 5px;
  justify-content: center;
  padding: 35px 0;
`;

export default SignForm;
