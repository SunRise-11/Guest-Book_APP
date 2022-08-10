import React, { PropsWithChildren } from "react";

const Container: React.FC<
  PropsWithChildren &
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >
> = ({ children, className }) => {
  return (
    <div
      className={`py-6 px-6 border rounded-lg bg-white shadow-md ${className}`}
    >
      {children}
    </div>
  );
};

export default Container;
