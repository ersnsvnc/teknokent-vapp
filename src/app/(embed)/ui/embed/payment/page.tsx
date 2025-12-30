import PaymentEmbed from '@/server/embeds/PaymentEmbed';
import { getUIConfig } from '@/lib/ui-config-store';

type Props = {
  searchParams?: { tenant?: string };
};

export default function PaymentEmbedPage({ searchParams }: Props) {
  const tenant = searchParams?.tenant;
  const { payment } = getUIConfig(tenant);

  return <PaymentEmbed config={payment} />;
}
