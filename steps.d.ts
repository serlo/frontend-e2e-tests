/// <reference types='codeceptjs' />

declare namespace CodeceptJS {
  interface SupportObject {
    I: I
    current: any
  }
  interface Methods extends Playwright {}
  interface I extends WithTranslation<Methods> {
    clickByQaClassName: (value: string) => void
  }
  namespace Translation {
    interface Actions {}
  }
}
