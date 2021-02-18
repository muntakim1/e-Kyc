import React, { useEffect } from "react";
import { useDropzone } from "react-dropzone";
import "../assets/css/style.css";

const DropZoneInput = (props) => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  useEffect(() => {
    props.setFile(acceptedFiles);
    props.setSelect(true);
  }, [acceptedFiles]);
  const file = acceptedFiles.map((file) => file.name);
  return (
    <div className="card">
      <div
        className="dropzone dz-clickable"
        {...getRootProps({ className: "dropzone" })}
      >
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
        <p>{file}</p>
      </div>
    </div>
  );
};

export default DropZoneInput;
