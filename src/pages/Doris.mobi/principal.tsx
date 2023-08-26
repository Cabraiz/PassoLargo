import React, { useEffect, useState } from "react";
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
        <Backdrop>
          <List products={products}>
          </List>
        </Backdrop>
      </Stage>
    </React.Fragment>
  );
};

export default Principal;