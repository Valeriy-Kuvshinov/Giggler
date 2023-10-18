import React from 'react'
import searchIconSvg from '../assets/img/svg/search.icon.svg'

export function SearchBar({
  placeholder,
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  visibility,
}) {
  const handleKeyPress = (e) => {
    console.log('e.key: ')
    if (e.key === 'Enter') {
      onSearchSubmit(e)
    }
  }

  return (
    <div className="search-bar flex" style={{ visibility: visibility }}>
      <input
        type="text"
        placeholder={placeholder}
        value={searchQuery}
        onChange={onSearchChange}
        onKeyPress={handleKeyPress}
      />
      <button type="submit" onClick={onSearchSubmit}>
        <img src={searchIconSvg} alt="Search" />
      </button>
    </div>
  )
}
