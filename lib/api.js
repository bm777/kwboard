import KwilDB from "kwildb";
import { pKey, 
        host, port, 
        database, 
        user, password, 
        secretPassword, 
        wallet} from "./constant";
import { con } from "./db";
var mysql      = require('mysql');


///////////////////////////////////KwilDB operations///////////////////////////////////////
export function createMoat(){
    

    const myMoat =  KwilDB.createMoat(
                            'https://test-db.kwil.xyz', 
                            'test777', 
                            secretPassword, 
                            wallet)
    const privateKey = myMoat.privateKey
    const secret = myMoat.secret

}

export function createConnector() {
    const kwilDB = KwilDB.createConnector({
        host: 'test-db.kwil.xyz',
        protocol: 'https',
        moat: 'test777',
        privateKey: pKey,
    }, secretPassword)

    return kwilDB
}

export async function createTable(kw, query){
    await kw.query(query, true)
}

export async function insert(kw, query, data){
    await kw.preparedStatement(query, data, true)
}

export async function select(kw, query, data){
    let result

    if(data.length == 0) {
        result = await kw.query(query, true)
    }else{
        result = await kw.query(query, data, true)
    }
    
    return result
}
export  function kwil_create_tables(cols) {
    var final = []
    if(cols == undefined) cols = []
    for(const [key, value] of Object.entries(cols)){

        var query = "CREATE TABLE "+key+"("
        query = query + value.join(" VARCHAR(20), ") + " VARCHAR(20) ) "
        final.push(query)
    }
    return final
}
export async function kwil_tables(query){
    // var res = await fetch("/api/kwil/migrate")
    // var json = res.json()
    // return json   
}

//////////////////////////////////////SQL DB operations////////////////////////////////////


export async function sql_tables(){
    var res = await fetch("/api/tables?db="+database)
    var json = res.json()
    return json   
}

export async function sql_columns(table_name){
    var res = await fetch("/api/columns?table="+table_name)
    var json = res.json()
    return json
}

export async function sql_table_data(table_name){
    var res = await fetch("/api/data?table="+table_name)
    var json = res.json()
    return json  
}
