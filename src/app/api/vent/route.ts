import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const responses = [
  "What you're carrying right now is real — and it makes complete sense that you feel this way. Heartbreak is grief, and grief doesn't follow a timeline. You don't have to be okay yet.",
  "Thank you for trusting this space with something so heavy. The pain you're feeling is valid. You're not too sensitive, you're not weak — you're human, and this is genuinely hard.",
  "The fact that you put words to this matters. Even when everything feels impossible, something in you chose to reach out — and that's a quiet kind of strength most people don't see in themselves.",
  "There's no right way to move through this. Some days will be worse than yesterday, and that's not failure — that's just how healing actually works. You're still here, and that's enough.",
  "What you had mattered. The length of time doesn't measure the love, and it doesn't measure the loss either. It's okay to mourn something that was real to you.",
  "You don't have to have it figured out. You don't have to feel better by tomorrow. Right now, just existing through this is more than enough.",
  "The loneliness of this kind of pain is one of the hardest parts — feeling like no one quite understands. But you're not alone in this, even when it feels that way.",
]

function getResponse(content: string, mood: string): string {
  const text = (content + mood).toLowerCase()
  if (text.includes('suicid') || text.includes('end my life') || text.includes('kill myself')) {
    return "What you're feeling right now sounds incredibly painful, and I want you to know you don't have to face this alone. Please reach out to iCall at 9152987821 — they're real people who genuinely care and are there for exactly this moment."
  }
  if (text.includes('angry') || text.includes('anger') || text.includes('hate')) {
    return "That anger makes complete sense. Sometimes rage is the only honest response to being hurt by someone you trusted. You don't have to soften it or explain it away."
  }
  if (text.includes('numb') || text.includes('feel nothing') || text.includes('empty')) {
    return "Numbness is its own kind of pain — sometimes the heart goes quiet when it's had too much. You don't have to force yourself to feel anything right now. This too is part of it."
  }
  if (text.includes('lonely') || text.includes('alone') || text.includes('no one')) {
    return "That loneliness is one of the heaviest parts of all this. Even surrounded by people, grief can feel like a room only you can enter. You're not invisible here — this space sees you."
  }
  return responses[Math.floor(Math.random() * responses.length)]
}

export async function POST(req: NextRequest) {
  const { content, mood } = await req.json()

  if (!content?.trim()) {
    return NextResponse.json({ error: 'No content' }, { status: 400 })
  }

  try {
    const vent = await prisma.vent.create({
      data: { content, mood },
    })

    const reply = getResponse(content, mood || '')

    await prisma.reply.create({
      data: { content: reply, isAI: true, ventId: vent.id },
    })

    return NextResponse.json({ reply })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { reply: "I'm here with you. What you're feeling is valid and real." },
      { status: 200 }
    )
  }
}