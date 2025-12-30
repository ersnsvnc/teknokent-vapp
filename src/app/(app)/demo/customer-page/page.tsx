const CustomerDemoPage = () => {
    return (
        <div className="mx-auto max-w-4xl space-y-6">
            <h1 className="text-2xl font-semibold">
                Müşteri Entegrasyon Örneği
            </h1>

            <p className="text-slate-600">
                Aşağıdaki ödeme formu, müşterinin kendi domain’inde
                çalışan bir iframe entegrasyonu olarak düşünülmelidir.
            </p>

            <div className="overflow-hidden rounded-xl border shadow">
                <iframe
                    src="/ui/embed/payment?tenant=default"
                    className="h-[700px] w-full border-0"
                    title="Payment Embed"
                />
            </div>
        </div>
    );
};

export default CustomerDemoPage;
