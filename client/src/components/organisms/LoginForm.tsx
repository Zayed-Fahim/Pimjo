"use client";
import { useState } from "react";
import { FormField, PasswordFormField } from "@/components/molecules";
import { Button, Link, Message } from "@/components/atoms";
import { SubmitHandler, useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { ArrowRight } from "@/constant";

type FormInputProps = {
  email: string;
  password: string;
};

const schema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required()
    .messages({
      "string.email": "Enter a valid email.",
      "string.empty": "Email is required.",
    }),
  password: Joi.string().min(6).required().messages({
    "string.empty": "Password is required.",
  }),
});

const LoginForm = () => {
  const [isPasswordShown, setIsPasswordShown] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputProps>({
    resolver: joiResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FormInputProps> = (data) => {
    console.log(data);
  };

  const handleShowPassword = () => {
    setIsPasswordShown(!isPasswordShown);
  };

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <FormField
          htmlFor="email"
          text="Email"
          type="email"
          id="email"
          name="email"
          register={register}
        />
        {errors?.email && (
          <Message
            className="pt-1"
            type="error"
            text={errors?.email?.message as string}
          />
        )}
      </div>

      <div>
        <PasswordFormField
          showPassword={isPasswordShown}
          htmlFor="password"
          text="Password"
          type={isPasswordShown ? "text" : "password"}
          id="password"
          name="password"
          register={register}
          onClick={handleShowPassword}
        />
        {errors.password && (
          <Message
            className="pt-1"
            type="error"
            text={errors?.password?.message as string}
          />
        )}
      </div>

      <div className="flex items-center justify-between gap-x-2">
        <div className="flex items-center gap-x-2 group">
          <p>Don&apos;t have an account?</p>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 duration-300" />
        </div>
        <div className="flex gap-x-3">
          <Link
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:ring hover:ring-white h-10 px-4 py-2 duration-200"
            href="/signup"
          >
            Register
          </Link>
          <Button
            className="font-semibold hover:bg-black hover:text-white hover:ring hover:ring-white transition duration-300 inline-flex items-center justify-center rounded-md text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white text-black h-10 px-4 py-2"
            type="submit"
          >
            Log in
          </Button>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
