import {AiOutlineArrowRight,AiOutlineArrowLeft,AiOutlineArrowUp,AiOutlineArrowDown} from 'react-icons/ai';
import {useState} from "react"

export default function ReactDataTable({data , columns }){
const [rowsPerPage,setRowPerPage]=useState(5)
const [currentPage, setCurrentPage]=useState(1)

// sorting
const [sortColumn, setSortColumn]=useState("")
const [sortOrder, setSortOrder]=useState("asc")

const [searchTerm, setSearchTerm]=useState("")
let results=data
//filtering
if(searchTerm!==""){
results=results.filter(dataRow=>{
    return Object.values(dataRow).some( value => value.toString().toLowerCase().includes(searchTerm.toString().toLowerCase()))
})
}
//todo: sorting data
if(sortColumn !==""){
    results=results.sort((firstRow ,otherRow) =>{
        return firstRow[sortColumn].toString().localeCompare(otherRow[sortColumn].toString())
        })
if(sortOrder==="desc"){
    results=results.reverse()
}

} 
    //todo :pagination
const startPoint=(currentPage-1)*rowsPerPage
const endPoint=currentPage * rowsPerPage
const totalPage=Math.ceil(results.length/rowsPerPage)
results=results.slice(startPoint, endPoint)
    return  <div className="CPDataTable">
        <input type="text" className="Search-bar form-control"    placeholder='Type of Search' onKeyUp={(e)=>{
setSearchTerm(e.target.value)
        }}/>
    <table class="table table-dark table-striped">
 <thead>
   <tr class="success">
     {
        columns.map( column =>
             <th key={`column${column.field}`}>
             <div class="text"  onClick={()=>{
               if(sortColumn===column.field)
               {
                if(sortOrder==="asc"){
                setSortOrder("desc")
                }
                else{
                    setSortOrder("desc")
                }
               }else{
                setSortColumn(column.field)
                setSortOrder("asc")
               }
             }}>
                {column.title}
                {
                    sortColumn===column.field ?
                    sortOrder==="asc" ? <AiOutlineArrowDown/>:<AiOutlineArrowUp/> 
                    : null
                }
                </div>
             </th>
             )
     }
   </tr>
 </thead>
  
    <tbody>
        {
            results.map((dataRow, index) =>(
                <tr key={`data${index}`}>
                    {columns.map( column => <td>{dataRow[column.field]}</td>)}
                </tr>
            ))
        }
    </tbody>
 
</table>
<footer>
    <select onClick={(e)=>{
        setRowPerPage(e.target.value)
       
    }}>
 {Array(45).fill(0).map( (_, n)=>(<option value={n+5}>{n+5}</option>))}
    </select>
        <div className="pagination">
        <button 
        onClick={()=>{
            if(currentPage >1){
                setCurrentPage(currentPage-1)
            }
          setCurrentPage(currentPage-1) 
        }}
        ><AiOutlineArrowLeft/></button>
 <button 
 onClick={()=>{
    if(currentPage< totalPage){
        setCurrentPage(currentPage+1)
    }
 }} 
  ><AiOutlineArrowRight/></button>
        </div>
 
</footer>
 </div>
}