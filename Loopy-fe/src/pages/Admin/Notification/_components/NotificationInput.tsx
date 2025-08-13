import { useState, useRef, useEffect } from 'react';

interface NotificationInputProps {
  placeholder?: string;
  maxLength?: number;
}

const NotificationInput: React.FC<NotificationInputProps> = ({
  placeholder = '메시지를 입력해주세요.',
  maxLength = 500,
}) => {
  const [inputValue, setInputValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    if (newValue.length <= maxLength) {
      setInputValue(newValue);
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // 컨텐츠 높이만큼 조정
    }
  }, [inputValue]);

  return (
    <div className="w-[34rem] relative">
      <textarea
        ref={textareaRef}
        className="w-[34rem] bg-[#F3F3F3] rounded-md p-4 pr-16 resize-none focus:outline-none min-h-[11.5rem] overflow-hidden"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleChange}
      />
      <div className="absolute bottom-4 right-4 text-[#7F7F7F]">
        <span className="font-extrabold text-[#252525] text-[1rem]">
          {inputValue.length}
        </span>{' '}
        / <span className="text-[#7F7F7F]">{maxLength}</span>
      </div>
    </div>
  );
};

export default NotificationInput;
