import React from 'react';
import type { PaymentUIConfig } from '@/types/ui-config';

type Props = {
  config: PaymentUIConfig;
};

const fieldLabelCls = 'mb-1 block text-sm font-medium text-slate-800';
const inputCls =
  'h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none ' +
  'placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100';

const PaymentEmbed = ({ config }: Props) => {
  return (
    <div className="mx-auto w-full max-w-[520px]">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-slate-900">Ödeme</h2>
          <p className="mt-1 text-sm text-slate-500">
            Bu form UI config ile dinamikleşir (embed).
          </p>
        </div>

        <form className="space-y-4">
          {config.cardHolder?.enabled && (
            <div>
              <label className={fieldLabelCls}>Kart Sahibi</label>
              <input
                className={inputCls}
                placeholder="Ad Soyad"
                required={config.cardHolder?.required === true}
              />
            </div>
          )}

          {config.cardNumber?.enabled && (
            <div>
              <label className={fieldLabelCls}>Kart Numarası</label>
              <input
                className={inputCls}
                placeholder="**** **** **** ****"
                inputMode="numeric"
                required={config.cardNumber?.required === true}
              />
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            {config.expiry?.enabled && (
              <div>
                <label className={fieldLabelCls}>Son Kullanma</label>
                <input
                  className={inputCls}
                  placeholder="MM/YY"
                  required={config.expiry?.required === true}
                />
              </div>
            )}

            {config.cvv?.enabled && (
              <div>
                <label className={fieldLabelCls}>CVV</label>
                <input
                  className={inputCls}
                  placeholder="***"
                  inputMode="numeric"
                  required={config.cvv?.required === true}
                />
              </div>
            )}
          </div>

          {config.amount?.enabled && (
            <div>
              <label className={fieldLabelCls}>Toplam Tutar</label>
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                  ₺
                </span>
                <input
                  className={`${inputCls} pl-7`}
                  placeholder="0,00"
                  inputMode="decimal"
                  required={config.amount?.required === true}
                />
              </div>
            </div>
          )}

          {config.installments?.enabled && (
            <div>
              <label className={fieldLabelCls}>Taksit</label>
              <select
                className={`${inputCls} appearance-none pr-9`}
                required={config.installments?.required === true}
                defaultValue=""
              >
                <option value="" disabled>
                  Taksit seçiniz
                </option>
                {config.installments.options.map((v) => (
                  <option key={v} value={v}>
                    {v} Taksit
                  </option>
                ))}
              </select>

              <div className="pointer-events-none relative -mt-11 h-11 w-full">
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                  ▾
                </div>
              </div>
            </div>
          )}

          <button
            type="button"
            className="mt-2 h-11 w-full rounded-lg bg-indigo-600 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 active:scale-[0.99]"
          >
            Ödeme Yap
          </button>

          <p className="pt-1 text-xs text-slate-400">
            * Bu bir prototip embed’idir (mock).
          </p>
        </form>
      </div>
    </div>
  );
};

export default PaymentEmbed;
