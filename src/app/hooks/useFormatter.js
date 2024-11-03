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

    const DefaultWordFormat = (word) => {
        return (word.charAt(0) + word.slice(1).toLowerCase()).replace(/_/g, ' ')
    }

    const TitleCaseWordFormat = (word) => {
        return (word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    }

    const CamelCaseWordFormat = (word) => {
        return (word.charAt(0).toUpperCase() + word.slice(1).split(/(?=[A-Z])/).map(w => w.charAt(0).toLowerCase() + w.slice(1)).join(' '))
    }

    const PaymentMethod = (method) => {
        switch(method){
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
  
    return { PaymentMethod, DefaultDateTimeFormat, formatToLKR, DefaultWordFormat, DefaultDateFormat, TitleCaseWordFormat, CamelCaseWordFormat }
  }
  
  export {useFormatter}
  