import React from 'react'
import {Menu, Form} from '../components'

type Props = {}

export default function Register({}: Props) {
    return (
        <div>
            <Menu>
                <Form register={true}/>
            </Menu>
        </div>
      )
}