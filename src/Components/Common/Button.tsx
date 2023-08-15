// Button.tsx

import React, { ReactNode, ButtonHTMLAttributes } from "react";
import styled from "styled-components";

interface OwnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  $fontSize?: string;
  $width?: string;
  $isDisabled?: boolean;
}

const Button: React.FC<OwnProps> = ({ children, $isDisabled, ...rest }) => {
  return (
    <SButtonLayout $isDisabled={$isDisabled} {...rest}>
      {children}
    </SButtonLayout>
  );
};

const SButtonLayout = styled.button<{
  $fontSize?: string;
  $width?: string;
  $isDisabled?: boolean;
}>`
  width: ${(props) => props.$width || "100%"};

  background-color: ${(props) => (props.$isDisabled ? "#ccc" : "black")};
  padding: 10px 0;
  border-radius: 10px;

  color: white;
  font-size: ${(props) => props.$fontSize || "15px"};
  font-weight: 800;

  transition: all 0.3s;

  &:not(:disabled):hover {
    background-color: ${(props) => (props.$isDisabled ? "#ccc" : "#e9861c")};
  }

  &:not(:disabled):active {
    background-color: ${(props) => (props.$isDisabled ? "#ccc" : "#de7e18")};
    transform: ${(props) => (props.$isDisabled ? "none" : "scale(0.98)")};
  }
`;

export default Button;
