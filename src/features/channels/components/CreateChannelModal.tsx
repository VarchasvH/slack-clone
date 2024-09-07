import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCreateChannelModal } from "../store/useCreateChannelModal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCreateChannel } from "../api/useCreateChannel";
import { useGetWorkspaceId } from "@/hooks/useGetWorkspaceId";

const CreateChannelModal = () => {
  const workspaceId = useGetWorkspaceId();
  const [open, setOpen] = useCreateChannelModal();
  const [name, setName] = useState("");
  const { mutate, isPending } = useCreateChannel();

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
          // TODO: redirect to new channel
          handleClose();
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
