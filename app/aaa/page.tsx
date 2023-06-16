import { ColumnDef } from "@tanstack/react-table";
import { db } from "@vercel/postgres";
//import data from "@/lib/MOCK_DATA.json"
import IndexPage, {PageProps} from "@/components/new_page";


export default async function PageWrapper(){
    const client = await db.connect();

    const {rows} = await client.query(`SELECT * FROM mock_data`);

    client.release();

    type ColumnsType = typeof rows[0] extends undefined | null ? {} : typeof rows[0];

    const columns: ColumnDef<ColumnsType>[] = (rows[0] ? Object.keys(rows[0]) : []).map((key) => {
      const capitalizedKey = key.replace(/_/g, " ").replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase());
      return {
        accessorKey: key,
        header: capitalizedKey,
      };
    });

    return (
        <IndexPage data={rows} columns={columns}/>
    )
}



