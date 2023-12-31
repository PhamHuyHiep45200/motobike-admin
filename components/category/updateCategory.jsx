import { updateCategory } from "@/service/category";
import { updateUser } from "@/service/user";
import { Button, Form, Input, Modal, Select } from "antd";
import React, { useEffect } from "react";
import UploadFile from "../common/UploadFile";

function UpdateUser({ open, refresh, closeAdd, data }) {
  const [form] = Form.useForm();
  const submit = async (e) => {
    const response = await updateCategory(data.id,e);
    if (response.data && response.data.status === 200) {
      refresh();
      onCloseAdd();
    } else {
      console.log(response);
    }
  };
  const onCloseAdd = () => {
    closeAdd();
  };
  useEffect(()=>{
    if(data){
      form.setFieldsValue({
        name: data.name,
        thumnail:data.thumnail,
      })
    }
  },[data])
  return (
    <Modal title="Sửa Người Dùng" open={open} onCancel={onCloseAdd} footer={false}>
      <Form onFinish={submit} layout="vertical" form={form}>
      <Form.Item
          label="Tên hãng"
          name="name"
          rules={[{ required: true, message: "Không được bỏ trống!" }]}
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item
          label="Ảnh"
          name="thumnail"
          rules={[{ required: true, message: "Không được bỏ trống!" }]}
        >
          <UploadFile />
        </Form.Item>
        <div>
          <Button htmlType="submit" className="w-full" size="large">
            Cập nhật
          </Button>
        </div>
      </Form>
    </Modal>
  );
}

export default UpdateUser;