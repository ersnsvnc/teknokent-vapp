'use client';

import { Card, Switch, Checkbox, Button, Divider } from 'antd';
import { useState } from 'react';
import type { PaymentUIConfig } from '@/types/ui-config';
import { notify } from '@/utils/notify';

type Props = {
  initialConfig: PaymentUIConfig;
  onChange: (config: PaymentUIConfig) => void;
};

const PaymentConfigEditor = ({ initialConfig, onChange }: Props) => {
  const [config, setConfig] = useState(initialConfig);
  const [saving, setSaving] = useState(false);

  const update = (next: PaymentUIConfig) => {
    setConfig(next);
    onChange(next);
  };

  const toggleAmount = (enabled: boolean) => {
    update({
      ...config,
      amount: {
        ...config.amount,
        enabled,
      },
    });
  };

  const toggleInstallments = (enabled: boolean) => {
    update({
      ...config,
      installments: {
        ...config.installments,
        enabled,
      },
    });
  };

  const toggleInstallmentOption = (value: number) => {
    const options = config.installments.options.includes(value)
      ? config.installments.options.filter((v) => v !== value)
      : [...config.installments.options, value];

    update({
      ...config,
      installments: {
        ...config.installments,
        options,
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
        notify('error', 'Ödeme ayarları kaydedilemedi');
        return;
      }

      notify('success', 'Ödeme ayarları kaydedildi');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card title="Ödeme Formu Oluşturucu">
      <p className="mb-4 text-sm text-slate-600">
        Ödeme formunda yer alacak alanları seçin. Sağ tarafta canlı önizlemeyi görebilirsiniz.
      </p>

      {/* Zorunlu Alanlar */}
      <div>
        <div className="mb-2 font-medium">Zorunlu Alanlar</div>
        <div className="flex flex-wrap gap-2">
          {['Kart Sahibi', 'Kart Numarası', 'Son Kullanma Tarihi', 'CVV'].map((label) => (
            <span
              key={label}
              className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700"
            >
              🔒 {label}
            </span>
          ))}
        </div>
      </div>

      <Divider />

      {/* Opsiyonel Alanlar */}
      <div className="space-y-3">
        <div className="font-medium">Opsiyonel Alanlar</div>

        {/* Tutar */}
        <div className="rounded-lg border p-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Toplam Tutar</div>
              <div className="text-xs text-slate-500">Kullanıcıdan ödeme tutarını al</div>
            </div>
            <Switch checked={config.amount.enabled} onChange={toggleAmount} />
          </div>
        </div>

        {/* Taksit */}
        <div className="rounded-lg border p-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Taksit</div>
              <div className="text-xs text-slate-500">Kullanıcıya taksit seçeneği sun</div>
            </div>
            <Switch checked={config.installments.enabled} onChange={toggleInstallments} />
          </div>

          {config.installments.enabled && (
            <div className="mt-3 flex flex-wrap gap-3">
              {[1, 2, 3, 6].map((v) => (
                <Checkbox
                  key={v}
                  checked={config.installments.options.includes(v)}
                  onChange={() => toggleInstallmentOption(v)}
                >
                  {v} Taksit
                </Checkbox>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="sticky bottom-0 mt-6 flex justify-end border-t bg-white pt-4">
        <Button type="primary" size="large" loading={saving} onClick={handleSave}>
          Değişiklikleri Kaydet
        </Button>
      </div>
    </Card>
  );
};

export default PaymentConfigEditor;
