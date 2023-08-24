import { FC, ReactNode, useState } from "react";

import { StyledList, ButtonWithImage } from "./listStyles";

interface ListProps {
  children: ReactNode;
}

export const List: FC<ListProps> = ({ children }) => {
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState(0);

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    setDragStartX(event.clientX);
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (dragStartX !== null) {
      const offsetX = event.clientX - dragStartX;
      setDragOffset(offsetX);
    }
  };

  const handleMouseUp = () => {
    if (dragStartX !== null) {
      setDragStartX(null);
      setDragOffset(0);
    }
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    setDragStartX(event.touches[0].clientX);
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    if (dragStartX !== null) {
      const touchX = event.touches[0].clientX;
      const offsetX = touchX - dragStartX;
      setDragOffset(offsetX);
    }
  };

  const handleTouchEnd = () => {
    if (dragStartX !== null) {
      setDragStartX(null);
      setDragOffset(0);
    }
  };

  return (
    <StyledList
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ transform: `translateX(${dragOffset}px)` }}
    >
      {Array.from({ length: 10 }, (_, i) => (
        <ButtonWithImage key={i}>
          {children}
        </ButtonWithImage>
      ))}
    </StyledList>
  );
};




