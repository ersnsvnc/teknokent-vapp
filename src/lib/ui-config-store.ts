import type { AnnouncementUIConfig, PaymentUIConfig } from '@/types/ui-config';

type UIConfigStore = {
  payment: PaymentUIConfig;
  announcement: AnnouncementUIConfig;
};

let store: UIConfigStore = {
  payment: {
    cardHolder: { enabled: true, required: true },
    cardNumber: { enabled: true, required: true },
    expiry: { enabled: true, required: true },
    cvv: { enabled: true, required: true },
    amount: { enabled: true, required: false },
  },
  announcement: {
    title: { enabled: true, required: true },
    description: { enabled: true, required: true },
    publishDate: { enabled: false, required: false },
  },
};

export const getUIConfig = (): UIConfigStore => store;

export const setPaymentConfig = (payment: PaymentUIConfig): void => {
  store = { ...store, payment };
};

export const setAnnouncementConfig = (announcement: AnnouncementUIConfig): void => {
  store = { ...store, announcement };
};
