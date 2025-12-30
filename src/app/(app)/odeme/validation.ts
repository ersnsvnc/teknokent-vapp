import type { Rule } from 'antd/es/form';

export type PaymentFormValues = {
  cardHolder: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
  amount: number;
};

const required = (message: string): Rule => ({
  required: true,
  message,
});

const cardNumberValidator = (_: Rule, value: string) => {
  const normalized = value ? value.replace(/\s+/g, '') : '';
  if (!normalized) {
    return Promise.reject(new Error('Kart numarası zorunludur.'));
  }
  if (!/^\d{16}$/.test(normalized)) {
    return Promise.reject(new Error('Kart numarası 16 haneli olmalıdır.'));
  }
  return Promise.resolve();
};

const expiryValidator = (_: Rule, value: string) => {
  if (!value) {
    return Promise.reject(new Error('Son kullanma tarihi zorunludur.'));
  }
  if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(value)) {
    return Promise.reject(new Error('Son kullanma tarihi MM/YY formatında olmalıdır.'));
  }
  return Promise.resolve();
};

const cvvValidator = (_: Rule, value: string) => {
  if (!value) {
    return Promise.reject(new Error('CVV zorunludur.'));
  }
  if (!/^\d{3,4}$/.test(value)) {
    return Promise.reject(new Error('CVV 3 veya 4 haneli olmalıdır.'));
  }
  return Promise.resolve();
};

const amountValidator = (_: Rule, value: number | null) => {
  if (value === null || value === undefined) {
    return Promise.reject(new Error('Tutar zorunludur.'));
  }
  if (Number.isNaN(value) || value <= 0) {
    return Promise.reject(new Error("Tutar 0'dan büyük olmalıdır."));
  }
  return Promise.resolve();
};

export const cardHolderRules: Rule[] = [
  required('Kart sahibi adı zorunludur.'),
  {
    min: 3,
    message: 'Kart sahibi adı en az 3 karakter olmalıdır.',
  },
];

export const cardNumberRules: Rule[] = [{ validator: cardNumberValidator }];

export const expiryRules: Rule[] = [{ validator: expiryValidator }];

export const cvvRules: Rule[] = [{ validator: cvvValidator }];

export const amountRules: Rule[] = [{ validator: amountValidator }];
