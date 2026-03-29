import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
  const { title, content, age } = await req.json()

  if (!title?.trim() || !content?.trim()) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  try {
    const story = await prisma.survivalStory.create({
      data: { title, content, age },
    })
    return NextResponse.json({ story })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const stories = await prisma.survivalStory.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json({ stories })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 })
  }
}