import type { AnnouncementUIConfig, PaymentUIConfig } from '@/types/ui-config';

type UIConfigStore = {
  payment: PaymentUIConfig;
  announcement: AnnouncementUIConfig;
};

// (prototip) tenant destekliyorsan imzanı bozma; yoksa direkt store döndür.
const defaultTenant = 'default';

const tenantStores = new Map<string, UIConfigStore>();

const createDefaultStore = (): UIConfigStore => ({
  payment: {
    cardHolder: { enabled: true, required: true },
    cardNumber: { enabled: true, required: true },
    expiry: { enabled: true, required: true },
    cvv: { enabled: true, required: true },
    amount: { enabled: false, required: false },
    installments: { enabled: false, required: false, options: [2, 3, 6, 9] },
  },
  announcement: {
    template: 'banner',

    title: { enabled: true, required: true },
    description: { enabled: true, required: true },

    ctaText: { enabled: true, required: false },
    ctaUrl: { enabled: true, required: false },

    publishDate: { enabled: false, required: false },

    items: { enabled: false, required: false },
  },
});

const getTenantStore = (tenant?: string) => {
  const key = tenant ?? defaultTenant;
  const existing = tenantStores.get(key);
  if (existing) return existing;

  const next = createDefaultStore();
  tenantStores.set(key, next);
  return next;
};

export const getUIConfig = (tenant?: string): UIConfigStore => getTenantStore(tenant);

export const setPaymentConfig = (tenant: string | undefined, payment: PaymentUIConfig): void => {
  const store = getTenantStore(tenant);
  tenantStores.set(tenant ?? defaultTenant, { ...store, payment });
};

export const setAnnouncementConfig = (
  tenant: string | undefined,
  announcement: AnnouncementUIConfig
): void => {
  const store = getTenantStore(tenant);
  tenantStores.set(tenant ?? defaultTenant, { ...store, announcement });
};
