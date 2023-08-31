import styled from "styled-components";
import { isMobile } from "react-device-detect";

export const StyledList = styled.div`
  position: absolute;
  bottom: 0;
  margin: 0 4.34% 3.11vh 4.34%;
  display: flex;
  align-items: flex-end;
  overflow: hidden;
  white-space: nowrap;
  cursor: grab;
  touch-action: pan-x;

  ${isMobile ? "transition: none;" : "transition: transform 0.3s cubic-bezier(0.445, 0.05, 0.55, 0.95);"}

  user-select: none;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
`;

export const ButtonWithImage = styled.button`
  display: inline-block;
  width: max-content;
  height: max-content;
  margin-right: 10px;
  padding: 0;
  border: 0.4vh solid #EAEAEA;
  background-color: #EAEAEA;
  border-radius: 1.24vh;
  overflow: hidden;
  cursor: grab;
  touch-action: pan-x;
  ${!isMobile ? "transition: transform 0.2s ease;" : ""}
  
  &:active {
    transform: scale(0.95); 
  }

  img {
    user-select: none;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
  }
`;


