import { FC, ReactNode } from "react";

import { Container, Title, Header, ClearButton } from "./backdropStyles";

interface BackdropProps {
  children: ReactNode;
}

export const Backdrop: FC<BackdropProps> = ({ children }) => (
  <Container>
    <Header>
      <Title>Combinar</Title>
      <ClearButton>Limpar</ClearButton>
    </Header>
    {children}
  </Container>
);