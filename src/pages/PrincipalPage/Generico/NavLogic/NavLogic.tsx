
import React, { useState } from "react";
import { LiaClipboardListSolid } from 'react-icons/lia';
import { BsChatDots } from 'react-icons/bs'; 
import { AiOutlineCreditCard } from 'react-icons/ai'; 
import { RiCoupon3Line } from 'react-icons/ri';
import { convertMultiplyVwToPx } from '../utils';
import LiveAnimation from "../../Animation/live_animation";


import "./NavLogic.css";

import { NavDropdown, Navbar, Image, Button, Nav } from "react-bootstrap";

import logo from "../../../../assets/icones/logo.svg";

import "react-toastify/dist/ReactToastify.css";
//import Firebase from "./pages/Surprise/Surprise";

import { isMobile } from "react-device-detect";
import { useLocation, useNavigate } from "react-router-dom";

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

function NavLogic() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [menuState, setMenuState] = useState<MenuState>({ selectedLink: 'Home' });

  const navigate = useNavigate();

  const handleLinkClick = (link: string) => {
    setMenuState((prevState) => ({
      selectedLink: prevState.selectedLink === link ? prevState.selectedLink : link,
    }));
  
    const pathMap: { [key: string]: string } = {};
  
    // Map each link to its path
    links.forEach((item) => {
      pathMap[item] = `#${item.toLowerCase()}`;
    });
  
    navigate(pathMap[link] || ""); // Update the path
  };

  const buttonsCornerRight = links.map((link, index) => {
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
        onClick={() => handleLinkClick(link)}
      ></Button>
    );
  });

  const { pathname } = useLocation();

  const isNavOn =
    pathname === "/hublocal" ||
    pathname === "/loginhublocal" ||
    pathname === "/registerhublocal" ||
    pathname === "/resume" ||
    pathname === "/doris";

  return (
    <>
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
                        menuState.selectedLink === link ? "active" : ""
                      }`}
                      href={`#${link.toLowerCase()}`}
                      onClick={() => handleLinkClick(link)}
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
                <div className="d-grid gap-2">
                  <Button variant="dark" size="lg" style={{ fontSize: "2rem" }}>
                    Sign In
                  </Button>
                  <Button variant="secondary" size="lg">
                    Register
                  </Button>
                </div>
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
    </>
  );
}

export default NavLogic;
