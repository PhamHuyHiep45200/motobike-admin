import { createUser } from "@/service/user";
import { Button, Form, Input, Modal, Select } from "antd";
import React, { useState } from "react";

function AddUser({ open, refresh, closeAdd }) {
  const [form] = Form.useForm();
  const submit = async (e) => {
    const response = await createUser(e);
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
    <Modal title="Tạo Người Dùng" open={open} onCancel={onCloseAdd} footer={false}>
      <Form onFinish={submit} layout="vertical" form={form}>
        <Form.Item
          label="Họ và tên"
          name="name"
          rules={[{ required: true, message: "Không được bỏ trống!" }]}
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Không được bỏ trống!" },
            { type: "email", message: "Phải là email" },
          ]}
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item
          label="Số điện thoại"
          name="phone"
          rules={[{ required: true, message: "Không được bỏ trống!" }]}
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[{ required: true, message: "Không được bỏ trống!" }]}
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item
          label="Quyền"
          name="role"
          rules={[{ required: true, message: "Không được bỏ trống!" }]}
        >
          <Select
            size="large"
            options={[
              { value: "USER", label: "USER" },
              { value: "ADMIN", label: "ADMIN" },
            ]}
          />
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