import { JSX, For } from "solid-js";
import './style.less';

interface IndexListProps {}
interface IndexPanelProps {
  index: string;
  title: string | number | HTMLElement;
  children: JSX.Element | HTMLElement;
}

const IndexBar = (props: { list: Array<IndexPanelProps> }) => {
	const onTouchMove = (e: TouchEvent) => {
		console.log(e, 'scroll')
	}

  return (
    <div class="sc-index-list">
      <div class="list-container">
        <For each={props.list}>
          {({ index, title, children }) => (
            <div class="panel">
              <div class="title">{title}</div>
              <div class="content">{children}</div>
            </div>
          )}
        </For>
      </div>
      <div class="index-bar" onTouchMove={onTouchMove}>
        <For each={props.list}>
          {({ index }) => <div class="item">{index.charAt(0)}</div>}
        </For>
      </div>
    </div>
  );
};

IndexBar.Panel = (props: IndexPanelProps) => {
  return <div></div>;
};

export default IndexBar;
