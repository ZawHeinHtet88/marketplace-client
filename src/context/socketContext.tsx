// import { useAppStore } from "@/store";
import { io } from "socket.io-client";
import { createContext, useRef, useEffect, useContext, useState } from "react";
import { API_BASE_URL } from "@/lib/axios";


const SocketContext = createContext(null);

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);

  const [onlineUsers, setOnlineUsers] = useState([]); // State for online users

  const BACKEND_URL = API_BASE_URL;

  const userInfo = {}

  //   const {
  //     userInfo,
  //     selectedChatData,
  //     selectedChatType,
  //     addMessage,
  //     addChannelInChannelList,
  //     addContactsInDM,
  //   } = useAppStore();

  useEffect(() => {
    if (userInfo) {

      // Initialize socket connection
      const socket = io(BACKEND_URL, {
        withCredentials: true,
        query: { userId: userInfo._id },
      });

      setSocket(socket);
      socket.on("connect", () => {
        console.log("Connected to socket server");
      });

      // Define the message handler function
      const handleReceiveMessage = (message) => {
        // Check if message is from the selected chat
        // if (
        //   selectedChatType &&
        //   (selectedChatData._id === message.sender._id ||
        //     selectedChatData._id === message.recipient._id)
        // ) {
        //   addMessage(message);
        // } else {
        //   console.log("Message not relevant to selected chat.");
        // }
        // addContactsInDM(message);
      };




      // Listen for 'receiveMessage' event
      socket.on("receiveMessage", handleReceiveMessage);
      socket.on("onlineUsers", (users) => setOnlineUsers(users));

      return () => {
        if (socket) {
          socket.off("receiveMessage");
          socket.off("recieveChannelMessage");
          socket.off("forexUpdate");
          socket.off("joinAndLeaveChannel");
          socket.disconnect();
        }
      };
    }
  }, [
    // userInfo,
    // addMessage,
    // selectedChatData?._id,
    // selectedChatType,
    // addChannelInChannelList,
    // addContactsInDM,

  ]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
}

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};


///////////// Send Message /////////////////
// get socket from context api 
//     socket.emit("sendMessage", {
//         sender: userInfo._id,
//         message,
//         recipient: selectedChatData._id,
//         messageType: "text",
//         fileUrl: undefined,
//       });
/////////////////////////////////////////////