import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js'
import React from 'react'

const CheckOutForm = () => {

    const stripe: any = useStripe()
    const elements = useElements()

    const handleSubmit = async (event: any) => {
        event.preventefault()
        if (elements == null) {
            return
        }
        const { error: submitError } = await elements.submit()
        if (submitError) {
            return
        }

        const res = await fetch('/api/create-intent', {
            method: 'POST',
            body: JSON.stringify({
                amount: 50
            })
        })
        const newSectretKey = await res.json()
        console.log("res---result---", newSectretKey)

        const { error } = await stripe.confirmPayment({
            clientSecret: newSectretKey,
            elements,
            confirmParams: {
                returnUrl: 'http://localhost:3000/'
            }
        })
    }


    return (
        <div className='flex flex-col justify-center items-center w-full mt-5 '>
            <form onSubmit={handleSubmit} className='max-w-md' >
                <PaymentElement />
                <button className='w-full bg-[#fff900] p-2 mt-2 rounded-lg' type="submit" disabled={!stripe || !elements} >
                    Pay
                </button>
            </form>
        </div>
    )
}

export default CheckOutForm
