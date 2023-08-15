import Button from "Components/Common/Button";
import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import SLayout from "Styles/SLayout";
const Landing = () => {
  const navigate = useNavigate();
  function handleClick() {
    navigate("/signin");
  }
  return (
    <>
      <Button $width="90%" type="button" $fontSize="20px" onClick={handleClick}>
        어서오세요 메모하시겠어요?
      </Button>
    </>
  );
};

export default Landing;
