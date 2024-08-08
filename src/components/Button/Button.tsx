
interface ButtonProps {
    loading:boolean;
    type:"submit" | "reset" | "button" | undefined;
    buttonType: "primary" | "secondary" | "tertiary" ;
    label:string;
  }
export default function Button ({loading,type,buttonType, label}:ButtonProps){
    const getStyle = ():string | undefined =>{
        if (loading){
            return 'bg-sky-200 focus-visible:outline-indigo-300 text-white ocus-visible:outline-offset-2'
        }
        else if (buttonType === 'primary'){
            return 'bg-sky-600  shadow-sm hover:bg-sky-500 focus-visible:outline-sky-500 text-white ocus-visible:outline-offset-2'
        }
        else if (buttonType === 'secondary'){
            return 'shadow-sm focus-visible:outline-sky-500 border border-sky-600 text-sky-600 hover:text-sky-500 ocus-visible:outline-offset-2'
        }
        else if (buttonType === 'tertiary'){
            return 'focus-visible:outline-sky-500 text-sky-600 hover:text-sky-500 ocus-visible:outline-offset-2'
        }
        return;
    }
    return(
        <button
         disabled={loading}
          type={type}
          className={[
            getStyle(),
            "flex w-full justify-center rounded-md  px-3 py-1.5 text-sm font-semibold leading-6  focus-visible:outline focus-visible:outline-2 f "
          ].join(' ')}
        >
          {loading? "Loading...": label}
        </button>
    )
}