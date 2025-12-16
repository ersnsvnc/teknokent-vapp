'use client';

import { Form, Input, InputNumber, Button } from 'antd';
import type { PaymentUIConfig } from '@/types/ui-config';

type Props = {
  config: PaymentUIConfig;
};

const PaymentPreview = ({ config }: Props) => {
  return (
    <div className="rounded-xl border bg-white p-4 shadow-sm">
      <h2 className="mb-3 text-base font-semibold">Ödeme Formu Önizleme</h2>

      <Form layout="vertical">
        {config.cardHolder.enabled && (
          <Form.Item
            label="Kart Sahibi"
            rules={config.cardHolder.required ? [{ required: true }] : []}
          >
            <Input size="large" disabled placeholder="Ad Soyad" />
          </Form.Item>
        )}

        {config.cardNumber.enabled && (
          <Form.Item
            label="Kart Numarası"
            rules={config.cardNumber.required ? [{ required: true }] : []}
          >
            <Input size="large" disabled placeholder="**** **** **** ****" />
          </Form.Item>
        )}

        {config.amount.enabled && (
          <Form.Item
            label="Toplam Tutar"
            rules={config.amount.required ? [{ required: true }] : []}
          >
            <InputNumber
              size="large"
              disabled
              className="w-full"
              prefix="₺"
              placeholder="0,00"
            />
          </Form.Item>
        )}

        <Button type="primary" size="large" disabled className="mt-2 w-full">
          Ödeme Yap
        </Button>
      </Form>
    </div>
  );
};

export default PaymentPreview;
