import { useCallback } from "react";
import { ActionIcon, Popover, Stack, Title, rem, Button } from "@mantine/core";
import { IconDotsVertical } from "@tabler/icons-react";

import themeToggleClasses from "../ThemeToggle/index.module.css";
import { useAtomValue } from "jotai";
import { addOnRequirementsAtom } from "./store";
import { Requirement, requirementsAtom } from "../Password/store";
import { useAtomCallback } from "jotai/utils";

export default function AddRequirements() {
  const addOns = useAtomValue(addOnRequirementsAtom);

  return (
    <Popover
      position="right-start"
      withArrow
      arrowSize={12}
      arrowOffset={32}
      withRoles
      withinPortal
      trapFocus
      width={rem(360)}
      offset={{ mainAxis: 28, crossAxis: -14 }}
    >
      <Popover.Target>
        <ActionIcon
          variant="default"
          size="xl"
          aria-label="Add more validation logic"
        >
          <IconDotsVertical className={themeToggleClasses.icon} />
        </ActionIcon>
      </Popover.Target>
      <Popover.Dropdown>
        <Stack>
          <Title order={5}>Add More Validation</Title>

          <Stack gap="xs">
            {addOns.map((addOn) => {
              return <AddRequirement requirement={addOn} key={addOn.label} />;
            })}
          </Stack>
        </Stack>
      </Popover.Dropdown>
    </Popover>
  );
}

function AddRequirement({ requirement }: { requirement: Requirement }) {
  const addToRequirements = useAtomCallback(
    useCallback(
      (_, set) => {
        set(requirementsAtom, (prev) => [...prev, requirement]);
        set(addOnRequirementsAtom, (prev) =>
          prev.filter((r) => r !== requirement)
        );
      },
      [requirement]
    )
  );

  return (
    <Button
      variant="outline"
      size="md"
      color="dark"
      key={requirement.label}
      onClick={addToRequirements}
    >
      {requirement.label}
    </Button>
  );
}
