import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";


const RealHeight = () => {

    const [realHeight, setRealHeight] = useState('0px');
    useEffect(() => {
        if (isMobile) {
        setRealHeight(`${window.innerHeight}px`);
        } else {
        setRealHeight("100vh");
        }
    

    }, []);

    return realHeight;

}

export default RealHeight;