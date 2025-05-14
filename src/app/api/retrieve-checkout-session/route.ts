import { authenticateUser } from "@/lib/actions/auth";
import { stripe } from "@/lib/stripe";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const user = await authenticateUser();
    if (!user) return;

    // const sessionId = request.nextUrl.searchParams.get("session_id");
    // const session = await stripe.checkout.sessions.retrieve(sessionId);

    // return Response.json({ status:session.status });
  } catch (error) {
    console.error(error);
  }
}
