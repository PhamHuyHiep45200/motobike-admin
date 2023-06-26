import { getChatByUser } from "@/service/mesage";
import { Button, Form, Input } from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

function Message() {
  const ref=useRef(null)
  const router = useRouter();
  const [form] = Form.useForm();
  const [mes, setMes] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(process.env.NEXT_PUBLIC_URL_SERVER);
    setSocket(newSocket);

    newSocket.on("chat", (data) => {
      if (
        localStorage.getItem("userId") === data.idPersonSend.toString() ||
        localStorage.getItem("userId") === data.idPersonRecipient.toString()
      ) {
        setMes((prevMessages) => [...prevMessages, data]);
      }
    });

    return () => {
      newSocket.disconnect(); // Ngắt kết nối khi component bị hủy
    };
  }, []);

  const handleSendMessage = (e) => {
    socket.emit("sendChat", {
      idPersonSend: +localStorage.getItem("userId"),
      idPersonRecipient: +router.query.id,
      message: e.message,
    });
    form.resetFields();
  };

  useEffect(() => {
    if (router.query) {
      getAllMess();
    }
  }, [router.query]);
  useEffect(()=>{
    ref.current.scrollTop = ref.current.scrollHeight
  },[mes])
  const getAllMess = async () => {
    const { id } = router.query;
    const params = {
      idPersonSend: +localStorage.getItem("userId"),
      idPersonRecipient: +id,
    };
    const res = await getChatByUser(params);
    if (res.data && res.data.status === 200) {
      setMes(res.data.data);
    }
  };
  return (
    <div className="flex justify-center relative items-center h-[85vh] w-[80%] bg-[#eaeaea] pb-[60px]">
      <div className="max-h-[76vh] w-full px-[100px] overflow-auto justify-end" ref={ref}>
        <div className="min-h-[76vh]  flex flex-col justify-end bg-[#eaeaea]">
          {mes.length > 0 &&
            mes.map((e) => {
              const checkSendUser =
                localStorage.getItem("userId") === e.idPersonSend.toString();
              return (
                <div
                  key={e.id}
                  style={{
                    justifyContent: checkSendUser ? "end" : "start",
                  }}
                  className="mb-[10px] flex"
                >
                  <span
                    style={{
                      background: checkSendUser ? "#07c2b2" : "white",
                      color: checkSendUser ? "white" : "black",
                    }}
                    className="px-[10px] py-[5px] mr-[10px] rounded-[4px] text-[16px] block max-w-[250px]"
                  >
                    {e.message}
                  </span>
                </div>
              );
            })}
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <Form onFinish={handleSendMessage} form={form}>
            <div className="flex w-full items-center">
              <Form.Item noStyle name="message">
                <Input size="large" />
              </Form.Item>
              <Button size="large" className="min-w-[100px]" htmlType="submit">
                Gửi
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Message;
