import { NextResponse } from "next/server";

/**
 * Lightweight liveness probe used by the Docker HEALTHCHECK and load balancers.
 * Returns immediately with no DB/API dependency — just confirms the Node process
 * is alive and the Next.js runtime is responding.
 */
export async function GET() {
  return NextResponse.json({ status: "ok" }, { status: 200 });
}
