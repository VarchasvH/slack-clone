import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { SignInFlow } from "../types";
import { useState } from "react";
import { TriangleAlert } from "lucide-react";
import { useAuthActions } from "@convex-dev/auth/react";

interface SignUpCardProps {
  setState: (state: SignInFlow) => void;
}
const SignUpCard = ({ setState }: SignUpCardProps) => {
  const { signIn } = useAuthActions();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");

  const onProviderSignUp = (value: "github" | "google") => {
    setPending(true);
    signIn(value).finally(() => setPending(false));
  };

  const onPasswordSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setPending(true);
    signIn("password", { email, name, password, flow: "signUp" })
      .catch(() => {
        setError("Something went wrong");
      })
      .finally(() => {
        setPending(false);
      });
  };
  return (
    <Card className='h-full w-full p-8'>
      <CardHeader>
        <CardTitle className='flex justify-center items-center'>
          Sign Up
        </CardTitle>
        <CardDescription className='flex justify-center items-center'>
          Use your email or another service to continue
        </CardDescription>
      </CardHeader>
      {!!error && (
        <div className='bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6'>
          <TriangleAlert className='size-4' />
          <p>{error}</p>
        </div>
      )}
      <CardContent className='space-y-5 pb-0 px-0'>
        <form onSubmit={onPasswordSignUp} className='space-y-2.5'>
          <Input
            disabled={pending}
            placeholder='Username'
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            required
          />
          <Input
            disabled={pending}
            placeholder='Email'
            type='email'
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
          <Input
            disabled={pending}
            placeholder='Password'
            type='password'
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />
          <Input
            disabled={pending}
            placeholder='Confirm Password'
            type='password'
            value={confirmPassword}
            onChange={(e) => {
              setconfirmPassword(e.target.value);
            }}
            required
          />
          <Button type='submit' className='w-full' size='lg' disabled={pending}>
            Continue
          </Button>
        </form>
        <Separator />
        <div className='flex flex-col gap-2.5'>
          <Button
            variant='outline'
            size='lg'
            onClick={() => {
              onProviderSignUp("google");
            }}
            disabled={pending}
            className='w-full relative'
          >
            <FcGoogle className='size-5 absolute top-3 left-2.5' />
            Continue with Google
          </Button>
          <Button
            variant='outline'
            size='lg'
            onClick={() => {
              onProviderSignUp("github");
            }}
            disabled={pending}
            className='w-full relative'
          >
            <FaGithub className='size-5 absolute top-3 left-2.5' />
            Continue with GitHub
          </Button>
        </div>
        <p className='text-sm text-muted-foreground flex justify-center items-center'>
          Already have an account?
          <span
            onClick={() => setState("signIn")}
            className='text-sky-600 cursor-pointer hover:underline'
          >
            Sign In
          </span>
        </p>
      </CardContent>
    </Card>
  );
};

export default SignUpCard;
