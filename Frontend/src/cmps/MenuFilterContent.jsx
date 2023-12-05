import { useRef, useState } from 'react'

import { ApplyFilterBtn } from './ApplyFilterBtn.jsx'
import { RenderRadioButtons } from './RenderRadioButtons.jsx'
import outsideClick from '../customHooks/outsideClick.js'

import {
  levels,
  deliveryTime,
  category,
  budget,
  subcategories,
} from '../services/gig.service.js'

export function MenuFilterContent({
  renderedChoice,
  setMenuFilter,
  setIsRenderedChoice,
}) {
  const [selectedOption, setSelectedOption] = useState('')
  const [selectedFilter, setSelectedFilter] = useState({
    min: '',
    max: '',
  })
  const filterRef = useRef(null)

  outsideClick(filterRef, () => {
    setIsRenderedChoice(false, '')
  })

  function onHandleBudgetChange(event) {
    if (!event.target.value) return
    switch (event.target.name) {
      case 'min':
        setSelectedFilter({ ...selectedFilter, min: event.target.value })
        break
      case 'max':
        setSelectedFilter({ ...selectedFilter, max: event.target.value })
        break
    }
  }
  return (
    <>
      {renderedChoice && (
        <section className="menu-filter-content" ref={filterRef}>
          {(() => {
            switch (renderedChoice) {
              case 'delivery_time':
                return (
                  <>
                    <div className="content-scroll">
                      <RenderRadioButtons
                        options={deliveryTime}
                        groupName="delivery_time"
                        selectedOption={selectedOption}
                        onOptionChange={setSelectedOption}
                      />
                    </div>
                    <ApplyFilterBtn
                      setMenuFilter={setMenuFilter}
                      selectedOption={selectedOption}
                    />
                  </>
                )
              case 'budget':
                return (
                  <form
                    onSubmit={(event) => {
                      event.preventDefault()
                      setMenuFilter(event, selectedFilter)
                    }}
                  >
                    <div className="content-scroll">
                      <div className="budget-filter">
                        {budget.map((type) => (
                          <div className="input-wrapper" key={type}>
                            <label>{`${type.toUpperCase()}.`}</label>
                            <input
                              type="number"
                              name={type}
                              className={type}
                              placeholder="Any"
                              min="0"
                              max="10000"
                              value={selectedFilter[type]}
                              onChange={onHandleBudgetChange}
                            />
                            <i className={type}>$</i>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="apply-row">
                      <button className="apply bg-co-black co-white">
                        Apply
                      </button>
                    </div>
                  </form>
                )
              case 'seller_level':
                return (
                  <>
                    <div className="content-scroll">
                      <RenderRadioButtons
                        options={levels}
                        groupName="seller_level"
                        selectedOption={selectedOption}
                        onOptionChange={setSelectedOption}
                      />
                    </div>
                    <ApplyFilterBtn
                      setMenuFilter={setMenuFilter}
                      selectedOption={selectedOption}
                    />
                  </>
                )
              case 'category':
                return (
                  <>
                    <div className="content-scroll">
                      <RenderRadioButtons
                        options={category}
                        groupName="category"
                        selectedOption={selectedOption}
                        onOptionChange={setSelectedOption}
                      />
                    </div>
                    <ApplyFilterBtn
                      setMenuFilter={setMenuFilter}
                      selectedOption={selectedOption}
                    />
                  </>
                )
              case 'Graphics & Design':
              case 'Programming & Tech':
              case 'Digital Marketing':
              case 'Video & Animation':
              case 'Writing & Translation':
              case 'Music & Audio':
              case 'Business':
              case 'Data':
              case 'Photography':
              case 'AI Services':
                const subcategory = renderedChoice
                  .replace('&', 'And')
                  .split(' ')
                  .join('_')
                return (
                  <>
                    <div className="content-scroll">
                      <RenderRadioButtons
                        options={subcategories[subcategory]}
                        groupName={renderedChoice}
                        selectedOption={selectedOption}
                        onOptionChange={setSelectedOption}
                      />
                    </div>
                    <ApplyFilterBtn
                      setMenuFilter={setMenuFilter}
                      selectedOption={selectedOption}
                    />
                  </>
                )
              default:
                return (
                  <p>{`This is default in switch in MenuFilterContent with renderChoice: ${renderedChoice}`}</p>
                )
            }
          })()}
        </section>
      )}
    </>
  )
}
