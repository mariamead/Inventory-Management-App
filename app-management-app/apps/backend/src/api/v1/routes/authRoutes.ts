import { Router, Request, Response } from "express"
import { requireAuth } from "@clerk/express"
import prisma from "../../../../prisma/prismaClient"

const router = Router()

router.post("/getuserinfo", requireAuth(), async (req: Request, res: Response) => {
  const { clerkId, email, name } = req.body

  if (!clerkId || !email) {
    return res.status(400).json({ error: "clerkId and email are required" })
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { clerkId }
    })

    if (existingUser) {
      const updatedUser = await prisma.user.update({
        where: { clerkId },
        data: { email, name: name ?? existingUser.name }
      })
      return res.status(200).json(updatedUser)
    }

    const newUser = await prisma.user.create({
      data: { clerkId, email, name: name ?? null }
    })
    return res.status(201).json(newUser)

  } catch (error) {
    console.error("Error syncing user:", error)
    return res.status(500).json({ error: "Internal server error" })
  }
})

export default router