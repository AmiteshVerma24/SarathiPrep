import React from 'react'
import { Navbar, CodeEditor, QuestionDisplay } from '../components'

function QuestionPage() {
  return (
    <div>
      <Navbar/>
      {/* <Globe /> */}
      <div className='flex justify-evenly'>
        <div className='w-1/3'>
          <QuestionDisplay />
        </div>
        <div className='w-2/3'>
          <CodeEditor />
        </div>
      </div>
    </div>
  )
}

export default QuestionPage
