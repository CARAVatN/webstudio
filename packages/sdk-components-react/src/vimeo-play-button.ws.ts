import { defaultStates, type WsComponentMeta } from "@webstudio-is/sdk";
import { ButtonElementIcon } from "@webstudio-is/icons/svg";
import { button } from "@webstudio-is/sdk/normalize.css";
import { props } from "./__generated__/vimeo-play-button.props";

export const meta: WsComponentMeta = {
  category: "hidden",
  label: "Play Button",
  icon: ButtonElementIcon,
  states: defaultStates,
  contentModel: {
    category: "none",
    children: ["instance"],
  },
  presetStyle: { button },
  initialProps: ["id", "class"],
  props,
};
