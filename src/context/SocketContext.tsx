import {
  createContext,
  useContext,
  useEffect,
  ReactNode,
} from "react";

import { socket } from "../socket";

type SocketContextType = {
  socket: typeof socket;
};

const SocketContext = createContext<SocketContextType | null>(null);

interface Props {
  children: ReactNode;
}

export function SocketProvider({ children }: Props) {
  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      console.log("✅ Connected:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("❌ Disconnected");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
}

export function useSocketContext() {
  const context = useContext(SocketContext);

  if (!context) {
    throw new Error(
      "useSocketContext must be used inside SocketProvider"
    );
  }

  return context;
}