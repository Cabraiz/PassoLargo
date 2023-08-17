import styled from "styled-components";

interface ContainerProps {
  ismobile: boolean;
  realheight: string;
}

export const Container = styled.div<ContainerProps>`
  position: fixed;
  bottom: 0;
  right: 0;
  height: ${props => props.realheight};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center; 
  align-items: center;
  transform: translateX(${props => (props.ismobile ? "0%" : "-50%" )}) translateY(-50%); /* Centralizando verticalmente */
  top: 50%; 
  transform-origin: top
`;

export const Image = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

export const PriceTag = styled.span`
  background: #00a2ff;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  border-radius: 5px;
  position: absolute;
  top: 50%;
  left: 15px;
  padding: 5px 10px;
  transform: translateY(-50%);
  pointer-events: none;
  z-index: 2;
`;
