import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { socket } from "@/socket";

export default function JoinRoom() {

  const [playerName, setPlayerName] = useState("");
  const [roomCode, setRoomCode] = useState("");

  const navigate = useNavigate();


  useEffect(() => {

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });


    socket.on("join_success", (data) => {
      console.log("Joined Successfully:", data);

      // Save room data
      localStorage.setItem(
        "roomCode",
        data.room_code
      );

      localStorage.setItem(
        "playerName",
        data.player_name
      );

      navigate("/play");
    });


    socket.on("join_error", (data) => {
      console.log("Join Error:", data.message);
      alert(data.message);
    });


    return () => {
      socket.off("connect");
      socket.off("join_success");
      socket.off("join_error");
    };


  }, [navigate]);



  const joinRoom = () => {

    if (!playerName.trim() || !roomCode.trim()) {
      alert("Enter Player Name and Room Code");
      return;
    }


    if (!socket.connected) {
      socket.connect();
    }


    socket.emit(
      "join_room",
      {
        playerName: playerName,
        roomCode: roomCode.toUpperCase(),
      }
    );

  };



  return (

    <div className="bg-white rounded-xl shadow-lg p-6">

      <h2 className="text-2xl font-bold mb-5">
        Join Room
      </h2>


      <input
        type="text"
        placeholder="Player Name"
        value={playerName}
        onChange={(e) =>
          setPlayerName(e.target.value)
        }
        className="w-full border rounded-lg p-3 mb-4"
      />



      <input
        type="text"
        placeholder="Room Code"
        value={roomCode}
        onChange={(e) =>
          setRoomCode(e.target.value)
        }
        className="w-full border rounded-lg p-3 mb-6"
      />



      <Button
        className="w-full"
        onClick={joinRoom}
      >
        Join Room
      </Button>


    </div>

  );
}