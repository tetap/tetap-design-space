import { defineComponent } from 'vue'
import { useExtendOverlay, renderOverlay } from '@tetap/overlastic-vue'
import { VSnackbar } from 'vuetify/components/VSnackbar'

export const NotifyComponent = defineComponent({
  props: {
    message: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: 'primary'
    },
    timeout: {
      type: Number,
      default: 3000
    }
  },
  setup(props) {
    const { visible, vanish } = useExtendOverlay({
      duration: 1000
    })
    return () => (
      <VSnackbar
        modelValue={visible.value}
        timeout={props.timeout}
        color={props.color}
        onUpdate:modelValue={(visible) => {
          if (!visible) vanish()
        }}
        class="pointer-events-none"
      >
        {props.message}
      </VSnackbar>
    )
  }
})

export const useNotify = () => {
  const show = (
    message: string,
    options?: Partial<{
      color: 'success' | 'error' | 'primary' | 'info' | string
      timeout: number
    }>
  ) => renderOverlay(NotifyComponent, { message, ...options })
  return { show }
}
