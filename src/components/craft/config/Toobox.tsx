import React from "react";
import { useEditor } from "@craftjs/core";
import { TextComponent } from "../TextComponent/TextComponent";
import { ButtonComponent } from "../boton/ButtonComponent";
import { ContainerComponent } from "../contenedor/ContainerComponent";
import { TextButtonComponent } from "../CombinedComponents/TextButtonComponent";

export const Toolbox: React.FC = () => {
  const {
    connectors: { create },
  } = useEditor();

  return (
    <div className="p-4 space-y-2 bg-gray-100 h-full border-r">
      <h2 className="text-lg font-bold mb-4">🧰 Componentes</h2>

      {/* Texto */}
      <div
        ref={(ref) => {
          if (ref) create(ref, <TextComponent text="Nuevo texto" />);
        }}
        className="cursor-move w-full bg-blue-200 p-2 rounded hover:bg-blue-300 transition text-center"
      >
        Texto
      </div>

      {/* Botón */}
      <div
        ref={(ref) => {
          if (ref) create(ref, <ButtonComponent label="Nuevo botón" />);
        }}
        className="cursor-move w-full bg-green-200 p-2 rounded hover:bg-green-300 transition text-center"
      >
        Botón
      </div>

      {/* Contenedor */}
      <div
        ref={(ref) => {
          if (ref) create(ref, <ContainerComponent />);
        }}
        className="cursor-move w-full bg-yellow-200 p-2 rounded hover:bg-yellow-300 transition text-center"
      >
        Contenedor
      </div>

      {/* Texto + Botón */}
      <div
        ref={(ref) => {
          if (ref) create(ref, <TextButtonComponent />);
        }}
        className="cursor-move w-full bg-purple-200 p-2 rounded hover:bg-purple-300 transition text-center"
      >
        Texto + Botón
      </div>
    </div>
  );
};
