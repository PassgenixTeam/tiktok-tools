import { cn } from "@heroui/react";
import type * as React from "react";

function AppMain({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("grow flex flex-col bg-zinc-100", className)} {...props}>
      {children}
    </div>
  );
}

export { AppMain };
