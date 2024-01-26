import { useForm, FieldErrors } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type FormType = {
  username: string;
  email: string;
  channel: string;
};

const schema = yup.object({
  username: yup.string().required("Username is required"),
  email: yup.string().email("Email is invalid").required("Email is required"),
  channel: yup.string().required("Channel is required"),
});

export const YupForm = () => {
  const form = useForm<FormType>({
    defaultValues: {
      username: "",
      email: "",
      channel: "",
    },
    resolver: yupResolver(schema),
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
