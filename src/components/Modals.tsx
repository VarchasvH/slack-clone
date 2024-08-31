"use client";

import CreateWorkspaceModal from "@/features/workspaces/components/CreateWorkspaceModal";
import { useCreateWorkspaceModal } from "@/features/workspaces/store/useCreateWorkspaceModal";
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
      <CreateWorkspaceModal />
    </>
  );
};

export default Modals;
