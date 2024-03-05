"use server";

import type { Stripe } from "stripe";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { stripe } from "~/lib/stripe";
// Set your amount limits: Use float for decimal currencies and
// Integer for zero-decimal currencies: https://stripe.com/docs/currencies#zero-decimal.
const CURRENCY = "inr";



export async function createCheckoutSession(data: FormData): Promise<void> {
  const checkoutSession: Stripe.Checkout.Session =
    await stripe.checkout.sessions.create({
      mode: "payment",
      submit_type: "pay",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: CURRENCY,
            product_data: {
              images: [data.get("image") as string],
              name: data.get("name") as string,
            },
            unit_amount: parseInt(data.get("price") as string) * 100,
          },
        },
      ],
      success_url: `${headers().get(
        "origin"
      )}/result?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${headers().get("origin")}/productView/${
        data.get("slug") as string
      }`,
    });

  redirect(checkoutSession.url!);
}

// export async function createPaymentIntent(
//   data: FormData,
// ): Promise<{ client_secret: string }> {
//   const paymentIntent: Stripe.PaymentIntent =
//     await stripe.paymentIntents.create({
//       amount: formatAmountForStripe(
//         Number(data.get("customDonation") as string),
//         CURRENCY,
//       ),
//       automatic_payment_methods: { enabled: true },
//       currency: CURRENCY,
//     });

//   return { client_secret: paymentIntent.client_secret!};
// }
