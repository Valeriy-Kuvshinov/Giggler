import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { useGigForm } from '../customHooks/useGigForm.js'
import { saveGig } from '../store/gig.actions.js'
import { defaultImgUrls } from '../services/gallery.service.js'
import { deliveryTime, category, subcategories, gigService } from '../services/gig.service.js'

export function GigEdit() {
    const { id } = useParams()
    const navigate = useNavigate()
    const loggedInUser = useSelector(storeState => storeState.userModule.user)
    console.log(loggedInUser._id)

    const initialValues = {
        title: '',
        category: category[0],
        tags: ['Logo & Brand Identity', 'Visual Design', 'Art & Illustration'],
        price: 0,
        description: '',
        daysToMake: "Express 24H",
        ownerId: loggedInUser._id,
        imgUrls: defaultImgUrls,
        likedByUsers: [],
        reviews: [],
        createdAt: Date.now()
    }

    const { fields, handleChange, handleSubmit, availableTags,
        updateAvailableTags, setFields } = useGigForm(
            initialValues, saveGig, navigate, loggedInUser,
            id, gigService, subcategories)

    function handleCategoryChange(e) {
        handleChange(e)
        updateAvailableTags(e.target.value)
    }

    function handleTagsChange(e) {
        const selectedTags = Array.from(e.target.selectedOptions, option => option.value)
        setFields(prevFields => ({ ...prevFields, tags: selectedTags }))
    }

    return (
        <div className="gig-edit-container flex column">
            <form onSubmit={handleSubmit}>
                <div className="form-inputs flex column">
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
                                className="multi-select"
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
                <div className="actions flex row">
                    <button type="button" onClick={() => navigate(`/user/${loggedInUser._id}`)}>Cancel</button>
                    <button type="submit">Save</button>
                </div>
            </form>
        </div>
    )
}