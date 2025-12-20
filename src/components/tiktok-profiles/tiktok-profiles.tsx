import { useAppDispatch, useAppSelector } from "@/redux/store";
import { Button, cn, Modal, ModalContent, useDisclosure } from "@heroui/react";
import { PlusIcon } from "lucide-react";
import { AddTikTokProfileForm } from "./add-tiktok-profile-form";
import { TikTokProfile } from "./tiktok-profile";

export function TikTokProfiles({ className, ...props }: React.ComponentProps<"div">) {
    const dispatch = useAppDispatch();
    const { availableProfiles } = useAppSelector((state) => state.tiktokProfiles);

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <div className={cn("flex items-center gap-2", className)} {...props}>
            {availableProfiles.length > 0 ? (
                availableProfiles.map((profile) => (
                    <TikTokProfile key={profile.username} profile={profile} />
                ))
            ) : (
                <div className="text-sm italic text-muted-foreground">Chưa có profile</div>
            )}

            <Button
                size="sm"
                color="primary"
                href="/setting"
                variant="flat"
                startContent={<PlusIcon size={16} />}
                onPress={onOpen}
            >
                <span className="font-medium">Thêm Profile</span>
            </Button>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => <AddTikTokProfileForm onClose={onClose} />}
                </ModalContent>
            </Modal>
        </div>
    );
}
