import { useForm, FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

type FormType = {
  username: string;
  email: string;
  channel: string;
};

const schema = z.object({
  username: z.string().nonempty("Username is required"),
  email: z.string().email("Email is invalid").nonempty("Email is required"),
  channel: z.string().nonempty("Channel is required"),
});

export const ZodForm = () => {
  const form = useForm<FormType>({
    defaultValues: {
      username: "",
      email: "",
      channel: "",
    },
    resolver: zodResolver(schema),
  });

  const { register, formState, handleSubmit } = form;
  const { errors } = formState;

  const onSubmit = (values: FormType) => {
    console.log({ values });
  };

  const onError = (errors: FieldErrors<FormType>) => {
    console.log({ errors });
  };

  return (
    <div>
      <h2>Zod Library</h2>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <div className="form-control">
          <label htmlFor={"username"}>Username</label>
          <input type="text" id={"username"} {...register("username")} />
          <p className="error">{errors.username?.message}</p>
        </div>
        <div className="form-control">
          <label htmlFor={"email"}>Email</label>
          <input type="email" id={"email"} {...register("email")} />
          <p className="error">{errors.email?.message}</p>
        </div>
        <div className="form-control">
          <label htmlFor={"channel"}>Channel</label>
          <input type="text" id={"channel"} {...register("channel")} />
          <p className="error">{errors.channel?.message}</p>
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
};
