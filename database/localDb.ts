import { ElectricDatabase, electrify } from "electric-sql/wa-sqlite";
import { schema } from "./generated/client";

const config = {
  url: process.env.ELECTRIC_SERVICE_URL,
};
const conn = await ElectricDatabase.init("my.db");
const electric = await electrify(conn, schema, config);
