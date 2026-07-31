import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { socket } from "@/socket";


interface Message {
  id: number;
  player: string;
  text: string;
}


export default function Chat() {

  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      player: "System",
      text: "🎮 Welcome to Skribbl Clone!",
    },
  ]);


  const chatEndRef = useRef<HTMLDivElement | null>(null);


  // Connect socket + receive messages
  useEffect(() => {


    if (!socket.connected) {
      socket.connect();
    }



    const receiveMessage = (data: {
      player: string;
      text: string;
    }) => {


      console.log("CHAT RECEIVED:", data);


      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          player: data.player,
          text: data.text,
        },
      ]);

    };



    socket.on(
      "receive_message",
      receiveMessage
    );



    return () => {

      socket.off(
        "receive_message",
        receiveMessage
      );

    };


  }, []);




  // Auto scroll
  useEffect(() => {

    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });

  }, [messages]);





  const sendMessage = () => {


    const text = message.trim();


    if (!text) {
      return;
    }



    const roomCode =
      localStorage.getItem("roomCode");


    const playerName =
      localStorage.getItem("playerName");



    console.log("CHAT SEND:", {
      roomCode,
      playerName,
      text
    });



    if (!roomCode || !playerName) {

      alert(
        "Room or Player missing"
      );

      return;

    }



    socket.emit(
      "send_message",
      {
        roomCode: roomCode,
        playerName: playerName,
        message: text,
      }
    );



    setMessage("");

  };





  return (

    <div className="bg-white rounded-xl shadow-lg h-[650px] flex flex-col">


      <div className="bg-blue-600 text-white p-4 rounded-t-xl">

        <h2 className="text-xl font-bold">
          💬 Chat
        </h2>

      </div>





      <div className="flex-1 overflow-y-auto p-4 space-y-3">


        {messages.map((msg)=>(

          <div
            key={msg.id}
            className="bg-gray-100 rounded-lg p-3"
          >

            <span className="font-bold text-blue-600">
              {msg.player}
            </span>


            <p>
              {msg.text}
            </p>


          </div>

        ))}



        <div ref={chatEndRef}/>


      </div>





      <div className="border-t p-3 flex gap-2">


        <input

          type="text"

          placeholder="Type message..."

          value={message}


          onChange={(e)=>
            setMessage(e.target.value)
          }


          onKeyDown={(e)=>{

            if(e.key==="Enter"){
              sendMessage();
            }

          }}


          className="flex-1 border rounded-lg px-3 py-2 outline-none"

        />



        <button

          onClick={sendMessage}

          className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-lg"

        >

          <Send size={20}/>

        </button>


      </div>


    </div>

  );
}