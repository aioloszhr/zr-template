/**
 *
 * 模板中英文切换下拉框数据
 * 指定明确类型，以便于获取准确的 key
 */
export type LocalOptions = Array<
  | {
      key: 'zh-CN'
      label: string
    }
  | {
      key: 'en-US'
      label: string
    }
>
