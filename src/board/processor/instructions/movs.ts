import { Word, Halfword } from 'types/binary'
import { Register, readRegister, writeRegister } from 'board/registers'

import { Instruction } from './instruction'

export class MovInstruction extends Instruction {
  public pattern: string = '00100XXXXXXXXXXX'

  protected onExecute (optcode: Halfword): void {
    // HARDCODED SAMPLE - ONLY FOR DEMO
    if (optcode.value === 0x210C) { // MOVS R1, #12 | 00100 001 00001100
      writeRegister(Register.R1, Word.fromUnsignedInteger(12))
    }

    // Incremet program counter to 2.
    writeRegister(Register.PC, readRegister(Register.PC).increment(2))
  }
}
