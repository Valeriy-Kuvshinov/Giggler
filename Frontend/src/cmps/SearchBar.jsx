
import { useModal } from '../customHooks/ModalContext'
import SvgIcon from './SvgIcon'

export function SearchBar({ placeholder, searchQuery, onSearchChange, onSearchSubmit
  , visibility, controlDimming = true }) {
  const { setIsDimmed } = useModal()

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      setIsDimmed(false)
      onSearchSubmit(e)
    }
  }
  const handleSubmit = (e) => {
    setIsDimmed(false)
    onSearchSubmit(e)
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
        <button type="submit" onClick={handleSubmit} className="flex">
          <SvgIcon iconName={'search'}/>
        </button>
      </div>
    </>
  )
}