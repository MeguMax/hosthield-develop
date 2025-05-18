import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { v4 as uuid } from "uuid";
import SingleFileUploadWithProgress from "./singlefilewithprogress";

export default function DropzoneWithoutDrag(props) {
  const maxFiles = `${props.limit === "" || typeof props.limit === "undefined"
    ? 10
    : props.limit}`;
  const minSize = 1000;
  const maxSize = 10000000;
  const [files, setFiles] = useState([]);
  const [allowedNoFiles, setAllowedNoFiles] = useState(maxFiles);
  const {onChange} = props;
  
  const onDrop = useCallback(
    (accFiles, fileRejections) => {
      if (accFiles.length > 0 && allowedNoFiles > 0) {
        let calcTotalFiles = accFiles.length + files.length;
        if (calcTotalFiles <= maxFiles)
          setAllowedNoFiles(allowedNoFiles - accFiles.length);
        else if (calcTotalFiles > maxFiles) {
          setAllowedNoFiles(calcTotalFiles - maxFiles);
        }
        let mappedAccFiles = [];
        let i = 0;
        for (; i < accFiles.length && i < allowedNoFiles; i++) {
          mappedAccFiles.push({ file: accFiles[i], id: uuid(), errors: [] });
        }
        if (calcTotalFiles > maxFiles) {
          setAllowedNoFiles(allowedNoFiles - i);
        }
        if (mappedAccFiles.length > 0) {
          if (files.length === 0){
            const updatedFiles = [...mappedAccFiles, ...fileRejections];
            setFiles(updatedFiles);
            if (typeof onChange === 'function') {
              onChange(updatedFiles);
            }
          } else if (allowedNoFiles >= 0) {
            setFiles((state) => [
              ...state,
              ...mappedAccFiles,
              ...fileRejections,
            ]);
            if (typeof onChange === 'function') {
              onChange([...files, ...mappedAccFiles, ...fileRejections]);
            }
          }
        }
      }
    },
    [files, allowedNoFiles, maxFiles, onChange]
  );

  function onDelete(file) {
    setFiles((curr) => curr.filter((fw) => fw.file !== file));
    if (typeof onChange === 'function') {
      onChange(files.filter(f => f.file !== file));
    }
    setAllowedNoFiles(allowedNoFiles + 1);
  }

  const { getRootProps, getInputProps, acceptedFiles, fileRejections } =
    useDropzone({
      onDrop,
      noDrag: true,
      minSize: minSize,
      maxSize: maxSize,
      maxFiles: maxFiles,
      accept:
        props.accept == "" || typeof props.accept == "undefined"
          ? "image/jpeg, image/png,.doc,.docx,.pdf"
          : props.accept,
      disabled: files.length >= maxFiles ? true : false,
    });

  const acceptedFileItems = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size / 1000} KB
    </li>
  ));

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <li key={file.path} className="ml-5 mt-1">
      <span className="text-sm lg:text-base">
        {file.path} - {file.size / 1000} KB
      </span>
      <ul>
        {errors.map((e) => (
          <li key={e.code} className="ml-1">
            <span className="text-sm lg:text-base">
              {e.code === "file-too-small"
                ? `The file is smaller than ${minSize / 1000} KB`
                : "" || e.code === "file-too-large"
                ? `The file is larger than ${maxSize / 1000} KB`
                : "" || e.code === "too-many-files"
                ? `The number of files cannot exceed more than ${maxFiles}`
                : "" || e.code}
            </span>
          </li>
        ))}
      </ul>
    </li>
  ));

  return (
    <div className="container">
      <div
        {...getRootProps({
          className: `${props.className} ${
            files.length == maxFiles ? "disabled" : ""
          } dropzone`,
        })}
      >
        <input {...getInputProps()} />
        {props.Icon}
        <span className={props.LabelTextClasses}>{props.LabelText}</span>
      </div>
      {allowedNoFiles > 0 && allowedNoFiles <= maxFiles && (
        <aside className="mt-2">
          <h4 className="text-red-500 text-sm">{`Only ${allowedNoFiles}/${maxFiles} files can be uploaded`}</h4>
        </aside>
      )}
      {files.length >= maxFiles && (
        <aside className="mt-2">
          <h4 className="text-red-500 text-sm">{`Only max ${maxFiles} files are allowed to be uploaded`}</h4>
        </aside>
      )}
      {files.map((fileWrapper) => (
        <SingleFileUploadWithProgress
          key={fileWrapper.id}
          file={fileWrapper.file}
          onDelete={onDelete}
        />
      ))}
      {fileRejectionItems.length > 0 && (
        <aside className="mt-2 w-full">
          <h4 className="text-red-500">Files Rejected</h4>
          <ul className="list-disc">
            {fileRejectionItems.length > maxFiles
              ? `Number of files cannot exceed more than ${maxFiles}`
              : fileRejectionItems}
          </ul>
        </aside>
      )}
    </div>
  );
}
