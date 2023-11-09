import { NextRequest, NextResponse } from "next/server";
//use zod for data validation
import prisma from "@/prisma/client";

export async function GET(request:NextRequest,context:any) {
    const {params} = context
    console.log("params--get---",params)
    // https://www.prisma.io/docs/concepts/components/prisma-client/crud
    const issue = await prisma.issue.findUnique({
        where: {
          id: parseInt(params.id),
        },
      })
    return NextResponse.json(issue, { status: 200 })
}


