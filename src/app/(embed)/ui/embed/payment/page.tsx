import PaymentEmbed from '@/server/embeds/PaymentEmbed';
import { getUIConfig } from '@/lib/ui-config-store';

export default async function Page(props: any) {
  const tenant = props?.searchParams?.tenant;
  const { payment } = getUIConfig(tenant);

  return <PaymentEmbed config={payment} />;
}
