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
            <label htmlFor="password" className="block text-sm font-semibold leading-6 text-[#45503B]" >
              Password
            </label>
            <div className="text-sm">
              <a href="/auth/forgot-password" className="font-semibold text-[#45503B] hover:text-[#8A9A5B]">
                Forgot password?
              </a>
            </div>
          </div>
        ) : (
          <label htmlFor="email" className="block text-sm font-bold leading-6 text-[#45503B]">
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
          className="block w-full border-[1px] border-[#45503B] rounded-md px-2 py-1.5 text-[#CAD2C5] shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
        />
      </div>
    </div>
    )
}