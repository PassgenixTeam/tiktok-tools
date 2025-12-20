import { Button, ButtonProps, cn } from "@heroui/react";
import type * as React from "react";
import { Link, NavLink } from "react-router-dom";

type AppSideBarProps = ButtonProps & {
  to: string;
  isActive?: boolean;
  icon: React.ReactNode;
};

function AppSideBarItem({
  to,
  className,
  icon,
  children,
  ...props
}: AppSideBarProps) {
  return (
    <NavLink to={to} className="flex flex-col items-stretch group">
      <Button
        className={cn(
          "relative flex justify-start gap-2 py-2 rounded-none group-[.active]:bg-primary-50 group-[.active]:text-primary-500",
          className
        )}
        variant="light"
        {...props}
      >
        <div
          className={cn(
            "shrink-0 flex w-4 h-4 justify-center items-center"
          )}
        >
          {icon}
        </div>
        {children}
      </Button>
    </NavLink>
  );
}

function AppSideBar({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("shrink-0 flex flex-col", className)} {...props}>
      {children}
    </div>
  );
}

export { AppSideBar, AppSideBarItem };
