import { useState } from 'react'
import { useForm} from 'react-hook-form'
import { TextInput } from '@/components/TextInput'
import { Button } from '@/components/Button'
// import { handleSignUpConfirmation } from '@/lib/cognitoActions'
interface FormValues {
  email: string;
  code: string;
}
export default function Form() {
  const [loading, setLoading] = useState(false)
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      email: "",
      code:"",
    },
  })
  const onSubmit = async (data:FormValues) => {
    setLoading(true); // Assuming you want to show loading status during the delay
    // handleSignUpConfirmation(data)
    console.log(data)
    setLoading(false);

  };
  
    
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <TextInput label="Email Address" name="email" type="email" control={control}/>
      <TextInput label="Verification Code" name="code" type="password" control={control}/>
      <Button loading={loading} type="submit" buttonType="primary" label="Confirm"/>
    </form>
  )
}