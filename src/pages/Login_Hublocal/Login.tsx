import React, { useRef, useEffect, useState } from "react";

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

import Login_RegisterHubLocal from "../../pages/Login_RegisterHubLocal";

function PasswordInput({
  name,
  onChange,
}: {
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const CFaLock = chakra(FaLock);
  const [showPassword, setShowPassword] = useState(false);

  const handleShowClick = () => setShowPassword(!showPassword);

  return (
    <InputGroup size="md">
      <InputLeftElement
        h="100%"
        pointerEvents="none"
        children={<CFaLock color="gray.300" />}
      />
      <Input
        name={name}
        onChange={onChange}
        id="password"
        required
        className="inputSettings"
        type={showPassword ? "text" : "password"}
        placeholder="Senha"
        style={{ borderColor: "#0385FD", borderWidth: "2px" }}
      />
      <InputRightElement w="auto" height="100%" paddingRight="8px">
        <Button h="70%" size="sm" onClick={handleShowClick}>
          {showPassword ? "Ocultar" : "Mostrar"}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
}

function Login() {
  const CFaUserAlt = chakra(FaUserAlt);

  const [formState, setFormState] = React.useState<LoginRequest>({
    username: "",
    password: "",
  });

  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLInputElement>(null);
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  const [realHeight, setrealHeight] = useState("");

  const [isAnimationSet, setAnimationSet] = useState(false);

  const notifySucesso = () => {
    toast.success("Sucesso!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const notifyError = () => {
    toast.warning("Falha!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  useEffect(() => {
    setAnimationSet(true);
  }, []);

  useEffect(() => {
    if (isMobile) setrealHeight(`${window.innerHeight}px`);
    else {
      setrealHeight("100vh");
    }
  }, [realHeight]);

  useEffect(() => {
    const node = userRef.current;
    node?.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
  };

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) =>
    setFormState((prev) => ({ ...prev, [name]: value }));

  const textoTitle = "Junte-se a vários clientes satisfeitos.";
  const textoSubtitle =
    "Cliente HubLocal ganha mais relevância, autoridade e visibilidade. Mais de 7.000 marcas confiam na nossa plataforma. Seja uma delas!";

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
              <InputGroup className="inputPattern">
                <InputLeftElement
                  h="100%"
                  pointerEvents="none"
                  children={<CFaUserAlt color="gray.300" />}
                />
                <Input
                  onChange={handleChange}
                  name="username"
                  type="text"
                  required
                  className="inputSettings"
                  placeholder="Email"
                  style={{ borderColor: "#0385FD", borderWidth: "2px" }}
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              <Text className="letter-spacing-text poppins-text-label">
                Senha
              </Text>
              <InputGroup className="inputPattern">
                <PasswordInput
                  onChange={handleChange}
                  name="password"
                ></PasswordInput>
              </InputGroup>
            </FormControl>
            <Button
              className="buttonSettings buttonFont"
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
                className="buttonSettings buttonFont"
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
