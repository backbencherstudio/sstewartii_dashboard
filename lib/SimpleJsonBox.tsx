import { useState, useRef } from "react";

type JsonNodeProps = {
  value: unknown;
  keyName?: string;
  isLast?: boolean;
};

const JsonNode = ({ value, keyName, isLast = true }: JsonNodeProps) => {
  const [open, setOpen] = useState(true);
  const comma = isLast ? "" : ",";
  const keyLabel = keyName !== undefined
    ? <span className="text-blue-400">"{keyName}"<span className="text-gray-500">: </span></span>
    : null;

  // Handle undefined or null at the root level
  if (value === undefined || value === null) {
    return (
      <div className="flex">
        <span className="w-3.5 shrink-0" />
        <div>{keyLabel}<span className="text-gray-500">{String(value)}</span>{comma}</div>
      </div>
    );
  }

  if (typeof value === "string") return (
    <div className="flex">
      <span className="w-3.5 shrink-0" />
      <div>{keyLabel}<span className="text-green-400">"{value}"</span>{comma}</div>
    </div>
  );
  if (typeof value === "number") return (
    <div className="flex">
      <span className="w-3.5 shrink-0" />
      <div>{keyLabel}<span className="text-yellow-300">{value}</span>{comma}</div>
    </div>
  );
  if (typeof value === "boolean") return (
    <div className="flex">
      <span className="w-3.5 shrink-0" />
      <div>{keyLabel}<span className="text-purple-400">{String(value)}</span>{comma}</div>
    </div>
  );

  const isArr = Array.isArray(value);
  
  // Safely get entries - handle non-object, non-array values
  let entries: unknown[] | string[] = [];
  try {
    entries = isArr ? value : Object.keys(value as object);
  } catch (error) {
    // If value is not an object (shouldn't happen due to earlier checks, but just in case)
    return (
      <div className="flex">
        <span className="w-3.5 shrink-0" />
        <div>{keyLabel}<span className="text-gray-500">{String(value)}</span>{comma}</div>
      </div>
    );
  }
  
  const [open_, close_] = isArr ? ["[", "]"] : ["{", "}"];
  const hint = isArr ? `${entries.length} items` : `${entries.length} keys`;

  return (
    <div className="flex">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-3.5 shrink-0 text-gray-500 hover:text-gray-300 text-[10px] mt-[3px] text-left"
      >
        {open ? "▾" : "▸"}
      </button>
      <div className="flex-1">
        <div className="flex items-center gap-1">
          {keyLabel}
          <span className="text-gray-500">{open_}</span>
          {!open && <span className="text-gray-600 text-[11px]">{hint}</span>}
        </div>
        {open && (
          <div className="ml-4">
            {isArr
              ? (value as unknown[]).map((v, i) => (
                  <JsonNode key={i} value={v} isLast={i === (value as unknown[]).length - 1} />
                ))
              : entries.map((k, i, arr) => (
                  <JsonNode 
                    key={k as string} 
                    value={(value as Record<string, unknown>)[k as string]} 
                    keyName={k as string} 
                    isLast={i === arr.length - 1} 
                  />
                ))}
          </div>
        )}
        <div><span className="text-gray-500">{close_}</span>{comma}</div>
      </div>
    </div>
  );
};

export const SimpleJsonBox = ({ data }: { data: unknown }) => {
  const [open, setOpen] = useState(true);
  const [allKey, setAllKey] = useState(0); // remount tree to expand all

  // Option 1: Don't render in production (keep this)
  if (process.env.NODE_ENV === "production") return null;
  
  // Option 2: Handle undefined/null data gracefully
  if (data === undefined || data === null) {
    return (
      <div className="bg-gray-950 border border-gray-800 rounded-lg overflow-hidden text-xs font-mono shadow-inner">
        <div
          className="flex items-center justify-between px-3 py-2 bg-gray-900 border-b border-gray-800 cursor-pointer select-none"
          onClick={() => setOpen(o => !o)}
        >
          <span className="text-gray-500 tracking-wide">DEV · JSON</span>
          <div className="flex gap-2" onClick={e => e.stopPropagation()}>
            <button
              className="text-gray-500 hover:text-gray-300 border border-gray-700 hover:border-gray-500 px-2 py-0.5 rounded text-[10px]"
              onClick={() => setAllKey(k => k + 1)}
            >
              expand all
            </button>
            <button
              className="text-gray-500 hover:text-gray-300 border border-gray-700 hover:border-gray-500 px-2 py-0.5 rounded text-[10px]"
              onClick={() => setOpen(o => !o)}
            >
              {open ? "▲ hide" : "▼ show"}
            </button>
          </div>
        </div>
        {open && (
          <div className="p-3 max-h-96 overflow-auto text-gray-300">
            <div className="text-yellow-500">⚠️ Data is {String(data)}</div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-gray-950 border border-gray-800 rounded-lg overflow-hidden text-xs font-mono shadow-inner">
      <div
        className="flex items-center justify-between px-3 py-2 bg-gray-900 border-b border-gray-800 cursor-pointer select-none"
        onClick={() => setOpen(o => !o)}
      >
        <span className="text-gray-500 tracking-wide">DEV · JSON</span>
        <div className="flex gap-2" onClick={e => e.stopPropagation()}>
          <button
            className="text-gray-500 hover:text-gray-300 border border-gray-700 hover:border-gray-500 px-2 py-0.5 rounded text-[10px]"
            onClick={() => setAllKey(k => k + 1)}
          >
            expand all
          </button>
          <button
            className="text-gray-500 hover:text-gray-300 border border-gray-700 hover:border-gray-500 px-2 py-0.5 rounded text-[10px]"
            onClick={() => setOpen(o => !o)}
          >
            {open ? "▲ hide" : "▼ show"}
          </button>
        </div>
      </div>
      {open && (
        <div className="p-3 max-h-96 overflow-auto text-gray-300">
          <JsonNode key={allKey} value={data} />
        </div>
      )}
    </div>
  );
};