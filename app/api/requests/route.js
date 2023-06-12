import { Configuration, OpenAIApi } from "openai";
import { NextResponse } from "next/server";
import { db } from "@vercel/postgres";

const openai_api_key = process.env.OPENAI_API_KEY;

const configuration = new Configuration({           
  apiKey: openai_api_key,
});

if (!configuration.apiKey)
  throw new Error("No valid OPENAI_API_KEY");     

const openai = new OpenAIApi(configuration);


export async function POST(request) {  
  const body = await request.json();      //body: {prompt: string}
  const client = await db.connect();
  try {
    
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `### Postgres SQL, table: mock_data
#
# row example: {"id":1,"first_name":"Sharity","last_name":"Gulvin","email":"sgulvin0@baidu.com","gender":"Female","car_brand":"Toyota","car_model":"Land Cruiser","car_year":2008,"price":87697}
#
### ${body.prompt}
SELECT *`,
      temperature: 0,
      max_tokens: 150,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });

    const sql_prompt = await response.data.choices[0].text;
    const {rows} = await client.query(`SELECT * ${sql_prompt}`);

    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.error(error, { status: 500 });
  } finally {
    client.release();
  }
}

export async function PUT(request) {
  return new Response('Hello, Next.js!')
}

