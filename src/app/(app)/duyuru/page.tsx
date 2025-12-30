'use client';

import { useEffect, useMemo, useState } from 'react';
import { Tabs, Spin } from 'antd';
import type { AnnouncementUIConfig } from '@/types/ui-config';
import AnnouncementForm, { type Announcement } from './AnnouncementForm';
import AnnouncementList from './AnnouncementList';

const initialMock: Announcement[] = [
  {
    id: '1',
    title: 'Sistem Bakımı',
    description: 'Bu gece sistem bakımda.',
    publishDate: '24.11.2025',
    ctaText: 'Detaylar',
    ctaUrl: 'https://example.com/bakim',
  },
];

const DuyuruPage = () => {
  const [config, setConfig] = useState<AnnouncementUIConfig | null>(null);
  const [items, setItems] = useState<Announcement[]>(initialMock);

  useEffect(() => {
    fetch('/api/ui-config')
      .then((res) => res.json())
      .then((data) => setConfig(data.announcement));
  }, []);

  const handleCreate = (item: Announcement) => {
    setItems((prev) => [item, ...prev]);
  };

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
          children: <AnnouncementForm config={config} onCreate={handleCreate} />,
        },
        {
          key: 'user',
          label: 'Kullanıcı Görünümü',
          children: <AnnouncementList items={items} config={config} />,
        },
      ]}
    />
  );
};

export default DuyuruPage;
