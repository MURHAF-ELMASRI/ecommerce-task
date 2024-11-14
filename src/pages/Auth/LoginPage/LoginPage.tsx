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
import { useUser } from "@/services/auth/useUser";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, {
    message: "Password must be at least 6 character",
  }),
});

type FormValues = z.infer<typeof loginSchema>;

export function LoginPage() {
  const {} =useUser()
  const formMethods = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const {
    register,
    formState: { isSubmitting, errors },
  } = formMethods;

  function onSubmit(data: FormValues) {
    console.log(data);

    alert("You submitted the following values:");
  }

  return (
    <Card className="mx-auto max-w-sm mt-12">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form
          form={formMethods}
          handleSubmit={() => {
            console.log("submit");
          }}
        >
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
            ></TextField>

            <Button
              disabled={isSubmitting && !!errors.email && !!errors.password}
              type="submit"
              className="w-full"
            >
              Login
            </Button>
          </div>
        </Form>

        <Button variant="outline" className="w-full mt-4">
          Login with Google
        </Button>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link to="/auth/register" className="underline">
            Login
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
