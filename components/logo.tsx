import Link from "next/link"

export const Logo: React.FC = () => {
  return (
    <Link href="/" className="flex">
      <div className="uppercase font-bold md:text-xl lg:ml-4 lg:text-3xl">Dracaena</div>
      <div className="transform rotate-[-90deg] text-sm lg:font-bold lg:text-base">.com</div>
    </Link>
  )
}