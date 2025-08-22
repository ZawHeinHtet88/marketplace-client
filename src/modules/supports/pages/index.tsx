import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSocket } from "@/context/socketContext";
import { useAuthStore } from "@/modules/auth/store/index.store";
import { SendHorizonal } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useGetAdminIdQuery, useGetAllMessagesQuery } from "../hooks/queries";
import { useSupportChatStore } from "../store/index.store";
export default function CustomerSupportPage() {
  const { messages, addMessage } = useSupportChatStore((state) => state);
  const { user } = useAuthStore((state) => state);
  const [input, setInput] = useState("");
  const { socket } = useSocket();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const {data:adminData} = useGetAdminIdQuery();

  const { data, isFetched,isLoading } = useGetAllMessagesQuery(adminData?.adminId ?? "");
  useEffect(() => {
    if (isFetched && data?.data) {
      data?.data.map((msg) => {
        addMessage({
          sender: msg.sender === user?.id ? "user" : "customer",
          text: msg.message,
        });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isFetched]);
  // Auto scroll when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!socket) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onReceive = (msg: any) => {
      console.log("Received message:", msg);

      // Ignore if the message originated from me
      const senderId = String(msg?.sender?._id ?? msg?.sender ?? "");
      if (senderId === String(user?.id ?? "")) return;

      addMessage({
        sender: "customer", // your UI schema
        text: msg.message,
      });
    };

    socket.on("receiveMessage", onReceive);
    return () => {
      socket.off("receiveMessage", onReceive);
    };
  }, [socket, user?.id, addMessage]);

  const handleSend = () => {
    if (!input.trim()) return;

    addMessage({
      sender: "user",
      text: input,
    });

    if (socket) {
      socket.emit("sendMessage", {
        message: input,
        sender: user?.id,
        recipient: "6888d0f3b50e11c8196701db",
        messageType: "text",
      });
    }

    setInput("");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Hero Section */}
      <section className="py-12 px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">We’re Here to Help</h1>
        <p className="text-lg max-w-2xl mx-auto">
          Need assistance? Our friendly support team and AI chatbot are ready to
          answer your questions and guide you every step of the way.
        </p>
      </section>

      {/* Chat Section */}
      <div className="flex items-center justify-center flex-1 p-4">
        <Card className="w-full max-w-2xl shadow-xl border rounded-2xl p-0">
          <CardHeader className="bg-blue-600 text-white rounded-t-2xl pt-3">
            <CardTitle className="text-lg">Live Support Chat</CardTitle>
          </CardHeader>
          <CardContent className="p-0 flex flex-col h-[70vh] overflow-y-scroll">
            {isLoading && (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">Loading messages...</p>
              </div>
            )}
            <ScrollArea className="flex-1 p-4 space-y-6">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex mb-1 ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`px-4 py-2 rounded-2xl max-w-xs text-sm shadow-md ${
                      msg.sender === "user"
                        ? "bg-blue-500 text-white rounded-br-none"
                        : "bg-gray-200 text-gray-900 rounded-bl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </ScrollArea>
          </CardContent>
          <CardFooter>
            <div className="p-4 border-t flex gap-2 w-full">
              <Input
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              {/* <Button onClick={handleSend}>
                <Link className="w-4 h-4" />
              </Button> */}
              <Button onClick={handleSend}>
                <SendHorizonal className="w-4 h-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
