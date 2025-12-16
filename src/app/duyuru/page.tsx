'use client';

import { useEffect, useState } from 'react';
import { Tabs, Spin } from 'antd';
import type { AnnouncementUIConfig } from '@/types/ui-config';
import AnnouncementForm from './AnnouncementForm';
import AnnouncementList from './AnnouncementList';

const mockAnnouncements = [
  {
    id: '1',
    title: 'Sistem Bakımı',
    description: 'Bu gece sistem bakımda.',
    publishDate: '24.11.2025',
  },
];

const DuyuruPage = () => {
  const [config, setConfig] = useState<AnnouncementUIConfig | null>(null);

  useEffect(() => {
    fetch('/api/ui-config')
      .then((res) => res.json())
      .then((data) => setConfig(data.announcement));
  }, []);

  if (!config) {
    return (
      <div className="flex justify-center py-10">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <Tabs
      items={[
        {
          key: 'admin',
          label: 'Duyuru Yönetimi',
          children: <AnnouncementForm config={config} />,
        },
        {
          key: 'user',
          label: 'Kullanıcı Görünümü',
          children: <AnnouncementList items={mockAnnouncements} />,
        },
      ]}
    />
  );
};

export default DuyuruPage;
