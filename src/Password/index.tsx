import { useState } from "react";
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

import classes from "./index.module.css";

function PasswordRequirement({
  meets,
  label,
}: {
  meets: boolean;
  label: string;
}) {
  return (
    <Text
      c={meets ? "teal" : undefined}
      style={{ display: "flex", alignItems: "center" }}
      mt={7}
      size="sm"
      className={classes.requirement}
      component="p"
    >
      {meets ? (
        <IconCheck style={{ width: rem(14), height: rem(14) }} />
      ) : (
        <IconX style={{ width: rem(14), height: rem(14) }} />
      )}{" "}
      <Box ml={10}>{label}</Box>
    </Text>
  );
}

const requirements = [
  { re: /[0-9]/, label: "Includes number" },
  { re: /[a-z]/, label: "Includes lowercase letter" },
  { re: /[A-Z]/, label: "Includes uppercase letter" },
  { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: "Includes special symbol" },
];

function getStrength(password: string) {
  let multiplier = password.length > 5 ? 0 : 1;

  requirements.forEach((requirement) => {
    if (!requirement.re.test(password)) {
      multiplier += 1;
    }
  });

  return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 0);
}

export default function Password() {
  const [value, setValue] = useState("");
  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement
      key={index}
      label={requirement.label}
      meets={requirement.re.test(value)}
    />
  ));

  const strength = getStrength(value);
  //   const color = strength === 100 ? "teal" : strength > 50 ? "yellow" : "red";

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
      <Card withBorder>
        <Progress
          value={strength}
          size={10}
          mb="xs"
          classNames={{ section: classes.progress_section }}
        />
        <PasswordRequirement
          label="Includes at least 6 characters"
          meets={value.length > 5}
        />
        {checks}
      </Card>
    </Stack>
  );
}
