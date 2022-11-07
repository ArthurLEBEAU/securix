import DBConnexion from '../db/dbCon.js';
import { toFormat } from '../helpers/helper.js';

export default class Model{
    static db = new DBConnexion();
    table = this.name.toLowerCase() + "s"
    
    constructor() {
    }

    static async all(){
        const sql = `SELECT * FROM ${this.table || this.name.toLowerCase() + "s"}`
        return this.execute(sql);
    }

    static async  getById(id){

        return this.findByAttr('id', id);
    }

    static async findByAttr(attr, value, isPart = false){ 

        const sql = `SELECT * FROM ${this.table || this.name.toLowerCase() + "s"} where ${attr} ${ isPart ? 'LIKE \'%'+value+"%\'" : '= ' + value}`
        return this.execute(sql);
    }
    static save(data) {
        data.created_at = toFormat('YYYY-MM-DD HH:MM:SS')
        data.updated_at = data.created_at
        let dataToInsert = ""
        let keysToInsert = ""

        Object.keys(data).forEach((value) => keysToInsert += value+",")
        Object.keys(data).forEach((value) => dataToInsert += "'"+data[value]+"',")
        const sql = `insert into ${this.table || this.name.toLowerCase() + "s"} (${keysToInsert.slice(0, keysToInsert.length - 1)}) VALUES (${dataToInsert.slice(0, dataToInsert.length - 1)})`
        
        //console.log(sql);
        
        return this.execute(sql);
    }

    static update(id, data){
        data.updated_at = toFormat('YYYY-MM-DD HH:MM:SS')
        let dataToInsert = ""
        
        Object.keys(data).forEach((value) => dataToInsert += value +`='${data[value]}',`)
        dataToInsert = dataToInsert.slice(0, dataToInsert.length - 1)


        const sql = `update ${this.table || this.name.toLowerCase() + "s"} set ${dataToInsert} where id = ${id}`
        
        // console.log(sql);
        
        return this.execute(sql);

    }

    static delete(id){
        const sql = `DELETE FROM ${this.table || this.name.toLowerCase() + "s"} where id = ${id}`
        return this.execute(sql);
    }

    static async execute(sql){
        await this.db.createConnection();
        await this.db.getConnection();

        try {
            const data = await this.db.connection.query(sql);
            return data[0];
        } catch (error) {
            throw {
                code: error.code,
                message: error.sqlMessage,
            };
        }
    }
}