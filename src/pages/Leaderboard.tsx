import { useEffect, useState } from "react";
import { Crown, Pencil } from "lucide-react";

interface Player {
  name: string;
  score: number;
  is_drawing?: boolean;
}

interface Props {
  roomCode: string;
}

export default function Leaderboard({ roomCode }: Props) {

  const [players, setPlayers] = useState<Player[]>([]);


  // Get leaderboard data
  const fetchLeaderboard = async () => {
    try {

      const response = await fetch(
        `http://127.0.0.1:8000/leaderboard/${roomCode}`
      );

      const data = await response.json();

      if (data.success) {
        setPlayers(data.players);
      }

    } catch (error) {
      console.log("Leaderboard error:", error);
    }
  };


  useEffect(() => {

    fetchLeaderboard();

    // refresh every 2 seconds
    const interval = setInterval(() => {
      fetchLeaderboard();
    }, 2000);


    return () => clearInterval(interval);

  }, [roomCode]);



  return (
    <div className="bg-white rounded-xl shadow-lg h-[650px] flex flex-col">


      {/* Header */}
      <div className="bg-green-600 text-white rounded-t-xl p-4">

        <h2 className="text-xl font-bold">
          🏆 Leaderboard
        </h2>

      </div>



      {/* Players */}
      <div className="flex-1 p-4 space-y-3">


        {players.map((player, index) => (


          <div
            key={player.name}
            className={`flex items-center justify-between rounded-lg border p-3 ${
              player.is_drawing
                ? "bg-yellow-100 border-yellow-400"
                : "bg-gray-50"
            }`}
          >


            <div className="flex items-center gap-3">


              <span className="font-bold text-lg">
                #{index + 1}
              </span>



              <div>


                <div className="flex items-center gap-2">


                  {index === 0 && (
                    <Crown
                      size={18}
                      className="text-yellow-500"
                    />
                  )}



                  <span className="font-semibold">
                    {player.name}
                  </span>



                  {player.is_drawing && (
                    <Pencil
                      size={16}
                      className="text-blue-600"
                    />
                  )}


                </div>



                {player.is_drawing && (

                  <p className="text-sm text-blue-600">
                    Drawing...
                  </p>

                )}



              </div>


            </div>




            <span className="font-bold text-green-700">
              {player.score}
            </span>



          </div>


        ))}


      </div>



      {/* Footer */}
      <div className="border-t p-4 bg-gray-50">


        <div className="flex justify-between">


          <span className="font-medium">
            Total Players
          </span>


          <span className="font-bold">
            {players.length}
          </span>


        </div>


      </div>


    </div>
  );
}