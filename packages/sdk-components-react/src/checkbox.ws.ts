import { CheckboxCheckedIcon } from "@webstudio-is/icons/svg";
import {
  type WsComponentMeta,
  type PresetStyle,
  defaultStates,
} from "@webstudio-is/sdk";
import { checkbox } from "@webstudio-is/sdk/normalize.css";
import type { defaultTag } from "./checkbox";
import { props } from "./__generated__/checkbox.props";

const presetStyle = {
  input: [
    ...checkbox,
    {
      property: "margin-right",
      value: { type: "unit", unit: "em", value: 0.5 },
    },
  ],
} satisfies PresetStyle<typeof defaultTag>;

export const meta: WsComponentMeta = {
  icon: CheckboxCheckedIcon,
  presetStyle,
  states: [
    ...defaultStates,
    { selector: ":checked", label: "Checked" },
    { selector: ":required", label: "Required" },
    { selector: ":optional", label: "Optional" },
    { selector: ":disabled", label: "Disabled" },
    { selector: ":enabled", label: "Enabled" },
    { selector: ":read-only", label: "Read Only" },
    { selector: ":read-write", label: "Read Write" },
  ],
  initialProps: ["id", "class", "name", "value", "required", "checked"],
  props,
};
