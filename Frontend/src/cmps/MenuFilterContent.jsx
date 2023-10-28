import { useState } from 'react'
import { ApplyFilterBtn } from './ApplyFilterBtn.jsx'
import { levels, deliveryTime, category, budget, subcategories } from '../services/gig.service.js'

export function MenuFilterContent({ renderedChoice, setMenuFilter }) {
  const [selectedOption, setSelectedOption] = useState('')
  const [selectedFilter, setSelectedFilter] = useState({
    min: '',
    max: '',
  })
  const time = [1, 3, 7]

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
        <section className="menu-filter-content">
          {(() => {
            switch (renderedChoice) {
              case 'delivery_time':
                console.log('I AM IN DELIVERY TIME')
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
                console.log('I AM IN Budget')
                return (
                  <form onSubmit={(event) => setMenuFilter(event, selectedFilter)}>
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
                console.log('I AM IN Seller Level')
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
                console.log('I AM IN Category')
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
                const subcategory = renderedChoice.replace('&', 'And').split(' ').join('_')
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

function RenderRadioButtons({
  options,
  groupName,
  selectedOption,
  onOptionChange,
}) {
  return (
    <div className="radio-list">
      {options.map((option) => (
        <div className="radio-item-wrapper" key={option}>
          <label
            className={`radio-item ${selectedOption === option ? 'selected' : ''
              }`}
          >
            <input
              type="radio"
              name={groupName}
              value={option}
              checked={selectedOption === option}
              onChange={() => onOptionChange(option)}
            />
            <span className="radio-btn"></span>
            <span>{option}</span>
          </label>
        </div>
      ))}
    </div>
  )
}