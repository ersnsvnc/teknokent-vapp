'use client';

import { Card, Checkbox, Switch, Button } from 'antd';
import { useState } from 'react';
import type { PaymentUIConfig } from '@/types/ui-config';
import { notify } from '@/utils/notify';

type Props = {
  initialConfig: PaymentUIConfig;
  onChange: (config: PaymentUIConfig) => void;
};

const PaymentConfigEditor = ({ initialConfig, onChange }: Props) => {
  const [config, setConfig] = useState<PaymentUIConfig>(initialConfig);
  const [saving, setSaving] = useState(false);

  const updateConfig = (next: PaymentUIConfig) => {
  setConfig(next);
  onChange(next);
};

 const toggleField = (key: keyof PaymentUIConfig, enabled: boolean) => {
  updateConfig({
    ...config,
    [key]: {
      ...config[key],
      enabled,
    },
  });
};

const toggleRequired = (key: keyof PaymentUIConfig, required: boolean) => {
  updateConfig({
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
        target: 'payment',
        config,
      }),
    });

    if (!res.ok) {
      notify('error', 'Ödeme UI ayarları kaydedilemedi (mock)');
      return;
    }

    notify('success', 'Ödeme UI ayarları kaydedildi (mock)');
  } finally {
    setSaving(false);
  }
};

  return (
    <Card title="Ödeme Formu Alanları">
      <div className="space-y-4">
        {Object.entries(config).map(([key, value]) => (
          <div
            key={key}
            className="flex items-center justify-between rounded-lg border p-3"
          >
            <div className="flex flex-col">
              <span className="font-medium">{key}</span>
              <span className="text-xs text-slate-500">
                Alan görünürlüğü ve zorunluluk
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Checkbox
                checked={value.enabled}
                onChange={(e) =>
                  toggleField(key as keyof PaymentUIConfig, e.target.checked)
                }
              >
                Aktif
              </Checkbox>
              {value.enabled && (
                <div className="flex items-center gap-2">
                  <span className="text-xs">Zorunlu</span>
                  <Switch
                    checked={value.required}
                    onChange={(checked) =>
                      toggleRequired(key as keyof PaymentUIConfig, checked)
                    }
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-end">
        <Button
          type="primary"
          loading={saving}
          onClick={handleSave}
        >
          Kaydet
        </Button>
      </div>
    </Card>
  );
};

export default PaymentConfigEditor;
