import { useGetWorkspaces } from "@/features/workspaces/api/useGetWorkspaces";
import { useParams } from "next/navigation";

import { Id } from "../../convex/_generated/DataModel";

export const useGetWorkspaceId = () => {
  const params = useParams();
  return params.workspaceId as Id<"workspaces">;
};
