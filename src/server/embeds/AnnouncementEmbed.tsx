import React from 'react';
import type { AnnouncementUIConfig } from '@/types/ui-config';

type Props = {
  config: AnnouncementUIConfig;
};

const AnnouncementEmbed = ({ config }: Props) => {
  return (
    <div style={{ fontFamily: 'ui-sans-serif, system-ui', maxWidth: 720, margin: '0 auto' }}>
      <div style={{ border: '1px solid #e5e7eb', borderRadius: 14, padding: 16 }}>
        <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>Duyurular</h2>

        <div style={{ marginTop: 14, borderRadius: 12, border: '1px solid #e5e7eb', padding: 14 }}>
          {config.title.enabled && (
            <div style={{ fontWeight: 700, marginBottom: 6 }}>Sistem Bakımı</div>
          )}

          {config.description.enabled && (
            <div style={{ color: '#334155', fontSize: 14 }}>
              Bu gece 02:00 – 04:00 arasında sistem bakımda olacaktır.
            </div>
          )}

          {config.publishDate.enabled && (
            <div style={{ marginTop: 10, color: '#64748b', fontSize: 12 }}>Yayın: 24.11.2025</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnnouncementEmbed;
