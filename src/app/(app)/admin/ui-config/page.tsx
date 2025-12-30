'use client';

import { useEffect, useState } from 'react';
import { Spin, Tabs } from 'antd';
import type { PaymentUIConfig, AnnouncementUIConfig } from '@/types/ui-config';
import PaymentConfigEditor from './PaymentConfigEditor';
import PaymentPreview from './PaymentPreview';
import AnnouncementConfigEditor from './AnnouncementConfigEditor';
import AnnouncementPreview from './AnnouncementPreview';

const UIConfigPage = () => {
  const [paymentConfig, setPaymentConfig] = useState<PaymentUIConfig | null>(null);
  const [announcementConfig, setAnnouncementConfig] = useState<AnnouncementUIConfig | null>(null);

  useEffect(() => {
    fetch('/api/ui-config')
      .then((res) => res.json())
      .then((data) => {
        setPaymentConfig(data.payment);
        setAnnouncementConfig(data.announcement);
      });
  }, []);

  if (!paymentConfig || !announcementConfig) {
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
          key: 'payment',
          label: 'Ödeme UI',
          children: (
            <div className="grid gap-6 md:grid-cols-2">
              <PaymentConfigEditor initialConfig={paymentConfig} onChange={setPaymentConfig} />
              <PaymentPreview config={paymentConfig} />
            </div>
          ),
        },
        {
          key: 'announcement',
          label: 'Duyuru UI',
          children: (
            <div className="grid gap-6 md:grid-cols-2">
              <AnnouncementConfigEditor
                initialConfig={announcementConfig}
                onChange={setAnnouncementConfig}
              />
              <AnnouncementPreview config={announcementConfig} />
            </div>
          ),
        },
      ]}
    />
  );
};

export default UIConfigPage;
