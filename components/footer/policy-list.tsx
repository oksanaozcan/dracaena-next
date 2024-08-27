import Link from "next/link"

export const PolicyList = () => {
  return (
    <div className="flex text-base gap-2 justify-between items-center">         
      <Link className="flex my-4 items-center gap-1 underline mb-2" href={'#'}>Terms & conditions</Link>
      <Link className="flex my-4 items-center gap-1 underline mb-2" href={'#'}>Privacy</Link>
      <Link className="flex my-4 items-center gap-1 underline mb-2" href={'#'}>Cookies</Link>
  </div>     
  )
}