import CreateRoom from "./CreateRoom";
import JoinRoom from "./JoinRoom";
import PlayerList from "./PlayerList";
import { useLocation } from "react-router-dom";

export default function Lobby() {
  const location = useLocation(); // ✅ Inside component

  const roomCode =
    location.state?.roomCode || localStorage.getItem("roomCode");

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-5xl grid md:grid-cols-3 gap-6">
        <CreateRoom />
        <JoinRoom />
        <PlayerList />
      </div>
    </div>
  );
}