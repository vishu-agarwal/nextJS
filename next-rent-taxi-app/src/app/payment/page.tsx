'use client'

import { CarAmountDataContext } from '@/context/CarAmountContext'
import React, { useContext } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import CheckOutForm from '@/components/Payment/CheckOutForm'

const Payment = () => {

  // const { amount, setAmount } = useContext(CarAmountDataContext)
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_P_KEY as any);

  const option: any = {
    mode: 'payment',
    amount: 90,
    currency: 'usd'
  };

  return (
    <Elements stripe={stripePromise} options={option} >
      <CheckOutForm />
    </Elements>
  )
}

export default Payment
