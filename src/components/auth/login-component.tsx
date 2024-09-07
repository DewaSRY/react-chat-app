import { useState } from "react";

import { Tabs } from "@mantine/core";

import UserLoginComponent from "./user-login-component";
import UserRegisterComponent from "./user-register-component";

export default function LoginComponent() {
  const [isSubmited, setIsSubmited] = useState(false);

  return (
    <Tabs defaultValue="login">
      <Tabs.List>
        <Tabs.Tab value="login">Login</Tabs.Tab>
        <Tabs.Tab value="register">Register</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="login">
        <UserLoginComponent
          submited={isSubmited}
          onStart={setIsSubmited.bind(null, true)}
          onFinishes={setIsSubmited.bind(null, false)}
        />
      </Tabs.Panel>
      <Tabs.Panel value="register">
        <UserRegisterComponent
          submited={isSubmited}
          onStart={setIsSubmited.bind(null, true)}
          onFinishes={setIsSubmited.bind(null, false)}
        />
      </Tabs.Panel>
    </Tabs>
  );
}
