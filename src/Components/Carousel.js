import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Navbar from "../Guest/Navbar";
export default function HomeCarousel() {
  const images = [
    { id: "1", image: "../images/image1.jpg" },
    { id: "2", image: "../images/image2.jpg" },
    { id: "3", image: "../images/image3.jpg" },
  ];
  return (
    <div className="main-image">
    
      <Carousel autoPlay={true} infiniteLoop showArrows={false}  showThumbs={false} >
        {images.map((e) => (
          <div className="vignette">

          <img key={e.id} src={e.image}  onError={() => console.log(`Error loading image ${e.id}`)} style={{ height: "500px", objectFit: "cover" }} />
          </div>
        ))}
      </Carousel>
    </div>
  );
}
