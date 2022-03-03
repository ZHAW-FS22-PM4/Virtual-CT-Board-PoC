import { Word } from 'types/binary'
import { Register, readRegister, writeRegister, clearRegisters } from 'board/registers'
import { readHalfword, readWord } from 'board/memory'

import { getInstruction } from './instructions'
import { Hook, trigger } from './hooks'

const clockSpeed: number = 500

let isRunning: boolean = false

export function reset (): void {
  if (isRunning) {
    return
  }
  clearRegisters()
  writeRegister(Register.SP, readWord(Word.fromUnsignedInteger(0x0)))
  writeRegister(Register.PC, readWord(Word.fromUnsignedInteger(0x4)))
  function onCycle (): void {
    const optcode = readHalfword(readRegister(Register.PC))
    const instruction = getInstruction(optcode)
    instruction.execute(optcode)
    trigger(Hook.AfterInstruction)
    if (isRunning) {
      setTimeout(onCycle, clockSpeed)
    }
  }
  setTimeout(onCycle, 0)
  isRunning = true
}

export function halt (): void {
  isRunning = false
}
