import { useRef, useState, MutableRefObject  } from "react";
import { Product } from "../../data/models/ProductList.interface";

interface DraggableListProps {
  products: Product[];
  width: number | undefined;
}

export const useDraggableList = (props: DraggableListProps): {
  containerRef: MutableRefObject<HTMLDivElement | null>;
  bindHandlers: {
    onMouseDown: (event: React.MouseEvent<HTMLDivElement>) => void;
    onMouseMove: (event: React.MouseEvent<HTMLDivElement>) => void;
    onMouseUp: () => void;
    onMouseLeave: () => void;
    onTouchStart: (event: React.TouchEvent<HTMLDivElement>) => void;
    onTouchMove: (event: React.TouchEvent<HTMLDivElement>) => void;
    onTouchEnd: () => void;
    onClick: () => void;
  };
  transformStyle: React.CSSProperties;
} => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  
  const [animationActive, setAnimationActive] = useState(false);

  const width = props.width ?? 0;

  const leftBoundary = 0;

  let rightBoundary = -width;
  if (containerRef.current) {
    rightBoundary = -containerRef.current.offsetWidth + width * 93/100;
  }
  
  const updateDragOffsetToNearestBoundary = () => {
    if (dragOffset > leftBoundary) {
      setDragOffset(leftBoundary);
    } else if (dragOffset < rightBoundary) {
      setDragOffset(rightBoundary);
    }
  };

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
    if (animationActive) {
      setAnimationActive(false);
    } else {
      updateDragOffsetToNearestBoundary();
    }
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
    if (animationActive) {
      setAnimationActive(false);
    } else {
      if (dragOffset > leftBoundary) {
        setDragOffset(leftBoundary);
      } else if (dragOffset < rightBoundary) {
        setDragOffset(rightBoundary);
      }
    }
    setDragStartX(null);
  };

  const handleInteraction = () => {
    if (!animationActive) {
      const distance = props.width ? props.width / 4 : 0;
      const targetOffset = dragOffset + (dragOffset > 0 ? distance : -distance);
      
      if (targetOffset > leftBoundary) {
        setDragOffset(leftBoundary);
      } else if (targetOffset < rightBoundary) {
        setDragOffset(rightBoundary);
      } else {
        setDragOffset(targetOffset);
      }
      
      setAnimationActive(true);
    }
  };

  const handleMouseLeave = () => {
    updateDragOffsetToNearestBoundary();
    setDragStartX(null);
  };

  const bindHandlers = {
    onMouseLeave: handleMouseLeave, 
    onMouseDown: handleMouseDown,
    onMouseMove: handleMouseMove,
    onMouseUp: handleMouseUp,
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: () => {
      handleTouchEnd();
    },
    onClick: handleInteraction,
  };

  const transitionValue: string = "transform 0.6s ease";

  const transformStyle = {
    transform: `translateX(${dragOffset}px)`,
    transition: transitionValue,
  };

  return { containerRef, bindHandlers, transformStyle };
};
