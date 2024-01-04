'use client'
import { TextField, Button, Callout, Text } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form"
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueSchema } from '@/app/ValidationSchemas';
import { z } from 'zod';
import ErrorMessage from '@/app/components/ErrorMessage';

type IssueForm = z.infer<typeof createIssueSchema>;
// interface IssueForm {
//     title: string;
//     description: string;
// };


const CreateNewIssue = () => {
    const router = useRouter();
    const { register, control, handleSubmit, formState : {errors} } = useForm<IssueForm>({resolver: zodResolver(createIssueSchema)});
    const [error, setError] = useState('');

    const saveFormData = async (formData: IssueForm) => {
        try {
            setError('');
            const response = await fetch("/api/issues", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });
            if (!response.ok) {
                setError("Please check if the input is valid");
                return;
            }
            router.push("/issues");
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div className='max-w-xl'>

            {error && <Callout.Root color="red" role="alert" className='mb-5'>
                <Callout.Icon>
                </Callout.Icon>
                <Callout.Text>
                    {error}
                </Callout.Text>
            </Callout.Root>}

            <form className='space-y-3' onSubmit={handleSubmit(saveFormData)}>
                <TextField.Root>
                    <TextField.Input placeholder='Title' {...register("title")} />
                </TextField.Root>

                {/* {errors.title && <Text as='p' color='red'>{errors.title.message}</Text>} */}
                <ErrorMessage>{errors.title?.message} </ErrorMessage>

                <Controller name='description' control={control} render={({ field }) => (
                    <SimpleMDE placeholder="Description..." {...field} />
                )} />

                {/* {errors.description && <Text as='p' color='red'>{errors.description.message}</Text>} */}
                <ErrorMessage>{errors.description?.message} </ErrorMessage>
                
                <Button>Submit New Issue</Button>
            </form>
        </div>
    )
}

export default CreateNewIssue