'use client';

import { Card, Button, Checkbox, Divider, Segmented, Switch, Typography, Space } from 'antd';
import {useState } from 'react';
import type { AnnouncementTemplate, AnnouncementUIConfig } from '@/types/ui-config';
import { notify } from '@/utils/notify';

const { Text } = Typography;

type Props = {
  initialConfig: AnnouncementUIConfig;
  onChange: (config: AnnouncementUIConfig) => void;
};

const TEMPLATE_OPTIONS = [
  { label: 'Simple', value: 'simple' },
  { label: 'Banner', value: 'banner' },
  { label: 'Maintenance', value: 'maintenance' },
] as const;

const fieldMeta: Array<{
  key: keyof Omit<AnnouncementUIConfig, 'template'>;
  title: string;
  desc: string;
  hasRequired?: boolean;
}> = [
  { key: 'title', title: 'Başlık', desc: 'Kart başlığı', hasRequired: true },
  { key: 'description', title: 'Açıklama', desc: 'Detay metni', hasRequired: true },
  { key: 'ctaText', title: 'CTA Metni', desc: 'Buton yazısı' },
  { key: 'ctaUrl', title: 'CTA URL', desc: 'Buton linki' },
  { key: 'publishDate', title: 'Yayın Tarihi', desc: 'Tarih satırı' },
];

export default function AnnouncementConfigEditor({ initialConfig, onChange }: Props) {
  const [config, setConfig] = useState<AnnouncementUIConfig>(initialConfig);
  const [saving, setSaving] = useState(false);

  const update = (next: AnnouncementUIConfig) => {
    setConfig(next);
    onChange(next);
  };


  const toggleEnabled = (key: keyof Omit<AnnouncementUIConfig, 'template'>, enabled: boolean) => {
    update({
      ...config,
      [key]: {
        ...config[key],
        enabled,
      },
    });
  };

  const toggleRequired = (key: keyof Omit<AnnouncementUIConfig, 'template'>, required: boolean) => {
    update({
      ...config,
      [key]: {
        ...config[key],
        required,
      },
    });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/ui-config', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ target: 'announcement', config }),
      });

      if (!res.ok) {
        notify('error', 'Duyuru UI ayarları kaydedilemedi (mock)');
        return;
      }

      notify('success', 'Duyuru UI ayarları kaydedildi (mock)');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card title="Duyuru UI Ayarları" className="rounded-xl">
      <div className="space-y-4">
        <div className="rounded-lg border bg-slate-50 p-3">
          <div className="mb-2 flex items-center justify-between">
            <Text strong>Template</Text>
            <Text type="secondary" className="text-xs">
              Seçim preview’u anlık günceller
            </Text>
          </div>

          <Segmented
            block
            size="large"
            value={config.template}
            options={TEMPLATE_OPTIONS as any}
            onChange={(value) => update({ ...config, template: value as any })}
          />
        </div>

        <Divider className="my-2" />

        <div className="space-y-3">
          {fieldMeta.map(({ key, title, desc, hasRequired }) => {
            const value = config[key];
            return (
              <div key={key} className="rounded-lg border p-3">
                <div className="flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <div className="font-medium">{title}</div>
                    <div className="text-xs text-slate-500">{desc}</div>
                  </div>

                  <Space size={16}>
                    <Checkbox
                      checked={value.enabled}
                      onChange={(e) => toggleEnabled(key, e.target.checked)}
                    >
                      Aktif
                    </Checkbox>

                    {hasRequired && value.enabled ? (
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-600">Zorunlu</span>
                        <Switch
                          checked={value.required === true}
                          onChange={(checked) => toggleRequired(key, checked)}
                        />
                      </div>
                    ) : null}
                  </Space>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-end pt-2">
          <Button type="primary" loading={saving} onClick={handleSave}>
            Kaydet
          </Button>
        </div>
      </div>
    </Card>
  );
}
