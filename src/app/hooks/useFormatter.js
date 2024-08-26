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

    const formatToLKR = (number) => {
        return new Intl.NumberFormat('en-LK', {
            style: 'currency',
            currency: 'LKR',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(number);
    }
  
    return { DefaultDateTimeFormat, formatToLKR }
  }
  
  export {useFormatter}
  