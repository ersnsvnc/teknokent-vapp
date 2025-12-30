import { Card, Button } from 'antd';
import type { AnnouncementUIConfig } from '@/types/ui-config';
import type { Announcement } from './AnnouncementForm';

type Props = {
  items: Announcement[];
  config: AnnouncementUIConfig;
};

const AnnouncementList = ({ items, config }: Props) => {
  const showTitle = config.title.enabled;
  const showDesc = config.description.enabled;
  const showDate = config.publishDate.enabled;

  // opsiyonel alanlar
  const showCtaText = config.ctaText?.enabled === true;
  const showCtaUrl = config.ctaUrl?.enabled === true;

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <Card key={item.id}>
          {showTitle && item.title ? (
            <h3 className="text-base font-semibold">{item.title}</h3>
          ) : null}

          {showDesc && item.description ? (
            <p className="text-sm text-slate-700">{item.description}</p>
          ) : null}

          {showDate && item.publishDate ? (
            <p className="mt-1 text-xs text-slate-500">Yayın: {item.publishDate}</p>
          ) : null}

          {(showCtaText || showCtaUrl) && (item.ctaText || item.ctaUrl) ? (
            <div className="mt-3">
              <Button
                type="primary"
                href={showCtaUrl ? item.ctaUrl : undefined}
                target={showCtaUrl ? '_blank' : undefined}
                disabled={showCtaUrl && !item.ctaUrl}
              >
                {showCtaText ? (item.ctaText ?? 'Detay') : 'Detay'}
              </Button>
            </div>
          ) : null}
        </Card>
      ))}
    </div>
  );
};

export default AnnouncementList;
