export type FieldVisibility = {
  enabled: boolean;
  required?: boolean;
};

export type PaymentInstallments = {
  enabled: boolean;
  options: number[]; // örn: [2,3,6,9]
  required?: boolean;
};

export type PaymentUIConfig = {
  cardHolder: FieldVisibility;
  cardNumber: FieldVisibility;
  expiry: FieldVisibility;
  cvv: FieldVisibility;
  amount: FieldVisibility;
  installments: PaymentInstallments;
};

export type AnnouncementTemplate = 'simple' | 'banner' | 'maintenance';

export type AnnouncementUIConfig = {
  template: AnnouncementTemplate;

  title: FieldVisibility;
  description: FieldVisibility;

  // banner/cta için
  ctaText: FieldVisibility;
  ctaUrl: FieldVisibility;

  publishDate: FieldVisibility;

  // maintenance için basit madde listesi (opsiyonel)
  items: FieldVisibility;
};
