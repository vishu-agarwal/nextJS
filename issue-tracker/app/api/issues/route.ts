import { NextRequest, NextResponse } from "next/server";
//use zod for data validation
import prisma from "@/prisma/client";
import { createIssueSchema } from "../../validationSchema";

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

export async function GET(request: NextRequest) {
    // https://www.prisma.io/docs/concepts/components/prisma-client/crud
    const getAllIssue = await prisma.issue.findMany()

    return NextResponse.json(getAllIssue, { status: 200 })
}

// export async function GET(req) {
//     const { searchParams } = new URL(req.url);
//     console.log(searchParams.get("search"));
//     return NextResponse.json({ msg: "Hello World" });
//   }

// export async function GETBYID(request: NextRequest) {
//     const {
//         query: { id },
//         method,
//       } = request;
//     // https://www.prisma.io/docs/concepts/components/prisma-client/crud
//     const getAllIssue = await prisma.issue.findMany()

//     return NextResponse.json(getAllIssue, { status: 200 })
// }

export async function PUT(request: NextRequest) {
    const body = await request.json()
    const validation = createIssueSchema.safeParse(body)
    if (!validation.success)
        return NextResponse.json(validation.error.format(), { status: 400 })
    const updateIssue = await prisma.issue.update({
        where: {
            id: parseInt(body.id),
        },
        data: { title: body.title, description: body.description }
    })

    return NextResponse.json(updateIssue, { status: 200 })
}


export async function DELETE(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const id:any = searchParams.get("id")
    // https://www.prisma.io/docs/concepts/components/prisma-client/crud
    const issue = await prisma.issue.delete({
        where: {
          id: parseInt(id),
        },
      })
    return NextResponse.json(issue, { status: 200 })
  }
  