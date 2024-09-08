"use client";
// ? Library imports
import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";

// ? Hook imports
import { useGetWorkspaceId } from "@/hooks/useGetWorkspaceId";

// ? Feature imports
import { useGetWorkspace } from "@/features/workspaces/api/useGetWorkspace";
import { useGetChannels } from "@/features/channels/api/useGetChannels";
import { useCreateChannelModal } from "@/features/channels/store/useCreateChannelModal";
import { useCurrentMember } from "@/features/members/api/useCurrentMember";

// ? Icon imports
import { Loader, TriangleAlertIcon } from "lucide-react";

const WorkspaceIdPage = () => {
  const router = useRouter();
  const workspaceId = useGetWorkspaceId();
  const [open, setOpen] = useCreateChannelModal();
  const { data: member, isLoading: memberLoading } = useCurrentMember({
    workspaceId,
  });
  const { data: workspace, isLoading: workspaceLoading } = useGetWorkspace({
    id: workspaceId,
  });
  const { data: channels, isLoading: channelsLoading } = useGetChannels({
    workspaceId,
  });

  const channelId = useMemo(() => channels?.[0]?._id, [channels]);
  const isAdmin = useMemo(() => member?.role === "admin", [member?.role]);

  useEffect(() => {
    if (
      workspaceLoading ||
      channelsLoading ||
      memberLoading ||
      !member ||
      !workspace
    )
      return;

    if (channelId) {
      router.push(`/workspace/${workspaceId}/channel/${channelId}`);
    } else if (!open && isAdmin) {
      setOpen(true);
    }
  }, [
    channelsLoading,
    workspaceLoading,
    memberLoading,
    workspace,
    member,
    workspaceId,
    channelId,
    router,
    isAdmin,
    open,
    setOpen,
  ]);
  if (workspaceLoading || channelsLoading) {
    return (
      <div className='h-full flex-1 flex items-center justify-center flex-col gap-2'>
        <Loader className='animate-spin size-6 text-muted-foreground' />
      </div>
    );
  }

  if (!workspace) {
    return (
      <div className='h-full flex-1 flex items-center justify-center flex-col gap-2'>
        <TriangleAlertIcon className=' size-6 text-muted-foreground' />
        <span className='text-sm text-muted-foreground'>
          Workspace not found
        </span>
      </div>
    );
  }

  return (
    <div className='h-full flex-1 flex items-center justify-center flex-col gap-2'>
      <TriangleAlertIcon className=' size-6 text-muted-foreground' />
      <span className='text-sm text-muted-foreground'>No Channel found</span>
    </div>
  );
};

export default WorkspaceIdPage;
