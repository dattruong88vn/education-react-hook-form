import { useEffect } from "react";
import { useFieldArray, useForm, FieldErrors } from "react-hook-form";
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
  age: number;
  dob: Date;
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
      age: 0,
      dob: new Date(),
    },
    mode: "onSubmit",
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

  // register a field
  const {
    register,
    control,
    handleSubmit,
    formState,
    watch,
    getValues,
    setValue,
    reset,
    trigger,
  } = form;

  const { fields, append, remove } = useFieldArray({
    name: "phNumbers",
    control,
  });

  const {
    errors,
    // touchedFields, dirtyFields,
    isDirty,
    isValid,
    isSubmitting,
    isSubmitted,
    isSubmitSuccessful,
    submitCount,
  } = formState;

  useEffect(() => {
    const data = watch((value) => {
      console.log({ value });

      // do something side effect
      // fetch api search...
    });
    return () => {
      // clear watch
      data.unsubscribe();
    };
  }, [watch]);

  useEffect(() => {
    if (isSubmitSuccessful) reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

  const onSubmit = (data: FormValues) => {
    console.log(`submit form:`, { data });
  };

  const onError = (errors: FieldErrors<FormValues>) => {
    console.log({ errors });
  };

  const handleGetValues = () => {
    const data = getValues();
    console.log("data from getValues function", data);
  };

  const handleSetValue = () => {
    setValue("username", "", {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  countRender++;

  // console.log({ formState });
  // console.log({ errors });
  // const valueUserName = watch("username");
  // const valueUserNameEmail = watch(["username", "email"]);
  // console.log({ valueUserNameEmail });

  console.log({
    // touchedFields, dirtyFields, isDirty,
    isValid,
    isSubmitting,
    isSubmitted,
    isSubmitSuccessful,
    submitCount,
  });

  return (
    <div>
      <h3>Number of render ({countRender / 2})</h3>
      {/* <h2>Watch username: {valueUserName}</h2> */}
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
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
                emailAvailable: async (fieldValue) => {
                  const response = await fetch(
                    `https://jsonplaceholder.typicode.com/users?email=${fieldValue}`
                  );
                  const data = await response.json();
                  return data.length === 0 || "Email already exists";
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
            {...register("social.twitter", {
              required: "Twitter is required",
              disabled: watch("channel") === "",
            })}
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

        <div className="form-control">
          <label htmlFor={"age"}>Age</label>
          <input
            type="number"
            id={"age"}
            {...register("age", {
              valueAsNumber: true,
              required: "Age is required",
            })}
          />
          <p className="error">{errors.age?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor={"dob"}>Date of Birth</label>
          <input
            type="date"
            id={"dob"}
            {...register("dob", {
              valueAsDate: true,
              required: "Date of Birth is required",
            })}
          />
          <p className="error">{errors.dob?.message}</p>
        </div>

        <button disabled={!isDirty || isSubmitting}>Submit</button>
        <button type="button" onClick={() => reset()}>
          Reset Form
        </button>
        <button type="button" onClick={handleGetValues}>
          Get Values
        </button>
        <button type="button" onClick={handleSetValue}>
          Set Value
        </button>
        <button type="button" onClick={() => trigger("channel")}>
          Validate
        </button>
      </form>

      <DevTool control={control} />
    </div>
  );
};

export default YoutubeForm;
