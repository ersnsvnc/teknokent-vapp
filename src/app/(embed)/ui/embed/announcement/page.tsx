import AnnouncementEmbed from '@/server/embeds/AnnouncementEmbed';
import { getUIConfig } from '@/lib/ui-config-store';

export default async function Page(props: any) {
  const tenant = props?.searchParams?.tenant;
  const { announcement } = getUIConfig(tenant);

  return <AnnouncementEmbed config={announcement} />;
}
