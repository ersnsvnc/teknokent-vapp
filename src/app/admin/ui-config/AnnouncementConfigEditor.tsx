'use client';

import { Card, Checkbox, Switch, Button } from 'antd';
import { useState } from 'react';
import type { AnnouncementUIConfig } from '@/types/ui-config';
import { notify } from '@/utils/notify';

type Props = {
  initialConfig: AnnouncementUIConfig;
  onChange: (config: AnnouncementUIConfig) => void;
};

const AnnouncementConfigEditor = ({ initialConfig, onChange }: Props) => {
  const [config, setConfig] = useState<AnnouncementUIConfig>(initialConfig);
  const [saving, setSaving] = useState(false);

  const update = (next: AnnouncementUIConfig) => {
    setConfig(next);
    onChange(next);
  };

  const toggleEnabled = (key: keyof AnnouncementUIConfig, enabled: boolean) => {
    update({
      ...config,
      [key]: {
        ...config[key],
        enabled,
      },
    });
  };

  const toggleRequired = (key: keyof AnnouncementUIConfig, required: boolean) => {
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
      body: JSON.stringify({
        target: 'announcement',
        config,
      }),
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
    <Card title="Duyuru UI Ayarları">
      <div className="space-y-4">
        {Object.entries(config).map(([key, value]) => (
          <div
            key={key}
            className="flex items-center justify-between rounded-lg border p-3"
          >
            <span className="font-medium">{key}</span>
            <div className="flex items-center gap-4">
              <Checkbox
                checked={value.enabled}
                onChange={(e) =>
                  toggleEnabled(key as keyof AnnouncementUIConfig, e.target.checked)
                }
              >
                Aktif
              </Checkbox>
              {value.enabled && value.required !== undefined && (
                <Switch
                  checked={value.required}
                  onChange={(checked) =>
                    toggleRequired(key as keyof AnnouncementUIConfig, checked)
                  }
                />
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-end">
        <Button type="primary" loading={saving} onClick={handleSave}>
          Kaydet
        </Button>
      </div>
    </Card>
  );
};

export default AnnouncementConfigEditor;
