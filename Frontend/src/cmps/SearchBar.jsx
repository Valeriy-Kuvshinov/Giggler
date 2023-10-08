import React from 'react'
import searchIconSvg from '../assets/img/svg/search.icon.svg'

export function SearchBar({ placeholder, searchQuery, onSearchChange, onSearchSubmit }) {
    return (
        <div className="search-bar flex">
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