import { NextResponse } from "next/server";
import { db } from '@vercel/postgres';
import { NextApiRequest, NextApiResponse } from 'next';

//nombre por default
const db_name = 'mock_data';
 
export async function GET() {

  const client = await db.connect();

  try {
    const data = await client.query(`SELECT * FROM ${db_name}`);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.error(error, { status: 500 });
  }
}