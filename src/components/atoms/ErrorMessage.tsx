import type { FC } from "hono/jsx";

type ErrorMessageProps = {
  id: string;
};

export const ErrorMessage: FC<ErrorMessageProps> = (props) => (
  <p id={props.id} class="text-red-500 text-sm mt-2 hidden"></p>
);
