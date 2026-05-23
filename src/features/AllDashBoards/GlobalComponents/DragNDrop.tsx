import React, { useRef, useState } from "react";
import { UploadIcon } from "lucide-animated";

interface FileUploadProps {
  files: File[];
  onFileSelect: (files: File[]) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({
  files,
  onFileSelect,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (newFiles: FileList | null) => {
    if (!newFiles) return;

    const uploadedFiles = Array.from(newFiles);

    const updated = [...files, ...uploadedFiles];

    onFileSelect(updated);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    handleFiles(e.target.files);
  };

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>
  ) => {
    e.preventDefault();
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  };

  const removeFile = (index: number) => {
    const updated = files.filter((_, i) => i !== index);
    onFileSelect(updated);
  };

  const clearAll = () => {
    onFileSelect([]);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <>
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        className={`upload-box ${
          dragActive ? "active" : ""
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          hidden
          multiple
          onChange={handleChange}
        />

        <div>
          <UploadIcon size={45} />

          <p>
            Drag & drop files here or{" "}
            <span className="browse">
              Browse
            </span>
          </p>

          <span>
            Supports PDF, PNG, JPG, CSV (Max 10 MB)
          </span>
        </div>
      </div>

      {files.length > 0 && (
        <div className="uploaded-files">
          <div className="upload-header">
            <h4>
              Uploaded Files ({files.length})
            </h4>

            <button
              type="button"
              onClick={clearAll}
            >
              Clear All
            </button>
          </div>

          {files.map((file, index) => (
            <div
              className="file-item"
              key={index}
            >
              <span>{file.name}</span>

              <button
                type="button"
                onClick={() =>
                  removeFile(index)
                }
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default FileUpload;