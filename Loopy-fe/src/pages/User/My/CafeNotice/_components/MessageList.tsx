import MessageItem from "./MessageItem";

interface Message {
  id: number;
  sender: string;
  avatar: string;
  content: string;
  date: string;
  isNew: boolean;
}

interface MessageListProps {
  messages: Message[];
  onOpen: (id: number) => void;
}

const MessageList = ({ messages, onOpen }: MessageListProps) => {
  return (
    <div className="flex flex-col gap-[0.5rem]">
      {messages.map((msg) => (
        <MessageItem
          key={msg.id}
          {...msg}
          onOpen={() => onOpen(msg.id)}
        />
      ))}
    </div>
  );
};

export default MessageList;
