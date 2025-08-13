import React from "react";
//import { useNavigate } from "react-router-dom";
import SearchIcon from "/src/assets/images/Search.svg?react";

interface SearchBarProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    variant?: "map" | "search";
}

const SearchBar = ({
  value,
  onChange,
  placeholder,
  variant = "map",
}: SearchBarProps) => {
  const isMap = variant === "map";
  //const navigate = useNavigate();

  const handleClick = () => {
    
  };

  return (
    <div
      className={`
        flex items-center h-[3rem] px-4 py-[0.5625rem]
        rounded-[0.5rem] 
        ${isMap ? "bg-white shadow-[0_0_4px_0_rgba(0,0,0,0.15)]" : "bg-[#F5F5F5]"}
      `}
      onClick={handleClick}
    >
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="flex-1 border-none outline-none bg-transparent text-[1rem] font-normal text-black"
      />
      <SearchIcon
        className="w-6 h-6 ml-2"
      />
    </div>
  );
};

export default SearchBar;