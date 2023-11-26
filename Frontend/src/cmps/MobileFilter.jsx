import { useForm } from '../customHooks/useForm'
import { gigService } from '../services/gig.service'
import SvgIcon from './SvgIcon'
import {
  levels,
  deliveryTime,
  category,
  budget,
  subcategories,
} from '../services/gig.service'
import { RenderMobileRadioButtons } from './RenderMobileRadioButtons'
import { useEffect, useState } from 'react'

export function MobileFilter({
  filterBy,
  setMobileFilter,
  onMobileFilterState,
}) {
  const [tempFilterState, setTempFilterState] = useState(false)
  const [fields, setFields, handleChange] = useForm(
    filterBy || gigService.getDefaultFilter
  )

  useEffect(() => {
    setTempFilterState(checkFields())
  }, [fields])

  function checkFields() {
    return (
      fields.cat ||
      fields.tag ||
      fields.level ||
      fields.min ||
      fields.max ||
      fields.time
    )
  }

  function handleSubmit(event) {
    event.preventDefault()
    console.log('Form submitted with fields:', fields)
    if (checkFields()) setMobileFilter(fields)
    onMobileFilterState()
  }
  return (
    <main className="mobile-filter">
      <section className="mobile-filter-header">
        <div className="wrapper">
          <span onClick={() => onMobileFilterState()} className="exit-filter">
            <SvgIcon iconName={'remove'} />
          </span>
          <span>All filters</span>
        </div>
        {
          <span
            className={`clear ${tempFilterState ? 'on' : ''}`}
            onClick={() => setFields(gigService.getDefaultFilter)}
          >
            Clear all
          </span>
        }
      </section>
      <form onSubmit={handleSubmit}>
        <div className="form-wrapper">
          <h3>Category</h3>
          <RenderMobileRadioButtons
            options={category}
            groupName={'cat'}
            selectedOption={fields.cat}
            onOptionChange={handleChange}
          />
          {fields.tag !== undefined && fields.tag && (
            <>
              <h3>{fields.tag}</h3>
              <RenderMobileRadioButtons
                options={subcategories[fields.tag]}
                groupName={'tag'}
                selectedOption={fields.tag}
                onOptionChange={handleChange}
              />
            </>
          )}
          <h3>Level</h3>
          <RenderMobileRadioButtons
            options={levels}
            groupName="level"
            selectedOption={fields.level}
            onOptionChange={handleChange}
          />
          <h3>Delivery Time</h3>
          <RenderMobileRadioButtons
            options={deliveryTime}
            groupName="time"
            selectedOption={fields.time}
            onOptionChange={handleChange}
          />
          <h3>Budget</h3>
          <div className="budget-list">
            {budget.map((type) => (
              <div className="budget-input" key={type}>
                <label>{`${type.toUpperCase()}.`}</label>
                <input
                  type="number"
                  name={type}
                  className={type}
                  placeholder="Any"
                  min="1"
                  max="10000"
                  value={fields[type] || ''}
                  onChange={(e) => handleChange(e)}
                />
                <i className={type}>$</i>
              </div>
            ))}
          </div>
        </div>
        <div className="submit-wrapper">
          <button type="submit">Show Results</button>
        </div>
      </form>
    </main>
  )
}
