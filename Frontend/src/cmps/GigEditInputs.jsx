export function GigEditInputs({ fields, handleChange, handleCategoryChange, handleTagsChange, category, availableTags, deliveryTime }) {
    return (
        <div className='form-inputs flex column'>
            <div className="input-group flex row">
                <div className="info flex column">
                    <label htmlFor="title">Gig Title</label>
                    <p>As your gig storefront, your title is the most important place to include keywords that buyers would likely use to search for a service like yours.</p>
                </div>
                <input
                    id="title"
                    type="text"
                    name="title"
                    placeholder="I will..."
                    value={fields.title}
                    onChange={handleChange}
                />
            </div>

            <div className="input-group flex row">
                <div className="info flex column">
                    <label htmlFor="description">Description</label>
                    <p>Describe Your gig, what you are offering, and who is the right customer for it.</p>
                </div>
                <textarea
                    id="description"
                    name="description"
                    placeholder="Description here..."
                    value={fields.description}
                    onChange={handleChange}
                ></textarea>
            </div>

            <div className="input-group flex row">
                <div className="info flex column">
                    <label htmlFor="category">Category</label>
                    <p>Choose the category most suitable for your gig, with which thousands of users will be able to find it.</p>
                    <select
                        id="category"
                        name="category"
                        style={{ flex: '0' }}
                        value={fields.category}
                        onChange={handleCategoryChange}
                    >
                        {category.map((cat, idx) => (
                            <option key={idx} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="info flex column">
                    <label htmlFor="tags">Subcategories</label>
                    <p>Select the most relevant subcategories for your gig (we recommend at least 3).</p>
                    <select
                        id="tags"
                        name="tags"
                        className='multi-select'
                        multiple
                        value={fields.tags}
                        onChange={handleTagsChange}
                    >
                        {availableTags.map((tag, idx) => (
                            <option key={idx} value={tag}>
                                {tag}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="input-group flex row">
                <div className="info flex column">
                    <label htmlFor="days">Delivery Time</label>
                    <p>Days it will take you on average to finish this gig.</p>
                    <select
                        id="days"
                        name="daysToMake"
                        style={{ flex: '0' }}
                        value={fields.daysToMake}
                        onChange={handleChange}
                    >
                        {deliveryTime.map((time, idx) => (
                            <option key={idx} value={time}>
                                {time}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="info flex column">
                    <label htmlFor="price">Price</label>
                    <p style={{ flex: '2' }}>Define a price, that you believe the users are willing to pay for your gig.</p>
                    <input
                        id="price"
                        type="number"
                        name="price"
                        min={0}
                        max={10000}
                        style={{ flex: '0', border: '1px solid gray', appearance: 'textfield' }}
                        placeholder='Price'
                        value={fields.price}
                        onChange={handleChange}
                    />
                </div>
            </div>
        </div>
    )
}