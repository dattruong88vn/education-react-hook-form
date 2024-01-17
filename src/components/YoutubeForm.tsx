import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

let countRender = 0;

type FormValues = {
  username: string;
  email: string;
  channel: string;
};

type FormKeys = { [Key: string]: "username" | "email" | "channel" };

const FIELD_NAMES: FormKeys = {
  username: "username",
  email: "email",
  channel: "channel",
};

const YoutubeForm = () => {
  const form = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    console.log(`submit form:`, { data });
  };

  countRender++;

  // register a field
  const { register, control, handleSubmit } = form;

  return (
    <div>
      <h3>Number of render ({countRender / 2})</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor={FIELD_NAMES.username}>Username</label>
        <input
          type="text"
          id={FIELD_NAMES.username}
          {...register(FIELD_NAMES.username)}
        />

        <label htmlFor={FIELD_NAMES.email}>Email</label>
        <input
          type="email"
          id={FIELD_NAMES.email}
          {...register(FIELD_NAMES.email)}
        />

        <label htmlFor={FIELD_NAMES.channel}>Channel</label>
        <input
          type="text"
          id={FIELD_NAMES.channel}
          {...register(FIELD_NAMES.channel)}
        />

        <button>Submit</button>
      </form>

      <DevTool control={control} />
    </div>
  );
};

export default YoutubeForm;
