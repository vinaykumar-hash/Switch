import React from "react"
import ClothCard from "./ClothCard"

function ClothsSideMenu() {
  return (
    <div className="flex flex-wrap gap-4 justify-center p-4 h-96 overflow-y-scroll scrollbar-hide">
      <ClothCard />
      <ClothCard />
      <ClothCard />
      <ClothCard />
      <ClothCard />
      <ClothCard />
      <ClothCard />
      <ClothCard />
    </div>
  )
}

export default ClothsSideMenu
