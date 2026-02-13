import type { FC } from "hono/jsx";
import { ColorInput } from "../atoms/ColorInput";

type ColorPickerFieldProps = {
  label: string;
  pickerId: string;
  textId: string;
  defaultValue: string;
};

export const ColorPickerField: FC<ColorPickerFieldProps> = (props) => (
  <div>
    <label class="block text-sm text-zinc-400 mb-1">{props.label}</label>
    <ColorInput
      pickerId={props.pickerId}
      textId={props.textId}
      defaultValue={props.defaultValue}
    />
  </div>
);
