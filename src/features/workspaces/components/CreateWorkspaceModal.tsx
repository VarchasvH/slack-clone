import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useCreateWorkspaceModal } from "../store/useCreateWorkspaceModal";
import { useCreateWorkspace } from "../api/useCreateWorkspace";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const CreateWorkspaceModal = () => {
  const [name, setName] = useState("");
  const [open, setOpen] = useCreateWorkspaceModal();
  const { mutate, data, error, isPending, isSuccess, isError, isSettled } =
    useCreateWorkspace();
  const router = useRouter();

  const handleClose = () => {
    setOpen(false);

    // Clear the form data
    setName("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutate(
      { name },
      {
        onSuccess(workspaceId) {
          toast.success("🎊 Workspace was created! 🎊");
          router.push(`/workspace/${workspaceId}`);
          handleClose();
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a workspace</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={false}
            required
            autoFocus
            minLength={3}
            placeholder='Workspace name eg. "Work", "Personal", "Home".'
          />
          <div className='flex justify-end'>
            <Button disabled={false}>Create</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateWorkspaceModal;

// 2:33:03
