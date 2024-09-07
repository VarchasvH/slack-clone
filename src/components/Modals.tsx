"use client";

import CreateWorkspaceModal from "@/features/workspaces/components/CreateWorkspaceModal";

import CreateChannelModal from "@/features/channels/components/CreateChannelModal";

import React, { useEffect, useState } from "react";

const Modals = () => {
  // ? The following code is done to prevent hydration errors
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  // ? Hydration part ends here

  return (
    <>
      <CreateChannelModal />
      <CreateWorkspaceModal />
    </>
  );
};

export default Modals;
