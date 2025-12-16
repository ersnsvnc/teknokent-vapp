export type FieldVisibility = {
  enabled: boolean;
  required?: boolean;
};

export type PaymentUIConfig = {
  cardHolder: FieldVisibility;
  cardNumber: FieldVisibility;
  expiry: FieldVisibility;
  cvv: FieldVisibility;
  amount: FieldVisibility;
};

export type AnnouncementUIConfig = {
  title: FieldVisibility;
  description: FieldVisibility;
  publishDate: FieldVisibility;
};
