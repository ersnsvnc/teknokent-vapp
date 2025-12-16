import { NextResponse } from 'next/server';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import PaymentEmbed from '@/server/embeds/PaymentEmbed';
import { getUIConfig } from '@/lib/ui-config-store';

export async function GET() {
  const { payment } = getUIConfig();

  const html = ReactDOMServer.renderToStaticMarkup(
    React.createElement(PaymentEmbed, { config: payment }),
  );

  return new NextResponse(`<!doctype html><html><head><meta charset="utf-8" /></head><body>${html}</body></html>`, {
    headers: { 'content-type': 'text/html; charset=utf-8' },
  });
}
