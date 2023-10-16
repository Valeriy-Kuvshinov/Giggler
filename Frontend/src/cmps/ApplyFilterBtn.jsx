export function ApplyFilterBtn({setMenuFilter,selectedOption}) {
  return (
    <div className="apply-row">
      <button
        onClick={(e) => setMenuFilter(e, selectedOption)}
        className="apply bg-co-black co-white"
      >
        Apply
      </button>
    </div>
  )
}
