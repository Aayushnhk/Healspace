import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const vents = await prisma.vent.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
    })
    return NextResponse.json({ vents })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ vents: [] })
  }
}