import { useEffect, useState } from "react";
import styled from "styled-components";

export default function SingleFileUploadWithProgress({ file, onDelete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    async function upload() {
      const url = await uploadFile(file, setProgress);
    }
    upload();
  }, []);

  return (
    <div className="flex space-y-1 mt-3 flex-col">
      <div className="flex justify-between">
        <span className="text-xs">{file.name}</span>
        <button
          onClick={() => onDelete(file)}
          className="savesign-button text-xs bg-yellow-200 px-2 rounded-sm cursor-pointer"
          type="button"
        >
          Delete
        </button>
      </div>
      <div className="w-full bg-gray-200 rounded-2xl text-xs overflow-x-hidden">
        <StyledProgressBar
          className="w-full bg-site-main text-gray-100 text-right"
          style={{
            width: `${progress}%`,
          }}
        >
          &nbsp;
        </StyledProgressBar>

        {/* {console.log(file.name)} */}
      </div>
    </div>
  );
}

const StyledProgressBar = styled.div`
  width: 0;
  transition: all 0.75s ease;
`;

function uploadFile(file, onProgress) {
  const uploadURL = "https://app.shieldmyrental.com/file";
  return new Promise((res, rej) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", uploadURL, true);

    xhr.onload = () => {
      // const resp = xhr?.responseText ? JSON.parse(xhr.responseText) : {};
      // res(resp);
    };
    xhr.onerror = (e) => rej(e);
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) {
        const percentage = Math.round((e.loaded / e.total) * 100);
        onProgress(percentage);
      }
    };
    const formData = new FormData();
    formData.append("file", file);
    xhr.send(formData);
  });
}
