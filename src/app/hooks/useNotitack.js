import { useSnackbar } from 'notistack'

const useNotistack = () => {
  const { enqueueSnackbar } = useSnackbar()

  // Function to trigger notifications with a delay
  const triggerNotifications = (messages, delay = 1000) => {
    messages.forEach((message, index) => {
      setTimeout(() => {
        enqueueSnackbar(message.text, { variant: message.variant })
      }, index * delay)
    })
  }

  return { triggerNotifications }
}

export default useNotistack
