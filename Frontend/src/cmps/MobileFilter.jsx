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

export function MobileFilter({ filterBy, onMobileFilter }) {
  const [fields, setFields, handleChange] = useForm(
    gigService.getDefaultFilter()
  )

  function handleSubmit(event) {
    event.preventDefault()
    // Perform actions with form data, e.g., send it to a server
    console.log('Form submitted with fields:', fields)
  }
  return (
    <main className="mobile-filter">
      <section className="mobile-filter-header">
        <div className="wrapper">
          <span onClick={() => onMobileFilter()} className="exit-filter">
            <SvgIcon iconName={'remove'} />
          </span>
          <span>All filters</span>
        </div>
        <span className="clear">Clear all</span>
      </section>
      {/* <section className="filter-form"> */}
      <form onSubmit={handleSubmit}>
        <div className="form-wrapper">
          <h3>Category</h3>
          <RenderMobileRadioButtons
            options={category}
            groupName="category"
            selectedOption={fields.cat}
            onOptionChange={handleChange}
          />
          {filterBy.tag && (
            <>
              <h3>{filterBy.tag}</h3>
              <RenderMobileRadioButtons
                options={subcategories[filterBy.tag]}
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
                  min="0"
                  max="10000"
                  value={filterBy[type]}
                  onChange={(e) => handleChange(e)}
                />
                <i className={type}>$</i>
              </div>
            ))}
          </div>
        </div>
        <button>Submit</button>
      </form>
      {/* </section> */}
    </main>
  )
}
