import React from 'react';
import { Layout, Menu, Button } from 'antd';
import { LaptopOutlined, NotificationOutlined, UserOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

const { Sider } = Layout;

export interface ISidebarProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const Sidebar: React.FC<ISidebarProps> = ({ isAuthenticated, isAdmin }) => {
  const [collapsed, setCollapsed] = React.useState(false);

  if (!isAuthenticated) {
    return null;
  }

  const handleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Sider
      width={200}
      breakpoint={'lg'}
      style={{
        height: '100vh',
        position: 'sticky',
        top: 0,
        left: 0,
      }}
      collapsible
      collapsed={collapsed}
      onCollapse={handleCollapse}
    >
      <Menu mode="inline" defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} style={{ height: '100%', borderRight: 0 }}>
        <Menu.Item key="1" icon={<UserOutlined />}>
          User Profile
        </Menu.Item>
        <Menu.SubMenu key="sub1" icon={<LaptopOutlined />} title="Laptop">
          <Menu.Item key="sub1-1">Option 1</Menu.Item>
          <Menu.Item key="sub1-2">Option 2</Menu.Item>
        </Menu.SubMenu>
        {isAdmin && (
          <Menu.SubMenu key="sub2" icon={<NotificationOutlined />} title="Admin Notifications">
            <Menu.Item key="sub2-1">Option 1</Menu.Item>
            <Menu.Item key="sub2-2">Option 2</Menu.Item>
          </Menu.SubMenu>
        )}
      </Menu>
    </Sider>
  );
};

export default Sidebar;
