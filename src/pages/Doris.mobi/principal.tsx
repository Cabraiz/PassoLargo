import React, { useEffect, useRef, useState } from "react";
import { Stage } from "./components/Stage/stageIndex";
import { Backdrop } from "./components/Backdrop/backdropIndex";
import { List } from "./components/List/listIndex";

import ProductList from './data/ProductListSearch'
import { Product } from './data/models/ProductList.interface'

import { isMobile } from "react-device-detect";
import productValidation from "./validation/productValidation";

const Principal = () => {
  const [realHeight, setRealHeight] = useState('0px')
  const [products, setProducts] = useState<Product[]>([]);

  const backdropRef = useRef<HTMLDivElement | null>(null);
  const backdropWidth = backdropRef.current?.offsetWidth || 0;

  useEffect(() => {
    if (isMobile) {
      setRealHeight(`${window.innerHeight}px`);
    } else {
      setRealHeight("100vh");
    }
  
    const loadedProductList = ProductList();
    setProducts(productValidation(loadedProductList));

  }, []);

  return (
    <React.Fragment>
      <Stage
        imageUrl={`${products.length > 0 ? products[0].preview_image : ""}`}
        currentPrice={`${products.length > 0 ? products[0].selling_priceFormatted : ""}`}
        realheight={realHeight}
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