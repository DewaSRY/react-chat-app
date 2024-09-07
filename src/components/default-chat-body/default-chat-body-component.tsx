import { Title, Text, Button, Container } from "@mantine/core";
import DotsComponent from "./dots-component";
import classes from "./HeroText.module.css";

import useUsersModal from "@/zustand/use-users-modal";
export default function DefaultChatBodyComponent() {
  const { handleOpen } = useUsersModal();
  return (
    <Container className={classes.wrapper} size={1400}>
      <DotsComponent className={classes.dots} style={{ left: 0, top: 0 }} />
      <DotsComponent className={classes.dots} style={{ left: 60, top: 0 }} />
      <DotsComponent className={classes.dots} style={{ left: 0, top: 140 }} />
      <DotsComponent className={classes.dots} style={{ right: 0, top: 60 }} />

      <div className={classes.inner}>
        <Title className={classes.title}>React Chat APP </Title>

        <Container p={0} size={600}>
          <Text size="lg" c="dimmed" className={classes.description}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
            voluptate odit error totam temporibus voluptas incidunt illum,
            voluptatum sed sint. Twitter.
          </Text>
        </Container>

        <div className={classes.controls}>
          <Button
            onClick={handleOpen}
            className={classes.control}
            size="xl"
            variant="default"
            color="gray"
          >
            FInd Someoen to Talk
          </Button>
        </div>
      </div>
    </Container>
  );
}
