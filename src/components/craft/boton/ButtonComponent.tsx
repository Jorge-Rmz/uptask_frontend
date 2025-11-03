import React from "react";
import { useNode } from "@craftjs/core";

interface ButtonProps {
    text?: string;
    color?: string;
    label?: string;

}

export const ButtonComponent: React.FC<ButtonProps> = ({ text, color = "#3b82f6" }) => {
    const {
        connectors: { connect, drag },
    } = useNode();

    return (
        <button
            ref={(ref) => {
                if (ref) connect(drag(ref));
            }}
            style={{
                backgroundColor: color,
                color: "white",
                border: "none",
                padding: "10px 16px",
                borderRadius: "8px",
                cursor: "pointer",
            }}
        >
            {text}
        </button>
    );
};

// Metadata para Craft.js
(ButtonComponent as any).craft = {
    displayName: "Botón",
    props: {
        text: "Botón",
        color: "#3b82f6",
    },
    rules: {
        canDelete: () => false,  // 🚫 evita que el usuario lo elimine
    },
};

