export const formatCurrency = (value: number) => {
    if (value) {
        const currencyString = value.toLocaleString('pt-br', {
            style: 'currency',
            currency: 'BRL',
        });
        return currencyString;
    }

    return '--';
};