import { Button } from "@/components/ui/button";
import { useGetWorkspaceId } from "@/hooks/useGetWorkspaceId";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { IconType } from "react-icons/lib";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const sidebarItemVariants = cva(
  "flex items-center gap-1.5 justify-start font-normal h-7 px-[18px] text-sm overflow-hidden",
  {
    variants: {
      variant: {
        default: "text-[#f9edffcc] mb-1",
        active: "text-[#481349] bg-white/90 hover:bg-white/80 mb-1",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);
interface SidebarItemProps {
  label: string;
  icon: LucideIcon | IconType;
  id: string;
  variant?: VariantProps<typeof sidebarItemVariants>["variant"];
}

const SidebarItem = ({ label, icon: Icon, id, variant }: SidebarItemProps) => {
  const workspaceId = useGetWorkspaceId();
  return (
    <Button
      asChild
      variant='transparent'
      size='sm'
      className={cn(sidebarItemVariants({ variant }))}
    >
      <Link href={`/workspace/${workspaceId}/channel/${id}`}>
        <Icon className='size-3.5 mr-1 shrink-0' />
        <span className='text-sm truncate'>{label}</span>
      </Link>
    </Button>
  );
};

export default SidebarItem;
