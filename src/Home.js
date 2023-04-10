import Hotel from "./Components/hotel";
import Navbar from "./Components/Navbar";
import HomeCarousel from "./Components/Carousel";
function Home(){

    return(<>
        <Navbar/>
        <HomeCarousel/>
        <Hotel/>
    </>)
}

export default Home;