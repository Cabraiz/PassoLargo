import React, { useEffect, useState } from "react";
import { Stage } from "./components/Stage/stageIndex";
import { Backdrop } from "./components/Backdrop/backdropIndex";
import { List } from "./components/List/listIndex";
import { isMobile } from "react-device-detect";

const Principal = () => {
  const [realHeight, setRealHeight] = useState('0px')

  
  useEffect(() => {
    if (isMobile) {
      setRealHeight(`${window.innerHeight}px`);
    } else {
      setRealHeight("100vh");
    }
  }, []);

  return (
    <React.Fragment>
      <Stage
        imageUrl="https://lojausereserva.vtexassets.com/arquivos/ids/7956078-1200-auto?v=638248721303730000&width=1200&height=auto&aspect=true"
        currentPrice="R$ 269,99"
        realheight={realHeight}
        ismobile={isMobile}
      >
        <Backdrop
        >
          <List>
            <button>
              <img
                style={{
                  height:"27.03vw",
                  objectFit: "cover",
                  margin: "0 10px",
                }}
                src="https://lojausereserva.vtexassets.com/arquivos/ids/7956077-1200-auto?v=638248721291830000&width=1200&height=auto&aspect=true"
                alt=""
              />
            </button>
          </List>
        </Backdrop>
      </Stage>
    </React.Fragment>
  );
};

export default Principal;