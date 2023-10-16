import { useState } from 'react'
import { ApplyBtn } from './ApplyBtn'

export function MenuFilterContent({ renderedChoice, setMenuFilter }) {
  const [selectedOption, setSelectedOption] = useState('')
  const [selectedFilter, setSelectedFilter] = useState({
    min: '',
    max: '',
  })
  const deliveryTime = ['Express 24H', 'Up to 3 days', 'Up to 7 days']
  const levels = ['Level 1', 'Level 2', 'Level 3', 'Pro Talent']
  const category = [
    'Graphics & Design',
    'Programming & Tech',
    'Digital Marketing',
    'Video & Animation',
    'Writing & Translation',
    'Music & Audio',
    'Business',
    'Data',
    'Photography',
    'AI Services',
  ]
  const budget = ['min', 'max']
  const categoriesAndTags = {
    Graphics_And_Design: [
      'Logo & Brand Identity',
      'Art & Illustration',
      'Web & App Design',
      'Product & Gaming',
      'Print Design',
      'Visual Design',
      'Marketing Design',
      'Packaging & Covers',
      'Architecture & Building Design',
      'Fashion & Merchandise',
      '3D Design',
    ],
    Programming_And_Tech: [
      'Website Development',
      'Website Platforms',
      'Website Maintenance',
      'Software Development',
      'Software Developers',
      'QA & Review',
      'Mobile App Development',
      'Game Development',
      'Support & Cybersecurity',
      'AI Development',
      'Chatbots',
    ],
    Digital_Marketing: [
      'Search Marketing',
      'Social Marketing',
      'Methods & Techniques',
      'Analytics & Strategy',
      'Industry & Purpose-Specific',
    ],
    Video_And_Animation: [
      'Editing & Post-Production',
      'Social & Marketing Videos',
      'Animation',
      'Filmed Video Production',
      'Explainer Videos',
      'Product Videos',
      'AI Video',
    ],
    Writing_And_Translation: [
      'Content Writing',
      'Editing & Critique',
      'Business & Marketing Copy',
      'Translation & Transcription',
    ],
    Music_And_Audio: [
      'Music Production & Writing',
      'Audio Engineering & Post Production',
      'Voice Over & Narration',
      'Streaming & Audio',
      'DJing',
      'Sound Design',
      'Lessons & Transcriptions',
    ],
    Business: [
      'Business Formation',
      'Business Growth',
      'General & Administrative',
      'Legal Services',
      'Sales & Customer Care',
      'Professional Development',
      'Accounting & Finance',
    ],
    Data: [
      'Data Science & ML',
      'Data Analysis',
      'Data Collection',
      'Data Management',
    ],
    Photography: [
      'Products & Lifestyle',
      'People & Scenes',
      'Local Photography',
    ],
    AI_Services: [
      'Build your AI app',
      'Refine AI with experts',
      'AI Artists',
      'Creative services',
      'Data Science & ML',
      'Get your data right',
    ],
  }

  function onHandleChange(event) {
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
                    <div className="apply-row">
                      <button
                        onClick={(e) => setMenuFilter(e, selectedOption)}
                        className="apply bg-co-black co-white"
                      >
                        Apply
                      </button>
                    </div>
                  </>
                )
              case 'budget':
                console.log('I AM IN Budget')
                return (
                  <form onSubmit={(event) => setMenuFilter( event, selectedFilter)}>
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
                              onChange={onHandleChange}
                            />
                            <i>$</i>
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
                    <div className="apply-row">
                      <button
                        onClick={(e) => setMenuFilter(e, selectedOption)}
                        className="apply bg-co-black co-white"
                      >
                        Apply
                      </button>
                    </div>
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
                    <div className="apply-row">
                      <button
                        onClick={(e) => setMenuFilter(e, selectedOption)}
                        className="apply bg-co-black co-white"
                      >
                        Apply
                      </button>
                    </div>
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
                console.log('I AM IN SubCategory')
                const subCategory = renderedChoice.replace(' ', '_')
                console.log(`subCategory ${subCategory}`)
                return (
                  <>
                    <div className="content-scroll">
                      <div className="radio-list">
                        {categoriesAndTags[subCategory].map((category) => (
                          <div className="radio-item-wrapper" key={category}>
                            <label className="radio-item">
                              <span className="radio-btn"></span>
                              <input
                                type="radio"
                                name={renderedChoice}
                                value={category}
                              />
                              <span>{category}</span>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="apply-row">
                      <button
                        onClick={(e) => setMenuFilter(e, selectedOption)}
                        className="apply bg-co-black co-white"
                      >
                        Apply
                      </button>
                    </div>
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
            className={`radio-item ${
              selectedOption === option ? 'selected' : ''
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
