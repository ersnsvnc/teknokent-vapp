'use client';

import { useEffect, useState } from 'react';
import { Form, Input, InputNumber, Button, notification, Spin } from 'antd';
import type { PaymentUIConfig } from '@/types/ui-config';
import { notify } from '@/utils/notify';

type PaymentFormValues = {
  cardHolder?: string;
  cardNumber?: string;
  expiry?: string;
  cvv?: string;
  amount?: number;
};

const OdemePage = () => {
  const [config, setConfig] = useState<PaymentUIConfig | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch('/api/ui-config')
      .then((res) => res.json())
      .then((data) => setConfig(data.payment))
      .finally(() => setLoading(false));
  }, []);

const handleSubmit = async () => {
  setSubmitting(true);
  await new Promise((r) => setTimeout(r, 1200));
  notify('success', 'Ödeme başarılı (mock)');
  setSubmitting(false);
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
            <Input size="large" />
          </Form.Item>
        )}

        {config.cardNumber.enabled && (
          <Form.Item
            label="Kart Numarası"
            name="cardNumber"
            rules={config.cardNumber.required ? [{ required: true }] : []}
          >
            <Input size="large" />
          </Form.Item>
        )}

        {config.amount.enabled && (
          <Form.Item
            label="Toplam Tutar"
            name="amount"
            rules={config.amount.required ? [{ required: true }] : []}
          >
            <InputNumber className="w-full" size="large" prefix="₺" />
          </Form.Item>
        )}

        <Button
          type="primary"
          htmlType="submit"
          size="large"
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
