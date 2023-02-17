import { createSignal } from "solid-js";
import Mask from "@/components/mask";
import { render } from "solid-js/web";
import './style.less'

export interface DialogProps {
  children?: HTMLElement;
  title?: string | number;
  desc?: string | number;
  onConfirm?: Function;
  onClose?: Function;
}

const Dialog = (props: {
  props?: DialogProps
}) => {
  const [visible, setVisible] = createSignal(true);

  return (
    <Mask visible={visible()}>
      <div class="dialog-container">
        {props.props?.children || (
          <div class="title-container">
            <div class="title">{props.props?.title}</div>
            <div class="desc">{props.props?.desc}</div>
          </div>
        )}
        <div class="action">
          <div
            class="btn close"
            onClick={async () => {
              await props.props?.onClose?.();
              setVisible(false)
            }}
          >
            取消
          </div>
          <div class="separator" />
          <div
            class="btn confirm"
            onClick={async () => {
              await props.props?.onConfirm?.();
              setVisible(false)
            }}
          >
            确定
          </div>
        </div>
      </div>
    </Mask>
  );
};

Dialog.alert = (props: DialogProps): Promise<void> => {
  const ele = document.createElement("div");

  return new Promise((resolve, reject) => {
    const remove = () => {
      document.body.removeChild(ele);
    };
    render(
      () => (
        <Dialog
          props={{
            ...props,
            onConfirm: async() => {
              await props.onConfirm?.()
              remove();
              resolve();
            },
            onClose: async() => {
              await props.onClose?.()
              remove();
              reject();
            }
          }}
        />
      ),
      ele
    );
    document.body.appendChild(ele);
  });
};

Dialog.render = (ele: Element, props: DialogProps) => {
  render(() => <Dialog props={{...props}} />, ele)
}

export default Dialog;
