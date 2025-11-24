"use client";

import React, { useEffect, useState } from "react";
import { Box, Text, Flex, Button, Spinner } from "@radix-ui/themes";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import galleryServices from "@/lib/services/galleryServices";
import FolderGrid from "@/components/gallery/FolderGrid";
import CreateFolderModal from "@/components/gallery/CreateFolderModal";

const styles = {
  
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
};

export default function GalleryPage() {
  const router = useRouter();
  const { access_token } = useAuth();

  const [folders, setFolders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [createOpen, setCreateOpen] = useState(false);

  const fetchFolders = async () => {
    setLoading(true);
    const res = await galleryServices.getFolders(access_token);
    if (res.success) {
      setFolders(res.data?.folders || res.data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchFolders();
  }, []);

  const openFolder = (name) => {
    router.push(`/admin/gallery/${name}`);
  };

  const handleCreateFolder = async (name) => {
    const res = await galleryServices.createFolder(name, access_token);
    if (res.success) {
      setCreateOpen(false);
      fetchFolders();
    } else {
      alert(res.error || "Failed to create folder");
    }
  };

  return (
    <Box style={styles.page}>
      <Flex style={styles.topBar}>
        <Text size="6" weight="bold">
          Gallery
        </Text>
        <Button leftIcon={<FaPlus />} onClick={() => setCreateOpen(true)}>
          Create Folder
        </Button>
      </Flex>

      {loading ? (
        <Flex justify="center" mt="4">
          <Spinner /> &nbsp; Loading...
        </Flex>
      ) : (
        <FolderGrid
          folders={folders}
          token={access_token}
          onOpenFolder={openFolder}
          refreshFolders={fetchFolders}
        />
      )}

      {/* Create folder modal */}
      <CreateFolderModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreate={handleCreateFolder}
      />
    </Box>
  );
}
