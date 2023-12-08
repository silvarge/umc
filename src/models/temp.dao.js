import { pool } from "../../config/db.connect";
import { readAllTestSql } from "./temp.sql.js";


export const getTest = async () => {
    try{
        const conn = await pool.getConnection();

        const [rows] = await pool.query(readAllTestSql);
        conn.release();
        return rows;
    }catch (err) {
        console.error(err);
    }
}