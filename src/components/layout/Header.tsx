import React from 'react'
import Button from '../shared/Button'
import Input from '../shared/Input'

export default function Header() {
    return (
        <header className="w-full p-4  shadow-2xl flex bg-[url('/assets/AbstractDesign.svg')] bg-cover bg-center bg-repeat ">
            <div className="container flex justify-between items-center">
                <div>
                    <span className="text-2xl font-bold  text-transparent bg-clip-text bg-linear-to-r from-primary to-cyan-400" >logo</span>
                </div>
                <div>
                   <Input  placeholder='search' />
                </div>
                <Button variant='danger' >logout</Button>
                </div>
        </header>
    )
}
