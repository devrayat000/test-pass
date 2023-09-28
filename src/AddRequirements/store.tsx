import { maxLength, regex } from "valibot";
import { atom } from "jotai";

import { type Requirement } from "../Password/store";

const defaulAddOnRequirements = [
  { resolver: maxLength<string>(32), label: "Includes at most 32 characters" },
  {
    resolver: regex(/(.*[a-z]){3,}/),
    label: "Includes atleast 3 lowercase letters",
  },
  {
    resolver: regex(/(.*[A-Z]){2,}/),
    label: "Includes atleast 2 uppercase letters",
  },
  { resolver: regex(/(.*[0-9]){2,}/), label: "Includes atleast 2 numbers" },
  {
    resolver: regex(/([$&+,:;=?@#|'<>.^*()%!-]){2,}/),
    label: "Includes atleast 2 special symbols",
  },
] satisfies Requirement[];

export const addOnRequirementsAtom = atom(defaulAddOnRequirements);
