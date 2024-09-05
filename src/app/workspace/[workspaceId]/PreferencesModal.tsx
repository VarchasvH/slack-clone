import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useRemoveWorkspace } from "@/features/workspaces/api/useRemoveWorkspace";
import { useUpdateWorkspace } from "@/features/workspaces/api/useUpdateWorkspace";
import { useConfirm } from "@/hooks/useConfirm";
import { useGetWorkspaceId } from "@/hooks/useGetWorkspaceId";
import { TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface PreferencesModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  initialValue: string;
}

const PreferencesModal = ({
  open,
  setOpen,
  initialValue,
}: PreferencesModalProps) => {
  const router = useRouter();
  const workspaceId = useGetWorkspaceId();
  const [value, setValue] = useState(initialValue);
  const [editOpen, setEditOpen] = useState(false);
  const [ConfirmDialog, confirmRemoval] = useConfirm(
    "Are you sure?",
    "This action is irreversible"
  );

  const { mutate: updateWorkspace, isPending: isUpdatingWorkspace } =
    useUpdateWorkspace();
  const { mutate: removeWorkspace, isPending: isRemovingWorkspace } =
    useRemoveWorkspace();

  const handleEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    updateWorkspace(
      {
        id: workspaceId,
        name: value,
      },
      {
        onSuccess: () => {
          toast.success("Workspace Updated");
          setEditOpen(false);
        },
        onError: () => {
          toast.error("Failed to update workspace");
        },
      }
    );
  };

  const handleRemove = async () => {
    const ok = await confirmRemoval();
    if (!ok) return;

    removeWorkspace(
      {
        id: workspaceId,
      },
      {
        onSuccess: () => {
          router.replace("/");
          toast.success("Workspace removed");
          setEditOpen(false);
        },
        onError: () => {
          toast.error("Failed to remove workspace");
        },
      }
    );
  };

  return (
    <>
      <ConfirmDialog />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className='p-0 bg-gray-50 overflow-hidden'>
          <DialogHeader className='p-4 border-b bg-white '>
            <DialogTitle>{value}</DialogTitle>
          </DialogHeader>
          <div className='px-4 pb-4 flex flex-col gap-y-2'>
            <Dialog open={editOpen} onOpenChange={setEditOpen}>
              <DialogTrigger asChild>
                <div className='bg-white px-5 py-4 border-lg rounded-lg border cursor-pointer hover:bg-gray-50'>
                  <div className='flex items-center justify-between'>
                    <p className='text-sm font-semibold'>Workspace name</p>
                    <p className='text-sm text-[#1264a3] hover:underline font-semibold hover:text-[#1264a3]/80'>
                      Edit
                    </p>
                  </div>
                  <p className='text-sm text-gray-500 flex justify-start items-start mt-2'>
                    {value}
                  </p>
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Rename this workspace?</DialogTitle>
                </DialogHeader>
                <form className='space-y-4' onSubmit={handleEdit}>
                  <Input
                    value={value}
                    disabled={isUpdatingWorkspace}
                    onChange={(e) => setValue(e.target.value)}
                    required
                    autoFocus
                    minLength={3}
                    maxLength={80}
                    placeholder='Workspace name eg. "Work", "Personal", "Home".'
                  />
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant='outline' disabled={isUpdatingWorkspace}>
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button disabled={isUpdatingWorkspace}>Save</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>

            <button
              disabled={isRemovingWorkspace}
              onClick={handleRemove}
              className='flex items-center justify-center bg-white px-5 py-4 border-lg rounded-lg border cursor-pointer hover:bg-rose-600 hover:text-white text-rose-600 gap-x-2 border-white transition-colors duration-500 ease-in-out hover:border-rose-500'
            >
              <TrashIcon className='size-4' />
              <p className='text-sm font-semibold'>Delete Workspace</p>
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PreferencesModal;
