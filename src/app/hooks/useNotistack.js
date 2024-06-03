import { maxWidth } from '@mui/system'
import { height } from '@mui/system'
import { minWidth } from '@mui/system'
import { width } from '@mui/system'
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

  return { triggerNotifications }
}

export {useNotistack}
