import styled from "styled-components";

interface ContainerProps {
  ismobile: "true" | "false";
  realheight: string;
}

export const Container = styled.div<ContainerProps>`
  position: fixed;
  display: flex;
  justify-content: center;
  width: 100%;
  height: ${props => props.realheight};
  background-color: #323232;
`;


export const Image = styled.img`
  background-color: #313131;
  object-fit: cover;
  height: 100%;
  pointer-events: none;
  border-radius: 3.73vh;
`;

export const PriceTag = styled.span`
  position: absolute;
  font-family: 'Montserrat';
  font-weight: 700;
  padding:  0.93vh 2.7% 0.93vh 2.7%;
  white-space: nowrap;
  border-radius: 10vh;
  background: #00A2FF;
  color: #FFFFFF;
  font-size: 1.56vh;
  line-height: 1.87vh;
  left: 7.03%;
  top:36.55%;
  pointer-events: none;
  z-index: 2;
`;

export const ImageWrapper = styled.div`
  position: relative;
  display: inline-block;
  margin: var(--image-wrapper-padding);
`;