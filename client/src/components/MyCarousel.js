import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import {Carousel} from 'react-responsive-carousel'

const MyCarousel = (props) => {
   return (
       <div>
           <Carousel>
               {props.images.map((img)=> {
                  return (
                  <div>
                     <img src={img.url} />
                  </div>
                  )
               })}
            </Carousel>
       </div>
   )
}

export default MyCarousel