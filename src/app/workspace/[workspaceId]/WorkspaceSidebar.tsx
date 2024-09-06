import { useCurrentMember } from "@/features/members/api/useCurrentMember";
import { useGetWorkspace } from "@/features/workspaces/api/useGetWorkspace";
import { useGetWorkspaceId } from "@/hooks/useGetWorkspaceId";
import {
  AlertTriangle,
  HashIcon,
  Loader,
  MessageSquareText,
  MessageSquareTextIcon,
  SendHorizonal,
} from "lucide-react";
import WorkspaceHeader from "./WorkspaceHeader";
import SidebarItem from "./SidebarItem";
import { useGetChannels } from "@/features/channels/api/useGetChannels";
import WorkspaceSection from "./WorkspaceSection";
import { useGetMembers } from "@/features/members/api/useGetMembers";
import UserItem from "./UserItem";

const WorkspaceSidebar = () => {
  const workspaceId = useGetWorkspaceId();

  const { data: member, isLoading: memberLoading } = useCurrentMember({
    workspaceId,
  });
  const { data: members, isLoading: membersLoading } = useGetMembers({
    workspaceId,
  });
  const { data: workspace, isLoading: workspaceLoading } = useGetWorkspace({
    id: workspaceId,
  });

  const { data: channels, isLoading: channelsLoading } = useGetChannels({
    workspaceId,
  });

  if (memberLoading || workspaceLoading || channelsLoading || membersLoading) {
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
      <div className='flex flex-col px-2 mt-3'>
        <SidebarItem
          label='Threads'
          icon={MessageSquareTextIcon}
          id='threads'
        />
        <SidebarItem
          label='Drafts & Sent'
          icon={SendHorizonal}
          id='drafts-sent'
        />
      </div>
      <WorkspaceSection label='Channels' hint='New Channel' onNew={() => {}}>
        {channels?.map((item) => (
          <SidebarItem
            key={item._id}
            id={item._id}
            label={item.name}
            icon={HashIcon}
          />
        ))}
      </WorkspaceSection>
      <WorkspaceSection
        label='Direct Messages'
        hint='New Direct Messages'
        onNew={() => {}}
      >
        {members?.map((item) => (
          <div key={item._id}>
            <UserItem
              key={item._id}
              id={item._id}
              label={item.user.name}
              image={item.user.image}
            />
          </div>
        ))}
      </WorkspaceSection>
    </div>
  );
};

export default WorkspaceSidebar;
