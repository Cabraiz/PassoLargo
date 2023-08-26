import { FC, ReactNode } from "react"; // Import useRef
import { StyledList, ButtonWithImage } from "./listStyles";
import { Product } from "../../data/models/ProductList.interface";
import { useDraggableList } from "./useDraggableList";

interface ListProps {
  children: ReactNode;
  products: Product[];
}

export const List: FC<ListProps> = ({ products }) => {
  //const containerRef = useRef<HTMLDivElement | null>(null); 
  //const totalImagesWidth = products.length * 15.55; // Total width of all images
  //const containerWidth = containerRef.current?.clientWidth ?? 0;
  //const adjustedContainerWidth = Math.max(totalImagesWidth, containerWidth);

  const { containerRef, bindHandlers, transformStyle } = useDraggableList();

  return (
    <StyledList
      ref={containerRef}
      {...bindHandlers}
      style={{
        ...transformStyle,
        display: "flex",
        overflow: "hidden",
      }}
    >
      {products.map((product) => (
        <ButtonWithImage key={product.id}>
         <img
            style={{
              objectFit: "cover",
              height: "15.55vh",
              width: "15.55vh",
            }}
            src={product.thumbnail}
            alt=""
            onDragStart={(e) => e.preventDefault()} // Adicione esta linha
          />
        </ButtonWithImage>
      ))}
    </StyledList>
  );
};