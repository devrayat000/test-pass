import { IconX, IconCheck } from "@tabler/icons-react";
import {
  PasswordInput,
  Progress,
  Text,
  Box,
  rem,
  Card,
  Stack,
} from "@mantine/core";
import { useAtomValue, useAtom } from "jotai/react";

import {
  type Requirement,
  requirementsAtom,
  passwordAtom,
  strengthAtom,
  meetsRequirementsAtom,
} from "./store";
import classes from "./index.module.css";

function PasswordRequirement({ requirement }: { requirement: Requirement }) {
  const meets = useAtomValue(meetsRequirementsAtom(requirement));

  return (
    <Text
      c={meets ? "teal" : "red"}
      style={{ display: "flex", alignItems: "center" }}
      mt={7}
      size="sm"
      component="p"
    >
      {meets ? (
        <IconCheck style={{ width: rem(14), height: rem(14) }} />
      ) : (
        <IconX style={{ width: rem(14), height: rem(14) }} />
      )}{" "}
      <Box component="span" ml={10}>
        {requirement.label}
      </Box>
    </Text>
  );
}

function Requirements() {
  const requirements = useAtomValue(requirementsAtom);

  return requirements.map((requirement) => (
    <PasswordRequirement key={requirement.label} requirement={requirement} />
  ));
}

export default function Password() {
  const [value, setValue] = useAtom(passwordAtom);
  const strength = useAtomValue(strengthAtom);

  return (
    <Stack
      gap="sm"
      className={classes.password}
      __vars={{ "--password-strength": `${strength.toFixed(2)}%` }}
    >
      <PasswordInput
        size="lg"
        withAsterisk
        placeholder="Your password"
        value={value}
        onChange={(event) => setValue(event.currentTarget.value)}
      />
      <Card withBorder shadow="none">
        <Progress
          value={strength}
          size={10}
          mb="xs"
          classNames={{ section: classes.progress_section }}
        />
        <Requirements />
      </Card>
    </Stack>
  );
}
