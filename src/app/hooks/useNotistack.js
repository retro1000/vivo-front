import { useSnackbar } from 'notistack'

const useNotistack = () => {
  const { enqueueSnackbar } = useSnackbar()

  // Function to trigger notifications with a delay
  const triggerNotifications = (messages, delay = 1000) => {
    messages.forEach((message, index) => {

      setTimeout(() => {
        enqueueSnackbar(
          message.text,
          {
            variant: message.variant,
            // SnackbarContentProps: {
            //   style: {width: '10%', maxWidth: '300px', minWidth: '180px', height: 'auto'}
            // },
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'right',
            }
          }
        )
      }, index * delay)
    })
  }

  const triggerCommonErrors = (error) => {
    if(error===undefined || error.response===undefined){
      triggerNotifications([{text: 'Internal server error!!! please try again.', variant: 'error'}])
      return
    }
    if(error.response.status===500) triggerNotifications([{text: error.response.data.message || 'Internal server error!!! please try again.', variant: 'error'}])
    if(error.response.status===403) triggerNotifications([{text: error.response.data.message || 'Forbidden.', variant: 'error'}])
  }

  return { triggerNotifications, triggerCommonErrors }
}

export {useNotistack}
