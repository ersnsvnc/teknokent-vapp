import type { AnnouncementTemplate } from '@/types/ui-config';

export const ANNOUNCEMENT_TEMPLATES: Array<{
  id: AnnouncementTemplate;
  title: string;
  description: string;
}> = [
  {
    id: 'maintenance',
    title: 'Bakım Duyurusu',
    description: 'Planlı kesinti / bakım bilgilendirmesi.',
  },
  {
    id: 'banner',
    title: 'Kampanya Duyurusu',
    description: 'CTA butonlu kampanya / yönlendirme.',
  },
  {
    id: 'simple',
    title: 'Bilgilendirme',
    description: 'Genel bilgilendirme / duyuru.',
  },
];
