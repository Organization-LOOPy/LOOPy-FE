import MessageItem from "./MessageItem";

interface Message {
  id: number;
  sender: string;
  avatar: string;
  content: string;
  date: string;
  isNew: boolean;
}

const MessageList = ({ messages }: { messages: Message[] }) => {
  return (
    <div className="flex flex-col gap-[0.5rem]">
      {messages.map((msg) => (
        <MessageItem key={msg.id} {...msg} />
      ))}
    </div>
  );
};

export default MessageList;