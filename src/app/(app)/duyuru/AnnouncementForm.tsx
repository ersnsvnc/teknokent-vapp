'use client';

import { Button, DatePicker, Form, Input } from 'antd';
import type { Rule } from 'antd/es/form';
import type { Dayjs } from 'dayjs';
import type { AnnouncementUIConfig } from '@/types/ui-config';
import { notify } from '@/utils/notify';

type AnnouncementFormValues = {
  title?: string;
  description?: string;
  publishDate?: Dayjs;
  ctaText?: string;
  ctaUrl?: string;
};

export type Announcement = {
  id: string;
  title?: string;
  description?: string;
  publishDate?: string;
  ctaText?: string;
  ctaUrl?: string;
};

type Props = {
  config: AnnouncementUIConfig;
  onCreate: (item: Announcement) => void;
};

const urlRule: Rule = {
  validator: async (_rule, value?: string) => {
    if (!value) return;
    try {
      // http/https zorunlu tutalım (prototip için yeterli)
      const u = new URL(value);
      if (u.protocol !== 'http:' && u.protocol !== 'https:') {
        throw new Error('invalid protocol');
      }
    } catch {
      throw new Error('Geçerli bir URL girin. Örn: https://example.com');
    }
  },
};

const AnnouncementForm = ({ config, onCreate }: Props) => {
  const [form] = Form.useForm<AnnouncementFormValues>();

  const handleSubmit = async (values: AnnouncementFormValues) => {
    const item: Announcement = {
      id: crypto.randomUUID(),
      title: values.title?.trim(),
      description: values.description?.trim(),
      publishDate: values.publishDate ? values.publishDate.format('DD.MM.YYYY') : undefined,
      ctaText: values.ctaText?.trim(),
      ctaUrl: values.ctaUrl?.trim(),
    };

    // Mock: API yerine listeye basıyoruz
    onCreate(item);
    form.resetFields();
    notify('success', 'Duyuru başarıyla oluşturuldu (mock)');
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      {config.title.enabled && (
        <Form.Item
          label="Başlık"
          name="title"
          rules={config.title.required ? [{ required: true, message: 'Başlık zorunlu.' }] : []}
        >
          <Input size="large" placeholder="Örn: Yıl Sonu Fırsatı!" />
        </Form.Item>
      )}

      {config.description.enabled && (
        <Form.Item
          label="Açıklama"
          name="description"
          rules={config.description.required ? [{ required: true, message: 'Açıklama zorunlu.' }] : []}
        >
          <Input.TextArea rows={4} placeholder="Duyuru metni..." />
        </Form.Item>
      )}

      {config.publishDate.enabled && (
        <Form.Item
          label="Yayın Tarihi"
          name="publishDate"
          rules={config.publishDate.required ? [{ required: true, message: 'Yayın tarihi zorunlu.' }] : []}
        >
          <DatePicker className="w-full" size="large" />
        </Form.Item>
      )}

      {/* CTA */}
      {config.ctaText?.enabled && (
        <Form.Item
          label="CTA Metni"
          name="ctaText"
          rules={config.ctaText.required ? [{ required: true, message: 'CTA metni zorunlu.' }] : []}
        >
          <Input size="large" placeholder="Örn: Hemen incele" />
        </Form.Item>
      )}

      {config.ctaUrl?.enabled && (
        <Form.Item
          label="CTA Link"
          name="ctaUrl"
          rules={[
            ...(config.ctaUrl.required ? [{ required: true, message: 'CTA link zorunlu.' }] : []),
            urlRule,
          ]}
        >
          <Input size="large" placeholder="https://example.com/kampanya" />
        </Form.Item>
      )}

      <Button type="primary" htmlType="submit">
        Duyuru Oluştur
      </Button>
    </Form>
  );
};

export default AnnouncementForm;
