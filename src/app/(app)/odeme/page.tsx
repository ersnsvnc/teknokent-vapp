'use client';

import { useEffect, useState } from 'react';
import {
  Form,
  Input,
  InputNumber,
  Button,
  Select,
  Spin,
} from 'antd';
import type { PaymentUIConfig } from '@/types/ui-config';
import { notify } from '@/utils/notify';

const OdemePage = () => {
  const [config, setConfig] = useState<PaymentUIConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch('/api/ui-config')
      .then((res) => res.json())
      .then((data) => setConfig(data.payment))
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await new Promise((r) => setTimeout(r, 1000));
      notify('success', 'Ödeme başarılı (mock)');
    } catch {
      notify('error', 'Ödeme başarısız (mock)');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || !config) {
    return (
      <div className="flex justify-center py-10">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md rounded-xl bg-white p-6 shadow">
      <h1 className="mb-4 text-xl font-semibold">Ödeme</h1>

      <Form layout="vertical" onFinish={handleSubmit}>
        {config.cardHolder.enabled && (
          <Form.Item
            label="Kart Sahibi"
            name="cardHolder"
            rules={config.cardHolder.required ? [{ required: true }] : []}
          >
            <Input size="large" placeholder="Ad Soyad" />
          </Form.Item>
        )}

        {config.cardNumber.enabled && (
          <Form.Item
            label="Kart Numarası"
            name="cardNumber"
            rules={config.cardNumber.required ? [{ required: true }] : []}
          >
            <Input size="large" placeholder="**** **** **** ****" />
          </Form.Item>
        )}

        {config.expiry.enabled && (
          <Form.Item
            label="Son Kullanma Tarihi"
            name="expiry"
            rules={config.expiry.required ? [{ required: true }] : []}
          >
            <Input size="large" placeholder="MM / YY" />
          </Form.Item>
        )}

        {config.cvv.enabled && (
          <Form.Item
            label="CVV"
            name="cvv"
            rules={config.cvv.required ? [{ required: true }] : []}
          >
            <Input size="large" placeholder="***" />
          </Form.Item>
        )}

        {config.amount.enabled && (
          <Form.Item
            label="Toplam Tutar"
            name="amount"
            rules={config.amount.required ? [{ required: true }] : []}
          >
            <InputNumber
              size="large"
              className="w-full"
              prefix="₺"
              placeholder="0,00"
            />
          </Form.Item>
        )}

        {config.installments.enabled && (
          <Form.Item label="Taksit" name="installments">
            <Select
              size="large"
              placeholder="Taksit seçiniz"
              options={config.installments.options.map((v) => ({
                label: `${v} Taksit`,
                value: v,
              }))}
            />
          </Form.Item>
        )}

        <Button
          type="primary"
          size="large"
          htmlType="submit"
          loading={submitting}
          className="mt-2 w-full"
        >
          Ödeme Yap
        </Button>
      </Form>
    </div>
  );
};

export default OdemePage;
