import { itemsLayout } from '@/data/layout';
import { Layout, Menu } from 'antd';
import { useRouter } from 'next/router';
import React from 'react'

const {Sider,Content} = Layout

function LayoutMain({children}) {
    const router=useRouter()
    const changeMenu = (e)=>{
        router.push(e.key)
    }
  return (
    <Layout style={{height:'100vh'}}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={itemsLayout}
          onClick={changeMenu}

        />
      </Sider>
      <Layout>
        <Content style={{ margin: '24px 16px 0' }}>
          <div style={{ padding: 24, minHeight: 360 }}>
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}

export default LayoutMain