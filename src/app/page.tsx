"use client";
import { Button } from "@/components/ui/button";
import { useAuthActions } from "@convex-dev/auth/react";
const Home = () => {
  const { signOut } = useAuthActions();
  return (
    <div>
      Logged In!
      <Button onClick={() => signOut()}>Sign Out</Button>
    </div>
  );
};

export default Home;
// 1:33:27 - Continue
