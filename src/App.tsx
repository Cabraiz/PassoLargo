
import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { db, auth, provider } from "./Firebase/firebase_";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { onAuthStateChanged, signInWithPopup, signInWithRedirect, signOut } from "firebase/auth";

import "./App.css";
import "./pages/LoginHubLocal/login.css";
import "./pages/Mateus/Mateus.css";
import "./pages/Surprise/Surprise.css";

import { NavDropdown } from "react-bootstrap";

import logo from "./assets/icones/logo.svg";
import logoGmail from "./assets/icones/7.svg";

import "react-toastify/dist/ReactToastify.css";


import RegisterHubLocal from "./pages/RegisterHubLocal/Register";
import LoginHubLocal from "./pages/LoginHubLocal/login";
import Hublocal from "./pages/Hublocal/Hublocal";
import Surprise from "./pages/Surprise/Surprise";
import Resume from "./pages/Resume/Resume";
import Doris from "./pages/Doris.mobi/principal";


import { PrivateOutlet } from "./redux/shared/utils/PrivateOutlet";

import Mateus from "./pages/Mateus/Mateus";
import TitleWebsite from "./pages/PrincipalPage/TitleWebsite/title_website";
import { NavLogic, buttonsCornerRight } from "./pages/PrincipalPage/Generico/NavLogic/NavLogic";
//import Firebase from "./pages/Surprise/Surprise";

import { isMobile } from "react-device-detect";

const BUTTON_TEXT_SIGN_IN = "Sign In With Google";
const BUTTON_TEXT_SIGN_OUT = "Sign Out";

function MenuItem({ icon, text, opacity, sizeIcon }: { icon?: React.ReactNode; text: string; opacity?: true; sizeIcon?: string }) {
  return (
    <NavDropdown.Item style={{ display: 'flex', alignItems: 'center', marginBottom: '7px', fontSize: '1.65rem', marginLeft: '9px', opacity: opacity ? 0.5 : undefined }}>
      {icon && React.cloneElement(icon as React.ReactElement, { style: { width: sizeIcon, marginRight: '6px', marginTop: '-0.5px' } })} {text}
    </NavDropdown.Item>
  );
}

const links: string[] = ['Home', 'Portfolio', 'Road Map', 'Pricing', 'Live', 'Contact'];

interface MenuState {
  selectedLink: string;
}

function App() {
  const [windowSize, setWindowSize] = useState(getWindowSize());
  const [signInStatus, setsignInStatus] = useState(["", false]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setsignInStatus(["Sign Out", false]);
      } else {
        setsignInStatus(["Sign In With Google", true]);
      }
    });

    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  function getStringValue(value: any): string {
    return String(value);
  }

  const addTodo = async () => {
    const temp = getStringValue(auth.currentUser?.uid);
    const docRef = doc(db, temp, "bloqueados");
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      if (temp !== undefined) {
        await setDoc(doc(db, temp, "bloqueados"), {
          0: false,
          1: false,
          2: false,
          3: false,
          4: false,
          5: false,
        });
      }
    }
  };

  function getWindowSize() {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
  }

  const SignFirebase = async () => {
    if (!signInStatus[1]) {
      signOut(auth)
        .then(() => {
          window.location.reload();
        })
        .catch((error) => {});
    } else {
      if (!isMobile) {
        signInWithRedirect(auth, provider)
          .then((result: any) => {
            AfterSignIn(true);
          })
          .catch((error) => {
            AfterSignIn(false);
          });
      } else {
        signInWithPopup(auth, provider)
          .then((result: any) => {
            AfterSignIn(true);
          })
          .catch((error) => {
            AfterSignIn(false, error);
          });
      }
    }
  };

  const AfterSignIn = (b: boolean, e?: any) => {
    if (b) {
      addTodo();
    } else {
      const errorMessage = e.message;
      const email = e.customData.email;
    }
  };

  const { pathname } = useLocation();

  const isNavOn =
    pathname === "/hublocal" ||
    pathname === "/loginhublocal" ||
    pathname === "/registerhublocal" ||
    pathname === "/resume" ||
    pathname === "/doris";

  return (
    <>
      <div>
        <TitleWebsite title1="Bem Vindo! 🤝" title2="Cabraiz" />
      </div>
      <NavLogic/>
      <Routes>
        <Route path="/" element={<Mateus />} />

        {/* public routes */}
        <Route path="/registerhublocal" element={<RegisterHubLocal />} />
        <Route path="/loginhublocal" element={<LoginHubLocal />} />
        <Route path="/surprise" element={<Surprise />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/doris" element={<Doris />} />

        <Route path="/hublocal" element={<PrivateOutlet />}>
          {/* protected routes */}
          <Route index element={<Hublocal />} />
        </Route>
      </Routes>
      {!isNavOn && !isMobile ? (
        <div
          style={{
            position: "fixed",
            bottom: "10px",
            right: "10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            marginBottom: "8vh",
            marginRight: "3vw",
          }}
        >
          { buttonsCornerRight }
        </div>
      ) : null}
      <ToastContainer />
        {/*<Button
        style={{
          marginRight: "4vw",
          width: "auto",
          height: "6vh",
          fontSize: "1rem",
          backgroundColor: "white",
          color: "rgba(100, 100, 100)",
          fontWeight: "500",
          borderColor: "white",
        }}
        onClick={SignFirebase}
      >
        <Row className="m-0 ps-0 pe-0" style={{ alignItems: "center" }}>
          <Image
            src={logoGmail}
            style={{
              width: "calc(15px + 0.3vw)",
              margin: "0",
              padding: "0",
              height: "100%",
            }}
          ></Image>
          &nbsp;&nbsp;{signInStatus}
        </Row>
      </Button>
      */}
    </>
  );
}



export default App;
