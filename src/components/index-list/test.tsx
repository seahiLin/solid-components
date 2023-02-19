import { For } from "solid-js"
import IndexBar from "."

const style = `
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`

export default () => {
  const list = [
    {
      index: 'A',
      title: '标题A',
      children: <For each={new Array(100).fill('seahi')}>
        {(content) => <div>{content}</div>}
      </For>
    },
    {
      index: 'B',
      title: '标题B',
      children: <For each={new Array(100).fill('Bkkk')}>
        {(content) => <div>{content}</div>}
      </For>
    },
    {
      index: 'C',
      title: '标题C',
      children: <For each={new Array(100).fill('Ckkk')}>
        {(content) => <div>{content}</div>}
      </For>
    },
  ]

  return (
    <div style={style}>
      <IndexBar list={list} />
    </div>
  )
}