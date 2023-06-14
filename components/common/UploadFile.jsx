import { uploadFile } from "@/service/upload";
import { Upload } from "antd";
import React, { useEffect, useState } from "react";

function UploadFile({ value, onChange, type }) {
  const [imageUrl, setImageUrl] = useState("");
  const handleChange = async (e) => {
    const formData = new FormData();
    formData.append("file", e.file.originFileObj);
    const res = await uploadFile(formData);
    if (res) {
      setImageUrl(res.data);
      onChange?.(res.data);
    }
  };
  useEffect(() => {
    if (value) {
      setImageUrl(value);
    }
  }, [value]);
  return (
    <Upload
      name="thumnail"
      listType= {type || 'picture-circle'}
      className="avatar-uploader"
      showUploadList={false}
      onChange={handleChange}
    >
      {imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={process.env.NEXT_PUBLIC_URL_SERVER+imageUrl} alt="thumnail" style={{ width: "100%" }} />
      ) : (
        <span>Tải ảnh</span>
      )}
    </Upload>
  );
}

export default UploadFile;
