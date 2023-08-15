import Button from "Components/Common/Button";
import GlobalStyle from "GlobalStyle";
import React from "react";
import styled from "styled-components";
import { Outlet } from "react-router-dom";
import Landing from "Components/Landing";
import SLayout from "Styles/SLayout";

function App() {
  return (
    <SLayout>
      <GlobalStyle />
      <Outlet />
    </SLayout>
  );
}

export default App;
