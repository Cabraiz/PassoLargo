
import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { db, auth, provider } from "./Firebase/firebase_";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { onAuthStateChanged, signInWithPopup, signInWithRedirect, signOut } from "firebase/auth";
import { LiaClipboardListSolid } from 'react-icons/lia';
import { BsChatDots } from 'react-icons/bs'; 
import { AiOutlineCreditCard } from 'react-icons/ai'; 
import { RiCoupon3Line } from 'react-icons/ri'; 


import "./App.css";
import "./pages/LoginHubLocal/login.css";
import "./pages/Mateus/Mateus.css";
import "./pages/Surprise/Surprise.css";

import { NavDropdown, Navbar, Image, Button, Nav } from "react-bootstrap";

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
import LiveAnimation from "./pages/PrincipalPage/Animation/live_animation";
import TitleWebsite from "./pages/PrincipalPage/TitleWebsite/title_website";
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

function App() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [windowSize, setWindowSize] = useState(getWindowSize());
  const [signInStatus, setsignInStatus] = useState(["", false]);
  const [selectedLink, setSelectedLink] = useState("Home");
  const links = ["Home", "Portfolio", "Road Map", "Pricing","Live", "Contact"];

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

  const convertMultiplyVwToPx = () => {
    return (windowSize.innerWidth / 100) * 14;
  };

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

  const createButton = (buttonNumber: number, selected: boolean) => (
    <Button
      key={buttonNumber}
      variant="primary"
      size="sm"
      style={{
        width: selected ? "23px" : "",
        height: selected ? "22px" : "12px",
        marginRight: selected ? "-2px" : "",
        marginBottom: selected ? "2.5vh" : "3vh",
        transform: selected ? "" : "rotate(45deg) scaleX(0.7)",
        transformOrigin: selected ? "" :  "center",
        backgroundColor: selected ? "#00000000" : "#9b59b6",
        borderColor: selected ? "#9b59b6" : "#00000000",
        borderWidth: selected ? "3px" : "",
        borderRadius: "1px",
      }}
      // onClick={handleButtonClick(buttonNumber)}
    ></Button>
  );

  const buttons = Array.from({ length: links.length }).map((_, index) =>
    createButton(index + 1, links[index] === selectedLink),
  );

  const { pathname } = useLocation();

  const isNavOn =
    pathname === "/hublocal" ||
    pathname === "/loginhublocal" ||
    pathname === "/registerhublocal" ||
    pathname === "/resume" ||
    pathname === "/doris";

  const handleLinkClick =
    (link: string) =>
    (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      event.preventDefault();
      setSelectedLink(link);
    };

  
  return (
    <>
      <div>
        <TitleWebsite title1="Bem Vindo! 🤝" title2="Cabraiz" />
      </div>
      {isNavOn ? null : (
        <Navbar
          className="border-gradient-green"
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            height: "11vh",
            fontWeight: "600",
            paddingTop: "0px",
            paddingBottom: "0px",
            marginInline: "0px",
            marginTop: "0.1vh",
            marginBottom: "0",
          }}
        >
          <Navbar>
            <Image
              src={logo}
              style={{
                marginLeft: `${convertMultiplyVwToPx()}px`,
                marginRight: "4vw",
                marginTop: "0.5vh",
                borderRadius: "20%",
                width: "8.5vh",
                height: "8.5vh",
              }}
            />
            {!isMobile ? (
              // Render Nav element and Nav.Link elements for non-mobile devices
              <>
                <Nav id="nav-dropdown" style={{ display: 'inline-flex', alignItems: 'start', marginRight: '0', paddingRight: '0' }}>
                  {links.map((link) => (
                    <Nav.Link
                      key={link}
                      className={`text-nowrap nav-link-custom ${
                        selectedLink === link ? "active" : ""
                      }`}
                      href={`#${link.toLowerCase()}`}
                      onClick={handleLinkClick(link)}
                    > 
                    {link === "Live" && (
                      <div className="live-container">
                        <span className="live-img">
                          <LiveAnimation />
                        </span>
                        {link}
                      </div>
                    )}
                    {link !== "Live" && <span>{link}</span>}
                  </Nav.Link>
                  ))}
                
                </Nav>
                
                
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
            ) : null}
          </Navbar>
          <Nav>
            <NavDropdown
            title={
              <span style={{ color: '#313131EE' }}>
                Olá, Usuário <br></br>
                <b>Minha Conta</b>
              </span>
            }
            style={{
              alignItems: 'end',
              marginRight: `${convertMultiplyVwToPx()}px`,
              fontSize: 'calc(14px + 0.4vw)',
            }} 
            show={showDropdown}
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
            >
              <NavDropdown.Item style={{ marginTop: '13px', marginBottom: '13px' }}>
                Usuario
              </NavDropdown.Item>
              <NavDropdown.Divider style={{ marginInline: '22px', opacity: 0.5, marginTop: '13px', marginBottom: '13px' }}/>
                <MenuItem icon={<LiaClipboardListSolid />} text="My Orders" sizeIcon= '18px' />
                <MenuItem icon={<BsChatDots />} text="Message Center" sizeIcon= '16px' />
                <MenuItem icon={<AiOutlineCreditCard />} text="Payment" sizeIcon= '16px'/>
                <MenuItem icon={<RiCoupon3Line />} text="My Coupons" sizeIcon= '16px'/>
                <NavDropdown.Divider style={{ marginInline: '22px', opacity: 0.5, marginTop: '13px', marginBottom: '13px' }}/>
                <MenuItem text="Buyer Protection" opacity = {true} />
                <MenuItem text="Help Center" opacity = {true}  />
                <MenuItem text="Accessibility" opacity = {true}  />
            </NavDropdown>
          </Nav>
        </Navbar>
      )}
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
          {buttons}
        </div>
      ) : null}
      <ToastContainer />
    </>
  );
}

export default App;
