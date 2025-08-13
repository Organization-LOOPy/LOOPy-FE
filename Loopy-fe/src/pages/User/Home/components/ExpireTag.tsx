import DueDate from '../../../../components/date/Date';

interface MyStampProps {
  dueDate: Date;
}

const ExpireTag: React.FC<MyStampProps> = ({ dueDate }) => {
  return (
    <div className="flex">
      <div className=" w-[3.563rem] h-[1.25rem] px-1.5 bg-[#FF00001A] text-[#FF0000] text-[0.75rem] font-regular rounded-md mt-1 flex items-center justify-center">
        소멸 임박
      </div>
      <div className="text-[0.875rem] font-semibold text-[#FF0000] mt-1 ml-2">
        기한 ~ <DueDate date={dueDate} />
      </div>
    </div>
  );
};

export default ExpireTag;
