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
    onTouchStart: (event: React.TouchEvent<HTMLDivElement>) => void;
    onTouchMove: (event: React.TouchEvent<HTMLDivElement>) => void;
    onTouchEnd: () => void;
  };
  transformStyle: React.CSSProperties;
} => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState(0);

  //let maxOffset = -(props.products.length) * props.width - (props.products.length - 1) * 10;
  console.log(props.width);

  const width = props.width ?? 0;
  let maxOffset = -width;

  if (containerRef.current) {
    maxOffset = -containerRef.current.offsetWidth + width * 93/100;
  } 

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
    if (dragOffset > 0) {
      setDragOffset(0); // Reset the dragOffset to 0 if dragged to the right
    } else if (dragOffset < maxOffset) {
      setDragOffset(maxOffset); 
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
    if (dragOffset > 0) {
      setDragOffset(0); // Reset the dragOffset to 0 if dragged to the right
    } else if (dragOffset < maxOffset) {
      setDragOffset(maxOffset); 
    }
  
    setDragStartX(null);
  };

  const bindHandlers = {
    onMouseDown: handleMouseDown,
    onMouseMove: handleMouseMove,
    onMouseUp: handleMouseUp,
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: () => {
      handleTouchEnd();
    },
  };

  const transformStyle = {
    transform: `translateX(${dragOffset}px)`,
    transition: dragStartX !== null ? "none" : "transform 0.3s ease",
  };

  return { containerRef, bindHandlers, transformStyle };
};
