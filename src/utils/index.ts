/**
 * @description 设置页面标题
 * @param titleText 标题文本
 */
export function setPageTitle(titleText: string | unknown) {
  window.document.title = `${titleText ? ` ${titleText} - ` : ''}${import.meta.env.VITE_APP_TITLE}`
}
