'use client';

import { Form, Input, Button, DatePicker, notification } from 'antd';
import type { AnnouncementUIConfig } from '@/types/ui-config';
import { notify } from '@/utils/notify';

type AnnouncementFormValues = {
  title?: string;
  description?: string;
  publishDate?: string;
};

type Props = {
  config: AnnouncementUIConfig;
};

const AnnouncementForm = ({ config }: Props) => {
const handleSubmit = async () => {
  await new Promise((r) => setTimeout(r, 800));
  notify('success', 'Duyuru başarıyla oluşturuldu (mock)');
};


  return (
    <Form layout="vertical" onFinish={handleSubmit}>
      {config.title.enabled && (
        <Form.Item
          label="Başlık"
          name="title"
          rules={config.title.required ? [{ required: true }] : []}
        >
          <Input size="large" />
        </Form.Item>
      )}

      {config.description.enabled && (
        <Form.Item
          label="Açıklama"
          name="description"
          rules={config.description.required ? [{ required: true }] : []}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
      )}

      {config.publishDate.enabled && (
        <Form.Item label="Yayın Tarihi" name="publishDate">
          <DatePicker className="w-full" size="large" />
        </Form.Item>
      )}

      <Button type="primary" htmlType="submit">
        Duyuru Oluştur
      </Button>
    </Form>
  );
};

export default AnnouncementForm;
