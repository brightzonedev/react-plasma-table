import React from "react";

const RenderCustomComponents = (Component, children?: any, props?: any) => {
  if (typeof Component !== "undefined") {
    return <Component {...props}>{children}</Component>;
  }
  return null;
};

export default RenderCustomComponents;
