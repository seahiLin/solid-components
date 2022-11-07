import { Component } from "solid-js";
import { useSearchParams } from "@solidjs/router";
import Sheet from "./Sheet";
import styles from "./style.module.less";

const Detail: Component = () => {
  const [params] = useSearchParams<{
    id: string;
    title: string;
  }>();
  const columns = [
    {
      title: '下单人手机号',
      options: [
        {
          title: '13111111111',
          value: 13111111111
        }
      ]
    },
    {
      title: '乘车人姓名',
      options: [
        {
          title: 'seahi',
          value: 'seahi'
        }
      ]
    },
  ]

  const onExport = () => {
    const data1 = window.luckysheet.getAllSheets();
    const data2 = window.luckysheet.getLuckysheetfile();
    console.log(data1, data2);
  };

  return (
    <div class={styles.detailContainer}>
      <div class={styles.header}>
        <div class={styles.title}>{params.title}</div>
        <div class={styles.actions}>
          <div class={styles.item}>快速下单</div>
          <div class={styles.item}>批量下单</div>
          <div class={styles.item} onClick={onExport}>
            导出数据
          </div>
        </div>
      </div>
      <Sheet columns={columns} />
    </div>
  );
};

export default Detail;
