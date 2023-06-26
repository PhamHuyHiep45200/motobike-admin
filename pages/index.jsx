import { Image } from "antd"
import React from "react"
export default function Home() {
  return <div className="flex flex-col items-center">
    <h1 className="text-[30px] font-bold">WellCome ADMIN</h1>
    <Image preview={false} src="https://tripbike.net/wp-content/uploads/2021/06/thue-xe-may-da-nang-tripbike.jpg" alt=""/>
  </div>
}
