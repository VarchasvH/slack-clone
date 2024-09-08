// ? Component imports
import WorkspaceHeader from "./WorkspaceHeader";
import SidebarItem from "./SidebarItem";
import WorkspaceSection from "./WorkspaceSection";
import UserItem from "./UserItem";

// ? Icon imports
import {
  AlertTriangle,
  HashIcon,
  Loader,
  MessageSquareTextIcon,
  SendHorizonal,
} from "lucide-react";

// ? Feature imports
import { useCurrentMember } from "@/features/members/api/useCurrentMember";
import { useGetWorkspace } from "@/features/workspaces/api/useGetWorkspace";
import { useGetChannels } from "@/features/channels/api/useGetChannels";
import { useGetMembers } from "@/features/members/api/useGetMembers";
import { useCreateChannelModal } from "@/features/channels/store/useCreateChannelModal";

// ? Hook imports
import { useGetWorkspaceId } from "@/hooks/useGetWorkspaceId";
import { useGetChannelId } from "@/hooks/useGetChannelId";

const WorkspaceSidebar = () => {
  const [_open, setOpen] = useCreateChannelModal();
  const workspaceId = useGetWorkspaceId();
  const channelId = useGetChannelId();

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
      <WorkspaceSection
        label='Channels'
        hint='New Channel'
        onNew={member.role === "admin" ? () => setOpen(true) : undefined}
      >
        {channels?.map((item) => (
          <SidebarItem
            key={item._id}
            id={item._id}
            label={item.name}
            icon={HashIcon}
            variant={channelId === item._id ? "active" : "default"}
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
