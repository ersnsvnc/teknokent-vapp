import React from 'react';
import type { AnnouncementUIConfig } from '@/types/ui-config';

type Props = {
  config: AnnouncementUIConfig;
};

const AnnouncementEmbed = ({ config }: Props) => {
  const Title = config.title.enabled ? (
    <div className="text-base font-semibold text-slate-900">Sistem Bakımı</div>
  ) : null;

  const Desc = config.description.enabled ? (
    <div className="mt-1 text-sm text-slate-700">
      Bu gece 02:00 – 04:00 arasında sistem bakımda olacaktır.
    </div>
  ) : null;

  const DateLine = config.publishDate.enabled ? (
    <div className="mt-2 text-xs text-slate-500">Yayın: 24.11.2025</div>
  ) : null;

  const showCTA = config.ctaText.enabled && config.ctaUrl.enabled;

  if (config.template === 'banner') {
    return (
      <div className="rounded-xl border color-white bg-white p-4 shadow-sm">
        <div className="rounded-xl border bg-slate-900 p-4 text-white">
          <div className="mb-2 flex items-center justify-between">
            <span color="gold">Kampanya</span>
            {config.publishDate.enabled ? (
              <span className="text-xs text-white">{DateLine}</span>
            ) : null}
          </div>

          {config.title.enabled ? (
            <div className="text-lg text-white font-semibold">{Title}</div>
          ) : null}
          {config.description.enabled ? (
            <div className="mt-2 text-sm text-white/80">{Desc}</div>
          ) : null}

          {showCTA ? (
            <div className="mt-4">
              <button className="p-2 border rounded-xl">Hemen İncele</button>
            </div>
          ) : null}
        </div>
      </div>
    );
  }

  if (config.template === 'maintenance') {
    return (
      <div className="mx-auto max-w-3xl p-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-sm font-semibold text-slate-900">Planlı Kesinti</div>
          <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
            {Title}
            {Desc}
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-700">
              <li>Etkilenen servisler: Ödeme, Bildirim</li>
              <li>Tahmini süre: 2 saat</li>
              <li>Durum: Planlandı</li>
            </ul>
            {DateLine}
          </div>
        </div>
      </div>
    );
  }

  // simple
  return (
    <div className="mx-auto max-w-3xl p-4">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="text-base font-semibold text-slate-900">Duyurular</div>
        <div className="mt-3 rounded-xl border border-slate-200 p-4">
          {Title}
          {Desc}
          {DateLine}
        </div>
      </div>
    </div>
  );
};

export default AnnouncementEmbed;
