import Link from "next/link"
import React from "react"

export const CustomerServiceList: React.FC = () => {
  return (
    <>
    <ul>
      <li><Link className="hover:underline" href={'#'}>Frequently asked questions</Link></li>
      <li><Link className="hover:underline" href={'#'}>Contact</Link></li>
      <li><Link className="hover:underline" href={'#'}>Payments</Link></li>
      <li><Link className="hover:underline" href={'#'}>Transport & delivery</Link></li>
      <li><Link className="hover:underline" href={'#'}>Guarantee</Link></li>
      <li><Link className="hover:underline" href={'#'}>Return policy</Link></li>
    </ul>     
    </>
  )
}