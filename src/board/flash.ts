import { ObjectFile } from 'assembler/objectFile'
import { writeBytes, clearMemory } from 'board/memory'

export function writeToFlash (file: ObjectFile): void {
  clearMemory()
  for (const section of file.sections) {
    writeBytes(section.offset, section.bytes)
  }
}
