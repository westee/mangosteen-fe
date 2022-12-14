import { defineComponent, PropType } from 'vue';
import s from './Button.module.scss';

interface Props {
}

export const Button = defineComponent({
  props: {
    onClick: {
      type: Function as PropType<(e: MouseEvent) => void>
    },
    level: {
      type: String as PropType<'important' | 'normal' | 'danger'>,
      default: 'important'
    },
    type: {
      type: String as PropType<'submit' | 'button'>
    },
    disabled: {
      type: Boolean as PropType<boolean>,
      default: false
    }
   
  },
  setup: (props, context) => {
    return () => (
      <button disabled={props.disabled} onClick={props.onClick} type={props.type} class={[s.button, s[props.level]]}>
        {context.slots.default?.()}
      </button>
    )
  }
})