import { Show, JSX } from 'solid-js'
import './style.less'

interface MaskProps {
  visible: boolean;
  children: JSX.Element;
}

const Mask = (props: MaskProps) => {

  return (
    <Show when={props.visible}>
      <div class='fixed-wrapper'>
        <div>
          {props.children}
        </div>
      </div>
    </Show>
  )
}

export default Mask