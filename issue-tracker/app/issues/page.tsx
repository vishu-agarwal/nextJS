
import React from 'react'
import { Button } from '@radix-ui/themes'
import Link from 'next/link'
import DisplayData from '@/components/DisplayData'

const IssuePage = () => {
    return (
        <div>
            <Button><Link href={"/issues/new"}>New Issue</Link></Button>
            <DisplayData />
        </div>
    )
}

export default IssuePage
