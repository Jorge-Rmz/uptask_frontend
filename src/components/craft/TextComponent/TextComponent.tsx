import React from "react";
import { useNode } from "@craftjs/core";
import { TextSettings } from "./TextSettings";



interface TextProps {
    text: string;
}

export const TextComponent: React.FC<TextProps> = ({ text }) => {
    const {
        connectors: { connect, drag },
    } = useNode();

    return (
        <p
            ref={(ref) => {
                if (ref) connect(drag(ref));
            }}
            className="text-lg text-center p-4 border rounded-xl bg-white shadow-md cursor-move"
        >
            {text}
        </p>
    );
};

// Craft.js metadata
(TextComponent as any).craft = {
    displayName: "Texto",
    props: {
        text: "Texto de ejemplo",
    },
    related: {
        settings: TextSettings,
    },
};
