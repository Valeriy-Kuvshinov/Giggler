import React from 'react'
import searchIconSvg from '../assets/img/svg/search.icon.svg'

export function SearchBar({ placeholder, searchQuery, onSearchChange, onSearchSubmit, visibility }) {
    return (
        <div className="search-bar flex" style={{ visibility: visibility }}>
            <input
                type="text"
                placeholder={placeholder}
                value={searchQuery}
                onChange={onSearchChange}
            />
            <button type="submit" onClick={onSearchSubmit}>
                <img src={searchIconSvg} alt="Search" />
            </button>
        </div>
    )
}