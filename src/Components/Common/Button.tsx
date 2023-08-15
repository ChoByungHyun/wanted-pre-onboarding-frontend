import React, { ReactNode, ButtonHTMLAttributes } from "react";
import styled from "styled-components";

interface OwnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  $fontSize?: string;
  $width?: string;
}

const Button: React.FC<OwnProps> = ({ children, ...rest }) => {
  return <SButtonLayout {...rest}>{children}</SButtonLayout>;
};

const SButtonLayout = styled.button<{
  $fontSize?: string;
  $width?: string;
}>`
  width: ${(props) => props.$width || "100%"};

  background-color: black;
  padding: 10px 0;
  border-radius: 10px;

  color: white;
  font-size: ${(props) => props.$fontSize || "15px"};
  font-weight: 800;

  transition: all 0.3s;

  &:hover {
    background-color: #e9861c;
  }

  &:active {
    background-color: #de7e18;
    transform: scale(0.98);
  }
`;

export default Button;
