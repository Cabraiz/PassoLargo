import React, { useRef, useEffect, useState, FormEvent } from "react";

import Login_Logo from "../../assets/HubLocal/Login_Logo.webp";
import Login_Image from "../../assets/HubLocal/Login_Image.webp";

import { ToastContainer, toast } from "react-toastify";

import {
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  FormControl,
  Text,
  InputRightElement,
  Link,
  FormHelperText,
} from "@chakra-ui/react";

import { FaUserAlt, FaLock } from "react-icons/fa";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./Login.css";

import { tokenReceived } from "../../redux/feature/auth/authSlice";
import {
  LoginRequest,
  useLoginMutation,
} from "../../redux/feature/auth/authApiSlice";

import { ProtectedComponent } from "../../redux/feature/auth/ProtectedComponent";
import { isMobile } from "react-device-detect";

import { Login_RegisterHubLocal } from "../../pages/Auxiliadores/Login_RegisterHubLocal";
import { validatePasswordLength } from "../../redux/shared/utils/validation/lenght";
import { validateEmail } from "../../redux/shared/utils/validation/email";
import useInput from "../../redux/hooks/input/use-input";
import { LoginRegisterHubLocalParams } from "../Auxiliadores/models/loginRregisterHubLocal.interface";

function PasswordInput({
  value,
  onChange,
  onBlur,
  error,
  helperText,
}: LoginRegisterHubLocalParams) {

  const CFaLock = chakra(FaLock);
  const [showPassword, setShowPassword] = useState(false);

  const handleShowClick = () => setShowPassword(!showPassword);

  return (
    <Stack w="inherit">
      <InputGroup className="input-pattern">
        <InputLeftElement
          h="100%"
          pointerEvents="none"
          children={<CFaLock color="gray.300" />}
        />
        <Input
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          type={showPassword ? "text" : "password"}
          name="password"
          id="password"
          required
          
          className="input-setting"
          placeholder="Senha"
          style={{ borderColor: "#0385FD", borderWidth: "2px" }}
        />
        <InputRightElement w="auto" h="100%" paddingRight="8px">
          <Button h="70%" size="sm" onClick={handleShowClick}>
            {showPassword ? "Ocultar" : "Mostrar"}
          </Button>
        </InputRightElement>
      </InputGroup>
      {error ? (
      <FormHelperText>
        <Text className="form-helper-font" mb="0">
            {helperText}
        </Text>
      </FormHelperText>
      ) : ""}
    </Stack>
  );
}

function EmailInput({
  value,
  onChange,
  onBlur,
  error,
  helperText,
}: LoginRegisterHubLocalParams) {

  const CFaUserAlt = chakra(FaUserAlt);

  return (
    <Stack w="inherit">
      <InputGroup className="input-pattern">
        <InputLeftElement
            h="100%"
            pointerEvents="none"
            children={<CFaUserAlt color="gray.300" />}
          />
          <Input
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            required

            className="input-setting"
            placeholder="Email"
            style={{ borderColor: "#0385FD", borderWidth: "2px" }}
          />
      </InputGroup>
      {error ? (
      <FormHelperText>
        <Text className="form-helper-font" mb="0">
            {helperText}
        </Text>
      </FormHelperText>
      ) : ""}
    </Stack>
  );
}

function Login() {

  const [login, { isLoading }] = useLoginMutation();

  const [realHeight, setrealHeight] = useState("");

  const [isAnimationSet, setAnimationSet] = useState(false);

  const {
    text: email,
    shouldDisplayError: emailHasError,
    textChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    clearHandler: emailClearHandler,
  } = useInput(validateEmail);

  const {
    text: password,
    shouldDisplayError: passwordHasError,
    textChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    clearHandler: passwordClearHandler,
  } = useInput(validatePasswordLength);

  useEffect(() => {
    setAnimationSet(true);
  }, []);

  useEffect(() => {
    if (isMobile) setrealHeight(`${window.innerHeight}px`);
    else {
      setrealHeight("100vh");
    }
  }, [realHeight]);

  const clearForm = () => {
    emailClearHandler();
    passwordClearHandler();
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors: string[] = [];

    if (
      emailHasError ||
      passwordHasError 
    ){
      errors.push("Preencha campos corretamente");
    }

    if (
      email.length === 0 ||
      password.length === 0
    ){
      errors.push("Preencha todos os campos");
    }

    if (errors.length > 0) {
      ErrorNotify(errors[0]);
      return;
    }

    console.log("USER: ", email, password);

    clearForm()
  };


  const ErrorNotify = (message: string) => toast.warn(message, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });

  const content = isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <>
      <Box minW={{ md: "31vw" }} style={{ marginTop: "0" }}>
        <form onSubmit={handleSubmit}>
          <Stack
            w={{ base: "90vw", md: "auto" }}
            spacing={1}
            backgroundColor="whiteAlpha.900"
            style={{ paddingBottom: "0" }}
          >
            <FormControl>
              <Text className="letter-spacing-text poppins-text-label">
                Email
              </Text>
              <EmailInput
                value={email}
                onChange={emailChangeHandler}
                onBlur={emailBlurHandler}
                error={emailHasError}
                helperText={emailHasError ? "Email inválido" : ""}
              ></EmailInput>
            </FormControl>
            <FormControl>
              <Text className="letter-spacing-text poppins-text-label">
                Senha
              </Text>
              <PasswordInput
                value={password}
                onChange={passwordChangeHandler}
                onBlur={passwordBlurHandler}
                error={passwordHasError}
                helperText={
                  passwordHasError ? "Requer no mínimo 6 caracteres" : ""
                }
              ></PasswordInput>
            </FormControl>
            <Button
              className="button-settings button-font"
              type="submit"
              variant="solid"
              style={{
                backgroundColor: "#0385FD",
                marginTop: "2.5vh",
                marginBottom: "2vh",
                boxShadow: "0px 2px 2px 0px #00000040",
              }}
            >
              <Text
                className="letter-spacing-button poppins-text-button"
                fontSize="larger"
              >
                LOGAR
              </Text>
            </Button>
            <Link href="/registerhublocal" style={{ textDecoration: "none" }}>
              <Button
                className="button-settings button-font"
                variant="solid"
                style={{
                  backgroundColor: "#00CC99",
                  boxShadow: "0px 2px 2px 0px #00000040",
                }}
              >
                <Text
                  className="letter-spacing-button poppins-text-button"
                  fontSize="larger"
                >
                  CRIAR CONTA
                </Text>
              </Button>
            </Link>
          </Stack>
        </form>
      </Box>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );

  return Login_RegisterHubLocal(
    realHeight,
    isAnimationSet,
    Login_Image,
    Login_Logo,
    content
  );
}

export default Login;
