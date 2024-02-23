export {}

declare module 'vue' {
  type Hooks = App.AppInstance & Page.PageInstance
  interface ComponentCustomOptions extends Hooks {}
}

declare global {
  interface Data<T = any> {
    [key: string]: T
    [key: number]: T
  }
}
