import { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../lib/dbConnect'
import Token from '../../../model/token'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req
  
  await dbConnect()

  try {
    const lastToken = await Token.findOne().sort('-_id');
    const updated = req.body;

    if (lastToken) {
      updated.seq = lastToken.seq + 1;
    } else {
      updated.seq = 1;
    }

    updated.paid = false;

    if (method === "POST") {
      try {
          const token = await Token.create(
            updated
          )
          res.status(201).json({ success: true, data: token })
        } catch (error) {
          res.status(400).json({ success: false })
        }
    }
  } catch(e) {
    res.status(400).json({ success: false })
  }
}