import React from "react";
import { useEditor, useNode } from "@craftjs/core";

export const SettingsPanel: React.FC = () => {
  const { selected, actions } = useEditor((state) => {
    const [currentNodeId] = state.events.selected;
    return {
      selected: currentNodeId
        ? {
            id: currentNodeId,
            name: state.nodes[currentNodeId].data.displayName,
            settings:
              state.nodes[currentNodeId].related &&
              state.nodes[currentNodeId].related.settings,
          }
        : null,
    };
  });

  if (!selected) {
    return (
      <div className="p-4 text-gray-500 text-sm">Selecciona un componente</div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      <h3 className="text-lg font-semibold text-gray-700">
        {selected.name}
      </h3>

      {/* Renderizar panel de configuración específico del componente */}
      {selected.settings && React.createElement(selected.settings)}

      {/* 🔥 Botón para eliminar el componente */}
      <button
        onClick={() => actions.delete(selected.id)}
        className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition"
      >
        Eliminar componente
      </button>
    </div>
  );
};
