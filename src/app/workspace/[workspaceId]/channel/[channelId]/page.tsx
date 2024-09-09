"use client";

// ? Component imports
import ChannelHeader from "./ChannelHeader";

// ? Feature imports
import { useGetChannel } from "@/features/channels/api/useGetChannel";

// ? Hook imports
import { useGetChannelId } from "@/hooks/useGetChannelId";

// ? Icon imports
import { Loader, TriangleAlertIcon } from "lucide-react";
import ChatInput from "./ChatInput";

const ChannelIdPage = () => {
  const channelId = useGetChannelId();
  const { data: channel, isLoading: channelLoading } = useGetChannel({
    id: channelId,
  });

  if (channelLoading)
    return (
      <div className='h-full flex-1 flex items-center justify-center '>
        <Loader className='animate-spin size-5 text-muted-foreground' />
      </div>
    );
  if (!channel)
    return (
      <div className='h-full flex-1 flex flex-col items-center justify-center gap-y-2 '>
        <TriangleAlertIcon className='size-5 text-muted-foreground' />
        <span className='text-muted-foreground text-sm'>Channel not found</span>
      </div>
    );

  return (
    <div className='h-full flex flex-col'>
      <ChannelHeader title={channel.name} />
      <div className='flex-1' />
      <ChatInput />
    </div>
  );
};

export default ChannelIdPage;
