export enum Hook {
  Reset,
  AfterInstruction,
  Halt
}

type CallbackStorage = {
  [hook in Hook]: Array<() => void>
}

const callbacks: CallbackStorage = {
  [Hook.Reset]: [],
  [Hook.AfterInstruction]: [],
  [Hook.Halt]: []
}

export function trigger (hook: Hook): void {
  for (const callback of callbacks[hook]) {
    callback()
  }
}

export function afterInstruction (callback: () => void): void {
  callbacks[Hook.AfterInstruction].push(callback)
}

export function onReset (callback: () => void): void {
  callbacks[Hook.Reset].push(callback)
}

export function onHalt (callback: () => void): void {
  callbacks[Hook.Halt].push(callback)
}
