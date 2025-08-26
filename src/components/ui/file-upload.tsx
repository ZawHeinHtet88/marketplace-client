import React, { useRef, useState } from "react";
import { Button } from "./button";
import { CloudUploadIcon } from "lucide-react";
import ImageAvatar from "./ImageAvatar";

type FileUploadProps = {
  onFileChange: (file: File | null) => void;
  accept?: string;
  label?: string;
  defaultImage: string | null;
  name: string;
};

const FileUpload: React.FC<FileUploadProps> = ({
  onFileChange,
  accept,
  defaultImage = null,
  name,
}) => {
  const [preview, setPreview] = useState<string | null>(defaultImage);
  const [fileName, setFileName] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file && accept === "image/*") {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
    if (file) {
      setFileName(file.name);
    }
    onFileChange(file);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0] || null;
    if (file && accept === "image/*") {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }

    if (file) {
      setFileName(file.name);
    }

    console.log(file);
    onFileChange(file);
  };

  return (
    <div
      className="w-full rounded-md border-2 border-dashed border-gray-300 p-4 text-center"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {preview && (
        <div className="mx-auto mt-4 w-fit">
          <ImageAvatar
            src={preview}
            alt={name}
            className="h-48 w-48 rounded-none"
          />
        </div>
      )}

      {!preview && !fileName && (
        <div className="flex flex-col items-center justify-center text-gray-500">
          <CloudUploadIcon className="size-20" />
          <p className="mt-2 text-sm">
            Drag and drop a file here, or click below button to upload
          </p>
        </div>
      )}

      <span className="my-2 text-center">{fileName}</span>

      <input
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
        id={`file-upload-${name}`}
        ref={inputRef}
      />
      <div className="my-4 flex justify-center gap-4">
        <Button asChild>
          <label htmlFor={`file-upload-${name}`}>
            {preview ? "Choose another File" : "Choose File"}
          </label>
        </Button>

        {preview && (
          <Button
            variant={"destructive"}
            onClick={() => {
              setPreview(null);
              setFileName("");
              onFileChange(null);
              if (inputRef.current) {
                inputRef.current.value = "";
              }
            }}
          >
            Remove
          </Button>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
