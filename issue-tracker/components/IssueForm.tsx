'use client'
import ErrorMessage from './ErrorMessage'
import { Button, Callout, TextField } from '@radix-ui/themes'
import dynamic from 'next/dynamic';
// import SimpleMDE from "react-simplemde-editor";
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false })
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueSchema } from '@/app/validationSchema';
import { z } from 'zod'
import Spinner from '@/components/Spinner';
import { useEffect } from 'react';
import axios from 'axios';

type IssueForm = z.infer<typeof createIssueSchema>;

interface Props {
    onSubmit(data: any): void;
    error: string;
    spinner: boolean;
    id?: any
}

const IssueForm = ({ onSubmit, error, spinner, id }: Props) => {

    const { register, control, handleSubmit, formState: { errors }, reset } = useForm<IssueForm>({
        resolver: zodResolver(createIssueSchema),
        defaultValues: {
            title: "",
            description: ""
        },
    })

    useEffect(() => {
        console.log(id,'----')
        if (id) {
            getData()
        }
    }, [id])


    const getData = async () => {
        try {
            const result = await axios.get(`/api/issues/${id}`);
            // setSpinner(false)
            reset({
                ...result.data
            })
            // setData(result.data)

        } catch (error) {
            // setSpinner(false)
            console.log("error=======", error)
            // setError("Unexpected error occured!")
        }
    }

    return (
        <div className='max-w-xl' >
             {error && <Callout.Root color='red' className='mb-5' ><Callout.Text>{error}</Callout.Text></Callout.Root>}
            <form onSubmit={handleSubmit(onSubmit)} className=' space-y-3'>
                <TextField.Root>
                    <TextField.Input placeholder='Title....' {...register('title')} />
                </TextField.Root>
                {/* <TextArea placeholder='Description....' >*/ }
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
                <Button type='submit' disabled={spinner}>Submit Issue{spinner && <Spinner />}</Button>
            </form>
        </div>
        
    )
}

export default IssueForm

