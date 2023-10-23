import React from 'react'
import SvgIcon from './SvgIcon'

export function Pagination({ currentPage, totalPages, onPageChange }) {
  function handlePageChange(newPage) {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage)
    }
  }

  function renderPageNumbers() {
    return Array.from({ length: totalPages }, (_, index) => (
      <li
        key={index + 1}
        onClick={() => handlePageChange(index + 1)}
        className={`page-number b ${currentPage === index + 1 ? 'active' : ''}`}
      >
        <span>{index + 1}</span>
      </li>
    ))
  }

  return (
    <ul className="pagination flex layout-row">
      {currentPage > 1 && (
        <li
          className="pagination-arrows b"
          onClick={() => handlePageChange(currentPage - 1)}
        >
          <SvgIcon iconName={'pageArrowLeft'} />
        </li>
      )}
      {renderPageNumbers()}
      {currentPage < totalPages && (
        <li
          className="pagination-arrows b"
          onClick={() => handlePageChange(currentPage + 1)}
        >
          <SvgIcon iconName={'pageArrowRight'} />
        </li>
      )}
    </ul>
  )
}
