import { defineComponent } from 'vue'
import { useExtendOverlay, renderOverlay } from '@overlastic/vue'
import { VSnackbar } from 'vuetify/components/VSnackbar'

export const NotifyComponent = defineComponent({
  props: {
    message: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const { visible, vanish } = useExtendOverlay({
      duration: 1000
    })
    return () => (
      <VSnackbar
        modelValue={visible.value}
        timer={true}
        timeout={3000}
        color="success"
        rounded="pill"
        onUpdate:modelValue={(visible) => {
          if (!visible) vanish()
        }}
      >
        {props.message}
        {{
          actions: () => {
            return [<v-icon icon="mdi-calendar" start></v-icon>]
          }
        }}
      </VSnackbar>
    )
  }
})

export const useNotify = () => {
  const show = () => renderOverlay(NotifyComponent, { message: 'Hello World' })
  return { show }
}
