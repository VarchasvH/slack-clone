import UserButton from "@/features/auth/components/UserButton";
import WorkspaceSwitcher from "./WorkspaceSwitcher";
import SidebarButton from "./SidebarButton";
import {
  BellIcon,
  HomeIcon,
  MessagesSquareIcon,
  MoreHorizontalIcon,
} from "lucide-react";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <aside className='w-[70px] h-full bg-[#481349] flex flex-col gap-y-4 items-center pt-[9px] pb-[4px]'>
      <WorkspaceSwitcher />
      <SidebarButton
        icon={HomeIcon}
        label='Home'
        isActive={pathname.includes("/workspace")}
      />
      <SidebarButton icon={MessagesSquareIcon} label='DMs' />
      <SidebarButton icon={BellIcon} label='Activity' />
      <SidebarButton icon={MoreHorizontalIcon} label='More' />
      <div className='flex flex-col items-center justify-center gap-y-1 mt-auto'>
        <UserButton />
      </div>
    </aside>
  );
};

export default Sidebar;
