import { FC, ReactNode } from "react"; // Import useRef
import { StyledList, ButtonWithImage } from "./listStyles";
import { Product } from "../../data/models/ProductList.interface";
import { useDraggableList } from "./useDraggableList";

interface ListProps {
  children: ReactNode;
  products: Product[];
  width: number | undefined;
}

export const List: FC<ListProps> = ({ products, width }) => {
  const { containerRef, bindHandlers, transformStyle } = useDraggableList({ products, width });
  
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
        <ButtonWithImage key={product.id} >
         <img
            style={{
              objectFit: "cover",
              height: "15.55vh",
              width: "15.55vh",
            }}
            src={product.thumbnail}
            alt=""
            onDragStart={(e) => e.preventDefault()}
          />
        </ButtonWithImage>
      ))}
    </StyledList>
  );
};