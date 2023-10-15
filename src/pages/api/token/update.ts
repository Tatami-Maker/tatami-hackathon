import { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../lib/dbConnect'
import Token from '../../../model/token'
import { PublicKey, Connection, clusterApiUrl, LAMPORTS_PER_SOL } from '@solana/web3.js'
import * as anchor from "@coral-xyz/anchor";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req
  
  await dbConnect()
  const connection = new Connection(clusterApiUrl("devnet"));

    if (method === "POST") {
        try {
            const lastToken = await Token.findOne({seq: parseInt(req.body.seq)});
            if (req.body.type === "pay") {
                try {
                    const payAddress = new PublicKey(lastToken.payaddress);
                    const balance = await connection.getBalance(payAddress, "confirmed");

                    if (balance/LAMPORTS_PER_SOL === 2) {
                        const updatedToken = await Token.findOneAndUpdate({seq: lastToken.seq}, {paid: true});
                        res.status(201).json({ success: true, data: updatedToken })
                    } else {
                        res.status(201).json({ success: true, data: lastToken })
                    }
                } catch (error) {
                    res.status(400).json({ success: false })
                }
            } else if (req.body.type === "token") {
                try {
                    const newActions = [...lastToken.actions];
                    newActions[0] = true;

                    const updatedToken = await Token.findOneAndUpdate({seq: lastToken.seq}, {
                        mint: req.body.mint,
                        actions: newActions
                    });

                    res.status(201).json({ success: true, data: updatedToken })
                } catch(error) {
                    res.status(400).json({ success: false })
                }
            }
        
        } catch(e) {
            res.status(400).json({ success: false })
        }
    }
}