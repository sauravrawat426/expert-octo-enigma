import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function PlayerList() {
  const navigate = useNavigate();

  const players = [
    { id: 1, name: "Rahul", score: 120 },
    { id: 2, name: "Aman", score: 80 },
    { id: 3, name: "Rohit", score: 40 },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-5">Players</h2>

      <div className="space-y-3">
        {players.map((player) => (
          <div
            key={player.id}
            className="flex justify-between border rounded-lg p-3"
          >
            <span>{player.name}</span>
            <span className="font-semibold">{player.score}</span>
          </div>
        ))}
      </div>

      <Button
        className="w-full mt-6"
        onClick={() => navigate("/play")}
      >
        Start Game
      </Button>
    </div>
  );
}