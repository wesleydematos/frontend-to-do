import { ReactNode } from "react";

interface IContentBox {
  children: ReactNode;
  title: string;
  text: string;
}

export const ContentBox = ({ children, title, text }: IContentBox) => {
  return (
    <div className="min-w-[340px] w-[380px] h-[224px] p-8 border-2 border-green-100 rounded-[10px] bg-gray-500 flex flex-col justify-center gap-5 mb-5 laptop:mb-10 shadow-[0_25px_30px_-15px_rgba(0,0,0,0.3)]">
      <header className="flex items-center gap-5">
        {children}
        <h2 className="text-green-100 text-3xl font-medium"> {title}</h2>
      </header>
      <p className="text-gray-100 pl-3">{text}</p>
    </div>
  );
};
