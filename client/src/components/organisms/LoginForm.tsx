"use client";
import { credentialsLogin } from "@/actions/authAction";
import { Button, Link, Loader, Message } from "@/components/atoms";
import { FormField, PasswordFormField } from "@/components/molecules";
import { ArrowRight } from "@/constant";
import fetcher from "@/utils/fetcher";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

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
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPasswordShown, setIsPasswordShown] = useState<boolean>(false);
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
        url: "http://localhost:3001/api/v1/auth/login",
        method: "POST",
        data,
      });
      const isAuthenticated = await credentialsLogin(result?.data?.data);
      console.log({ isAuthenticated });
      if (!!isAuthenticated?.error) {
        setSubmissionStatus({
          type: "error",
          message: isAuthenticated.error,
        });
        setIsLoading(false);
      } else {
        setSubmissionStatus({
          type: "success",
          message: result.data.message,
        });
        setIsLoading(false);
        reset();
        setTimeout(() => router.push("/dashboard/me"), 1000);
      }
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
            <p>Don&apos;t have an account?</p>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 duration-300" />
          </div>
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
            <div className="flex justify-center items-center gap-x-5">
              <p>Log in</p>
              {isLoading && <Loader />}
            </div>
          </Button>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
