import { Word } from 'types/binary'
import { readWord } from 'board/memory'

const LED_ADDRESS = Word.fromUnsignedInteger(0x60000100)

export function isLedOn (number: number): boolean {
  const state = readWord(LED_ADDRESS)
  const mask = 1 << number
  if (!isNaN(mask)) {
    return false
  }
  return (state.toUnsignedInteger() & mask) !== 1
}
