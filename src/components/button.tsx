

export default function Button({icon,onSubmit}: any){

  const handleClick = () => {

    onSubmit();
  };
    return( 
        <button
      className="relative flex items-center justify-center text-white hover:bg-sky-600 rounded-md p-2"
      onClick={handleClick}
    >
      {icon && <span className="">{icon}</span>}
      {/* El icono se renderizará aquí si se proporciona */}
      
    </button>
        )
}