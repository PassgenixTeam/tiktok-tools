import { Controller, useForm } from "react-hook-form";
import { Button, cn, Form, FormProps, Input } from "@heroui/react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { addProfile } from "./redux/tiktok-profiles.slice";

export type AddTikTokProfileFormProps = FormProps & {
    onClose: () => void;
};

type FormData = {
    name: string;
};

export function AddTikTokProfileForm({ onClose, className, ...props }: AddTikTokProfileFormProps) {
    const dispatch = useAppDispatch();
    const { availableProfiles } = useAppSelector((state) => state.tiktokProfiles);

    const { handleSubmit, control } = useForm<FormData>({
        defaultValues: {
            name: "",
        },
    });

    const onSubmit = (data: FormData) => {
        dispatch(addProfile({ name: data.name.trim() }));
        onClose();
    };

    return (
        <Form className={cn("w-full justify-center items-stretch p-4", className)} onSubmit={handleSubmit(onSubmit)} {...props}>
            <h1 className="text-center text-xl font-bold">Thêm Profile TikTok</h1>
            
            <Controller
                control={control}
                name="name"
                render={({
                    field: { name, value, onChange, onBlur, ref },
                    fieldState: { invalid, error },
                }) => (
                    <Input
                        ref={ref}
                        isRequired
                        errorMessage={error?.message}
                        // Let React Hook Form handle validation instead of the browser.
                        validationBehavior="aria"
                        isInvalid={invalid}
                        label="Tên Profile"
                        name={name}
                        value={value}
                        onBlur={onBlur}
                        onChange={onChange}
                    />
                )}
                rules={{
                    required: "Hãy nhập tên profile.",
                    validate: (value) => {
                        value = value.trim();
                        if (value.length === 0) {
                            return "Hãy nhập tên profile.";
                        }

                        if (availableProfiles.find((profile) => profile.name === value)) {
                            return "Profile với tên này đã tồn tại.";
                        }

                        return true;
                    },
                }}
            />

            <div className="flex justify-end items-center">
                <Button type="button" variant="bordered" color="danger" onPress={onClose} className="mr-2">Hủy</Button>
                <Button type="submit" color="primary">Thêm</Button>
            </div>
        </Form>
    );
}
