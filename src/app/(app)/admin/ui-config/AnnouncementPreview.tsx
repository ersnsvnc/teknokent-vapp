'use client';

import { Card, Tag, Button } from 'antd';
import type { AnnouncementUIConfig } from '@/types/ui-config';

type Props = { config: AnnouncementUIConfig };

export default function AnnouncementPreview({ config }: Props) {
  const title = 'Yıl Sonu Fırsatı!';
  const description = 'Seçili ürünlerde %20 indirim. Hemen incele!';
  const publishDate = '24.11.2025';

  const showCTA = config.ctaText.enabled && config.ctaUrl.enabled;

  if (config.template === 'banner') {
    return (
      <div className="rounded-xl border bg-white p-4 shadow-sm">
        <h2 className="mb-3 text-base font-semibold">Kullanıcı Görünümü</h2>

        <div className="rounded-xl border bg-slate-900 p-4 text-white">
          <div className="mb-2 flex items-center justify-between">
            <Tag color="gold">Kampanya</Tag>
            {config.publishDate.enabled ? (
              <span className="text-xs text-white/70">{publishDate}</span>
            ) : null}
          </div>

          {config.title.enabled ? <div className="text-lg font-semibold">{title}</div> : null}
          {config.description.enabled ? (
            <div className="mt-2 text-sm text-white/80">{description}</div>
          ) : null}

          {showCTA ? (
            <div className="mt-4">
              <Button type="primary">Hemen İncele</Button>
            </div>
          ) : null}
        </div>
      </div>
    );
  }

  if (config.template === 'maintenance') {
    return (
      <div className="rounded-xl border bg-white p-4 shadow-sm">
        <h2 className="mb-3 text-base font-semibold">Kullanıcı Görünümü</h2>

        <Card className="rounded-xl border" bodyStyle={{ padding: 16 }}>
          <div className="flex items-center justify-between">
            <div className="font-semibold">Bakım Bilgilendirmesi</div>
            <Tag color="red">Planlı</Tag>
          </div>

          {config.title.enabled ? (
            <div className="mt-3 font-semibold">{'Sistem Bakımı'}</div>
          ) : null}

          {config.description.enabled ? (
            <div className="mt-1 text-sm text-slate-700">
              Bu gece 02:00 – 04:00 arasında sistem bakımda olacaktır.
            </div>
          ) : null}

          {config.publishDate.enabled ? (
            <div className="mt-3 text-xs text-slate-500">Yayın: {publishDate}</div>
          ) : null}
        </Card>
      </div>
    );
  }

  // simple
  return (
    <div className="rounded-xl border bg-white p-4 shadow-sm">
      <h2 className="mb-3 text-base font-semibold">Kullanıcı Görünümü</h2>

      <Card className="rounded-xl">
        {config.title.enabled ? <div className="text-base font-semibold">{title}</div> : null}
        {config.description.enabled ? (
          <div className="mt-2 text-sm text-slate-700">{description}</div>
        ) : null}
        {config.publishDate.enabled ? (
          <div className="mt-2 text-xs text-slate-500">Yayın: {publishDate}</div>
        ) : null}
      </Card>
    </div>
  );
}
