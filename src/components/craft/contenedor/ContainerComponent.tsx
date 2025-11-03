import React from "react";
import { useNode } from "@craftjs/core";

interface ContainerProps {
  background?: string;
  padding?: number;
  children?: React.ReactNode;
}

export const ContainerComponent: React.FC<ContainerProps> = ({
  background = "#ffffff",
  padding = 20,
  children,
}) => {
  const {
    connectors: { connect, drag },
  } = useNode();

  return (
    <div
      ref={(ref) => {
        if (ref) connect(drag(ref));
      }}
      style={{
        background,
        padding,
        minHeight: "100px",
        border: "2px dashed #ccc",
        borderRadius: "10px",
      }}
    >
      {children}
    </div>
  );
};

// Metadata para Craft.js
(ContainerComponent as any).craft = {
  displayName: "Contenedor",
  props: {
    background: "#ffffff",
    padding: 20,
  },
  isCanvas: true
};
