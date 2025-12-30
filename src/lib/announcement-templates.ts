import type { AnnouncementTemplateId } from '@/types/ui-config';

export const ANNOUNCEMENT_TEMPLATES: Array<{
  id: AnnouncementTemplateId;
  title: string;
  description: string;
}> = [
  {
    id: 'maintenance',
    title: 'Bakım Duyurusu',
    description: 'Planlı kesinti / bakım bilgilendirmesi.',
  },
  {
    id: 'campaign',
    title: 'Kampanya Duyurusu',
    description: 'CTA butonlu kampanya / yönlendirme.',
  },
  {
    id: 'info',
    title: 'Bilgilendirme',
    description: 'Genel bilgilendirme / duyuru.',
  },
];
