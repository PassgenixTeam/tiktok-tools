import { useAppDispatch, useAppSelector } from "@/redux/store";
import { Avatar, Button, ButtonProps, cn } from "@heroui/react";
import { chooseProfile, TiktokProfile } from "./redux/tiktok-profiles.slice";

export type TikTokProfileProps = ButtonProps & {
    profile: TiktokProfile;
};

export function TikTokProfile({ className, profile, ...props }: TikTokProfileProps) {
    const dispatch = useAppDispatch();
    const { currentProfile } = useAppSelector((state) => state.tiktokProfiles);

    function handleChooseProfile() {
        dispatch(chooseProfile(profile.username));
    }

    const name = profile.name || profile.username;
    const displayName = name.trim().length > 10 ? name.slice(0, 10) + "..." : profile.username;

    return (
        <Button
            variant="light"
            className={cn("flex items-center gap-2 h-12", className)}
            {...props}
            onPress={handleChooseProfile}
        >
            <Avatar
                size="sm"
                color={currentProfile?.username === profile.username ? "primary" : "default"}
                isBordered={currentProfile?.username === profile.username}
                name={name}
            />
            <span className="truncate text-foreground text-sm font-medium" title={displayName}>
                {displayName}
            </span>
        </Button>
    );
}
