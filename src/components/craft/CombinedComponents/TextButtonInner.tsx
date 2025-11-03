import React from "react";
import { Element, useEditor } from "@craftjs/core";

interface TextButtonInnerProps {
    parentId: string;
    children: React.ReactNode;
}

export const TextButtonInner: React.FC<TextButtonInnerProps> = ({ parentId, children }) => {
    const { actions } = useEditor();

    return (
        <Element
            id={`text_button_inner_${parentId}`}
            is="div"
            canvas
            className="flex flex-col items-center space-y-3"
            onClick={(e: React.MouseEvent) => {
                e.stopPropagation(); // evita bubbling

                // Selecciona el padre solo si el click es en el canvas, no en un hijo
                if (e.target === e.currentTarget) {
                    actions.selectNode(parentId);
                }
            }}
        >
            {children}
        </Element>
    );
};

// Reglas de Craft declaradas en el propio componente
(TextButtonInner as any).craft = {
    displayName: "TextButtonInner",
    rules: {
        canDrag: () => false,
        canMoveIn: () => false,
        canMoveOut: () => false,
    },
};
