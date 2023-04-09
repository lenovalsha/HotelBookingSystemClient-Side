function Dashboard()
{
    let admin = sessionStorage.getItem("admin")
   return(<div>
    <h1>Good morning {admin}</h1>
   </div>)
    
}

export default Dashboard;