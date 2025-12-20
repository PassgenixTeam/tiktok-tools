import { cn } from "@heroui/react";

export type ContainerProps = React.ComponentProps<"div">;

export function Container({ className, children, ...props }: ContainerProps) {
    return (
        <div className={cn("flex bg-white border border-gray-300 rounded-lg p-4 shadow-md shadow-gray-200", className)} {...props}>
            {children}
        </div>
    );
}
