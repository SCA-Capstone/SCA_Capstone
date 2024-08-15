interface TextInputProps {
  label: string;
  name: any;
  type: string;
  showForgotPassword?: boolean;
  placeholder?: string;
}
export default function TextInput({ label, name, type, showForgotPassword, placeholder }: TextInputProps) {
  return (
    <div>
      {showForgotPassword ?
        (
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900" >
              Password
            </label>
            <div className="text-sm">
              <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                Forgot password?
              </a>
            </div>
          </div>
        ) : (
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
            {label}
          </label>
        )}
      <div className="mt-2">
        <input
          id={name}
          name={name}
          type={type}
          required
          placeholder={placeholder}
          className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
    </div>
    )
}