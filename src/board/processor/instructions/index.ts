import { Halfword } from 'types/binary'

import { IInstruction } from './instruction'
import { MovInstruction } from './movs'

const instructions: IInstruction[] = [
  new MovInstruction()
]

export function getInstruction (optcode: Halfword): IInstruction {
  const executable = instructions.filter(x => x.canExecute(optcode))
  if (executable.length < 1) {
    throw new Error(`Unknown optcode '0x${optcode.toHexString()}'.`)
  }
  if (executable.length > 1) {
    throw new Error(`Ambiguous optcode '0x${optcode.toHexString()}'.`)
  }
  return executable[0]
}
