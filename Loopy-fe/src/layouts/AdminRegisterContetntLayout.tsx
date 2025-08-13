interface Props {
  children: React.ReactNode;
}

export default function AdminRegisterContentLayout({ children }: Props) {
  return (
    <div
      className="pt-[9rem] pb-[6.5rem] w-full max-w-[1024px] mx-auto px-[1.5rem] flex flex-col flex-grow overflow-y-auto custom-scrollbar"
    >
      {children}
    </div>
  );
}
