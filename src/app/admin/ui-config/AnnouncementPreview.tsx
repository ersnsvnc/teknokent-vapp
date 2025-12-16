'use client';

import { Card } from 'antd';
import type { AnnouncementUIConfig } from '@/types/ui-config';

type Props = {
  config: AnnouncementUIConfig;
};

const AnnouncementPreview = ({ config }: Props) => {
  return (
    <div className="rounded-xl border bg-white p-4 shadow-sm">
      <h2 className="mb-3 text-base font-semibold">Kullanıcı Görünümü</h2>

      <Card>
        {config.title.enabled && (
          <h3 className="text-base font-semibold">
            Sistem Bakımı
          </h3>
        )}

        {config.description.enabled && (
          <p className="mt-2 text-sm text-slate-700">
            Bu gece 02:00 – 04:00 arasında sistem bakımda olacaktır.
          </p>
        )}

        {config.publishDate.enabled && (
          <p className="mt-2 text-xs text-slate-500">
            Yayın: 24.11.2025
          </p>
        )}
      </Card>
    </div>
  );
};

export default AnnouncementPreview;
