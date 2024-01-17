import { useForm } from "react-hook-form";

const FIELD_NAMES = {
  username: "username",
  email: "email",
  channel: "channel",
};

const YoutubeForm = () => {
  const form = useForm();

  // register a field
  const { register } = form;

  return (
    <div>
      <form>
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
          type="email"
          id={FIELD_NAMES.channel}
          {...register(FIELD_NAMES.channel)}
        />

        <button>Submit</button>
      </form>
    </div>
  );
};

export default YoutubeForm;
