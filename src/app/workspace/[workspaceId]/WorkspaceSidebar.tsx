import { useCurrentMember } from "@/features/members/api/useCurrentMember";
import { useGetWorkspace } from "@/features/workspaces/api/useGetWorkspace";
import { useGetWorkspaceId } from "@/hooks/useGetWorkspaceId";
import { AlertTriangle, Loader } from "lucide-react";
import WorkspaceHeader from "./WorkspaceHeader";

const WorkspaceSidebar = () => {
  const workspaceId = useGetWorkspaceId();

  const { data: member, isLoading: memberLoading } = useCurrentMember({
    workspaceId,
  });
  const { data: workspace, isLoading: workspaceLoading } = useGetWorkspace({
    id: workspaceId,
  });

  if (memberLoading || workspaceLoading) {
    return (
      <div className='flex flex-col bg-[#5e2c5f] h-full items-center justify-center'>
        <Loader className='animate-spin size-5 text-white' />
      </div>
    );
  }

  if (!workspace || !member) {
    return (
      <div className='flex flex-col gap-y-2 bg-[#5e2c5f] h-full items-center justify-center'>
        <AlertTriangle className='text-sm text-white' />
        <p>Workspace not found</p>
      </div>
    );
  }
  // ? This was added to remove an error to Workspace Header when passing the workspace as an array
  if (workspace && Array.isArray(workspace)) {
    throw new Error("Workspace not found");
  }
  return (
    <div className='flex flex-col bg-[#5e2c5f] h-full '>
      <WorkspaceHeader
        // Error was here
        workspace={workspace}
        isAdmin={member.role === "admin"}
      />
    </div>
  );
};

export default WorkspaceSidebar;
