export const POST = async (req: Request): Promise<Response> => {
  const values = await req.json()
  const { secret, ...clearValues } = values
  if (secret === process.env.SECRET) {
    console.log("Received valid POST request:", clearValues)
  } else {
    console.log("Received invalid POST request:", values)
  }

  return Response.json({status: 200})
}
