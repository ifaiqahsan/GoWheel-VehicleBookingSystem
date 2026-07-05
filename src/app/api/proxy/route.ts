import { NextRequest, NextResponse } from "next/server";

const TARGET_BACKEND_URL = process.env.BACKEND_API_URL || "http://localhost:3000";

export async function catchAllProxy(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const endpoint = searchParams.get("endpoint");

    if (!endpoint) {
      return NextResponse.json(
        { error: "Missing 'endpoint' parameter in proxy request." },
        { status: 400 }
      );
    }

    const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
    
    const forwardParams = new URLSearchParams(searchParams);
    forwardParams.delete("endpoint");
    const dynamicQueryString = forwardParams.toString();
    
    const targetUrl = `${TARGET_BACKEND_URL}${cleanEndpoint}${dynamicQueryString ? `?${dynamicQueryString}` : ""}`;

    const headersToForward = new Headers();
    req.headers.forEach((value, key) => {
      if (!["host", "content-length", "connection"].includes(key.toLowerCase())) {
        headersToForward.append(key, value);
      }
    });

    if (req.body && !headersToForward.has("content-type")) {
      headersToForward.append("content-type", "application/json");
    }

    let requestBody: any = null;
    if (["POST", "PUT", "PATCH"].includes(req.method)) {
      requestBody = await req.text();
    }

    const response = await fetch(targetUrl, {
      method: req.method,
      headers: headersToForward,
      body: requestBody,
      cache: "no-store",
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: `Upstream service error: ${errorText || response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error: any) {
    console.error("Proxy Operational Error:", error);
    return NextResponse.json(
      { error: "Internal Server Proxy Failure", details: error.message },
      { status: 500 }
    );
  }
}

export { 
  catchAllProxy as GET, 
  catchAllProxy as POST, 
  catchAllProxy as PUT, 
  catchAllProxy as DELETE 
};