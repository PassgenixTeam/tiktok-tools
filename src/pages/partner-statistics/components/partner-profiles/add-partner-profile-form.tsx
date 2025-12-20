import { Controller, useForm } from "react-hook-form";
import { Button, cn, Form, FormProps, Input } from "@heroui/react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { addProfile } from "./redux/partner-profiles.slice";

export type AddPartnerProfileFormProps = FormProps & {
    onClose: () => void;
};

type FormData = {
    username: string;
};

export function AddPartnerProfileForm({ onClose, className, ...props }: AddPartnerProfileFormProps) {
    const dispatch = useAppDispatch();
    const { availableProfiles } = useAppSelector((state) => state.partnerProfiles);

    const { handleSubmit, control } = useForm<FormData>({
        defaultValues: {
            username: "",
        },
    });

    const onSubmit = (data: FormData) => {
        dispatch(addProfile({ username: data.username.trim() }));
        onClose();
    };

    return (
        <Form className={cn("w-full justify-center items-stretch p-4", className)} onSubmit={handleSubmit(onSubmit)} {...props}>
            <h1 className="text-center text-xl font-bold">Thêm đối tác</h1>
            
            <Controller
                control={control}
                name="username"
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
                        placeholder="@user.name"
                        name={name}
                        value={value}
                        onBlur={onBlur}
                        onChange={onChange}
                    />
                )}
                rules={{
                    validate: (value) => {
                        value = value.trim();
                        if (value.length === 0) {
                            return "Hãy nhập tên profile.";
                        }

                        const pattern = /^@[a-zA-Z0-9._]+$/;
                        if (!pattern.test(value)) {
                            return "Tên profile không hợp lệ.";
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
