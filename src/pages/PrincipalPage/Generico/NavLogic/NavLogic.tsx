
import React, { useState, Dispatch, SetStateAction } from "react";
import { LiaClipboardListSolid } from 'react-icons/lia';
import { BsChatDots } from 'react-icons/bs'; 
import { AiOutlineCreditCard } from 'react-icons/ai'; 
import { RiCoupon3Line } from 'react-icons/ri';
import { convertMultiplyVwToPx } from '../utils';
import LiveAnimation from "../../Animation/live_animation";
import { MenuState, handleLinkClick  } from './LocalMenuState';
import { useMenuState } from './NavContext';


import "./NavLogic.css";

import { NavDropdown, Navbar, Image, Button, Nav } from "react-bootstrap";

import logo from "../../../../assets/icones/logo.svg";

import "react-toastify/dist/ReactToastify.css";
//import Firebase from "./pages/Surprise/Surprise";

import { isMobile } from "react-device-detect";
import { useLocation, useNavigate } from "react-router-dom";


interface ButtonsCornerRightProps {
  menuState: MenuState;
  handleLinkClick: (link: string) => void;
  links: string[];
  updateMenuState: Dispatch<SetStateAction<MenuState>>;
}

interface NavLogicProps {
  isMobile: boolean;
  links: string[];
  logo: string; // Certifique-se de importar a imagem do logo
}

function MenuItem({ icon, text, opacity, sizeIcon }: { icon?: React.ReactNode; text: string; opacity?: true; sizeIcon?: string }) {
  return (
    <NavDropdown.Item style={{ display: 'flex', alignItems: 'center', marginBottom: '-5px', fontSize: '1.65rem', marginLeft: '9px', opacity: opacity ? 0.5 : undefined }}>
      {icon && React.cloneElement(icon as React.ReactElement, { style: { width: sizeIcon, marginRight: '6px', marginTop: '-1.5px' } })} {text}
    </NavDropdown.Item>
  );
}

const links: string[] = ['Home', 'Portfolio', 'Road Map', 'Pricing', 'Live', 'Contact'];

function ButtonsCornerRight(): JSX.Element {
  const { localMenuState, setLocalMenuState } = useMenuState();
  const navigate = useNavigate();

  const handleClick = (link: string) => {
    handleLinkClick(link, setLocalMenuState, navigate, links);
  };

  return renderedButtons({ menuState: localMenuState, handleLinkClick: handleClick, links, updateMenuState: setLocalMenuState });
}

function renderedButtons({ menuState, handleLinkClick, links, updateMenuState }: ButtonsCornerRightProps): JSX.Element {
  const handleButtonClick = (link: string) => {
    updateMenuState((prevState) => ({
      ...prevState,
      selectedLink: link, // Atualiza o estado apenas com o novo link selecionado
    }));
    handleLinkClick(link);
  };

  const buttons = links.map((link, index) => {
    const selected = link === menuState.selectedLink;

    const buttonStyles = {
      width: selected ? "23px" : "",
      height: selected ? "22px" : "12px",
      marginRight: selected ? "-2px" : "",
      marginBottom: selected ? "2.5vh" : "3vh",
      transform: selected ? "" : "rotate(45deg) scaleX(0.7)",
      transformOrigin: selected ? "" : "center",
      backgroundColor: selected ? "#00000000" : "#9b59b6",
      borderColor: selected ? "#9b59b6" : "#00000000",
      borderWidth: selected ? "3px" : "",
      borderRadius: "1px",
    };

    return (
      <Button
        key={link}
        variant="primary"
        size="sm"
        style={buttonStyles}
        onClick={() => handleButtonClick(link)}
      ></Button>
    );
  });
  return <>{buttons}</>;
}

function NavLogic(): JSX.Element {
  const [showDropdown, setShowDropdown] = useState(false);
  const { localMenuState, setLocalMenuState } = useMenuState();

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isNavOn = ['/hublocal', '/loginhublocal', '/registerhublocal', '/resume', '/doris'].includes(pathname);

  const handleClick = (link: string) => {
    handleLinkClick(link, setLocalMenuState, navigate, links);
  };

  const renderNavLinks = (): JSX.Element[] | null => {
    if (!isMobile) {
      return links.map((link) => (
        <div
          key={link}
          className="nav-link-wrapper"
          onClick={() => handleClick(link)}
        >
          <Nav.Link
            key={link}
            className={`text-nowrap nav-link-custom ${localMenuState.selectedLink === link ? "active" : "desactive"}`}
            href={`#${link.toLowerCase()}`}
          >
            {link === "Live" ? (
              <div className="live-container">
                <span className="live-img">
                  <LiveAnimation />
                </span>
                {link}
              </div>
            ) : (
              <span>{link}</span>
            )}
          </Nav.Link>
        </div>
      ));      
    }
    return null;
  };

  return (
    <>
      {!isNavOn && (
        <Navbar className="border-gradient-green m-0 p-0 justify-content-between">
          <Navbar 
            style={{
              justifyContent: "space-between",
              alignItems: "center",
              height: "10.5vh",
              fontWeight: "600",
              paddingTop: "0px",
              paddingBottom: "0px",
              marginInline: "0px",
              marginTop: "0.1vh",
              marginBottom: "0px",
            }}>
            <a href="/" style={{ display: 'inline-block', marginRight: "4vw" }}>
              <Image
                src={logo}
                style={{
                  marginLeft: `${convertMultiplyVwToPx()}px`,
                  marginTop: "0.5vh",
                  borderRadius: "20%",
                  width: "8.5vh",
                  height: "8.5vh",
                }}
              />
            </a>
            {!isMobile && (
              <Nav id="nav-dropdown" style={{ display: 'inline-flex', alignItems: 'start', marginRight: '0', paddingRight: '0' }}>
                {renderNavLinks()}
              </Nav>
            )}
          </Navbar>
          <Nav>
            <NavDropdown
              title={
                <span style={{ color: '#313131EE', fontWeight: '600', lineHeight: '140%', display: 'inline-block' }}>
                  Welcome<br /><b>Sign In / Register</b>
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
            <NavDropdown.Item style={{ marginTop: '13px' }}>
                <div className="d-grid gap-2 ms-2 me-1">
                  <Button className="fontSignIn" variant="dark" size="lg" style={{ borderRadius: "25px" }} >
                    Sign In
                  </Button>
                  <Button className="fontRegister" variant="secondary" size="lg" style={{ background: 'transparent', border: 'none', color: 'inherit', marginTop: '-15px' }}>
                    Register
                  </Button>
                </div>
              </NavDropdown.Item>
              <NavDropdown.Divider style={{ marginInline: '22px', opacity: 0.5, marginTop: '-5px', marginBottom: '13px' }}/>
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
    </>
  );
}

export { NavLogic, ButtonsCornerRight };
