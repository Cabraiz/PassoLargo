import { FC } from "react";

import { Container, Image, ImageWrapper, PriceTag } from "./styles";

interface StageProps {
  imageUrl: string;
  currentPrice: string;
  ismobile: boolean;
  realheight: string;
}

export const Stage: FC<StageProps> = ({ imageUrl, currentPrice, realheight, ismobile }) => {
  const isMobileString = ismobile ? "true" : "false";

  return (
    <Container ismobile={isMobileString} realheight={realheight}>
      <ImageWrapper>
        <Image data-testid="image" src={imageUrl} alt="" />
        <PriceTag data-testid="tag">{currentPrice} </PriceTag>
      </ImageWrapper>
    </Container>
  );
};

