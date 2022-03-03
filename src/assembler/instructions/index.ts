import { Halfword } from 'types/binary'

export function parseInstruction (instruction: string): Halfword {
  // HARDCODED SAMPLE - ONLY FOR DEMO
  if (instruction === 'MOVS R1, #12') {
    return Halfword.fromUnsignedInteger(0x210C) // 00100 010 00001100
  }

  throw new Error(`Unknown instruction '${instruction}'.`)
}
