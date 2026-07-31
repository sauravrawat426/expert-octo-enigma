import { useLocation } from "react-router-dom";

import Canvas from "./Canvas";
import Toolbar from "./Toolbar";
import Chat from "./Chat";
import Leaderboard from "./Leaderboard";

export default function GamePage() {
  const location = useLocation();

  const roomCode =
    location.state?.roomCode || localStorage.getItem("roomCode") || "";

  return (
    <div className="min-h-screen bg-slate-100">

      {/* Header */}
      <header className="bg-blue-600 text-white shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center p-4">

          <h1 className="text-2xl font-bold">
            🎨 Skribbl Clone
          </h1>

          <div className="flex gap-8">

            <div>
              <p className="text-sm">Round</p>
              <p className="font-bold">1 / 3</p>
            </div>

            <div>
              <p className="text-sm">Timer</p>
              <p className="font-bold text-yellow-300">60s</p>
            </div>

          </div>

        </div>
      </header>

      {/* Main Layout */}
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-5 p-5">

        {/* Leaderboard */}
        <div className="col-span-3">
          <Leaderboard roomCode={roomCode} />
        </div>

        {/* Canvas + Toolbar */}
        <div className="col-span-6 flex flex-col gap-4">

          <Canvas />

          <Toolbar />

        </div>

        {/* Chat */}
        <div className="col-span-3">
          <Chat />
        </div>

      </div>

    </div>
  );
}