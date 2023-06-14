import { createCategory } from "@/service/category";
import { Button, Form, Input, Modal } from "antd";
import React from "react";
import UploadFile from "../common/UploadFile";

function AddUser({ open, refresh, closeAdd }) {
  const [form] = Form.useForm();
  const submit = async (e) => {
    const response = await createCategory(e);
    if (response.data && response.data.status === 200) {
      refresh();
      onCloseAdd();
    } else {
      console.log(response);
    }
  };
  const onCloseAdd = () => {
    closeAdd();
    form.resetFields();
  };
  return (
    <Modal
      title="Tạo Hãng xe"
      open={open}
      onCancel={onCloseAdd}
      footer={false}
    >
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
          <UploadFile/>
        </Form.Item>
        <div>
          <Button htmlType="submit" className="w-full" size="large">
            Tạo
          </Button>
        </div>
      </Form>
    </Modal>
  );
}

export default AddUser;
