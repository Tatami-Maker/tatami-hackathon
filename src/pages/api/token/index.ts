import { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../lib/dbConnect'
import Token from '../../../model/token'
import { PublicKey } from '@solana/web3.js'
import * as anchor from "@coral-xyz/anchor";

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
    updated.payaddress = PublicKey.findProgramAddressSync([
      new anchor.BN(updated.seq).toArrayLike(Buffer, "le", 8),
      Buffer.from("receipt-address")
    ], new PublicKey("BTy2uHY6iynWB9EJDVwasG9pxMf2mpEeMBLS9C8yu3UA"))[0].toBase58();

    updated.actions = [false, false, false, false];
    
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