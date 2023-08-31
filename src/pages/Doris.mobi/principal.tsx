import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Stage } from "./components/Stage/stageIndex";
import { Backdrop } from "./components/Backdrop/backdropIndex";
import { List } from "./components/List/listIndex";
import ProductList from './data/ProductListSearch'
import { Product } from './data/models/ProductList.interface'
import RealHeight from "../Auxiliadores/RealHeight";
import productValidation from "./validation/productValidation";
import { isMobile } from "react-device-detect";

const Principal = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const backdropRef = useRef<HTMLDivElement | null>(null);
  const [backdropWidth, setbackdropWidth] = useState<number | undefined>(undefined);

  useLayoutEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === backdropRef.current) {
          setbackdropWidth(entry.contentRect.width);
        }
      }
    });

    if (backdropRef.current) {
      resizeObserver.observe(backdropRef.current);
    }

    return () => {
      if (backdropRef.current) {
        resizeObserver.unobserve(backdropRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const loadedProductList = ProductList();
    setProducts(productValidation(loadedProductList));
  }, []);

  const firstProduct = products.length > 0 ? products[0] : null;

  return (
    <React.Fragment>
      <Stage
        imageUrl={firstProduct?.preview_image || ""}
        currentPrice={firstProduct?.selling_priceFormatted || ""}
        realheight={RealHeight()}
        ismobile={isMobile}
      >
        <Backdrop ref={backdropRef}>
          <List products={products} width={backdropWidth} />
        </Backdrop>
      </Stage>
    </React.Fragment>
  );
};

export default Principal;
