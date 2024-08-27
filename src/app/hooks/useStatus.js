const useStatus = () => {

    const OrderStatusBlockUpdate = (status) => {
        switch(status){
            case 'PENDING':
            case 'NEED_TO_IMPORT':
            case 'STOCK_AVAILABLE':
            case 'CONFIRMED':
            case 'NO_ANSWER':
            case 'RESCHEDULED':
                return false
            default:
                return true
        }
    }
  
    return { OrderStatusBlockUpdate }
  }
  
  export {useStatus}
  