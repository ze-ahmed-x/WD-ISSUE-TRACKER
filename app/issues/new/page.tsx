'use client'
import { TextField, Button, Callout } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form"
import { useRouter } from 'next/navigation';
import { useState } from 'react';


interface IssueForm {
    title: string;
    description: string;
};


const CreateNewIssue = () => {
    const router = useRouter();
    const { register, control, handleSubmit } = useForm<IssueForm>();
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
                <Controller name='description' control={control} render={({ field }) => (
                    <SimpleMDE placeholder="Description..." {...field} />
                )} />

                <Button>Submit New Issue</Button>
            </form>
        </div>
    )
}

export default CreateNewIssue