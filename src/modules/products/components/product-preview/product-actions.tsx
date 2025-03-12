"use client"

import React from "react"

type ProductActionsProps = {
  productId: string
  hasStock?: boolean
}

export default function ProductActions({ productId, hasStock = false }: ProductActionsProps) {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault()
    // Favorilere ekleme işlemi burada yapılabilir
    console.log("Favorilere eklendi:", productId)
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    // Sepete ekleme işlemi burada yapılabilir
    console.log("Sepete eklendi:", productId)
  }

  return (
    <>
      <button 
        className="absolute top-3 left-3 bg-white hover:bg-gray-50 p-2 rounded-full transition-all duration-200 shadow-md"
        aria-label="Favorilere ekle"
        onClick={handleFavoriteClick}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700 hover:text-red-500 transition-colors">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
      </button>
      
      {hasStock && (
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:translate-y-0 translate-y-2">
          <button 
            className="bg-blue-600 text-white hover:bg-blue-700 rounded-full p-3 shadow-lg transition-colors"
            aria-label="Sepete ekle"
            onClick={handleAddToCart}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
          </button>
        </div>
      )}
    </>
  )
} 