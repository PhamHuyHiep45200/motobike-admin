import { deleteUser, getAllUser, unDeleteUser } from "@/service/user";
import { DeleteOutlined, HighlightOutlined, LockOutlined, UnlockOutlined } from "@ant-design/icons";
import { Button, Space, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import AddUser from "./addUser";
import UpdateUser from "./updateUser";

function Users() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [dataUpdate, setDataUpdate] = useState(null);
  const [add, setAdd] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const columns = [
    {
      title: "Họ Và Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số Điện Thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Quyền",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Hoạt Động",
      key: "tags",
      render: (e) => (
        <div>
          {e?.deleteFlg ? (
            <div className="w-[20px] h-[20px] rounded-full bg-[red]"></div>
          ) : (
            <div className="w-[20px] h-[20px] rounded-full bg-[green]"></div>
          )}
        </div>
      ),
    },
    {
      title: "Thao Tác",
      key: "action",
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
            <span className="text-[green]">Chỉnh Sửa</span>
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
  }, []);
  const getAll = async () => {
    setLoading(true);
    try {
      const response = await getAllUser();
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
  const handleDelete = async(id)=>{
    const response =await deleteUser(id)
    if(response.data && response.data.status===200){
      getAll()
    }else{
      console.log(response)
    }
  }
  const handleUnDelete = async(id)=>{
    const response =await unDeleteUser(id)
    if(response.data && response.data.status===200){
      getAll()
    }else{
      console.log(response)
    }
  }
  return (
    <div>
      <div className="mb-5">
        <Button size="large" onClick={() => setAdd(true)}>
          Thêm người dùng
        </Button>
      </div>
      <AddUser open={add} refresh={getAll} closeAdd={closeAdd} />
      <UpdateUser
        open={openUpdate}
        refresh={getAll}
        closeAdd={closeAdd}
        data={dataUpdate}
      />
      <Table columns={columns} dataSource={data} loading={loading} />
    </div>
  );
}

export default Users;