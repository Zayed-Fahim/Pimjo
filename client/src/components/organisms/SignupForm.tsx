"use client";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormField, PasswordFormField } from "@/components/molecules";
import { Button, Link, Loader, Message } from "@/components/atoms";
import { nameRegex, passwordRegex } from "@/constant/validation";
import { ArrowRight } from "@/constant";
import { useRouter } from "next/navigation";
import fetcher from "@/utils/fetcher";

type FormInputProps = {
  email: string;
  password: string;
  cPassword: string;
  username: string;
};

const schema = Joi.object({
  username: Joi.string()
    .regex(nameRegex)
    .regex(/^\S*$/)
    .min(4)
    .required()
    .messages({
      "string.min": "Username must be at least 4 characters long.",
      "string.pattern.base":
        "Allow only letters, numbers, and underscores, cannot start with a number and not allow spaces.",
      "string.empty": "Username is required.",
    }),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required()
    .messages({
      "string.email": "Enter a valid email.",
      "string.empty": "Email is required.",
    }),
  password: Joi.string().regex(passwordRegex).min(6).required().messages({
    "string.min": "Password must be at least 6 characters long.",
    "string.max": "Password must be at most 12 characters long.",
    "string.pattern.base":
      "Password must contain at least one uppercase letter, one number, and one special character.",
    "string.empty": "Password is required.",
  }),
  cPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "string.empty": "Confirm Password is required.",
    "any.only": "Password does not match.",
  }),
});

const SignupForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPasswordShown, setIsPasswordShown] = useState<boolean>(false);
  const [isConfirmPasswordShown, setIsConfirmPasswordShown] =
    useState<boolean>(false);
  const [submissionStatus, setSubmissionStatus] = useState<{
    type: "success" | "error" | "default";
    message: string;
  }>({
    type: "default",
    message: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInputProps>({
    resolver: joiResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
      cPassword: "",
    },
  });

  const onSubmit: SubmitHandler<FormInputProps> = async (data) => {
    try {
      setIsLoading(true);
      const result = await fetcher<{
        success: boolean;
        message: string;
        data: {
          _id: string;
          username: string;
          email: string;
          accessToken: string;
        };
      }>({
        url: "http://localhost:3001/api/v1/auth/register",
        method: "POST",
        data,
      });
      setSubmissionStatus({
        type: "success",
        message: result.data.message,
      });
      setIsLoading(false);
      reset();
      setTimeout(() => router.push("/login"), 1000);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error:", error.message);
        setSubmissionStatus({
          type: "error",
          message: error.message,
        });
        setIsLoading(false);
      } else {
        console.error("Unexpected error:", error);
        setSubmissionStatus({
          type: "error",
          message: "An unexpected error occurred.",
        });
        setIsLoading(false);
      }
    }
  };

  const handleShowPassword = () => {
    setIsPasswordShown(!isPasswordShown);
  };
  const handleShowConfirmPassword = () => {
    setIsConfirmPasswordShown(!isConfirmPasswordShown);
  };
  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <FormField
          htmlFor="username"
          text="Username"
          type="text"
          id="username"
          name="username"
          register={register}
        />
        {errors?.username && (
          <Message
            className="pt-1"
            type="error"
            text={errors?.username?.message as string}
          />
        )}
      </div>
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
      <div>
        <PasswordFormField
          showPassword={isConfirmPasswordShown}
          htmlFor="cPassword"
          text="Confirm Password"
          type={isConfirmPasswordShown ? "text" : "password"}
          id="cPassword"
          name="cPassword"
          register={register}
          onClick={handleShowConfirmPassword}
        />
        {errors.cPassword && (
          <Message
            className="pt-1"
            type="error"
            text={errors?.cPassword?.message as string}
          />
        )}
      </div>

      <div className="flex items-center justify-between gap-x-2">
        <div className="flex flex-col items-start gap-y-2">
          {submissionStatus.type !== "default" && (
            <>
              <Message
                type={submissionStatus?.type}
                text={submissionStatus?.message}
              />
            </>
          )}
          <div className="flex items-center gap-x-2 group">
            <p>Already have an account?</p>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 duration-300" />
          </div>
        </div>
        <div className="flex gap-x-3">
          <Link
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:ring hover:ring-white h-10 px-4 py-2 duration-200"
            href="/login"
          >
            Log in
          </Link>
          <Button
            className="font-semibold hover:bg-black hover:text-white hover:ring hover:ring-white transition duration-300 inline-flex items-center justify-center rounded-md text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white text-black h-10 px-4 py-2"
            type="submit"
          >
            <div className="flex justify-center items-center gap-x-5">
              <p>Register</p>
              {isLoading && <Loader />}
            </div>
          </Button>
        </div>
      </div>
    </form>
  );
};

export default SignupForm;
