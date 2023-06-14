import {
  HighlightOutlined,
  LockOutlined,
  UnlockOutlined,
} from "@ant-design/icons";
import { Button, Table } from "antd";
import React, { useEffect, useState } from "react";
import { Image } from "antd";
import { getAllOrder, updateOrder } from "@/service/order";
import moment from "moment/moment";
import { Tag } from "antd";

function Order() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const getStatus = (type) => {
    switch (type) {
      case "INPROGRESS":
        return (
          <Tag color="orange" className="font-bold">
            INPROGRESS
          </Tag>
        );

      case "PAID":
        return (
          <Tag color="purple" className="font-bold">
            PAID
          </Tag>
        );

      case "RECEIVED":
        return (
          <Tag color="green" className="font-bold">
            RECEIVED
          </Tag>
        );

      default:
        return (
          <Tag color="magenta" className="font-bold">
            CANCLE
          </Tag>
        );
    }
  };
  const columns = [
    {
      title: "Trạng thái",
      align: "center",
      key: "name",
      render: (e) => <div>{getStatus(e.statusOrder)}</div>,
    },
    {
      title: "Người thuê",
      dataIndex: ["UserReceiverOrder", "name"],
      key: "name",
    },
    {
      title: "Xe thuê",
      key: "tags",
      dataIndex: ["motoOrder", "name"],
    },
    {
      title: "Thời gian thuê",
      key: "tags",
      render: (e) => (
        <div>{moment(e.createdAt).format("HH:mm:ss DD-MM-YYYY")}</div>
      ),
    },
    {
      title: "Thao tác",
      key: "action",
      render: (e) => (
        <div className="flex items-center space-x-[10px]">
          <div
            style={{ opacity: e.statusOrder === "INPROGRESS" ? 1 : 0.4 }}
            className="px-[10px] py-[5px] rounded-sm bg-[red] border-[red] border-[1px] bg-opacity-25 space-x-[5px] text-[white] flex items-center cursor-pointer font-medium"
            onClick={() => handleDelete(e.id, e.statusOrder)}
          >
            <span className="text-[red]">Huỷ Đơn</span>
          </div>
        </div>
      ),
    },
  ];
  useEffect(() => {
    getAll();
  }, []);
  const getAll = async () => {
    setLoading(true);
    try {
      const response = await getAllOrder();
      console.log(response);
      if (response.data && response.data.status === 200) {
        setLoading(false);
        setData(response.data.data);
      } else {
        console.log(response);
      }
    } catch (error) {
      setLoading(false);
    }
  };
  const handleDelete = async (id, type) => {
    if (type === "INPROGRESS") {
      const response = await updateOrder(id,{
        statusOrder: 'CANCLE'
      });
      if (response.data && response.data.status === 200) {
        getAll();
      } else {
        console.log(response);
      }
    }
  };
  return (
    <div>
      <div className="font-weight text-[20px] text-center mb-5 ">
        Lịch Sử Thuê Xe
      </div>
      <Table columns={columns} dataSource={data} loading={loading} />
    </div>
  );
}

export default Order;
