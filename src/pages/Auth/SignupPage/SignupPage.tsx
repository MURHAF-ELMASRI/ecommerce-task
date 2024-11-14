import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form/form";
import { SelectField } from "@/components/ui/form/inputs/SelectField";
import { TextField } from "@/components/ui/form/inputs/TextField";
import { useToast } from "@/hooks/use-toast";
import { useToggle } from "@/hooks/util/useToggle";
import {
  SignupFormType,
  signupSchema,
  useSignup,
} from "@/services/auth/useSignup";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type GenderOptionType = { value: SignupFormType["gender"]; label: string }[];

export function SignupPage() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showPassword, toggleShowPassword] = useToggle();

  const formMethods = useForm<SignupFormType>({
    resolver: zodResolver(signupSchema),
    mode: "onBlur",
  });

  const { register, setError } = formMethods;

  const signupUser = useSignup({
    onSuccess() {
      toast({
        title: "Success",
        description: "You are now logged in",
      });
      navigate("/", { replace: true });
    },
    onError: (error) => {
      //TODO refactor this to be global
      if (error.response?.data?.fieldErrors) {
        for (const [field, message] of Object.entries(
          error.response.data.fieldErrors
        )) {
          setError(field as keyof SignupFormType, {
            type: "server",
            message,
          });
        }
      }
    },
  });

  const genderOptions: GenderOptionType = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
  ];

  function onSubmit(data: SignupFormType) {
    signupUser.mutate(data);
  }

  return (
    <div className="container h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Button
        variant="ghost"
        className="absolute right-4 top-4 md:right-8 md:top-8"
        onClick={() => navigate("/auth/login")}
      >
        Login
      </Button>

      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          E-commerce
        </div>
      </div>
      <div className="p-6 lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Create an account
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your information below to create your account
            </p>
          </div>
          <div className="grid gap-6">
            <Form form={formMethods} handleSubmit={onSubmit}>
              <div className="grid gap-4">
                <TextField
                  {...register("email")}
                  label="Email"
                  required
                ></TextField>

                <div className="flex gap-2">
                  <TextField
                    {...register("firstName")}
                    label="First Name"
                    required
                  ></TextField>
                  <TextField
                    {...register("lastName")}
                    label="LastName"
                  ></TextField>
                </div>

                <TextField
                  {...register("password")}
                  label="Password"
                  required
                  type={showPassword ? "text" : "password"}
                  onIconClick={toggleShowPassword}
                  icon={
                    showPassword ? (
                      <EyeOff className="h-4 w-4" aria-hidden="true" />
                    ) : (
                      <Eye className="h-4 w-4" aria-hidden="true" />
                    )
                  }
                ></TextField>

                <SelectField
                  {...register("gender")}
                  label="Gender"
                  options={genderOptions}
                  placeholder="Select Gender"
                  required
                ></SelectField>

                <Button loading={signupUser.isPending}>Signup</Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
