import Navbar from "./Navbar";
function Dashboard()
{
    let admin = sessionStorage.getItem("admin")
   return(<div className="">
    <Navbar/>
    <h1>Good morning {admin}</h1>
    <div className="flex">
    <section>
        <h2>Availability</h2>
    </section>
    <section>
        <h2>Reservation</h2>
        <div className="flex center">
            <h3>Arriving</h3>
            <h3>Departing</h3>
            <h3>In-House</h3>
        </div>
    </section>
    <section>
        <h2>Room Status</h2>
    </section>
    </div>
   </div>)
    
}

export default Dashboard;