import { Container, ContainerProps } from "@/components/container/container";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
    Avatar,
    Button,
    Card,
    CardHeader,
    cn,
    Modal,
    ModalContent,
    useDisclosure,
} from "@heroui/react";
import { PlusIcon } from "lucide-react";
import { AddPartnerProfileForm } from "./add-partner-profile-form";
import { Grid } from "@/components/grid/grid";
import { GridCell } from "@/components/grid/grid-cell";

export function PartnerProfiles({ className, ...props }: ContainerProps) {
    const dispatch = useAppDispatch();
    const { availableProfiles } = useAppSelector((state) => state.partnerProfiles);

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <Container className={cn("flex-col items-stretch gap-4", className)} {...props}>
            <div className="flex justify-between items-center">
                <div className="grow flex flex-col">
                    <h1 className="text-gray-900 font-semibold">Danh sách đối tác</h1>
                    <span className="text-gray-500 text-xs">
                        Bạn đang có {availableProfiles.length} đối tác
                    </span>
                </div>
                <div className="flex items-center">
                    <Button
                        size="sm"
                        color="primary"
                        href="/setting"
                        variant="solid"
                        startContent={<PlusIcon size={16} />}
                        onPress={onOpen}
                    >
                        <span className="font-medium">Thêm đối tác</span>
                    </Button>

                    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                        <ModalContent>
                            {(onClose) => <AddPartnerProfileForm onClose={onClose} />}
                        </ModalContent>
                    </Modal>
                </div>
            </div>

            {availableProfiles.length > 0 && (
                <Grid>
                    {availableProfiles.map((profile) => (
                        <GridCell key={profile.name} className="basis-1/3">
                            <Card shadow="none" className="grow border border-gray-100">
                                <CardHeader className="justify-between">
                                    <div className="flex gap-5">
                                        <Avatar
                                            isBordered
                                            radius="full"
                                            size="md"
                                            // src="https://heroui.com/avatars/avatar-1.png"
                                            name={profile.username}
                                        />
                                        <div className="flex flex-col gap-1 items-start justify-center">
                                            <h4 className="text-small font-semibold leading-none text-default-900">
                                                {profile.name || "Đối tác mới"}
                                            </h4>
                                            <h5 className="text-small tracking-tight text-default-400">
                                                {profile.username}
                                            </h5>
                                        </div>
                                    </div>
                                </CardHeader>
                            </Card>
                        </GridCell>
                    ))}
                </Grid>
            )}
        </Container>
    );
}
