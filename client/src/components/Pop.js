import React from 'react'
import {Popup} from 'react-mapbox-gl'
import '../styles/Pop.css'

const Pop = (props) => {

   const tagString = (tags) => {
      let tmp = ''
      tags.forEach((e, i) =>
         i === 0 ? (tmp += e.name) : (tmp += ` - ${e.name}`)
      )
      return tmp
   }

   return (
       <div >
           {props.publicView ? (
                  <Popup
                  coordinates={[props.showMem.location.long, props.showMem.location.lat]}
                  >
                     <div className="pop">
                        <h3>{`${props.showMem.user.name}'s Memory!`}</h3>
                        <h4>{props.showMem.name}</h4>
                        <p>{props.showMem.description}</p>
                        <p>{tagString(props.showMem.tags)}</p>
                     </div>
                  </Popup>
               ) : (
                     <Popup coordinates={props.popupLoc}>
                        <div>
                           <div>Do you want to create a new Memory?</div>
                           <button onClick={props.createMemory}>Yes!</button>
                        </div>
                     </Popup>
                  )}
       </div>
   )
}

export default Pop