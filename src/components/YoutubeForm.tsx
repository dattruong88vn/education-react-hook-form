import { useFieldArray, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

let countRender = 0;

type FormValues = {
  username: string;
  email: string;
  channel: string;
  social: {
    twitter: string;
    facebook: string;
  };
  phoneNumbers: string[];
  phNumbers: { number: string }[];
};

const YoutubeForm = () => {
  const form = useForm<FormValues>({
    // object
    defaultValues: {
      username: "",
      email: "",
      channel: "",
      social: {
        twitter: "",
        facebook: "",
      },
      phoneNumbers: ["", ""],
      phNumbers: [{ number: "" }],
    },
    // function
    // defaultValues: async () => {
    //   const response = await fetch(
    //     "https://jsonplaceholder.typicode.com/users/7"
    //   );
    //   const data = await response.json();
    //   return {
    //     username: "datnhang",
    //     email: data.email,
    //     channel: "",
    //   };
    // },
  });

  const onSubmit = (data: FormValues) => {
    console.log(`submit form:`, { data });
  };

  countRender++;

  // register a field
  const { register, control, handleSubmit, formState } = form;

  // console.log({ formState });
  const { errors } = formState;
  console.log({ errors });

  const { fields, append, remove } = useFieldArray({
    name: "phNumbers",
    control,
  });

  return (
    <div>
      <h3>Number of render ({countRender / 2})</h3>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="form-control">
          <label htmlFor={"username"}>Username</label>
          <input
            type="text"
            id={"username"}
            {...register("username", {
              required: "Username is required",
            })}
          />
          <p className="error">{errors.username?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor={"email"}>Email</label>
          <input
            type="email"
            id={"email"}
            {...register("email", {
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
          <label htmlFor={"channel"}>Channel</label>
          <input
            type="text"
            id={"channel"}
            {...register("channel", {
              required: "Channel is required",
            })}
          />
          <p className="error">{errors.channel?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor={"twitter"}>Twitter</label>
          <input
            type="text"
            id={"twitter"}
            {...register("social.twitter", { required: "Twitter is required" })}
          />
          <p className="error">{errors.social?.twitter?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor={"facebook"}>Facebook</label>
          <input
            type="text"
            id={"facebook"}
            {...register("social.facebook", {
              required: "Twitter is required",
            })}
          />
          <p className="error">{errors.social?.facebook?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor={"primary-number"}>Primary Phone Number</label>
          <input
            type="text"
            id={"primary-number"}
            {...register("phoneNumbers.0", {
              required: "Primary phone number is required",
            })}
          />
          <p className="error">
            {errors.phoneNumbers?.length && errors.phoneNumbers[0]?.message}
          </p>
        </div>

        <div className="form-control">
          <label htmlFor={"secondary-number"}>Secondary Phone Number</label>
          <input
            type="text"
            id={"secondary-number"}
            {...register("phoneNumbers.1", {
              required: "Secondary phone number is required",
            })}
          />
          <p className="error">
            {errors.phoneNumbers?.length && errors.phoneNumbers[1]?.message}
          </p>
        </div>

        <div>
          <label>List phone Numbers</label>
          <div>
            {fields.map((field, index, list) => {
              return (
                <div key={field.id} className="form-control">
                  <input
                    type="text"
                    {...register(`phNumbers.${index}.number`)}
                  />
                  {list.length > 1 && (
                    <button type="button" onClick={() => remove(index)}>
                      Remove
                    </button>
                  )}
                </div>
              );
            })}
          </div>
          <button type="button" onClick={() => append({ number: "" })}>
            Add phone number
          </button>
        </div>

        <button>Submit</button>
      </form>

      <DevTool control={control} />
    </div>
  );
};

export default YoutubeForm;
