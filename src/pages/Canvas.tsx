import { useRef, useEffect, useState } from "react";
import { socket } from "@/socket";

export default function Canvas() {

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [drawing, setDrawing] = useState(false);

  const [color, setColor] = useState("#000000");

  const [brushSize, setBrushSize] = useState(5);



  useEffect(() => {

    const canvas = canvasRef.current;

    if (!canvas) return;


    canvas.width = 800;
    canvas.height = 500;


    const ctx = canvas.getContext("2d");

    if (!ctx) return;


    ctx.fillStyle = "white";
    ctx.fillRect(
      0,
      0,
      canvas.width,
      canvas.height
    );



    // RECEIVE DRAWING FROM OTHER PLAYERS

    socket.on("draw", (data) => {

      const ctx = canvas.getContext("2d");

      if (!ctx) return;


      ctx.strokeStyle = data.color;
      ctx.lineWidth = data.brushSize;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";


      ctx.lineTo(
        data.x,
        data.y
      );

      ctx.stroke();

    });



    // CLEAR CANVAS EVENT

    socket.on("clear_canvas", () => {

      const ctx = canvas.getContext("2d");

      if (!ctx) return;


      ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
      );


      ctx.fillStyle = "white";

      ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
      );

    });



    return () => {

      socket.off("draw");
      socket.off("clear_canvas");

    };


  }, []);





  const getContext = () => {

    const canvas = canvasRef.current;

    if (!canvas) return null;


    const ctx = canvas.getContext("2d");

    if (!ctx) return null;


    ctx.strokeStyle = color;
    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";


    return ctx;

  };





  const startDrawing = (
    e: React.MouseEvent<HTMLCanvasElement>
  ) => {


    const ctx = getContext();

    if (!ctx) return;


    ctx.beginPath();


    ctx.moveTo(
      e.nativeEvent.offsetX,
      e.nativeEvent.offsetY
    );


    setDrawing(true);


    socket.emit(
      "start_draw",
      {
        roomCode:
        localStorage.getItem("roomCode")
      }
    );

  };





  const draw = (
    e: React.MouseEvent<HTMLCanvasElement>
  ) => {


    if (!drawing) return;


    const x =
      e.nativeEvent.offsetX;

    const y =
      e.nativeEvent.offsetY;



    const ctx = getContext();

    if (!ctx) return;



    ctx.lineTo(
      x,
      y
    );

    ctx.stroke();




    // SEND DRAW DATA TO SERVER

    socket.emit(
      "draw",
      {
        roomCode:
        localStorage.getItem("roomCode"),

        x,

        y,

        color,

        brushSize
      }
    );


  };





  const stopDrawing = () => {

    setDrawing(false);


    socket.emit(
      "stop_draw",
      {
        roomCode:
        localStorage.getItem("roomCode")
      }
    );

  };





  const clearCanvas = () => {


    socket.emit(
      "clear_canvas",
      {
        roomCode:
        localStorage.getItem("roomCode")
      }
    );


    const canvas = canvasRef.current;

    if (!canvas) return;


    const ctx = canvas.getContext("2d");

    if (!ctx) return;


    ctx.clearRect(
      0,
      0,
      canvas.width,
      canvas.height
    );


    ctx.fillStyle = "white";

    ctx.fillRect(
      0,
      0,
      canvas.width,
      canvas.height
    );


  };





  return (

    <div className="bg-white rounded-xl shadow-lg p-4">


      <div className="flex gap-4 mb-4">


        <input
          type="color"
          value={color}
          onChange={(e)=>
            setColor(e.target.value)
          }
        />


        <input
          type="range"
          min="1"
          max="30"
          value={brushSize}
          onChange={(e)=>
            setBrushSize(
              Number(e.target.value)
            )
          }
        />


        <button
          onClick={clearCanvas}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Clear
        </button>


      </div>




      <canvas

        ref={canvasRef}

        className="border rounded-lg cursor-crosshair bg-white w-full"

        onMouseDown={startDrawing}

        onMouseMove={draw}

        onMouseUp={stopDrawing}

        onMouseLeave={stopDrawing}

      />


    </div>

  );

}