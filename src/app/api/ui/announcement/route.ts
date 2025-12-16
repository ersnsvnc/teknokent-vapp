import { NextResponse } from 'next/server';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import AnnouncementEmbed from '@/server/embeds/AnnouncementEmbed';
import { getUIConfig } from '@/lib/ui-config-store';

export async function GET() {
  const { announcement } = getUIConfig();

  const html = ReactDOMServer.renderToStaticMarkup(
    React.createElement(AnnouncementEmbed, { config: announcement }),
  );

  return new NextResponse(`<!doctype html><html><head><meta charset="utf-8" /></head><body>${html}</body></html>`, {
    headers: { 'content-type': 'text/html; charset=utf-8' },
  });
}
