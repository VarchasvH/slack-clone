"use client";
import UserButton from "@/features/auth/components/UserButton";
import { useCreateWorkspaceModal } from "@/features/workspaces/store/useCreateWorkspaceModal";

import { useGetWorkspaces } from "@/features/workspaces/api/useGetWorkspaces";
import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
const Home = () => {
  const [open, setOpen] = useCreateWorkspaceModal();
  const { data, isLoading } = useGetWorkspaces();
  const workspaceId = useMemo(() => data?.[0]?._id, [data]);

  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;
    if (workspaceId) {
      router.replace(`/workspace/${workspaceId}`);
    } else if (!open) {
      setOpen(true);
    }
  }, [workspaceId, isLoading, open, setOpen, router]);
  return (
    <div>
      <UserButton />
    </div>
  );
};

export default Home;

// 1:53:00
