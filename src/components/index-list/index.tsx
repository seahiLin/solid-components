import {
  JSX,
  For,
  createSignal,
  onMount,
  Show,
  createEffect,
  on,
} from "solid-js";
import Taro from "@tarojs/taro";
import "./style.less";
import { onceWithCondition } from "@/utils";
import { throttle } from "lodash";

interface IndexPanelProps {
  index: string;
  title: string | number | HTMLElement;
  children: JSX.Element | HTMLElement;
}

const IndexBar = (props: {
  props?: { $scope?: Taro.ComponentInstance; list: Array<IndexPanelProps>; children?: any };
}) => {
  let ListRef: HTMLDivElement | undefined;
  let PanelRefList: Array<HTMLDivElement> = [];
  const [activeIndex, setActiveIndex] = createSignal(
    props.props?.list[0].index
  );
  const [isInteracting, setIsInteracting] = createSignal(false);

  const scrollTo = (index: string) => {
    if (!ListRef) return;
    const { children } = ListRef;
    for (let i = 0; i < children.length; i++) {
      const panel = children[i] as HTMLElement;
      if (!panel) continue;
      if (panel.dataset["index"] === index) {
        ListRef.scrollTop = panel.offsetTop;
        setActiveIndex(index);
        return;
      }
    }
  };

  const onTouchMove = (e: TouchEvent) => {
    console.log('touchmove', e)
    // e.stopImmediatePropagation();
    const { clientX, clientY } = e.touches[0];
    const target = document.elementFromPoint(clientX, clientY) as HTMLElement;

    if (!target) return;
    const index = target.dataset["index"];
    if (index && index !== activeIndex()) {
      scrollTo(index);
    }
  };

  // onMount(() => {
  //   const visibleMap = new Map();
    
  //   // @ts-ignore
  //   if (__COMPILE_TYPE__ === 'web') {
  //     const intersectionObserver = new IntersectionObserver(
  //       (entries) => {
  //         entries.forEach((item) => {
  //           const currentIndex = (item.target as HTMLElement).dataset["index"];
  //           visibleMap.set(currentIndex, item.intersectionRatio === 1);
  //         });

  //         const newIndex = props.props?.list.find((i) =>
  //           visibleMap.get(i.index)
  //         )?.index;
  //         if (newIndex && newIndex !== activeIndex()) setActiveIndex(newIndex);
  //       },
  //       {
  //         threshold: [1],
  //       }
  //     );
  //     PanelRefList.forEach((panel) => {
  //       intersectionObserver.observe(panel);
  //     });

  //     return () => intersectionObserver.disconnect();
  //   } else {
  //     let unmountHandler: Function | undefined;
  //     createEffect(
  //       on(
  //         () => props.props?.$scope,
  //         onceWithCondition(
  //           (instance) => {
  //             console.log('in ee', instance)
  //             try {
  //               const observerList: Array<Taro.IntersectionObserver> = []
  //               const updateIndex = throttle(() => {
  //                 const newIndex = props.props?.list.find((i) =>
  //                   visibleMap.get(i.index)
  //                 )?.index;
  //                 if (newIndex && newIndex !== activeIndex())
  //                   setActiveIndex(newIndex);
  //               }, 300);
  //               props.props?.list.forEach(({ index }) => {
  //                 const intersectionObserver = Taro.createIntersectionObserver(
  //                   instance!,
  //                   {
  //                     thresholds: [1],
  //                   }
  //                 );
  //                 observerList.push(intersectionObserver)
  //                 intersectionObserver.observe(`panel-${index}`, (entry) => {
  //                   visibleMap.set(index, entry.intersectionRatio === 1);
  //                   updateIndex();
  //                 });
  //               });
  
  //               unmountHandler = () => observerList.forEach(o => o.disconnect())
  //             } catch(e) {
  //               console.log(e, 'err')
  //             }
              
  //           },
  //           (instance) => {
  //             console.log('in condition', instance)
  //             return instance !== undefined
  //           }
  //         )
  //       )
  //     );

  //     return () => unmountHandler?.();
  //   }
  // });

  createEffect(() => {
    console.log(props.props?.children, 'children')
  })

  const createSlot = (index: string) => {
    const slot = document.createElement('native-slot')
    slot.setAttribute("name", `${index}-slot`)
    return slot
  }

  return (
    <div class="sc-index-list" onMouseDown={() => {
      console.log('ddder')
    }}
    onTouchStart={() => {
      console.log('ddder')
    }}
    onMouseEnter={() => {
      console.log('ddder')
      if (isInteracting()) {
      }
    }}
    >
      <div class="list-container" ref={ListRef} onClick={() => console.log('first')}>
        <For each={props.props?.list}>
          {({ index, title, children }) => (
            <div class="panel" data-index={index}>
              <div
                class="title"
                data-index={index}
                id={`panel-${index}`}
                ref={(ele) => PanelRefList.push(ele)}
              >
                {title}
              </div>
              <div class="content">
                {/* @ts-ignore */}
                {__COMPILE_TYPE__ === 'web' ? children : createSlot(index)}
              </div>
            </div>
          )}
        </For>
      </div>
      <div
        class={`index-bar ${
          isInteracting() ? "isInteracting" : ""
        }`}
        onTouchMove={onTouchMove}
        onMouseDown={() => {
          console.log('onTouchStart')
          setIsInteracting(true);
        }}
        onMouseUp={() => {
          console.log('onTouchStart')
          setIsInteracting(false);
        }}
        onTouchStart={() => {
          console.log('onTouchStart')
          setIsInteracting(true);
        }}
        onTouchEnd={() => {
          console.log('onTouchStart')
          setIsInteracting(false);
        }}
      >
        <For each={props.props?.list}>
          {({ index }) => (
            <div
              class={`item ${activeIndex() === index ? "active" : ""}`}
              onMouseDown={() => {
                console.log('ddder')
                scrollTo(index);
              }}
              onTouchStart={() => {
                console.log('ddder')
                scrollTo(index);
              }}
              onMouseEnter={() => {
                console.log('ddder')
                if (isInteracting()) {
                  scrollTo(index);
                }
              }}
              data-index={index}
            >
              <Show when={isInteracting() && activeIndex() === index}>
                <div class="bubble">{index}</div>
              </Show>
              <div class="index" data-index={index}>
                {index.charAt(0)}
              </div>
            </div>
          )}
        </For>
      </div>
    </div>
  );
};

export default IndexBar;
