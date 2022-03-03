import { Halfword, Word } from 'types/binary'

import { ObjectFile, Section } from './objectFile'
import { parseInstruction } from './instructions'

const vectorTable: Section = Section.fromWords(
  Word.fromUnsignedInteger(0x0), // Vector table is mapped to address zero.
  [
    Word.fromUnsignedInteger(0x200105FF), // Stack starts at this address and grows upwards.
    Word.fromUnsignedInteger(0x08001000) // Code starts at this address.
  ]
)

function assembleCodeSection (code: string): Halfword[] {
  // Our simple assembler assumes that each line is one instruction.
  return code.split('\n').map(x => parseInstruction(x.trim()))
}

export function assemble (code: string): ObjectFile {
  // Our simple assembler allows only one code section (for now).
  const codeSection = Section.fromHalfwords(
    Word.fromUnsignedInteger(0x08001000), // The code section starts at the 'RESET' address of the vector table.
    assembleCodeSection(code)
  )

  // Our simple assembler has a hardcoded vector table (for now).
  return new ObjectFile([vectorTable, codeSection])
}
