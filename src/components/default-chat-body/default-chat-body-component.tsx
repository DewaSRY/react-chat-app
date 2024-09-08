import { Title, Text, Button, Container } from "@mantine/core";
import DotsComponent from "./dots-component";
import classes from "./HeroText.module.css";
import { Plus, Sparkles } from "lucide-react";

import useUsersModal from "@/zustand/use-users-modal";
import useBody from "@/zustand/use-body";
export default function DefaultChatBodyComponent() {
  const { handleOpen } = useUsersModal();
  const { setCurrentActive } = useBody();
  return (
    <Container className="relative" size={1400}>
      <DotsComponent className={classes.dots} style={{ left: 0, top: 0 }} />
      <DotsComponent className={classes.dots} style={{ left: 60, top: 0 }} />
      <DotsComponent className={classes.dots} style={{ left: 0, top: 140 }} />
      <DotsComponent className={classes.dots} style={{ right: 0, top: 60 }} />

      <div className="max-w-[600px] mx-auto md:my-[10vh]">
        <Title className="text-center text-3xl">React Chat APP </Title>
        <Container p={0} size={600} className="mb-10">
          <Text size="lg" c="dimmed" className="mb-8">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
            voluptate odit error totam temporibus voluptas incidunt illum,
            voluptatum sed sint. Twitter.
          </Text>
        </Container>
        <div
          className={"flex justify-between flex-col lg:flex-row  mx-auto gap-4"}
        >
          <Button color="gray" onClick={handleOpen} className="w-full ">
            FInd Someoen to Talk <Plus className="ml-2" />
          </Button>
          <Button
            onClick={setCurrentActive.bind(null, "gemini")}
            className="w-full bg-blue-600"
          >
            Chat with Gemini <Sparkles className="ml-2" />
          </Button>
        </div>
      </div>
    </Container>
  );
}
