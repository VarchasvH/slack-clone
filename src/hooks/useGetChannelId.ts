import { useGetWorkspaces } from "@/features/workspaces/api/useGetWorkspaces";
import { useParams } from "next/navigation";

import { Id } from "../../convex/_generated/DataModel";

export const useGetChannelId = () => {
  const params = useParams();
  return params.channelId as Id<"channels">;
};
