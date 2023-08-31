import React, { useEffect, useRef, useState } from "react";
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
  const backdropWidth = backdropRef.current?.offsetWidth ?? 0;

  useEffect(() => {
    const loadedProductList = ProductList();
    setProducts(productValidation(loadedProductList));

  }, []);

  return (
    <React.Fragment>
      <Stage
        imageUrl={`${products.length > 0 ? products[0].preview_image : ""}`}
        currentPrice={`${products.length > 0 ? products[0].selling_priceFormatted : ""}`}
        realheight={RealHeight()}
        ismobile={isMobile}
      >
        <Backdrop ref={backdropRef}>
          <List products={products} width={backdropWidth}>
          </List>
        </Backdrop>
      </Stage>
    </React.Fragment>
  );
};

export default Principal;