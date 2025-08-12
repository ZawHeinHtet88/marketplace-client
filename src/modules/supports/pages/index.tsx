import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send } from "lucide-react";
import { useSocket } from "@/context/socketContext";

export default function CustomerSupportPage() {
  const [messages, setMessages] = useState([
    { sender: "admin", text: "Hello! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const { socket } = useSocket();

  useEffect(() => {
    if (!socket) return;

    console.log("revived message")
    socket.on("receiveMessage", (message) => {
      setMessages((prev) => [...prev, { sender: "admin", text: message }]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [socket]);

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", text: input }]);

    if (socket) {
      socket.emit("sendMessage", input);
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
          <CardContent className="p-0 flex flex-col h-[70vh]">
            <ScrollArea className="flex-1 p-4 space-y-3">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${
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
            </ScrollArea>
            <div className="p-4 border-t flex gap-2">
              <Input
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <Button onClick={handleSend}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
