import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateRoom() {
  const navigate = useNavigate();

  const [roomName, setRoomName] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [maxPlayers, setMaxPlayers] = useState(8);
  const [rounds, setRounds] = useState(3);
  const [loading, setLoading] = useState(false);

  const handleCreateRoom = async () => {
    if (!roomName.trim() || !playerName.trim()) {
      alert("Please enter Room Name and Player Name");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/room/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          room_name: roomName,
          player_name: playerName,
          max_players: maxPlayers,
          rounds: rounds,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Failed to create room");
      }

      console.log("Room Created:", data);

      // Backend se room code save karo
      localStorage.setItem("roomCode", data.room_code);
      localStorage.setItem("playerName", playerName);

      // Lobby page par bhejo
      navigate("/lobby", {
        state: {
          roomCode: data.room_code,
          playerName: playerName,
        },
      });

    } catch (error: any) {
      console.error(error);
      alert(error.message || "Unable to create room.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-center mb-6">
          🎨 Create Room
        </h1>

        <div className="space-y-4">

          <input
            type="text"
            placeholder="Player Name"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            className="w-full border rounded-lg px-4 py-3"
          />

          <input
            type="text"
            placeholder="Room Name"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            className="w-full border rounded-lg px-4 py-3"
          />

          <div>
            <label className="font-semibold">Max Players</label>

            <select
              value={maxPlayers}
              onChange={(e) => setMaxPlayers(Number(e.target.value))}
              className="w-full mt-2 border rounded-lg p-3"
            >
              {[2, 4, 6, 8, 10, 12, 16, 20].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-semibold">Rounds</label>

            <select
              value={rounds}
              onChange={(e) => setRounds(Number(e.target.value))}
              className="w-full mt-2 border rounded-lg p-3"
            >
              {[2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleCreateRoom}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg"
          >
            {loading ? "Creating..." : "Create Room"}
          </button>

        </div>
      </div>
    </div>
  );
}