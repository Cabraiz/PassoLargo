import styled from "styled-components";

export const Container = styled.div`
  position: absolute;
  left:var(--image-wrapper-padding);
  bottom:0;
  background: #fff;
  z-index: 3;
  border-radius: 15px;
  box-shadow: 0px -4px 0px 0px rgba(0, 0, 0, 0.1);
  height: 28.62vh;
  width: calc(100% - (var(--image-wrapper-padding) * 2));
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 3.11vh;
  margin-bottom: 3.11vh;
  margin-inline: 7.12%;
`;

export const Text = styled.div`
  font-family: 'Montserrat';
  font-size: 2.49vh;
  line-height: 1.87vh;
  color: #000000;
`;

export const ClearButton = styled.button`
  font-family: 'Montserrat';
  font-size: 1.56vh;
  line-height: 1.87vh;
  color: #000000;
  background-color: #00A2FF; 
  padding: 0.93vh 2.71%;
  border: none;
  color: white;
  cursor: pointer;
  border-radius: 0px 8px 0px 8px;
`;