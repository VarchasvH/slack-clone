// ? Library Imports
import { useState } from "react";
import { useRouter } from "next/navigation";

// ? Store imports
import { useCreateChannelModal } from "../store/useCreateChannelModal";

// ? Components imports
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// ? Api imports
import { useCreateChannel } from "../api/useCreateChannel";

// ? Hooks imports
import { useGetWorkspaceId } from "@/hooks/useGetWorkspaceId";
import { useGetChannelId } from "@/hooks/useGetChannelId";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

const CreateChannelModal = () => {
  const workspaceId = useGetWorkspaceId();
  const channelId = useGetChannelId();
  const [open, setOpen] = useCreateChannelModal();
  const [name, setName] = useState("");
  const { mutate, isPending } = useCreateChannel();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s+/g, "-").toLowerCase();
    setName(value);
  };

  const handleClose = () => {
    setName("");
    setOpen(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(
      {
        name,
        workspaceId,
      },
      {
        onSuccess: (id) => {
          router.push(`/workspace/${workspaceId}/channel/${id}`);
          handleClose();
          toast.success("Channel created!");
        },
        onError: () => {
          toast.error("Failed to create the channel!");
        },
      }
    );
  };
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a channel</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <Input
            value={name}
            disabled={isPending}
            onChange={handleChange}
            autoFocus
            required
            minLength={3}
            maxLength={80}
            placeholder='eg. Budget-plan'
          />
          <div className='flex justify-end'>
            <Button
              disabled={isPending}
              className='bg-green-600 hover:bg-green-600/80'
            >
              Create
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateChannelModal;
