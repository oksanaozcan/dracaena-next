"use client";

import axios from "axios";
import React, { useEffect, useContext } from "react";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import Button from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import { CartContext } from "@/context/cart";
import { loadStripe, Stripe } from "@stripe/stripe-js";

interface SummaryProps {
  totalPrice: number
}

const Summary: React.FC<SummaryProps> = ({
  totalPrice
}) => {

  const stripePromise: Promise<Stripe | null> = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");

  const { cartItems } = useContext(CartContext) ?? {}; 

  const searchParams = useSearchParams();  

  useEffect(() => {
    if (searchParams.get("success")) {
      toast.success("Payment completed");     
    }
    if (searchParams.get("canceled")) {
      toast.error("Something went wrong");
    }
  }, [searchParams]);  

  const onCheckout = async () => {

    const stripe = await stripePromise;
    if (!stripe) {
      toast.error("Stripe initialization failed");
      return;
    }
    
    const checkoutSession = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, 
    {
      // clientId: userId,
      // productIds: cartItems?.map(item => item.id),
      // payment_platform: 1
    },
    {
      // headers: {
      //   "Content-Type": "application/x-www-form-urlencoded",
      //   "Authorization": `Bearer ${await getToken()}`,       
      // }
    });    

    if (checkoutSession.status === 200) {
        window.location.replace(checkoutSession.data.url);
    }  
  }

  return (
    <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
      <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-900">
            Order total
          </div>
          <Currency value={totalPrice}/>
        </div>
      </div>
      <Button onClick={onCheckout} className="w-full mt-6" disabled={!cartItems?.length}>
        Checkout
      </Button>
    </div>
  )
}

export default Summary;