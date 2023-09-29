import { Group, Card, Title, Box } from "@mantine/core";

import ThemeToggle from "../ThemeToggle";
import Password from "../Password";
import classes from "./index.module.css";
import AddRequirements from "../AddRequirements";
import icon from "../assets/icon.png";

export default function Container() {
  return (
    <Card withBorder shadow="md" radius="md">
      <Group justify="space-between" className={classes.group}>
        <Group align="center">
          <img src={icon} alt="Icon" height={36} width={36} />
          <Title order={1} className={classes.title}>
            Password Strength Tester
          </Title>
        </Group>
        <Group gap="md">
          <ThemeToggle />
          <AddRequirements />
        </Group>
      </Group>
      <Box mt="xl">
        <Password />
      </Box>
    </Card>
  );
}
