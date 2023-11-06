import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_S_KEY!, {
    typescript: true,
    apiVersion: "2023-10-16"
})

export async function POST(req: any) {
    const data = await req.jon()
    const amt = data.amount

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Number(amt),
            currency: 'USD'
        })
        return NextResponse.json(paymentIntent.client_secret, { status: 200 })

    } catch (error) {
        console.log("error---", error)
    }
}