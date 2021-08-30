import { useState, useEffect, useRef } from "react";

import { BREAKPOINT_SIZE, BREAKPOINT } from "../constants/constants";

const useBreakpoint = () => {
  const isClient = typeof window === "object"; //Object represents browser window
  const lastWidth = useRef();

  const { XS, SM, MD, LG, XL } = BREAKPOINT_SIZE;

  const { XS: xs, SM: sm, MD: md, LG: lg, XL: xl } = BREAKPOINT;

  function getSize() {
    return {
      width: isClient ? window.innerWidth : undefined,
    };
  }

  const getBreakPoint = (w) =>
    // XS > w ? xs : SM > w ? sm : MD > w ? md : LG > w ? lg : xl;
    w > XL ? xl : w > LG ? lg : w > MD ? md : w > SM ? sm : xs;

  const [windowSize, setWindowSize] = useState(getSize);
  const [viewPort, setViewPort] = useState();

  useEffect(() => {
    if (!isClient) {
      return false;
    } //Exit if not user/browser

    function handleResize() {
      if (window?.innerWidth !== lastWidth.current) {
        const width = getSize();
        lastWidth.current = width;
        setWindowSize(width);
        const currentWidth = width.width;
        const currentViewPort =
          currentWidth > XL
            ? { [xl]: true }
            : currentWidth > LG
            ? { [lg]: true }
            : currentWidth > MD
            ? { [md]: true }
            : currentWidth > SM
            ? { [sm]: true }
            : { [xs]: true };
        setViewPort(currentViewPort);
      }
    }
    handleResize();
    // window.addEventListener("onload", handleResize);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    // return () => window.removeEventListener("resize", handleResize);
  }, []);
  const breakPoint = getBreakPoint(windowSize.width);

  //   console.log("viewPort: ", viewPort);

  return { breakPoint, viewPort };
};

export default useBreakpoint;
