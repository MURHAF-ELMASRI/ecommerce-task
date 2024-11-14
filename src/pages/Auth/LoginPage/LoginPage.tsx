import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form/form";
import { TextField } from "@/components/ui/form/inputs/TextField";
import { useToast } from "@/hooks/use-toast";
import { useToggle } from "@/hooks/util/useToggle";
import {
  LoginFormType,
  loginSchema,
  useLoginUser,
} from "@/services/auth/useLoginUser";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

export function LoginPage() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showPassword, toggleShowPassword] = useToggle();

  const formMethods = useForm<LoginFormType>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });

  const {
    register,
    formState: { isSubmitting, errors },
    setError,
  } = formMethods;

  const loginUser = useLoginUser({
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
          setError(field as keyof LoginFormType, {
            type: "server",
            message,
          });
        }
      }
    },
  });

  function onSubmit(data: LoginFormType) {
    loginUser.mutate(data);
  }

  return (
    <Card className="mx-auto max-w-sm mt-16">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form form={formMethods} handleSubmit={onSubmit}>
          <div className="grid gap-4">
            {/* Email */}
            <TextField
              {...register("email")}
              label="Email"
              required
            ></TextField>

            {/* Password */}
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

            <Button
              disabled={isSubmitting && !!errors.email && !!errors.password}
              type="submit"
              className="w-full"
              loading={loginUser.isPending}
            >
              Login
            </Button>
          </div>
        </Form>

        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link to="/auth/signup" className="underline">
            Signup
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
