import React from "react";

type Props = { children: React.ReactNode };

const GridCard = ({ children }: Props) => {
  return (
    <div className="border-4 border-primary rounded-xl flex justify-center items-center min-h-[10dvh]">
      {children}
    </div>
  );
};

export default GridCard;
