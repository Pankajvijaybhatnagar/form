"use client";

import React, { useEffect, useState } from "react";
import { Box, Text, Flex, Button, Spinner } from "@radix-ui/themes";
import { FaArrowLeft, FaUpload } from "react-icons/fa";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

import galleryServices from "@/lib/services/galleryServices";
import FileGrid from "@/components/gallery/FileGrid";
import UploadModal from "@/components/gallery/UploadModal";

export default function FolderImagesPage() {
  const params = useParams();
  const router = useRouter();
  const { access_token } = useAuth();

  const folder = params.folder;

  const [images, setImages] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);

  const [uploadOpen, setUploadOpen] = useState(false);

  const fetchImages = async () => {
    setLoading(true);
    const res = await galleryServices.getImages(folder, 100, access_token);

    if (res.success) {
      setImages(res.data?.files || []);
      setPagination(res.data?.pagination || null);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchImages();
  }, [folder]);

  const handleDeleteFile = async (filename) => {
    const res = await galleryServices.deleteFile(folder, filename, access_token);
    if (res.success) fetchImages();
    else alert(res.error || "Failed to delete file");
  };

  return (
    <Box >
      <Flex align="center" gap={3}>
        <Button variant="ghost" onClick={() => router.push("/admin/gallery")}>
          <FaArrowLeft /> &nbsp; Back
        </Button>

        <Text size="5" weight="bold" style={{marginLeft:7}}>{folder.replace(/_/g, " ")}</Text>

        <Button
          leftIcon={<FaUpload />}
          style={{ marginLeft: "auto" }}
          onClick={() => setUploadOpen(true)}
        >
          Upload Files
        </Button>
      </Flex>

      {loading ? (
        <Flex justify="center" mt="4"><Spinner /> Loading images...</Flex>
      ) : (
        <FileGrid files={images} onDeleteFile={handleDeleteFile} />
      )}

      {pagination && (
        <Flex justify="between" style={{ marginTop: 18 }}>
          <Button disabled={pagination.current_page <= 1}>
            Previous
          </Button>

          <Text>
            Page {pagination.current_page} of {pagination.total_pages}
          </Text>

          <Button disabled={pagination.current_page >= pagination.total_pages}>
            Next
          </Button>
        </Flex>
      )}

      <UploadModal
        open={uploadOpen}
        folder={folder}
        onClose={() => setUploadOpen(false)}
        onDone={() => { setUploadOpen(false); fetchImages(); }}
        token={access_token}
      />
    </Box>
  );
}
