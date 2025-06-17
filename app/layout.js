'use client';

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Provider from "./Provider";
import HeaderNavBar from "../components/HeaderNavBar";
import { UserLocationContext } from '../context/UserLocationContext'
import { SelectedRestaurantContext } from '../context/SelectedRestaurantContext'
import { Archivo } from 'next/font/google'
import { useEffect, useState } from 'react'

const archivo = Archivo({ subsets: ['latin'], weight: '500' })

export default function RootLayout({ children }) {

  const [userLocation, setUserLocation] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState([]);

  useEffect(() => {
    getUserLocation();
  }, [])
  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(function (pos) {
      setUserLocation({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude
      })
    })
  }
  return (
    <html lang="en">
      <body className={archivo.className} >
        <Provider>
          <SelectedRestaurantContext.Provider value={{ selectedRestaurant, setSelectedRestaurant }}>
            <UserLocationContext.Provider value={{ userLocation, setUserLocation }}>
              <HeaderNavBar />
              {children}
            </UserLocationContext.Provider>
          </SelectedRestaurantContext.Provider>
        </Provider>
      </body>
    </html>
  );
}
