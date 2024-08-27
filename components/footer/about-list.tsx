import Link from "next/link"
import React from "react"

export const AboutList: React.FC = () => {
  return (
    <>
    <ul>
      <li><Link className="hover:underline" href={'#'}>Giftcard</Link></li>
      <li><Link className="hover:underline" href={'#'}>About us</Link></li>
      <li><Link className="hover:underline" href={'#'}>Sustainability</Link></li>
      <li><Link className="hover:underline" href={'#'}>B2B</Link></li>
      <li><Link className="hover:underline" href={'#'}>Collaborations</Link></li>
      <li><Link className="hover:underline" href={'#'}>Press</Link></li>
      <li><Link className="hover:underline" href={'#'}>Job opportunities</Link></li>
    </ul>             
    </>
  )
}