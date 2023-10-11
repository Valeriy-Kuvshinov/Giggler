export function MenuFilterContent({ renderedChoice, setMenuFilter }) {
  const deliveryTime = ['Express 24H', 'Up to 3 days', 'Up to 7 days']
  const levels = ['Level 1', 'Level 2', 'Level 3', 'Pro Talent']
  const categories = [
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
  const categoriesAndTags = {
    graphicsAndDesign: [
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
    programmingAndTech: [
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
    digital_Marketing: [
      'Search Marketing',
      'Social Marketing',
      'Methods & Techniques',
      'Analytics & Strategy',
      'Industry & Purpose-Specific',
    ],
    videoAndAnimation: [
      'Editing & Post-Production',
      'Social & Marketing Videos',
      'Animation',
      'Filmed Video Production',
      'Explainer Videos',
      'Product Videos',
      'AI Video',
    ],
    writingAndTranslation: [
      'Content Writing',
      'Editing & Critique',
      'Business & Marketing Copy',
      'Translation & Transcription',
    ],
    musicAndAudio: [
      'Music Production & Writing',
      'Audio Engineering & Post Production',
      'Voice Over & Narration',
      'Streaming & Audio',
      'DJing',
      'Sound Design',
      'Lessons & Transcriptions',
    ],
    business: [
      'Business Formation',
      'Business Growth',
      'General & Administrative',
      'Legal Services',
      'Sales & Customer Care',
      'Professional Development',
      'Accounting & Finance',
    ],
    data: [
      'Data Science & ML',
      'Data Analysis',
      'Data Collection',
      'Data Management',
    ],
    photography: [
      'Products & Lifestyle',
      'People & Scenes',
      'Local Photography',
    ],
    aIServices: [
      'Build your AI app',
      'Refine AI with experts',
      'AI Artists',
      'Creative services',
      'Data Science & ML',
      'Get your data right',
    ],
  }

  return (
    <>
      {renderedChoice && (
        <section className="menu-content">
          {(() => {
            switch (renderedChoice) {
              case 'delivery_time':
                return (
                  <div className="content-scroll">
                    <div className="radio-list">
                      {deliveryTime.map((time) => {
                        <div className="radio-item-wrapper">
                            <label className="radio-item">
                                <input type="radio" name={renderedChoice} value={time} />
                                <span></span>
                            </label>
                        </div>
                      })}
                    </div>
                  </div>
                )
              default:
                return <p>{`This is default in switch in MenuFilterContent with renderChoice: ${renderedChoice}`}</p>
            }
          })()}
        </section>
      )}
    </>
  )
}
