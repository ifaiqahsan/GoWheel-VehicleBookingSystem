"use client";

import { UploadButton } from "@uploadthing/react";
import { OurFileRouter } from "@/app/api/uploadthing/core";

export default function Uploader({
    endpoint,
    onUpload
}: {
    endpoint: "imageUploader" | "documentUploader",
    onUpload: (url: string) => void
}) {
    return (
        <UploadButton<OurFileRouter, keyof OurFileRouter>
            endpoint={endpoint}
            onClientUploadComplete={(res) => {
                if (res && res[0]) onUpload(res[0].url);
            }}
            onUploadError={(error: Error) => {
                alert(error.message);
            }}
        />
    );
}