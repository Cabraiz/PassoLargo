import { FC, ReactNode } from "react";

import { Container, Text, Header, ClearButton } from "./backdropStyles";

interface BackdropProps {
  children: ReactNode;
}

export const Backdrop: FC<BackdropProps> = ({ children }) => (
  <Container>
    <Header>
      <Text>Combinar</Text>
      <ClearButton>Limpar</ClearButton>
    </Header>
    {children}
  </Container>
);