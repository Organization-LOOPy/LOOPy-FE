interface ReviewImageBoxProps {
  images: (string | File)[];
  onAdd: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: (index: number) => void;
}

const MAX_IMAGES = 5;

const ReviewImageBox = ({ images, onAdd, onRemove }: ReviewImageBoxProps) => {
  return (
    <div className="mt-[1rem]">
      <div className="text-[#252525] text-[1.125rem] flex items-center gap-[0.25rem]">
        <span className="font-bold">사진</span>
        <span className="text-[1.125rem] font-bold text-[#7F7F7F]">
          <span className="font-bold text-[#252525]">{images.length}</span>/5
        </span>
      </div>

      <div className="mt-[0.5rem] grid grid-cols-3 w-full gap-[0.5rem]">
        {images.map((img, i) => {
          const imageUrl = typeof img === "string" ? img : URL.createObjectURL(img);
          return (
            <div key={i} className="relative w-full h-[6.875rem] mb-[0.125rem]">
              <img
                src={imageUrl}
                alt={`preview-${i}`}
                className="w-full h-full object-cover rounded-[0.5rem]"
              />
              <button
                onClick={() => onRemove(i)}
                className="absolute top-[0.25rem] right-[0.25rem] w-[1rem] h-[1rem]"
              >
                <img src="/src/assets/images/DeletePic.svg" alt="삭제" />
              </button>
            </div>
          );
        })}

        {images.length < MAX_IMAGES && (
          <label className="w-[6.875rem] h-[6.875rem] rounded-[0.5rem] border border-dashed border-[#DFDFDF] flex items-center justify-center bg-[#F3F3F3] cursor-pointer">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onAdd}
              multiple
            />
            <img src="/src/assets/images/PlusPic.svg" alt="사진 추가" />
          </label>
        )}
      </div>
    </div>
  );
};

export default ReviewImageBox;
