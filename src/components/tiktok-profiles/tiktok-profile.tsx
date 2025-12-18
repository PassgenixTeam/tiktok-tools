import { useAppDispatch, useAppSelector } from "@/redux/store";
import { Avatar, Button, ButtonProps, cn } from "@heroui/react";
import { chooseProfile } from "./redux/tiktok-profiles.slice";

export type TikTokProfileProps = ButtonProps & {
    name: string;
};

export function TikTokProfile({ className, name, ...props }: TikTokProfileProps) {
    const dispatch = useAppDispatch();
    const {currentProfile} = useAppSelector((state) => state.tiktokProfiles);

    function handleChooseProfile() {
        dispatch(chooseProfile(name));
    }

    const displayName = name.trim().length > 10 ? name.slice(0, 10) + "..." : name;

    return (
        <Button variant="light" className={cn("flex items-center gap-2 h-12", className)} {...props} onPress={handleChooseProfile}>
            <Avatar size="sm" color={currentProfile?.name === name ? "primary" : "default"} isBordered={currentProfile?.name === name} name={name} />

            <span className="truncate text-foreground text-sm font-medium" title={displayName}>
                {displayName}
            </span>
        </Button>
    );
}
