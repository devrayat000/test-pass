import { atom } from "jotai";
import { atomFamily } from "jotai/utils";
import { minLength, regex, type PipeResult, string, safeParse } from "valibot";

export interface Requirement {
  resolver: (input: string) => PipeResult<string>;
  label: string;
}

const defaultRequirements = [
  { resolver: minLength<string>(6), label: "Includes at least 6 characters" },
  { resolver: regex(/(.*[a-z])/), label: "Includes lowercase letter" },
  { resolver: regex(/(.*[A-Z])/), label: "Includes uppercase letter" },
  { resolver: regex(/(.*[0-9])/), label: "Includes number" },
  {
    resolver: regex(/([$&+,:;=?@#|'<>.^*()%!-])/),
    label: "Includes special symbol",
  },
] satisfies Requirement[];

const requirementsAtom = atom(defaultRequirements);

const passwordAtom = atom("");

const strengthAtom = atom((get) => {
  const password = get(passwordAtom);
  const requirements = get(requirementsAtom);
  const schema = string(requirements.map((r) => r.resolver));
  const result = safeParse(schema, password);
  if (result.success) {
    return 100;
  }

  return Math.fround((1 - result.issues.length / requirements.length) * 100);
});

const meetsRequirementsAtom = atomFamily(
  (requirement: Requirement) =>
    atom((get) => {
      const schema = string([requirement.resolver]);
      const password = get(passwordAtom);

      return safeParse(schema, password).success;
    }),
  (a, b) => a.label === b.label
);

export { requirementsAtom, passwordAtom, strengthAtom, meetsRequirementsAtom };
