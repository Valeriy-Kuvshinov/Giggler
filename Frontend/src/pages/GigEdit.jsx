import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { useForm } from '../customHooks/useForm.js'
import { saveGig } from '../store/gig.actions.js'
import { defaultImgUrls } from '../services/gallery.service.js'
import { deliveryTime, category, subcategories, gigService } from '../services/gig.service.js'

export function GigEdit() {
    const { id } = useParams()
    const [availableTags, setAvailableTags] = useState([])
    const navigate = useNavigate()
    const loggedInUser = useSelector(storeState => storeState.userModule.user)

    const [fields, setFields, handleChange] = useForm({
        title: '',
        category: category[0],
        tags: ['logo-design', 'artisitic', 'proffesional', 'accessible'],
        price: '',
        description: '',
        daysToMake: "Express 24H",
        ownerId: loggedInUser._id,
        imgUrls: defaultImgUrls,
        likedByUsers: [],
        reviews: [],
        createdAt: Date.now()
    })

    useEffect(() => {
        if (id && id !== 'edit') {
            async function fetchGig() {
                try {
                    const gig = await gigService.getById(id)
                    if (gig) setFields(gig)
                }
                catch (err) {
                    console.error('Failed to load gig:', err)
                }
            }
            fetchGig()
        }
    }, [id, setFields])

    useEffect(() => {
        updateAvailableTags(fields.category)
    }, [fields.category])

    const updateAvailableTags = (selectedCategory) => {
        const categoryKey = selectedCategory.replace(/\s+/g, '_').replace('&', 'And')
        setAvailableTags(subcategories[categoryKey] || [])
    }

    const handleCategoryChange = (e) => {
        handleChange(e)
        updateAvailableTags(e.target.value)
    }

    const handleTagsChange = (e) => {
        const selectedTags = Array.from(e.target.selectedOptions, option => option.value)
        setFields(prevFields => ({ ...prevFields, tags: selectedTags }))
    }

    async function onSave() {
        try {
            const gigToSave = (!id || id === 'edit') ?
                { ...fields, ownerId: loggedInUser._id } : fields

            await saveGig(gigToSave)
            navigate(`/user/${loggedInUser._id}`)
        }
        catch (err) {
            console.error('Failed to save gig:', err)
        }
    }

    function onCancel() {
        navigate(`/user/${loggedInUser._id}`)
    }

    return (
        <div className="gig-edit-container flex column">
            <form onSubmit={(e) => {
                e.preventDefault()
                onSave()
            }}>
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
                    <button type="button" onClick={onCancel}>Cancel</button>
                    <button type="submit">Save</button>
                </div>
            </form>
        </div>
    )
}