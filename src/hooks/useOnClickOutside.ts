import React, { useEffect } from "react";

interface useOnClickOutsideProps {}
export const useOnClickOutside = (ref: any, handler: any, portalRef: any) => {
  console.log(1112);
  useEffect(() => {
    const listener = (event: any) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }

      if (
        portalRef !== undefined &&
        (!portalRef?.current || portalRef?.current.contains(event.target))
      ) {
        return;
      }
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler, portalRef]);
};
