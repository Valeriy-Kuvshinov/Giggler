import searchIconSvg from '../assets/img/svg/search.icon.svg'
import { useModal } from '../customHooks/ModalContext'

export function SearchBar({ placeholder, searchQuery, onSearchChange, onSearchSubmit
  , visibility, controlDimming = true }) {
  const { setIsDimmed } = useModal()

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearchSubmit(e)
    }
  }

  return (
    <>
      <div className="search-bar flex" style={{ visibility: visibility }}>
        <input
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={onSearchChange}
          onKeyPress={handleKeyPress}
          onFocus={() => controlDimming && setIsDimmed(true)}
          onBlur={() => controlDimming && setIsDimmed(false)}
        />
        <button type="submit" onClick={onSearchSubmit}>
          <img src={searchIconSvg} alt="Search" />
        </button>
      </div>
    </>
  )
}