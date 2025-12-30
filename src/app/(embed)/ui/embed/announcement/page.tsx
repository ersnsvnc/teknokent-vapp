import AnnouncementEmbed from "@/server/embeds/AnnouncementEmbed";
import { getUIConfig } from "@/lib/ui-config-store";

type Props = {
  searchParams?: { tenant?: string };
};

export default function AnnouncementEmbedPage({ searchParams }: Props) {
  const tenant = searchParams?.tenant;
  const { announcement } = getUIConfig(tenant);
  return <AnnouncementEmbed config={announcement} />;
}
