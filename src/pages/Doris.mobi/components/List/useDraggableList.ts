import { useEffect, useRef, useState } from "react";
import { Product } from "../../data/models/ProductList.interface";

interface DraggableListProps {
  products: Product[];
  width: number | undefined;
}

interface BindHandlers {
  onMouseDown: (event: React.MouseEvent<HTMLDivElement>) => void;
  onMouseMove: (event: React.MouseEvent<HTMLDivElement>) => void;
  onMouseUp: () => void;
  onMouseLeave: () => void;
  onTouchStart: (event: React.TouchEvent<HTMLDivElement>) => void;
  onTouchMove: (event: React.TouchEvent<HTMLDivElement>) => void;
  onTouchEnd: () => void;
}

export const useDraggableList = (props: DraggableListProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const backdropWidth = props.width ?? 0;

  const containerWidth = containerRef.current?.offsetWidth ?? 0;
  const rightBoundary = -containerWidth + backdropWidth * 93 / 100;

  useEffect(() => {
    if (!isDragging) { 
      const newDragOffset = Math.min(Math.max(dragOffset, rightBoundary), 0);
      setDragOffset(newDragOffset);
    }
  }, [dragOffset, rightBoundary, isDragging]);

  const handleDragStart = (clientX: number) => {
    setDragStartX(clientX);
    setIsDragging(true); 
  };

  const handleDragMove = (clientX: number) => {
    if (dragStartX !== null) {
      const offsetX = clientX - dragStartX;
      setDragOffset(prevOffset => prevOffset + offsetX);
      setDragStartX(clientX);
    }
  };

  const handleDragEnd = () => {
    const newDragOffset = Math.min(Math.max(dragOffset, rightBoundary), 0);
    setDragOffset(newDragOffset);
    setDragStartX(null);
    setIsDragging(false); 
  };

  const handleMouseLeave = () => {
    handleDragEnd();
  };

  const bindHandlers: BindHandlers = {
    onMouseLeave: handleMouseLeave, 
    onMouseDown: (event) => handleDragStart(event.clientX),
    onMouseMove: (event) => handleDragMove(event.clientX),
    onMouseUp: handleDragEnd,
    onTouchStart: (event) => handleDragStart(event.touches[0].clientX),
    onTouchMove: (event) => handleDragMove(event.touches[0].clientX),
    onTouchEnd: handleDragEnd,
  };

  const transformStyle = {
    transform: `translateX(${dragOffset}px)`,
  };

  return { containerRef, bindHandlers, transformStyle };
};
