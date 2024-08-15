import Link from "next/link"
import React from "react"

export const ShopList: React.FC = () => {
  return (
    <>
    <ul className="list-none">
      <li><Link className="hover:underline" href={'/new-releases'}>All products</Link></li>
      <li><Link className="hover:underline" href={'/category/1'}>All houseplant</Link></li>                       
    </ul>
    <h5 className="font-bold text-xl py-2">My account</h5>
    <ul className="list-none">               
      <li><Link className="hover:underline" href={'/auth/login'}>Log in</Link></li>
    </ul>
    </>
  )
}