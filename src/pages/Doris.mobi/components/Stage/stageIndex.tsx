import { FC, ReactNode  } from "react";

import { Container, Image, ImageWrapper, PriceTag } from "./stageStyles";

interface StageProps {
  imageUrl: string;
  currentPrice: string;
  realheight: string;
  children: ReactNode;
}

export const Stage: FC<StageProps> = ({ children, imageUrl, currentPrice, realheight }) => {
  return (
    <Container realheight={realheight}>
      <ImageWrapper>
        <Image data-testid="image" src={imageUrl} alt="" />
        <PriceTag data-testid="tag">{currentPrice} </PriceTag>
        {children}
      </ImageWrapper>
    </Container>
  );
};

