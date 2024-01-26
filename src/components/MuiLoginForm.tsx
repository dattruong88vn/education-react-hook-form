import { TextField, Stack, Button } from "@mui/material";
import { useForm } from "react-hook-form";

type TypeForm = {
  email: string;
  password: string;
};

export const MuiLoginForm = () => {
  const form = useForm<TypeForm>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { register, formState, handleSubmit } = form;
  const { errors } = formState;

  const onSubmit = (values: TypeForm) => {
    console.log({ values });
  };

  return (
    <div>
      <h2>Material UI Login Form</h2>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Stack>
          <TextField
            label="Email"
            type="email"
            placeholder="Type your email"
            {...register("email", {
              required: "Email is required",
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            label="Password"
            type="password"
            placeholder="Type password"
            {...register("password", {
              required: "Password is required",
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Stack>
      </form>
    </div>
  );
};
