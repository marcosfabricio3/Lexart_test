import { sql } from "@vercel/postgres";

export default async function handler(request, response) {
  try {
    const { rows } = await sql`SELECT * from users`;
    const result = {
      "test":"test",
      "rows": rows
    } 
    response.status(200).json({
      body: result
    });
  } catch (error) {
    console.log(error)
  }
}