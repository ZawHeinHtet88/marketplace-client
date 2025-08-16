export interface Message {
  _id: string;
  message: string;
  sender: string;
  recipient: string;
  messageType: string;
  timestamp: string;
}
