'use client'
import { Table } from '@radix-ui/themes'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import { useRouter } from 'next/navigation';

const DisplayData = () => {

    const router = useRouter()

    const [spinner, setSpinner] = useState(false)
    const [error, setError] = useState('')
    const [data, setData] = useState([])

    useEffect(() => {
        setSpinner(true)
        getData()
    }, [])

    const getData = async () => {
        try {
            const result = await axios.get('/api/issues');
            setSpinner(false)
            setData(result.data)

        } catch (error) {
            setSpinner(false)
            console.log("error=======", error)
            setError("Unexpected error occured!")
        }
    }

    const handleDeleteIssue = async (id: number) => {
        setSpinner(true)
        try {
            await axios.delete(`/api/issues?id=${id}`);
            setSpinner(false)
            getData()

        } catch (error) {
            setSpinner(false)
            console.log("error=======", error)
            setError("Unexpected error occured!")
        }
    }

    return (
        <div>
            <Table.Root>
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeaderCell>Issue Title</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Description</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell colSpan={2} >Action</Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {data.map((item: any) => {
                        return <Table.Row key={item.id}>
                            <Table.RowHeaderCell>{item.title}</Table.RowHeaderCell>
                            <Table.Cell>{item.description}</Table.Cell>
                            <Table.Cell><AiFillEdit onClick={() => router.push(`/issues/update/${item.id}`)} /></Table.Cell>
                            <Table.Cell><AiFillDelete onClick={() => handleDeleteIssue(item.id)} /></Table.Cell>
                        </Table.Row>
                    })}
                </Table.Body>
            </Table.Root>
        </div>
    )
}

export default DisplayData
