import React from "react";
import { useNavigate } from "react-router-dom";

interface SearchBarProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    variant?: "map" | "search";
    top?: string;
}

const SearchBar = ({
    value,
    onChange,
    placeholder,
    top = "4.1875rem",   // default: 67px
    variant = "map",
}: SearchBarProps) => {
    const isMap = variant === "map";

    const navigate = useNavigate();

    const handleClick = () => {
        if (location.pathname.includes("/map")) {
        navigate("/map/location");
        } else {
        navigate("/search/location");
        }
    };

    return (
        <div
            className="absolute w-full z-20"
            style={{ top }}
        >
            <div 
                className={`
                    flex items-center h-[3rem] px-4 py-[0.5625rem]
                    rounded-[0.5rem]
                    ${isMap ? "bg-white shadow-[0_4px_4px_rgba(0,0,0,0.15)]" : "bg-[#F5F5F5]"}
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
                <img
                    src="/src/assets/images/Search.svg"
                    alt="검색"
                    className="w-4 h-4 ml-2"
                />
            </div>
        </div>
    );
};

export default SearchBar;