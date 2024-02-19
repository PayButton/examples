import crypto from 'crypto'

interface Signature {
  payload: string
  signature: string
}

const verifySignature = (pubKey: string, signature: Signature) => {
  const pubKeyBuffer = Buffer.from(pubKey, 'hex')
  const publicKey = crypto.createPublicKey({ key: pubKeyBuffer, format: 'der', type: 'spki' });
  return crypto.verify(
    null,
    Buffer.from(signature.payload),
    publicKey,
    Buffer.from(signature.signature, 'hex')
  )
}

export const POST = async (req: Request): Promise<Response> => {
  const values = await req.json()
  const signature = values.signature
  const publicKey = process.env.PUBLIC_KEY
  if (publicKey === undefined) {
    throw new Error("Missing PUBLIC_KEY environment variable.")
  }
  if (signature === undefined) {
    throw new Error("Missing <signature> variable on POST request body.")
  }
  if (verifySignature(publicKey, values.signature)) {
    console.log("Received VALID POST request:", values)
  } else {
    console.log("Received INVALID POST request:", values)
  }

  return Response.json({status: 200})
}
