import { NextResponse } from 'next/server';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import PaymentEmbed from '@/server/embeds/PaymentEmbed';
import { getUIConfig } from '@/lib/ui-config-store';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const tenant = searchParams.get('tenant') ?? undefined;

  const { payment } = getUIConfig(tenant);

  const html = ReactDOMServer.renderToStaticMarkup(
    React.createElement(PaymentEmbed, { config: payment }),
  );

  return new NextResponse(
    `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </head>
  <body style="margin:0;padding:16px;">
    ${html}
  </body>
</html>`,
    {
      headers: {
        'content-type': 'text/html; charset=utf-8',
      },
    },
  );
}
