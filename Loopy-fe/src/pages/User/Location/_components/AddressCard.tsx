import CommonCard from "../../../../components/card/CommonCard";

interface Props {
    dongName: string;
    isSelected?: boolean;
    onClick: () => void;
}

const AddressCard = ({ dongName, isSelected = false, onClick }: Props) => {
    return (
        <CommonCard
            onClick={onClick}
            isSelected={isSelected}
            padding="px-4 py-6" 
            className={isSelected ? "bg-[#F0F1FE]" : ""}
        >
            <div className="text-[1rem] font-medium leading-none">{dongName}</div>
        </CommonCard>
    );
};

export default AddressCard;