import React from 'react';
import type { PaymentUIConfig } from '@/types/ui-config';

type Props = {
  config: PaymentUIConfig;
};

const PaymentEmbed = ({ config }: Props) => {
  return (
    <div style={{ fontFamily: 'ui-sans-serif, system-ui', maxWidth: 520, margin: '0 auto' }}>
      <div style={{ border: '1px solid #e5e7eb', borderRadius: 14, padding: 16 }}>
        <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>Ödeme</h2>
        <p style={{ marginTop: 6, marginBottom: 16, color: '#64748b', fontSize: 13 }}>
          Bu UI API üzerinden servis edilen mock embed örneğidir.
        </p>

        <form>
          {config.cardHolder.enabled && (
            <div style={{ marginBottom: 12 }}>
              <label style={{ display: 'block', fontSize: 13, marginBottom: 6 }}>Kart Sahibi</label>
              <input
                required={config.cardHolder.required === true}
                placeholder="Ad Soyad"
                style={{
                  width: '100%',
                  height: 40,
                  borderRadius: 10,
                  border: '1px solid #e5e7eb',
                  padding: '0 12px',
                }}
              />
            </div>
          )}

          {config.cardNumber.enabled && (
            <div style={{ marginBottom: 12 }}>
              <label style={{ display: 'block', fontSize: 13, marginBottom: 6 }}>Kart Numarası</label>
              <input
                required={config.cardNumber.required === true}
                placeholder="1234 5678 9012 3456"
                style={{
                  width: '100%',
                  height: 40,
                  borderRadius: 10,
                  border: '1px solid #e5e7eb',
                  padding: '0 12px',
                }}
              />
            </div>
          )}

          {config.amount.enabled && (
            <div style={{ marginBottom: 12 }}>
              <label style={{ display: 'block', fontSize: 13, marginBottom: 6 }}>Toplam Tutar</label>
              <input
                required={config.amount.required === true}
                placeholder="₺ 0,00"
                style={{
                  width: '100%',
                  height: 40,
                  borderRadius: 10,
                  border: '1px solid #e5e7eb',
                  padding: '0 12px',
                }}
              />
            </div>
          )}

          <button
            type="button"
            style={{
              width: '100%',
              height: 42,
              borderRadius: 10,
              border: 0,
              background: '#4f46e5',
              color: 'white',
              fontWeight: 600,
              cursor: 'pointer',
              marginTop: 6,
            }}
          >
            Ödeme Yap
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentEmbed;
