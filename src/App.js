 import ReactDataTable from './components/ReactDataTable';
 import sampleData from './components/sampleData';
import './App.css';


const COLUMNS=[
  {
    title: "First Name",
    field: "firstName"
  },
  {
    title: "Last Name",
    field: "lastName"
  },
  {
    title: "Martial Status",
    field: "status"
  },
  {
    title: "Date of Birth",
    field: "year"
  }
]
function App() {
   return (
   <ReactDataTable data={sampleData} columns={COLUMNS} />
  );
}

export default App;
