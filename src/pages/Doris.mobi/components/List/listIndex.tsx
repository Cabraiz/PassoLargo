import { FC, ReactNode } from "react";

import { StyledList, ButtonWithImage } from "./listStyles";

interface ListProps {
  children: ReactNode;
}

export const List: FC<ListProps> = ({ children }) => (
  <StyledList>
    <ButtonWithImage>
      {children}
    </ButtonWithImage>
  </StyledList>
);
