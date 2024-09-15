/**
 *
 * @description
 * 全局响应式变量。
 *
 * 不推荐直接访问、设置该 state不建议在组件中直接使用该 state，
 * 请使用 `getVariable`、`getVariableToRefs`、`setVariable` 方法进行操作。
 */
const variableState = reactive({
  globalSpinning: false, // 全局加载控制器
  globalDrawerValue: false, // 全局抽屉控制器（小尺寸设备可用）
  globalMainLayoutLoad: true, // LayoutContent 区域加载控制器，会触发强制刷新
  layoutContentMaximize: false, // LayoutContent 区域全屏控制器
  layoutContentSpinning: false // LayoutContent 区域加载控制器，不会触发强制刷新
})

export type VariableState = typeof variableState
export type VariableStateKey = keyof VariableState

/**
 *
 * @param key 目标值 key
 *
 * 返回目标值的响应式 ref
 *
 * @example
 * getVariableToRefs('globalSpinning') // 返回 Ref<boolean>
 */
export function getVariableToRefs<K extends VariableStateKey>(key: K) {
  return readonly(toRef<VariableState, K>(variableState, key))
}
