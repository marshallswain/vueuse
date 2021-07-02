import { h, ref, defineComponent, reactive } from 'vue-demi'
import { useDraggedOver, DraggedOverOptions } from '@vueuse/core'

export const UseDraggedOver = defineComponent<Omit<DraggedOverOptions, 'target'>>({
  name: 'UseDraggedOver',
  props: ['touch', 'initialValue'] as unknown as undefined,
  setup(props, { slots }) {
    const target = ref()
    const data = reactive(useDraggedOver({ ...props, target }))

    return () => {
      if (slots.default)
        return h('div', { ref: target }, slots.default(data))
    }
  },
})
