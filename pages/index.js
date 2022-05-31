import { createConnector, 
          createTable,
          insert,
          kwil_create_tables,
          kwil_data,
          kwil_tables,
          sql_columns, 
          sql_tables,
          sql_table_data,
        } from "../lib/api"
import { useState } from "react"

export default function Home() {

  //////////////////////STATES/////////////////////
  const [datax, setDatax] = useState([])
  const [tables, setTables] = useState([])
  const [columns, setColumns] = useState([])
  const [db, setDb] = useState("")
  // const [db, setDb] = useState("")
  /////////////////////////////////////////////////

  //createMoat()

  const kwil = createConnector()

  // create table planes
  let qu = "DROP TABLE reservations"
  // createTable(kwil, qu)

  let qInsert ="INSERT INTO employe(name) VALUES ($1)"
  // const data = ["Moussa"]
  // insert(kwil, qInsert, data)

  let qSelect = "SELECT * FROM employe"
  // let res = select(kwil, qSelect, []).then(data => {
  // })

  //////////////////////// HANDLERS & FUNCTIONS ////////////////////
  const handleTable = () => {
    sql_tables().then(res => {
      var tabs = []
      for(let tab of res.tables){
          tabs.push(tab.TABLE_NAME)
          getColumn(tab.TABLE_NAME)
      }
      setTables(tabs)
    })     
  }

  const handleKwil = () => {
    var queries = kwil_create_tables(columns)
    for(let query of queries){
      // createTable(kwil, query)
    }

    for(let tab of tables){
      sql_table_data(tab).then(response => {
        // console.log(response.data)
        
        for(let obj of response.data){
          var q = "INSERT INTO "+ tab +"("
          var vv = "VALUES("
          var values = [] //"VALUES("
          let i = 1
          for(const [k, v] of Object.entries(obj)){
            // console.log(k, v)
            q = q + k.toLowerCase()+","
            vv = vv +"$"+ i +","
            values.push(v)
            i =i+1
          }

          q = q.slice(0,-1) + ") "
          vv = vv.slice(0,-1) + ")"
          q = q + vv
          console.log(q, values)
          insert(kwil, q, values) 
        }
      })
      setTimeout(() => {}, 2000);
    }
    
  }

   const getColumn = (table_name) => {
    const res = sql_columns(table_name).then(res => {
      var cols = []
      for(let col of res.columns){
          cols.push(col.COLUMN_NAME)
      }
      var tmp = columns
      tmp[table_name] = cols

      setColumns(tmp)
    })
  }
  ////////////////////////////////////////////////////////////////////

  return (
    <div >
        {/* {
          tables.map((table, idx) => {
            return (<p key={idx}>{table}</p>)
          })
        } */}
        {
          columns.map((col, idx) => {
            return (<p key={idx}>{col}</p>)
          })
        }
        <input className="px-3 py-2 bg-slate-50 border border-green-600 text-white rounded"></input>
       <button className="px-3 py-2 bg-slate-500 text-white rounded" onClick={handleTable}>CREATE TABLE</button>
       <button className="px-3 py-2 bg-green-500 text-white rounded" onClick={handleKwil}>CREATE KwilDB table</button>
    </div>
  )
}
