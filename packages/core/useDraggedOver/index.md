---
category: Sensors
---

# useDraggedOver

Reactive mouse pressing state. Triggered by `mousedown` `touchstart` on target element and released by `mouseup` `mouseleave` `touchend` `touchcancel` on window.

## Basic Usage

```js
import { useDraggedOver } from '@vueuse/core'

const { pressed } = useDraggedOver()
```

Touching is enabled by default. To make it only detects mouse changes, set `touch` to `false`

```js
const { pressed } = useDraggedOver({ touch: false })
```

To only capture `mousedown` and `touchstart` on specific element, you can specify `target` by passing a ref of the element.

```html {16-20}
<template>
  <div ref="el">Only clicking on this element will trigger the update.</div>
</template>

<script>
  import { ref } from 'vue'
  import { useDraggedOver } from '@vueuse/core'

  export default {
    setup() {
      const el = ref(null)

      const { pressed } = useDraggedOver({ target: el })

      return {
        el,
        pressed,
      }
    }
  })
</script>
```

## Component

```html
<UseMousePressed v-slot="{ pressed }">
  Is Pressed: {{ pressed }}
</UseMousePressed>
```

<LearnMoreComponents />

<!--FOOTER_STARTS-->

## Type Declarations

```typescript
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
 * @see https://vueuse.org/useDraggedOver
 * @param options
 */
export declare function useDraggedOver(options?: MousePressedOptions): {
  pressed: Ref<boolean>
  sourceType: Ref<DraggedSourceType>
}
export declare type UseDraggedOverReturn = ReturnType<typeof useDraggedOver>
```

## Source

[Source](https://github.com/vueuse/vueuse/blob/main/packages/core/useDraggedOver/index.ts) • [Demo](https://github.com/vueuse/vueuse/blob/main/packages/core/useDraggedOver/demo.vue) • [Docs](https://github.com/vueuse/vueuse/blob/main/packages/core/useDraggedOver/index.md)

<!--FOOTER_ENDS-->
