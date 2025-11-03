import React from "react";
import { useNode } from "@craftjs/core";

export const TextSettings = () => {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props,
  }));

  return (
    <div className="p-4 flex flex-col gap-3">
      <label className="font-semibold text-sm text-gray-600">Texto:</label>
      <input
        type="text"
        value={props.text}
        onChange={(e) => setProp((p: any) => (p.text = e.target.value))}
        className="border border-gray-300 rounded px-2 py-1"
      />
    </div>
  );
};
