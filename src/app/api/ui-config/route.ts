import { NextResponse } from 'next/server';
import type { AnnouncementUIConfig, PaymentUIConfig } from '@/types/ui-config';
import { getUIConfig, setAnnouncementConfig, setPaymentConfig } from '@/lib/ui-config-store';

type UpdateBody =
  | { target: 'payment'; config: PaymentUIConfig }
  | { target: 'announcement'; config: AnnouncementUIConfig };

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const tenant = searchParams.get('tenant') ?? undefined;

  return NextResponse.json(getUIConfig(tenant));
}

export async function POST(req: Request) {
  const { searchParams } = new URL(req.url);
  const tenant = searchParams.get('tenant') ?? undefined;

  const body = (await req.json()) as UpdateBody;

  if (body.target === 'payment') {
    setPaymentConfig(tenant, body.config);
    return NextResponse.json({ ok: true });
  }

  setAnnouncementConfig(tenant, body.config);
  return NextResponse.json({ ok: true });
}
