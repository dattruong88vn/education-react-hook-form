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
  const form = useForm<FormValues>({
    // object
    // defaultValues: {
    //   username: "",
    //   email: "",
    //   channel: ""
    // }
    // function
    defaultValues: async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users/7"
      );
      const data = await response.json();
      return {
        username: "datnhang",
        email: data.email,
        channel: "",
      };
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log(`submit form:`, { data });
  };

  countRender++;

  // register a field
  const { register, control, handleSubmit, formState } = form;

  // console.log({ formState });
  const { errors } = formState;
  // console.log({ errors });

  return (
    <div>
      <h3>Number of render ({countRender / 2})</h3>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="form-control">
          <label htmlFor={FIELD_NAMES.username}>Username</label>
          <input
            type="text"
            id={FIELD_NAMES.username}
            {...register(FIELD_NAMES.username, {
              required: "Username is required",
            })}
          />
          <p className="error">{errors.username?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor={FIELD_NAMES.email}>Email</label>
          <input
            type="email"
            id={FIELD_NAMES.email}
            {...register(FIELD_NAMES.email, {
              required: "Email is required",
              pattern: {
                value:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: "Invalid email format",
              },
              validate: {
                notAdmin: (fieldValue) => {
                  return (
                    fieldValue !== "admin@example.com" || "Enter another email"
                  );
                },
                notBlackList: (fieldValue) => {
                  return (
                    !fieldValue.endsWith("baddomain.com") ||
                    "This domain is not support"
                  );
                },
              },
            })}
          />
          <p className="error">{errors.email?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor={FIELD_NAMES.channel}>Channel</label>
          <input
            type="text"
            id={FIELD_NAMES.channel}
            {...register(FIELD_NAMES.channel, {
              required: "Channel is required",
            })}
          />
          <p className="error">{errors.channel?.message}</p>
        </div>

        <button>Submit</button>
      </form>

      <DevTool control={control} />
    </div>
  );
};

export default YoutubeForm;
