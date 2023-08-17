import { FC } from "react";

import { Container, Image, PriceTag } from "./styles";

interface StageProps {
  imageUrl: string;
  currentPrice: string;
  ismobile: boolean;
  realheight: string;
}


export const Stage: FC<StageProps> = ({ imageUrl, currentPrice, realheight, ismobile }) => (
  <Container ismobile={ismobile} realheight={realheight}>
    <Image data-testid="image" src={imageUrl} alt="" />
    <PriceTag data-testid="tag">{currentPrice}</PriceTag>
  </Container>
);
