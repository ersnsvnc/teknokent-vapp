import { NextResponse } from 'next/server';
import type { AnnouncementUIConfig, PaymentUIConfig } from '@/types/ui-config';
import { getUIConfig, setAnnouncementConfig, setPaymentConfig } from '@/lib/ui-config-store';

type UpdateBody =
  | { target: 'payment'; config: PaymentUIConfig }
  | { target: 'announcement'; config: AnnouncementUIConfig };

export async function GET() {
  return NextResponse.json(getUIConfig());
}

export async function POST(req: Request) {
  const body = (await req.json()) as UpdateBody;

  if (body.target === 'payment') {
    setPaymentConfig(body.config);
    return NextResponse.json({ ok: true });
  }

  setAnnouncementConfig(body.config);
  return NextResponse.json({ ok: true });
}
