import { defaultStates, type WsComponentMeta } from "@webstudio-is/sdk";
import { sup } from "@webstudio-is/sdk/normalize.css";
import { props } from "./__generated__/superscript.props";

export const meta: WsComponentMeta = {
  label: "Superscript Text",
  states: defaultStates,
  presetStyle: { sup },
  initialProps: ["id", "class"],
  props,
};
