import { updateUser } from "@/service/user";
import { Button, Form, Input, Modal, Select } from "antd";
import React, { useEffect } from "react";

function UpdateUser({ open, refresh, closeAdd, data }) {
  const [form] = Form.useForm();
  const submit = async (e) => {
    const response = await updateUser(data.id,e);
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
        email:data.email,
        phone:data.phone,
        role:data.role,
      })
    }
  },[data])
  return (
    <Modal title="Sửa Người Dùng" open={open} onCancel={onCloseAdd} footer={false}>
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
            Cập nhật
          </Button>
        </div>
      </Form>
    </Modal>
  );
}

export default UpdateUser;