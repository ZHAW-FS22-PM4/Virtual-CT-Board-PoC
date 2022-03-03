import { Halfword } from 'types/binary'

export interface IInstruction {
  canExecute: (optcode: Halfword) => boolean
  execute: (optcode: Halfword) => void
}

export abstract class Instruction implements IInstruction {
  public abstract pattern: string

  public canExecute (optcode: Halfword): boolean {
    const halfwordString = optcode.toBinaryString()

    if (this.pattern.length !== halfwordString.length) {
      return false
    }

    for (let i = 0; i < halfwordString.length; i++) {
      if (this.pattern[i] === 'X') {
        continue
      }
      if (this.pattern[i] !== halfwordString[i]) {
        return false
      }
    }

    return true
  }

  public execute (optcode: Halfword): void {
    if (!this.canExecute(optcode)) {
      throw new Error(`This instruction can not execute optcode '0x${optcode.toHexString()}'.`)
    }
    this.onExecute(optcode)
  }

  protected abstract onExecute (optcode: Halfword): void
}
