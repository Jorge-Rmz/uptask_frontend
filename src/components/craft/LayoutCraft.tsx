import React, { useState } from "react";
import { Editor, Frame, Element, useEditor } from "@craftjs/core";
import { Toolbox } from "./config/Toobox";
import { TextComponent } from "./TextComponent/TextComponent";
import { SettingsPanel } from "./config/SettingsPanel";
import { ButtonComponent } from "./boton/ButtonComponent";
import { ContainerComponent } from "./contenedor/ContainerComponent";
import { TextButtonComponent } from "./CombinedComponents/TextButtonComponent";

/* 🔹 Botón para ver el JSON generado */
const ViewJSONButton: React.FC = () => {
  const { query } = useEditor();
  const [json, setJson] = useState<string | null>(null);

  const handleViewJSON = () => {
    const data = query.serialize();
    try {
      const formatted = JSON.stringify(JSON.parse(data), null, 2); // ✅ Formatea bonito
      setJson(formatted);
      console.log("📄 JSON del editor:", formatted);
    } catch (error) {
      setJson("❌ Error al formatear el JSON");
    }
  };

  const handleCopy = async () => {
    if (json) {
      await navigator.clipboard.writeText(json);
      alert("✅ JSON copiado al portapapeles");
    }
  };

  return (
    <>
      <button
        onClick={handleViewJSON}
        className="fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition-all"
      >
        📄 Ver JSON
      </button>

      {/* 🪟 Modal para mostrar el JSON */}
      {json && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-5 rounded-xl w-3/4 h-3/4 overflow-auto relative shadow-lg">
            {/* Botones superiores */}
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold">Estructura JSON</h3>
              <div className="flex gap-2">
                <button
                  onClick={handleCopy}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm"
                >
                  📋 Copiar
                </button>
                <button
                  onClick={() => setJson(null)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                >
                  ✖ Cerrar
                </button>
              </div>
            </div>

            {/* Contenido del JSON formateado */}
            <pre className="bg-gray-100 p-3 rounded text-sm whitespace-pre overflow-x-auto border border-gray-300 h-full">
              {json}
            </pre>
          </div>
        </div>
      )}
    </>
  );
};

/* 🔸 Editor principal */
export const LayoutCraft: React.FC = () => {
  return (
    <Editor
      resolver={{
        TextComponent,
        ButtonComponent,
        ContainerComponent,
        TextButtonComponent,
      }}
    >
      <div className="flex h-screen">
        {/* 🧰 Barra izquierda */}
        <div className="w-1/5">
          <Toolbox />
        </div>

        {/* 🎨 Zona central */}
        <div className="flex-1 bg-gray-50 p-4 overflow-auto">
          <Frame>
            <Element
              is={ContainerComponent}
              canvas
              background="#fff"
              padding={20}
            />
          </Frame>
        </div>

        {/* ⚙️ Barra derecha */}
        <div className="w-1/5 border-l">
          <SettingsPanel />
        </div>
      </div>

      {/* 📄 Botón flotante para ver JSON */}
      <ViewJSONButton />
    </Editor>
  );
};
