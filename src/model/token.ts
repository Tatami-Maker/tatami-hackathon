import mongoose from 'mongoose'

export interface Tokens extends mongoose.Document {
  name: string
  symbol: string
  seq: number
  creator: string
  paid: boolean
  addresses: string[]
  members: string[]
  supply: number
}

const TokenSchema = new mongoose.Schema<Tokens>({
  name: {
    type: String,
    required: [true, 'Please provide a name for this token.'],
    maxlength: [60, 'Name cannot be more than 60 characters'],
  },
  symbol: {
    type: String,
    required: [true, 'Please provide a name for this token.'],
    maxlength: [5, 'Name cannot be more than 5 characters'],
  },
  seq: {
    type: Number,
    required: [true, 'sequence is required'],
  },
  creator: {
    type: String,
    required: [true, 'Please provide creator for this token.'],
  },
  paid: {
    type: Boolean,
    required: [true, 'paid field is required'],
  },
  members: {
    type: [String]
  },
  addresses: {
    type: [String]
  },
  supply: {
    type: Number
  }
})

export default mongoose.models.Token || mongoose.model<Tokens>('Token', TokenSchema)