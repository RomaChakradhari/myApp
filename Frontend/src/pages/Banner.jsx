
import Carousel from 'react-material-ui-carousel';
import "./pages.css";

const data = [
    "https://rukminim1.flixcart.com/flap/1680/280/image/1defb861e409319b.jpg?q=50",
    " https://rukminim1.flixcart.com/flap/1680/280/image/685712c6cefb3c02.jpg?q=50",
    "https://rukminim1.flixcart.com/flap/1680/280/image/8d4150cc4f3f967d.jpg?q=50",
    "https://rukminim1.flixcart.com/flap/1680/280/image/685712c6cefb3c02.jpg?q=50"
]

export default function Banner(){
     
    return(
        <Carousel className='carousel'
         
        autoPlay={true} 
        animation="slide"
        indicators={false}
        navButtonsAlwaysVisible={true}
        cycleNavigation={true}
         
        >
            {
                data.map((img, i)=>{
                    return(
                        <>
                            <img src={img} alt='img' className='bannerImg' key={i}/>
                        </>
                    )
                })
            }
        </Carousel>
    )
}