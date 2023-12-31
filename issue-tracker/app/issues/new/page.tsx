'use client'
import "easymde/dist/easymde.min.css";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import IssueForm from '@/components/IssueForm';

const NewIssuePage = () => {

    const router = useRouter()

    const [error, setError] = useState('')
    const [spinner, setSpinner] = useState(false)

    const onSubmit = async (data: any) => {
        setSpinner(true)
        try {
            await axios.post('/api/issues', data);
            setSpinner(false)
            router.push('/issues')

        } catch (error) {
            setSpinner(false)
            console.log("error=======", error)
            setError("Unexpected error occured!")
        }
    }

    return (
        <IssueForm onSubmit={onSubmit} error={error} spinner={spinner} />
    )
}

export default NewIssuePage
