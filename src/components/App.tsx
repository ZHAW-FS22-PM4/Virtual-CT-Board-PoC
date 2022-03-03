import React from 'react'

import { assemble } from 'assembler'

import './App.css'
import { writeToFlash } from 'board/flash'
import { reset } from 'board/processor'
import { readRegister, Register } from 'board/registers'
import { afterInstruction } from 'board/processor/hooks'

interface IAppProps {
  prop1?: string
}

interface IAppState {
  [Register.R1]: string
}

export class App extends React.Component<IAppProps, IAppState> {
  constructor (props: IAppProps) {
    super(props)
    this.state = { [Register.R1]: '0x00000000' }
  }

  componentDidMount (): void {
    // 1. User wrote code in editor.
    const code = 'MOVS R1, #12'

    // 2. Code is assembled to object file.
    const file = assemble(code)

    // 3. Object file is written to flash.
    writeToFlash(file)

    // 4. Attach to hook
    afterInstruction(() => {
      this.updateState()
    })

    // 5. Processor is being reset.
    reset()
  }

  updateState (): void {
    this.setState({ [Register.R1]: readRegister(Register.R1).toHexString() })
  }

  render (): React.ReactNode {
    return (
      <div>
        <h1 className='test'>DEMO</h1>
        <p>{this.state[Register.R1]}</p>
      </div>
    )
  }
}
