// SocketContext.tsx
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { io, Socket } from "socket.io-client";

interface UserInfo {
  _id: string;
  name?: string;
}

interface OnlineUser {
  _id: string;
  name?: string;
}

interface SocketContextType {
  socket: Socket | null;
  onlineUsers: OnlineUser[];
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

interface SocketProviderProps {
  children: ReactNode;
  userInfo: UserInfo | null; // <-- we pass user from props or store
}

export function SocketProvider({ children, userInfo }: SocketProviderProps) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);

  useEffect(() => {
    if (!userInfo) return;

    const newSocket = io(import.meta.env.VITE_API_URL, {
      withCredentials: true,
      query: { userId: userInfo._id },
    });

    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("✅ Connected to socket server");
    });

    newSocket.on("receiveMessage", (message) => {
      console.log("📩 Message received:", message);
    });

    newSocket.on("onlineUsers", (users: OnlineUser[]) => {
      setOnlineUsers(users);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [userInfo]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
}

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};
