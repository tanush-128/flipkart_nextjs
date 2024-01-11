import { ReactNode } from "react";
import { cn } from "~/lib/utils";

export const MaxWidthWrapper = ({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}) => {
  return (
    <div
      className={cn(
        "mx-auto flex max-w-8xl items-center justify-evenly gap-8",
        className,
      )}
    >
      {children}
    </div>
  );
};
