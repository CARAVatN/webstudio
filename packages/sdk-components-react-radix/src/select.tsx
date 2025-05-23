import {
  type ForwardRefExoticComponent,
  type ComponentProps,
  type ComponentPropsWithoutRef,
  forwardRef,
  type RefAttributes,
  useContext,
  type ComponentPropsWithRef,
  useState,
  useEffect,
} from "react";
import {
  Root,
  Value,
  Trigger,
  Content,
  Item,
  ItemIndicator,
  ItemText,
  Portal,
  Viewport,
} from "@radix-ui/react-select";
import {
  type Hook,
  getClosestInstance,
  ReactSdkContext,
} from "@webstudio-is/react-sdk/runtime";

export const Select: ForwardRefExoticComponent<
  ComponentPropsWithRef<typeof Root>
> = forwardRef(({ defaultOpen, defaultValue, ...props }, _ref) => {
  // open state
  const currentOpen = props.open ?? defaultOpen ?? false;
  const [open, setOpen] = useState(currentOpen);
  // synchronize external value with local one when changed
  useEffect(() => setOpen(currentOpen), [currentOpen]);
  // value state
  const currentValue = props.value ?? defaultValue ?? "";
  const [value, setValue] = useState(currentValue);
  // synchronize external value with local one when changed
  useEffect(() => setValue(currentValue), [currentValue]);
  return (
    <Root
      {...props}
      open={open}
      onOpenChange={setOpen}
      value={value}
      onValueChange={setValue}
    />
  );
});

export const SelectTrigger = forwardRef<
  HTMLButtonElement,
  ComponentPropsWithoutRef<typeof Trigger>
>((props, ref) => {
  const { renderer } = useContext(ReactSdkContext);

  const onPointerDown =
    renderer === "canvas"
      ? (event: React.PointerEvent) => {
          event.preventDefault();
        }
      : undefined;

  return <Trigger onPointerDown={onPointerDown} ref={ref} {...props} />;
});

export const SelectValue = forwardRef<
  HTMLDivElement,
  Omit<ComponentPropsWithoutRef<typeof Value>, "placeholder"> & {
    placeholder?: string;
  }
>((props, ref) => {
  return <Value ref={ref} {...props} />;
});

export const SelectContent = forwardRef<
  HTMLDivElement,
  Omit<ComponentPropsWithoutRef<typeof Content>, "position" | "side">
>((props, ref) => {
  return (
    <Portal>
      <Content ref={ref} {...props} position="popper" />
    </Portal>
  );
});

export const SelectViewport: ForwardRefExoticComponent<
  ComponentProps<typeof Viewport> & RefAttributes<HTMLDivElement>
> = Viewport;

export const SelectItem: ForwardRefExoticComponent<
  ComponentProps<typeof Item> & RefAttributes<HTMLDivElement>
> = Item;

export const SelectItemIndicator: ForwardRefExoticComponent<
  ComponentProps<typeof ItemIndicator> & RefAttributes<HTMLSpanElement>
> = ItemIndicator;

export const SelectItemText: ForwardRefExoticComponent<
  ComponentProps<typeof ItemText> & RefAttributes<HTMLSpanElement>
> = ItemText;

/* BUILDER HOOKS */

const namespace = "@webstudio-is/sdk-components-react-radix";

// For each SelectContent component within the selection,
// we identify its closest parent Select component
// and update its open prop bound to variable.
export const hooksSelect: Hook = {
  onNavigatorUnselect: (context, event) => {
    for (const instance of event.instancePath) {
      if (instance.component === `${namespace}:SelectContent`) {
        const select = getClosestInstance(
          event.instancePath,
          instance,
          `${namespace}:Select`
        );
        if (select) {
          context.setMemoryProp(select, "open", undefined);
        }
      }
    }
  },
  onNavigatorSelect: (context, event) => {
    for (const instance of event.instancePath) {
      if (instance.component === `${namespace}:SelectContent`) {
        const select = getClosestInstance(
          event.instancePath,
          instance,
          `${namespace}:Select`
        );
        if (select) {
          context.setMemoryProp(select, "open", true);
        }
      }
    }
  },
};
