export function RenderRadioButtons({ options, groupName, selectedOption, onOptionChange }) {
    return (
        <div className="radio-list">
            {options.map((option) => (
                <div className="radio-item-wrapper" key={option}>
                    <label
                     
                        className={`radio-item ${selectedOption === option ? 'selected' : ''}`}
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