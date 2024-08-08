import { useForm } from 'react-hook-form'
import { TextInput } from '../../../components/TextInput'
import { Button } from '../../../components/Button'
import { useState } from 'react'
interface FormValues {
    name: string;
    email: string;
    password: string;
    confirm_password:string;
  }
export default function SignUpForm() {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      name:"",
      email: "",
      password:"",
      confirm_password:"",
    },
  })
  const [loading, setLoading] = useState(false)
  const onSubmit = async (data:FormValues) => {
    setLoading(true); // Assuming you want to show loading status during the delay
    try {
      // Wrap setTimeout in a promise
      await new Promise<void>((resolve) => {
        setTimeout(() => {
          console.log(data);
          resolve(); // Resolve the promise after the timeout
        }, 4000); // 4000 ms = 4 seconds
      });
      
      console.log('Done');
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Ensure loading status is reset after the operation completes
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <TextInput label="Full Name" name="name" type="text" control={control} />
      <TextInput label="Email Address" name="email" type="email" control={control}/>
      <TextInput label="Password" name="password" type="password" control={control}/>
      <TextInput label="Confirm Password" name="confirm_password" type="password" control={control}/>
      <Button loading={loading} type="submit" buttonType="primary" label="Create Account"/>
  </form>
  )
}