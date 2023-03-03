export const onceWithCondition = <T, S>(func: (v: T) => S, dep: (v: T) => boolean) => {
  let executed = false
  return (newVal: T) => {
    if (executed) return

    const canExec = dep(newVal)
    if (canExec) {
      executed = true
      return func(newVal)
    }
  }
}