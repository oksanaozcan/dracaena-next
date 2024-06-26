"use client";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useAuth } from "@/context/auth-contex";

export const PersonalDetailsCard = () => {
  const {customer, shippingAddress, billingAddress} = useAuth();
  return (
    <>
     <h1 className="text-center">Personal details</h1>
      <p>This is your personal detail page, here you can see an overview of your personal information.</p>     
      <div className="flex justify-between py-4">
        <div className="flex flex-col space-y-4">
          <h2>Basics</h2>
          <div>
            <h4>Name:</h4>
            <p>{customer.name}</p>
          </div>
          <div>
            <h4>Email:</h4>
           <p>{customer.email}</p>
          </div>
          <div>
            <h4>Birthdate:</h4>
            <p>{customer.birthday ? customer.birthday : '---' }</p>
          </div>
          <div>
            <h4>Newsletter</h4>
            <p>{customer.newsletter_confirmed === 0 ? "No" : "Yes"}</p>
          </div>
          <div>
            <Link href="/dashboard/my-details/update-details" className="flex items-center">Update personal details&nbsp;<ChevronRight size={14} /></Link>
          </div>
        </div>
        <div>
          <h2>Addresses</h2>
          <div className="py-2">
            <h4>Shipping address: </h4>
            {
              shippingAddress.address_line !== '' ? (
                <div className="border p-2 rounded">
                  <p>Address: {shippingAddress.address_line}</p>
                  <p>City: {shippingAddress.city}</p>
                  <p>State: {shippingAddress.state}</p>
                  <p>Postal code: {shippingAddress.postal_code}</p>
                  <p>Country: {shippingAddress.country}</p>
                </div>
              ) :
              (
                <p className="py-1">No address configured</p>
              )                
            }
            
            <Link href="/dashboard/my-details/update-shipping" className="flex items-center my-2">{
               shippingAddress.address_line !== '' ? (
                <span>Change&nbsp;</span>
              ) : (
                <span>Add&nbsp;</span>
              )

            } shipping address&nbsp;<ChevronRight size={14} /></Link>
          </div>
          <div className="py-2">
            <h4>Billing address: </h4>
            {
              billingAddress.address_line !== '' ? (
                <div className="border p-2 rounded">
                  <p>Address: {billingAddress.address_line}</p>
                  <p>City: {billingAddress.city}</p>
                  <p>State: {billingAddress.state}</p>
                  <p>Postal code: {billingAddress.postal_code}</p>
                  <p>Country: {billingAddress.country}</p>
                </div>
              ) :
              (
                <p className="py-1">No address configured</p>
              )                
            }            
            <Link href="/dashboard/my-details/update-billing" className="flex items-center my-2">{
               billingAddress.address_line !== '' ? (
                <span>Change&nbsp;</span>
              ) : (
                <span>Add&nbsp;</span>
              )

            } billing address&nbsp;<ChevronRight size={14} /></Link>
          </div>
        </div>
      </div>
    </>
  );
}