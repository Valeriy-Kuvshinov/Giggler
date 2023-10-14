export function ApplyBtn(setMenuFilter) {
  return (
    <div className="apply-row">
      <button
        onSubmit={(e) => setMenuFilter(e)}
        className="apply bg-co-black co-white"
      >
        Apply
      </button>
    </div>
  )
}
