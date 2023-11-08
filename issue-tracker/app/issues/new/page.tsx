'use client'
import ErrorMessage from '../../../components/ErrorMessage'
import { Button, Callout, Text, TextArea, TextField } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueSchema } from '@/app/validationSchema';
import { z } from 'zod'
import Spinner from '@/components/Spinner';

// create schema as a inetrface, thus no need to add property in interface and zodSchema two place
type IssueForm = z.infer<typeof createIssueSchema>;

// interface IssueForm {
//     title: string;
//     description: string;
// }

const NewIssuePage = () => {

    const router = useRouter()
    const { register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>({
        resolver: zodResolver(createIssueSchema)
    })
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
        <div className='max-w-xl' >
            {error && <Callout.Root color='red' className='mb-5' ><Callout.Text>{error}</Callout.Text></Callout.Root>}
            <form onSubmit={handleSubmit(onSubmit)} className=' space-y-3'>
                <TextField.Root>
                    <TextField.Input placeholder='Title....' {...register('title')} />
                </TextField.Root>
                {/* <TextArea placeholder='Description....' /> */}
                <ErrorMessage>{errors.title?.message}</ErrorMessage>

                {/* {errors.title &&
                    <Text color='red'>{errors.title.message}</Text>
                } */}
                <ErrorMessage>{errors.description?.message}</ErrorMessage>
                {/* 
                {errors.description &&
                    <Text color='red' as='p'>{errors.description.message}</Text>
                } */}
                <Controller
                    name='description'
                    control={control}
                    render={({ field }) => <SimpleMDE placeholder='Description....' {...field} />}
                />
                {/* <SimpleMDE placeholder='Description....' /> */}
                <Button disabled={spinner}>Submit Issue{spinner && <Spinner />}</Button>
            </form>
        </div>
    )
}

export default NewIssuePage
