export class Word {
  public static MIN_VALUE: number = 0x00000000
  public static MAX_VALUE: number = 0xFFFFFFFF
  public static MIN: Word = new Word(Word.MIN_VALUE)
  public static MAX: Word = new Word(Word.MAX_VALUE)

  public readonly value: number

  private constructor (value: number) {
    if (!Number.isInteger(value)) {
      throw new Error('Word value must be integer.')
    }
    if (value < Word.MIN_VALUE) {
      throw new Error('Word value can not be smaller than `Word.MIN_VALUE`.')
    }
    if (value > Word.MAX_VALUE) {
      throw new Error('Word value can not be larger than `Word.MAX_VALUE`.')
    }

    this.value = value
  }

  public static fromUnsignedInteger (value: number): Word {
    return new Word(value)
  }

  public static fromBytes (...bytes: Byte[]): Word {
    let value = Word.MIN_VALUE
    let shift = 0
    for (const byte of bytes) {
      value |= (byte.value << shift)
      shift += 8
    }
    return new Word(value)
  }

  public static toBytes (...words: Word[]): Byte[] {
    const bytes: Byte[] = []
    for (const word of words) {
      let value = word.value
      while (value > Word.MIN_VALUE) {
        bytes.push(Byte.fromUnsignedInteger(value & 0xFF))
        value >>= 8
      }
    }
    return bytes
  }

  public static fromHalfwords (...halfwords: Halfword[]): Word {
    let value = Word.MIN_VALUE
    let shift = 0
    for (const halfword of halfwords) {
      value &= (halfword.value << shift)
      shift += 16
    }
    return new Word(value)
  }

  public static toHalfwords (...words: Word[]): Halfword[] {
    const halfwords: Halfword[] = []
    for (const word of words) {
      let value = word.value
      while (value > Word.MIN_VALUE) {
        halfwords.push(Halfword.fromUnsignedInteger(value & 0xFF))
        value >>= 16
      }
    }
    return halfwords
  }

  public increment (value: number): Word {
    return Word.fromUnsignedInteger(this.value + value)
  }

  public toUnsignedInteger (): number {
    return this.value
  }

  public toSignedInteger (): number {
    const sign = (this.value & 0x80000000) === 0 ? -1 : 1
    const abs = this.value & 0x7FFFFFFF
    return sign * abs
  }

  public toBytes (): Byte[] {
    return Word.toBytes(this)
  }

  public toHalfwords (): Byte[] {
    return Word.toHalfwords(this)
  }

  public toBinaryString (): string {
    const byteString = this.value.toString(2)
    return byteString.padStart(32, '0')
  }

  public toHexString (): string {
    const hexString = this.value.toString(16)
    return hexString.padStart(8, '0')
  }
}

export class Halfword {
  public static MIN_VALUE: number = 0x0000
  public static MAX_VALUE: number = 0xFFFF

  public readonly value: number

  private constructor (value: number) {
    if (!Number.isInteger(value)) {
      throw new Error('Halfword value must be integer.')
    }
    if (value < Halfword.MIN_VALUE) {
      throw new Error('Halfword value can not be smaller than `Halfword.MIN_VALUE`.')
    }
    if (value > Halfword.MAX_VALUE) {
      throw new Error('Halfword value can not be larger than `Halfword.MAX_VALUE`.')
    }

    this.value = value
  }

  public static fromUnsignedInteger (value: number): Halfword {
    return new Halfword(value)
  }

  public static fromBytes (...bytes: Byte[]): Halfword {
    let value = Halfword.MIN_VALUE
    let shift = 0
    for (const byte of bytes) {
      value |= (byte.value << shift)
      shift += 8
    }
    return new Halfword(value)
  }

  public static toBytes (...halfwords: Halfword[]): Byte[] {
    const bytes: Byte[] = []
    for (const halfword of halfwords) {
      let value = halfword.value
      while (value > Halfword.MIN_VALUE) {
        bytes.push(Byte.fromUnsignedInteger(value & 0xFF))
        value >>= 8
      }
    }
    return bytes
  }

  public toUnsignedInteger (): number {
    return this.value
  }

  public toSignedInteger (): number {
    const sign = (this.value & 0x8000) === 0 ? -1 : 1
    const abs = this.value & 0x7FFF
    return sign * abs
  }

  public toBytes (): Byte[] {
    return Halfword.toBytes(this)
  }

  public toBinaryString (): string {
    const byteString = this.value.toString(2)
    return byteString.padStart(16, '0')
  }

  public toHexString (): string {
    const hexString = this.value.toString(16)
    return hexString.padStart(4, '0')
  }
}

export class Byte {
  public static MIN_VALUE: number = 0x00
  public static MAX_VALUE: number = 0xFF

  public readonly value: number

  private constructor (value: number) {
    if (!Number.isInteger(value)) {
      throw new Error('Byte value must be integer.')
    }
    if (value < Byte.MIN_VALUE) {
      throw new Error('Byte value can not be smaller than `Byte.MIN_VALUE`.')
    }
    if (value > Byte.MAX_VALUE) {
      throw new Error('Byte value can not be larger than `Byte.MAX_VALUE`.')
    }

    this.value = value
  }

  public static fromUnsignedInteger (value: number): Byte {
    return new Byte(value)
  }

  public toUnsignedInteger (): number {
    return this.value
  }

  public toSignedInteger (): number {
    const sign = (this.value & 0x80) === 0 ? -1 : 1
    const abs = this.value & 0x7F
    return sign * abs
  }

  public toBinaryString (): string {
    const byteString = this.value.toString(2)
    return byteString.padStart(8, '0')
  }

  public toHexString (): string {
    const hexString = this.value.toString(16)
    return hexString.padStart(2, '0')
  }
}
