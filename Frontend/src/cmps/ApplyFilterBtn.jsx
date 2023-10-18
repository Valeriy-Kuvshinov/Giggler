export function ApplyFilterBtn({setMenuFilter,selectedOption}) {
  return (
    <div className="apply-row">
      <button
        onClick={(event) => setMenuFilter(event, selectedOption)}
        className="apply bg-co-black co-white"
      >
        Apply
      </button>
    </div>
  )
}
