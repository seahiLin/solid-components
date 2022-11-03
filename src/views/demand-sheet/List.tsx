import { Component, createSignal, For } from 'solid-js';
import { useNavigate } from "@solidjs/router"
import styles from './style.module.less'

interface DemandItem {
  id: number;
  title: string;
}

const Sheet: Component = () => {
  const navigate = useNavigate()
  const [list, setList] = createSignal<Array<DemandItem>>([
    {
      id: 1,
      title: '需求单1'
    },
    {
      id: 2,
      title: '需求单2'
    },
  ])

  const onNavToDetail = (item: DemandItem) => {
    navigate(`/demand-detail?id=${item.id}&title=${item.title}`)
  }

  return (
    <div class={styles.listContainer}>
      <For each={list()}>
        {(item) => (
          <div class={styles.item}>
            <div class={styles.title}>{item.title}</div>
            <div class={styles.edit} onClick={() => onNavToDetail(item)}>编辑</div>
          </div>
        )}
      </For>
    </div>
  );
};

export default Sheet;