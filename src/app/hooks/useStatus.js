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

    const OrderStatusUpdateList = (status, role) => {

        const statusList = ['NEED_TO_IMPORT']

        // switch(status){
        //     case 'PENDING':
        //     case 'NEED_TO_IMPORT':
        //     case 'STOCK_AVAILABLE':
        //     case 'CONFIRMED':
        //     case 'NO_ANSWER':
        //     case 'RESCHEDULED':
        //         return false
        //     default:
        //         return true
        // }

        return statusList
    }
  
    return { OrderStatusBlockUpdate, OrderStatusUpdateList }
  }
  
  export { useStatus }
  