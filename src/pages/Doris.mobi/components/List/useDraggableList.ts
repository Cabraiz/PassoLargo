import { useRef, useState } from "react";

export const useDraggableList = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState(0);

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault(); // Adicione esta linha
    setDragStartX(event.clientX);
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (dragStartX !== null) {
      const offsetX = event.clientX - dragStartX;
      const newDragOffset = dragOffset + offsetX;
      setDragOffset(newDragOffset);
      setDragStartX(event.clientX);
    }
  };

  const handleMouseUp = () => {
    setDragStartX(null);
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragStartX(event.touches[0].clientX);
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (dragStartX !== null) {
      const touchX = event.touches[0].clientX;
      const offsetX = touchX - dragStartX;
      const newDragOffset = dragOffset + offsetX;
      setDragOffset(newDragOffset);
      setDragStartX(touchX);
    }
  };

  const handleTouchEnd = () => {
    setDragStartX(null);
  };

  const handleSwipeGesture = (event: React.TouchEvent<HTMLDivElement>) => {
    const touchX = event.changedTouches[0].clientX;
    const offsetX = touchX - (dragStartX ?? 0);

    if (offsetX > 100) {
      setDragOffset(0);
    } else if (offsetX < -1000) {
      const listWidth = containerRef.current?.scrollWidth ?? 0;
      const containerWidth = containerRef.current?.clientWidth ?? 0;
      const maxOffset = containerWidth - listWidth;
      setDragOffset(maxOffset);
    }
  };

  const bindHandlers = {
    onMouseDown: handleMouseDown,
    onMouseMove: handleMouseMove,
    onMouseUp: handleMouseUp,
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: (event: React.TouchEvent<HTMLDivElement>) => {
      handleTouchEnd();
      handleSwipeGesture(event);
    },
  };

  const transformStyle = {
    transform: `translateX(${dragOffset}px)`,
    transition: dragStartX !== null ? "none" : "transform 0.3s ease",
  };

  return { containerRef, bindHandlers, transformStyle };
};
