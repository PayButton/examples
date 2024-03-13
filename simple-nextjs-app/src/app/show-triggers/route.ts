import crypto from 'crypto'

interface Signature {
  payload: string
  signature: string
}

/**
 * Verifies if the given signature for a payload was indeed generated with the private key corresponding to the provided public key.
 * This function is essential for validating the authenticity of POST requests originating from paybutton.org, ensuring that the data
 * is sent by the expected user. The user's private key is utilized to sign POST requests configured in their paybutton.org account.
 * The corresponding public key, accessible on the user's "Account" page, is required here for verification purposes.
 * 
 * @param pubKey The public key in hexadecimal string format, associated with the user's paybutton.org account.
 * @param signature The signature object containing the payload and its cryptographic signature.
 * @returns A boolean indicating whether the signature is valid (true) or not (false).
 */
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

/**
 * Handler for POST requests. This function asynchronously processes incoming POST requests from paybutton.org,
 * verifying the authenticity of each request by checking the signature against the public key stored in the
 * environment variable. It ensures that the POST request contains the necessary signature data and that the
 * public key is available for verification.
 * 
 * @param req The incoming request object.
 * @returns A Promise that resolves to a Response object indicating the result of the operation.
 * @throws Error if the PUBLIC_KEY environment variable is missing or if the signature is not present in the request body.
 */
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
