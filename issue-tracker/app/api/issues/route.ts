import { NextRequest, NextResponse } from "next/server";
//use zod for data validation
import { z } from 'zod'
import prisma from "@/prisma/client";

const createIssueSchema = z.object({
    // title: z.string().min(1).max(255),
    title: z.string().min(1, 'Title is required!').max(255),
    description: z.string().min(1),
})
export async function POST(request: NextRequest) {
    const body = await request.json()
    const validation = createIssueSchema.safeParse(body)
    if (!validation.success)
        return NextResponse.json(validation.error.format(), { status: 400 })
    // return NextResponse.json(validation.error.errors, { status: 400 })

    // next js prisma client :https://www.prisma.io/docs/guides/other/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices
    const newIssue = await prisma.issue.create({
        data: { title: body.title, description: body.description }
    })

    return NextResponse.json(newIssue, { status: 201 })
}