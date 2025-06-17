import { MarkerF, OverlayView } from '@react-google-maps/api'
import React, { useContext } from 'react'
import BusinessItem from './Restaurant'
import { SelectedRestaurantContext } from '../../context/SelectedRestaurantContext'

function Markers({ business }) {
    const {selectedRestaurant, setSelectedRestaurant} = useContext(SelectedRestaurantContext)
  return (
    <>
      <MarkerF
        position={business.geometry.location}
        onClick={()=>setSelectedRestaurant(business)}
        icon={{
          url: '/restaurant.png',
          scaledSize: {
            width: 40,
            height: 40
          }
        }}
      />
    {selectedRestaurant.reference==business.reference?
      <OverlayView
        position={business.geometry.location}
        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
      >
        <div
          style={{
            position: 'absolute',
            transform: 'translate(-50%, -115%)',
            zIndex: 9999,
          }}
        >
          <BusinessItem business={business} isMapPopup showDir={true} />
        </div>
      </OverlayView>: null}
    </>
  )
}

export default Markers
