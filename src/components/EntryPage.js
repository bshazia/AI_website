import React, { useState, useEffect } from "react";
import styled from "styled-components";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const EntryPopup = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgb(8 9 49 / 50%);
  z-index: 1000;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(0, 162, 255, 0.5);
  width: 400px;
  height: 500px;
  backdrop-filter: blur(10px);
`;

const TabsForm = styled.div`
  display: flex;
  border-bottom: 1px solid #0a40c8;
  margin-bottom: 10px;
  font-size: 1.2rem;
  color: rgb(192, 161, 161);
  width: 100%;
`;

const TabButton = styled.button`
  flex: 1;
  padding: 10px;
  background: transparent;
  cursor: pointer;
  color: ${(props) => (props.active ? "#29e7cd" : "#ccc")};
  font-weight: bold;
  transition: color 0.3s ease;

  &:hover {
    color: #29e7cd;
  }
`;

const FormContainer = styled.div`
  padding: 5%;
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CloseButton = styled.button`
  border: 1px solid #024ef4;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
  color: rgb(221, 224, 226);
  background-color: transparent;
  transition: background-color 0.3s;

  &:hover {
    background-color: rgba(41, 31, 216, 0.2);
  }
`;

const EntryPage = ({ className, onClose, initialView = "login" }) => {
  const [currentView, setCurrentView] = useState(initialView);

  useEffect(() => {
    setCurrentView(initialView);
  }, [initialView]);

  const handleToggle = (view) => {
    setCurrentView(view);
  };

  return (
    <EntryPopup className={className}>
      <TabsForm>
        <TabButton
          active={currentView === "login"}
          onClick={() => handleToggle("login")}
        >
          Log In
        </TabButton>
        <TabButton
          active={currentView === "register"}
          onClick={() => handleToggle("register")}
        >
          Register
        </TabButton>
      </TabsForm>
      <FormContainer>
        {currentView === "login" ? <LoginForm /> : <RegisterForm />}
      </FormContainer>
      <CloseButton onClick={onClose}>Close</CloseButton>
    </EntryPopup>
  );
};

export default EntryPage;
