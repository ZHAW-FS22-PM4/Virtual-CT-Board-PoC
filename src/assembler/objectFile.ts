import { Word, Halfword, Byte } from 'types/binary'

export class ObjectFile {
  public sections: Section[]

  public constructor (sections: Section[]) {
    this.sections = sections
  }
}

export class Section {
  public offset: Word = Word.fromUnsignedInteger(0x0)
  public bytes: Byte[] = []

  private constructor (offset: Word, bytes: Byte[]) {
    this.offset = offset
    this.bytes = bytes
  }

  public static fromBytes (offset: Word, bytes: Byte[]): Section {
    return new Section(offset, bytes)
  }

  public static fromHalfwords (offset: Word, halfwords: Halfword[]): Section {
    return new Section(offset, Halfword.toBytes(...halfwords))
  }

  public static fromWords (offset: Word, words: Word[]): Section {
    return new Section(offset, Word.toBytes(...words))
  }
}
