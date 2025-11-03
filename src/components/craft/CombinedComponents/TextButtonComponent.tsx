import React from "react";
import { useNode, Element } from "@craftjs/core";
import { TextComponent } from "../TextComponent/TextComponent";
import { ButtonComponent } from "../boton/ButtonComponent";
import { TextButtonInner } from "./TextButtonInner";

import {
  deprecationWarning,
  ERROR_INVALID_NODEID,
  ROOT_NODE,
  DEPRECATED_ROOT_NODE,
  ERROR_DELETE_TOP_LEVEL_NODE,
  ERROR_NOT_IN_RESOLVER,
} from '@craftjs/utils';

interface TextButtonProps {
    text?: string;
    buttonLabel?: string;
}

export const TextButtonComponent: React.FC<TextButtonProps> = ({
    text = "Título de ejemplo",
    buttonLabel = "Click aquí",
}) => {
    const {
        connectors: { connect, drag },
        selected,
        id,
    } = useNode((node) => ({
        selected: node.events.selected,
        id: node.id,
    }));

    return (
        <div
            ref={(ref) => {
                if (ref) {
                    connect(drag(ref)); // ejecuta la conexión, no retornes nada
                }
            }}
            className={`relative p-4 border rounded-xl shadow-sm text-center space-y-3 transition 
            ${selected ? "border-blue-500 shadow-md" : "border-gray-300 bg-white"}`}
        >
            <TextButtonInner parentId={id}>
                <Element is={TextComponent} id={`text_${id}`} text={text} />
                <Element is={ButtonComponent} id={`button_${id}`} label={buttonLabel} />
            </TextButtonInner>
        </div>
    );
}



// Opcional: reglas del componente padre (TextButtonComponent)
(TextButtonComponent as any).craft = {
    displayName: "Texto + Botón",
    props: {
        text: "Título de ejemplo",
        buttonLabel: "Click aquí",
    },
    rules: {
        canDrag: () => false,      // no se puede arrastrar el componente padre
        canMoveIn: () => false,    // no se pueden agregar componentes al padre
        canMoveOut: () => false,   // no se pueden sacar hijos del padre
    },
};
