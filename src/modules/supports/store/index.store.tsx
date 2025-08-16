import { create } from "zustand";

type Message = {
  sender: string;
  text: string;
};

type SupportChatSlice = {
  client: { id: string; name: string } | null;
  setClient: (client: { id: string; name: string } | null) => void;

  messages: Message[];
  addMessage: (message: Message) => void;
  setMessages: (messages: Message[]) => void;

  adminTyping: boolean;
  setAdminTyping: (typing: boolean) => void;

  socketConnected: boolean;
  setSocketConnected: (status: boolean) => void;

  resetChat: () => void;
};

export const useSupportChatStore = create<SupportChatSlice>()((set) => ({
  client: null,
  setClient: (client) => set({ client }),

  messages: [],
  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),
  setMessages: (messages) => set({ messages }),

  adminTyping: false,
  setAdminTyping: (status) => set({ adminTyping: status }),

  socketConnected: false,
  setSocketConnected: (status) => set({ socketConnected: status }),

  resetChat: () =>
    set({
      client: null,
      messages: [],
      adminTyping: false,
      socketConnected: false,
    }),
}));
