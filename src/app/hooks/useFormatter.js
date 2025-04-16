const useFormatter = () => {

    const DefaultDateTimeFormat = (dateTime) => {
        return `${dateTime.toLocaleDateString(
            'en-GB',
            { day: '2-digit', month: 'short', year: 'numeric' }
        )} 
                ${dateTime.toLocaleTimeString(
            'en-GB',
            { hour: 'numeric', minute: '2-digit', hour12: true }
        )}`;
    }

    const DefaultDateFormat = (date) => {
        return `${date.toLocaleDateString(
            'en-GB',
            { day: '2-digit', month: 'short', year: 'numeric' }
        )}`;
    }

    const formatToLKR = (number) => {
        return new Intl.NumberFormat('en-LK', {
            style: 'currency',
            currency: 'LKR',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(number);
    }

    // Utility function to format sold count
    const formatSoldCount = (number) => {

        if (isNaN(number) || number <= 0) number = Math.random() * (5000 - 30 + 1) + 30; // Return original if not a valid number

        if (number >= 1000000) {
            // Format as X.XM+ (e.g., 1,500,000 -> 1.5M+)
            const millions = (number / 1000000).toFixed(1);
            return `${millions}M+ sold`;
        } else if (number >= 1000) {
            // Format as Xk+ (e.g., 10,000 -> 10k+)
            const thousands = Math.floor(number / 1000);
            return `${thousands}K+ sold`;
        } else if(number <= 100) {
            // Keep as is (e.g., 500 -> 500+)
            return '100+ sold';
        }else {
            return `${number}+ sold`;
        }
    };

    const DefaultWordFormat = (word) => {
        return (word.charAt(0) + word.slice(1).toLowerCase()).replace(/_/g, ' ')
    }

    const DefaultWordFormat2 = (word) => {
        return word.toUpperCase().replace(/ /g, '_')
    }

    const TitleCaseWordFormat = (word) => {
        return (word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    }

    const CamelCaseWordFormat = (word) => {
        return (word.charAt(0).toUpperCase() + word.slice(1).split(/(?=[A-Z])/).map(w => w.charAt(0).toLowerCase() + w.slice(1)).join(' '))
    }

    const CamelCaseWordFormat2 = (word) => {
        return (word.charAt(0).toLowerCase() + word.slice(1).split(/ /).map((w, index) => (index !== 0 ? w.charAt(0).toUpperCase() : w.charAt(0)) + w.slice(1)).join(''))
    }

    const PaymentMethod = (method) => {
        switch (method) {
            case 'COD':
                return 'Cash on Delivery';
            case 'CASH':
                return 'On Site Payment';
            case 'CARD':
                return 'Credit/Debit Card';
            case 'KOKO':
                return 'KOKO payment';
            default:
                return '-'
        }
    }

    return { formatSoldCount, DefaultWordFormat2, PaymentMethod, CamelCaseWordFormat2, DefaultDateTimeFormat, formatToLKR, DefaultWordFormat, DefaultDateFormat, TitleCaseWordFormat, CamelCaseWordFormat }
}

export { useFormatter }
