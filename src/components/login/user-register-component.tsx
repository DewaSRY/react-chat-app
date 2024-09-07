import { cn } from "@/lib/utils";
import React, { ComponentProps, PropsWithChildren, useState } from "react";
import { toast } from "react-toastify";
import { userLogin, userRegister } from "@/firebase/user-utils";
import FormButtonComponent from "./form-button-component";

interface UserRegisterComponentProps
  extends ComponentProps<"div">,
    PropsWithChildren {
  onStart: () => void;
  onFinishes: () => void;
  submited: boolean;
}

export default function UserRegisterComponent({
  children,
  onStart,
  onFinishes,
  submited,
  ...resProps
}: UserRegisterComponentProps) {
  const [avatar, setAvatar] = useState({
    file: null as File | null,
    url: "",
  });
  function handleAvatar(e: React.ChangeEvent<HTMLInputElement>) {
    const formElement = e.target as HTMLInputElement;
    if (!formElement) return;
    if (!formElement.files) return;
    if (formElement.files[0]) {
      setAvatar({
        file: formElement.files[0],
        url: URL.createObjectURL(formElement.files[0]),
      });
    }
  }
  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formElement = e.target as HTMLFormElement;
    const formData = new FormData(formElement);
    onStart();
    try {
      await userRegister({
        username: formData.get("username")?.toString() ?? "",
        email: formData.get("email")?.toString() ?? "",
        password: formData.get("password")?.toString() ?? "",
        avatar: avatar.file!,
      });
      toast.success("Account created! You can login now!");
    } catch (error) {
      console.log(error);
    } finally {
      onFinishes();
    }
  }
  return (
    <div className="w-full h-full">
      <h2 className="text-2xl my-10 text-white">Create an Account</h2>
      <form
        onSubmit={handleRegister}
        className={cn(
          "flex flex-col gap-2 max-w-[600px] text-gray-800",
          "[&>input]:p-2 [&>input]:bg-white/80 [&>input]:outline-none [&>input]:border-none"
        )}
      >
        <label htmlFor="file" className="flex items-center  gap-4">
          <div className="w-[50px] h-[50px]">
            <img
              className="aspect-square"
              src={avatar.url || "./avatar.png"}
              alt=""
            />
          </div>
          <span className="text-white">Upload an image</span>
        </label>
        <input
          type="file"
          id="file"
          style={{ display: "none" }}
          onChange={handleAvatar}
          required
        />
        <input required type="text" placeholder="Username" name="username" />
        <input required type="text" placeholder="Email" name="email" />
        <input
          required
          type="password"
          placeholder="Password"
          name="password"
          defaultValue="April10Dua004"
        />
        <FormButtonComponent isSubmited={submited}>Sing Up</FormButtonComponent>
      </form>
    </div>
  );
}
