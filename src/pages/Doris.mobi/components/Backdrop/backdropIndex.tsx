import React, { FC, ReactNode } from "react";

import { Container, Title, Header, ClearButton } from "./backdropStyles";

interface BackdropProps {
  children: ReactNode;
  ref?: React.Ref<HTMLDivElement>;
}

export const Backdrop: FC<BackdropProps> = React.forwardRef<HTMLDivElement, BackdropProps>(
  ({ children }, ref) => (
    <Container ref={ref}>
      <Header>
        <Title>Combinar</Title>
        <ClearButton>Limpar</ClearButton>
      </Header>
      {children}
    </Container>
  )
);