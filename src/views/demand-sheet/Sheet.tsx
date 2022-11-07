import { Component, createEffect } from "solid-js";
import luckysheet from 'hi-luckysheet'
import styles from "./style.module.less";

const SheetConfig: any = {
  container: "sheet",
  lang: "zh",
  showinfobar: false,
  showsheetbar: false,
  data: [
    {
      name: "需求表", //工作表名称
      color: "", //工作表颜色
      index: 0, //工作表索引
      status: 1, //激活状态
      order: 0, //工作表的下标
      hide: 0, //是否隐藏
      row: 100, //行数
      column: 100, //列数
      defaultRowHeight: 25, //自定义行高
      defaultColWidth: 100, //自定义列宽
      celldata: [], //初始化使用的单元格数据
      config: {
        merge: {}, //合并单元格
        rowlen: {}, //表格行高
        columnlen: {}, //表格列宽
        rowhidden: {}, //隐藏行
        colhidden: {}, //隐藏列
        borderInfo: {}, //边框
        authority: {
          sheet: true,
          // hintText: '',
          // password: "seahi",
          allowRangeList: [{
            name:"area", //名称
            password:"", //密码
            hintText:"", //提示文字
            algorithmName:"None",//加密方案：MD2,MD4,MD5,RIPEMD-128,RIPEMD-160,SHA-1,SHA-256,SHA-384,SHA-512,WHIRLPOOL
            saltValue:null, //密码解密的盐参数，为一个自己定的随机数值
            sqref: "$A$2:$CV$10000,$G$1:$CV$1" //区域范围
          }]
        }, //工作表保护
      },
      scrollLeft: 0, //左右滚动条位置
      scrollTop: 0, //上下滚动条位置
      luckysheet_select_save: [], //选中的区域
      calcChain: [], //公式链
      isPivotTable: false, //是否数据透视表
      pivotTable: {}, //数据透视表设置
      filter_select: {}, //筛选范围
      filter: null, //筛选配置
      luckysheet_alternateformat_save: [],
      luckysheet_alternateformat_save_modelCustom: [], //自定义交替颜色
      luckysheet_conditionformat_save: {}, //条件格式
      frozen: {}, //冻结行列配置
      chart: [], //图表配置
      zoomRatio: 1, // 缩放比例
      image: [], //图片
      showGridLines: 1, //是否显示网格线
      dataVerification: {
        "3_0": {
          "type": "dropdown",
          "type2": null,
          "value1": "Develop,Fix,Done",
          "value2": "",
          "checked": true,
          "remote": true,
          "prohibitInput": true,
          "hintShow": false,
          "hintText": ""
      },
      "3_2": {
        "type": "checkbox",
        "type2": null,
        "value1": "Pass",
        "value2": "Fail",
        "checked": false,
        "remote": true,
        "prohibitInput": false,
        "hintShow": false,
        "hintText": ""
    },
      }, //数据验证配置
    },
  ],
  hook: {
    cellUpdated: (row: number, col: number, oldVal: object, newVal: object, isRefresh: boolean) => {
      console.log(row, col, oldVal, newVal, isRefresh)
    }
  }
}

const Sheet: Component<{
  columns: Array<{
    title: string;
    options: Array<{
      title: string;
      value: number | string;
    }>
  }>
}> = ({
  columns
}) => {

  createEffect(() => {
    const celldata = columns.map((col, i) => {
      return {
        c: i,
        r: 0,
        lo: 1,
        v: {
          m: col.title, // 显示值
          v: col.title, // 原始值
          // ct: {
          //   fa: 'General',
          //   t: 'g'
          // }
        }
      }
    })
    SheetConfig.data[0].celldata = celldata
    luckysheet.create(SheetConfig);
    luckysheet.setRangeShow("A2",{show:false})
  });

  return (
    <div id="sheet" class={styles.sheet} />
  );
};

export default Sheet;
