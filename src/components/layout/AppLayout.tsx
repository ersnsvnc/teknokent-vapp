'use client';

import React, { useMemo, useState } from 'react';
import { Layout, Menu, Drawer, Button, Grid } from 'antd';
import type { MenuProps } from 'antd';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MenuOutlined } from '@ant-design/icons';


const { Header, Sider, Content } = Layout;
const { useBreakpoint } = Grid;

type AppLayoutProps = {
  children: React.ReactNode;
};

type MenuKey = 'odeme' | 'duyuru';

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const screens = useBreakpoint();

  const selectedKey: MenuKey | undefined = useMemo(() => {
    if (pathname.startsWith('/odeme')) return 'odeme';
    if (pathname.startsWith('/duyuru')) return 'duyuru';
    return undefined;
  }, [pathname]);

  const items: MenuProps['items'] = [
    {
      key: 'odeme',
      label: <Link href="/odeme">Ödeme</Link>,
    },
    {
      key: 'duyuru',
      label: <Link href="/duyuru">Duyuru</Link>,
    },
  ];

  const handleMenuClick: MenuProps['onClick'] = () => {
    setMobileMenuOpen(false);
  };

  const isDesktop = screens.md === true;

  return (
    <Layout className="h-full bg-slate-50">
      {isDesktop ? (
        <Sider breakpoint="md" collapsedWidth={0} width={220} className="bg-white py-8">
          <Menu
            mode="inline"
            selectedKeys={selectedKey ? [selectedKey] : []}
            items={items}
            onClick={handleMenuClick}
            className="border-r-0 rounded-lg"
          />
        </Sider>
      ) : null}
      <Layout>
        <Header className="flex items-center justify-between bg-[#021528] px-4 shadow-md">
  <div className="text-lg font-semibold text-white">Vapp</div>

  {!isDesktop && (
    <>
      <button
        type="button"
        onClick={() => setMobileMenuOpen(true)}
        className="flex h-10 w-10 items-center justify-center rounded-md hover:bg-white/10 active:scale-95"
      >
        <MenuOutlined style={{ fontSize: 22, color: '#ffffff' }} />
      </button>

      <Drawer
        open={mobileMenuOpen}
        placement="left"
        onClose={() => setMobileMenuOpen(false)}
        width={260}
      >
        <Menu
          mode="inline"
          selectedKeys={selectedKey ? [selectedKey] : []}
          items={items}
          onClick={handleMenuClick}
        />
      </Drawer>
    </>
  )}
</Header>

        <Content className="p-4 md:p-6">
          <div className="mx-auto max-w-6xl rounded-lg bg-white p-4 shadow-sm md:p-6">
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
