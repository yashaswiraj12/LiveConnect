import React from 'react'
import {SignedOut,SignInButton,SignedIn,UserButton} from "@clerk/clerk-react"

const App = () => {
  return (
    <header>
      <SignedOut>
        <SignInButton mode='modal' />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
  )
}

export default App