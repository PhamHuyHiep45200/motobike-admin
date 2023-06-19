import {
  HighlightOutlined,
  LockOutlined,
  UnlockOutlined,
} from "@ant-design/icons";
import { Button, Table } from "antd";
import React, { useEffect, useState } from "react";
import AddUser from "./addMoto";
import UpdateUser from "./updateMoto";
import { Image } from "antd";
import { deleteMoto, getAllMoto, unDeleteMoto } from "@/service/moto";
import moment from "moment/moment";
import { Carousel } from "antd";
import { getAllCategory } from "@/service/category";

function Moto() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [dataUpdate, setDataUpdate] = useState(null);
  const [add, setAdd] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [category, setCategory] = useState([]);
  const columns = [
    {
      title: "Tên xe",
      key: "name",
      width: 120,
      dataIndex: "name",
      fixed: "left",
    },
    {
      title: "Ảnh",
      key: "link",
      fixed: "left",
      width: 250,
      render: (e) => (
        <Carousel draggable autoplay dots={false}>
          {JSON.parse(e.listThumbnail).map((img, i) => (
            <Image
              src={`${process.env.NEXT_PUBLIC_URL_SERVER}${img}`}
              width={250}
              height={150}
              alt=""
              key={i}
              preview={false}
            />
          ))}
        </Carousel>
      ),
    },
    {
      title: "Nhà sản xuất",
      key: "name",
      dataIndex: "producer",
      width: 150,
    },
    {
      title: "Năm sản xuất",
      key: "name",
      render: (e) => (
        <div>{moment(e.yearOfManufacture).format("DD-MM-YYYY")}</div>
      ),
      width: 130,
    },
    {
      title: "Màu",
      key: "name",
      dataIndex: "color",
      width: 100,
    },
    {
      title: "Mô tả",
      key: "name",
      width: 300,
      render: (e) => (
        <div className="min-w-[250px] max-w-[250px] truncate">
          {e.description}
        </div>
      ),
    },
    {
      title: "Giấy phép",
      key: "name",
      dataIndex: "licensePates",
    },
    {
      title: "Giá thuê / Ngày",
      key: "name",
      dataIndex: "rentCost",
    },
    {
      title: "Số lượng",
      key: "name",
      dataIndex: "quantity",
    },
    {
      title: "Hãng xe",
      key: "name",
      render: (e) => (
        <span>
          {category.length
            ? category.find((c) => c.id === e.categoryId)?.name
            : 0}
        </span>
      ),
      width: 200,
    },
    {
      title: "Thao Tác",
      key: "action",
      fixed: "right",
      render: (e) => (
        <div className="flex items-center space-x-[10px]">
          <div
            className="px-[10px] py-[5px] rounded-sm bg-[green] border-[green] border-[1px] bg-opacity-25 space-x-[5px] text-[white] flex items-center cursor-pointer font-medium"
            onClick={() => {
              setDataUpdate(e);
              setOpenUpdate(true);
            }}
          >
            <HighlightOutlined className="text-[green]" />
            <span className="text-[green]">Sửa</span>
          </div>
          {!e.deleteFlg ? (
            <div
              className="px-[10px] py-[5px] rounded-sm bg-[red] border-[red] border-[1px] bg-opacity-25 space-x-[5px] text-[white] flex items-center cursor-pointer font-medium"
              onClick={() => handleDelete(e.id)}
            >
              <LockOutlined className="text-[red]" />
              <span className="text-[red]">Khoá</span>
            </div>
          ) : (
            <div
              className="px-[10px] py-[5px] rounded-sm bg-[#957026] border-[#957026] border-[1px] bg-opacity-25 space-x-[5px] text-[white] flex items-center cursor-pointer font-medium"
              onClick={() => handleUnDelete(e.id)}
            >
              <UnlockOutlined className="text-[#957026]" />
              <span className="text-[#957026]">Mở Khoá</span>
            </div>
          )}
        </div>
      ),
    },
  ];
  useEffect(() => {
    getAll();
    getCategory();
  }, []);
  const getCategory = async () => {
    try {
      const response = await getAllCategory();
      if (response.data && response.data.status === 200) {
        setCategory(response.data.data);
      } else {
      }
    } catch (error) {}
  };
  const getAll = async () => {
    setLoading(true);
    try {
      const response = await getAllMoto();
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
  const closeAdd = () => {
    setAdd(false);
    setOpenUpdate(false);
  };
  const handleDelete = async (id) => {
    const response = await deleteMoto(id);
    if (response.data && response.data.status === 200) {
      getAll();
    } else {
      console.log(response);
    }
  };
  const handleUnDelete = async (id) => {
    const response = await unDeleteMoto(id);
    if (response.data && response.data.status === 200) {
      getAll();
    } else {
      console.log(response);
    }
  };
  return (
    <div>
      <div className="mb-5">
        <Button size="large" onClick={() => setAdd(true)}>
          Thêm xe
        </Button>
      </div>
      <AddUser
        category={category}
        open={add}
        refresh={getAll}
        closeAdd={closeAdd}
      />
      <UpdateUser
        category={category}
        open={openUpdate}
        refresh={getAll}
        closeAdd={closeAdd}
        data={dataUpdate}
      />
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        scroll={{ x: 2000 }}
      />
    </div>
  );
}

export default Moto;
