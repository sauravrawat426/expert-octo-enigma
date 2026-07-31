import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-blue-600 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 text-center">

        <h1 className="text-4xl font-bold mb-3">
          🎨 Skribbl Clone
        </h1>

        <p className="text-gray-500 mb-8">
          Multiplayer Drawing & Guessing Game
        </p>

        <button
          onClick={() => navigate("/create-room")}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold text-lg transition duration-300"
        >
          Create Room
        </button>

        <button
          onClick={() => navigate("/join-room")}
          className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold text-lg transition duration-300"
        >
          Join Room
        </button>

      </div>
    </div>
  );
}