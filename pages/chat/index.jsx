import { getUserMessage } from "@/service/mesage";
import { Avatar } from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function Chat() {
  const router = useRouter();
  const [user, setUser] = useState([]);

  const getUserList = async () => {
    const res = await getUserMessage();
    if (res.data && res.data.status === 200) {
      setUser(res.data.data);
    }
  };

  useEffect(() => {
    getUserList();
  }, []);
  console.log(user)
  return (
    <div>
      <div className="text-[18px] font-semibold">Chat Admin</div>
      {user.length && user.map((e) => {
        return (
          <div
            key={e.id}
            className="p-[4px] h-[70px] flex my-[10px] cursor-pointer flex-col rounded-[4px]"
            style={{ boxShadow: "0 0 3px 3px #eaeaea" }}
            onClick={() => router.push(`/chat/message/${e.idPersonSend}`)}
          >
            <div className="flex items-center mb-[4px]">
              <Avatar size="default">{e?.userSend?.name?.[0]}</Avatar>
              <span className="font-bold ml-[6px]">{e?.userSend?.name}</span>
            </div>
            <span className="ml-[5px] font-medium text-[#444]">
              {e?.message}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default Chat;
