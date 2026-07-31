import { Eraser, RotateCcw, Trash2, Pencil } from "lucide-react";

type ToolbarProps = {
  color?: string;
  setColor?: (color: string) => void;
  brushSize?: number;
  setBrushSize?: (size: number) => void;
  clearCanvas?: () => void;
  undo?: () => void;
  eraser?: () => void;
};

export default function Toolbar({
  color = "#000000",
  setColor = () => {},
  brushSize = 5,
  setBrushSize = () => {},
  clearCanvas = () => {},
  undo = () => {},
  eraser = () => {},
}: ToolbarProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-4 mt-4">

      <h2 className="text-xl font-bold mb-4">
        Drawing Tools
      </h2>

      <div className="flex flex-wrap items-center gap-4">

        {/* Pencil */}
        <button
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          <Pencil size={18} />
          Brush
        </button>

        {/* Color Picker */}
        <div className="flex items-center gap-2">
          <label className="font-medium">
            Color
          </label>

          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-10 h-10 border rounded cursor-pointer"
          />
        </div>

        {/* Brush Size */}
        <div className="flex items-center gap-2">
          <label className="font-medium">
            Size
          </label>

          <input
            type="range"
            min="1"
            max="30"
            value={brushSize}
            onChange={(e) =>
              setBrushSize(Number(e.target.value))
            }
          />

          <span className="font-bold">
            {brushSize}
          </span>
        </div>

        {/* Eraser */}
        <button
          onClick={eraser}
          className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
        >
          <Eraser size={18} />
          Eraser
        </button>

        {/* Undo */}
        <button
          onClick={undo}
          className="flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg"
        >
          <RotateCcw size={18} />
          Undo
        </button>

        {/* Clear */}
        <button
          onClick={clearCanvas}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          <Trash2 size={18} />
          Clear
        </button>

      </div>

    </div>
  );
}