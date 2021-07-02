import { ref, computed } from 'vue-demi'
import { MaybeElementRef, unrefElement } from '../unrefElement'
import { useEventListener } from '../useEventListener'
import { MouseSourceType } from '../useMouse'
import { useDebounce } from '../../shared/useDebounce'
import { ConfigurableWindow, defaultWindow } from '../_configurable'

export interface MousePressedOptions extends ConfigurableWindow {
  /**
   * Listen to `touchstart` `touchend` events
   *
   * @default true
   */
  touch?: boolean

  /**
   * Initial values
   *
   * @default false
   */
  initialValue?: boolean

  /**
   * Element target to be capture the click
   */
  target?: MaybeElementRef
}

/**
 * Reactive mouse position.
 *
 * @see https://vueuse.org/useMousePressed
 * @param options
 */
export function useMousePressed(options: MousePressedOptions = {}) {
  const {
    touch = true,
    initialValue = false,
    window = defaultWindow,
  } = options

  const _pressed = ref(initialValue)
  const pressed = useDebounce(_pressed, 0)
  const _sourceType = ref<MouseSourceType>(null)
  const sourceType = useDebounce(_sourceType, 0)

  if (!window) {
    return {
      pressed,
      sourceType,
    }
  }

  const onPressed = (srcType: MouseSourceType) => () => {
    _pressed.value = true
    _sourceType.value = srcType
  }
  const onReleased = () => {
    _pressed.value = false
    _sourceType.value = null
  }

  const target = computed(() => unrefElement(options.target) || window)

  useEventListener(target, 'mousedown', onPressed('mouse'), { passive: true })
  useEventListener(target, 'dragenter', onPressed('mouse'), { passive: true })

  useEventListener(window, 'mouseleave', onReleased, { passive: true })
  useEventListener(window, 'mouseup', onReleased, { passive: true })
  useEventListener(target, 'drop', onReleased, { passive: true })
  useEventListener(target, 'dragleave', onReleased, { passive: true })

  if (touch) {
    useEventListener(window, 'touchend', onReleased, { passive: true })
    useEventListener(window, 'touchcancel', onReleased, { passive: true })
    useEventListener(target, 'touchstart', onPressed('touch'), { passive: true })
  }

  return {
    pressed,
    sourceType,
  }
}

export type UseMousePressedReturn = ReturnType<typeof useMousePressed>
