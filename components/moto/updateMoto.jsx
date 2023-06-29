import { Button, Form, Input, Modal, Select } from "antd";
import React, { useEffect } from "react";
import UploadFile from "../common/UploadFile";
import { updateMoto } from "@/service/moto";
import UploadMutiple from "../common/UploadMutiple";
import { DatePicker } from "antd";
import { InputNumber } from "antd";
import moment from "moment/moment";
const { TextArea } = Input;
function UpdateUser({ open, refresh, closeAdd, data, category }) {
  const [form] = Form.useForm();
  const submit = async (e) => {
    const response = await updateMoto(data.id, {
      ...e,
      listThumbnail: JSON.stringify(e.listThumbnail.map(s=>s)),
    });
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
  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        name: data.name,
        producer: data.producer,
        yearOfManufacture: moment(data.yearOfManufacture),
        listThumbnail: JSON.parse(data.listThumbnail),
        color: data.color,
        licensePlates: data.licensePlates,
        deposit: data.deposit,
        description: data.description,
        licensePates: data.licensePates,
        rentCost: data.rentCost,
        quantity: data.quantity,
        categoryId: data.categoryId,
      });
    }
  }, [data]);
  return (
    <Modal
      title="Sửa Người Dùng"
      open={open}
      onCancel={onCloseAdd}
      footer={false}
    >
      <Form onFinish={submit} layout="vertical" form={form}>
        <Form.Item
          label="Tên xe"
          name="name"
          rules={[{ required: true, message: "Không được bỏ trống!" }]}
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item
          label="Nhà sản xuất"
          name="producer"
          rules={[{ required: true, message: "Không được bỏ trống!" }]}
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item
          label="Năm sản xuất"
          name="yearOfManufacture"
          rules={[{ required: true, message: "Không được bỏ trống!" }]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          label="Màu sắc"
          name="color"
          rules={[{ required: true, message: "Không được bỏ trống!" }]}
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item
          label="Giấy phép"
          name="licensePates"
          rules={[{ required: true, message: "Không được bỏ trống!" }]}
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item
          label="Biển số xe"
          name="licensePlates"
          rules={[{ required: true, message: "Không được bỏ trống!" }]}
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item
          label="Giá thuê / Ngày"
          name="rentCost"
          rules={[{ required: true, message: "Không được bỏ trống!" }]}
        >
          <InputNumber size="large" />
        </Form.Item>
        <Form.Item
          label="Đặt cọc (%)"
          name="deposit"
          rules={[{ required: true, message: "Không được bỏ trống!" }]}
        >
          <InputNumber size="large" />
        </Form.Item>
        <Form.Item
          label="Số lượng"
          name="quantity"
          rules={[{ required: true, message: "Không được bỏ trống!" }]}
        >
          <InputNumber size="large" />
        </Form.Item>
        <Form.Item
          label="Hãng xe"
          name="categoryId"
          rules={[{ required: true, message: "Không được bỏ trống!" }]}
        >
          <Select
            style={{ width: 200 }}
            options={category.map((e) => ({
              value: e.id,
              label: e.name,
            }))}
          />
        </Form.Item>
        <Form.Item
          label="Mô tả xe"
          name="description"
          rules={[{ required: true, message: "Không được bỏ trống!" }]}
        >
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item
          label="Ảnh xe"
          name="listThumbnail"
          rules={[{ required: true, message: "Không được bỏ trống!" }]}
        >
          <UploadMutiple />
        </Form.Item>
        <div>
          <Button htmlType="submit" className="w-full" size="large">
            Sửa
          </Button>
        </div>
      </Form>
    </Modal>
  );
}

export default UpdateUser;
