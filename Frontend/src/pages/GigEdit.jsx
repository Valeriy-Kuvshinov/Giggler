import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { useGigForm } from '../customHooks/useGigForm.js'
import { saveGig } from '../store/gig.actions.js'
import { defaultImgUrls } from '../services/gallery.service.js'
import { deliveryTime, category, subcategories, gigService } from '../services/gig.service.js'

import { GigEditPreview } from '../cmps/GigEditPreview.jsx'
import { ImgUploader } from '../cmps/ImgUploader.jsx'
import SvgIcon from '../cmps/SvgIcon.jsx'

export function GigEdit() {
    const navigate = useNavigate()
    const { id } = useParams()
    const loggedInUser = useSelector(storeState => storeState.userModule.user)

    useEffect(() => {
        if (!id || id === 'edit') return
        else if (!loggedInUser || id.length !== 24) {
            navigate('/explore')
            return
        } else {
            async function checkGigOwner() {
                try {
                    const editedGig = await gigService.getById(id)
                    if (editedGig && editedGig.ownerId !== loggedInUser._id) {
                        navigate('/explore')
                        return
                    }
                } catch (err) {
                    console.error('Failed to load gig:', err)
                }
            }
            checkGigOwner()
        }
    }, [id, navigate, loggedInUser])

    const initialValues = {
        title: '',
        category: category[0],
        tags: ['Logo & Brand Identity', 'Visual Design', 'Art & Illustration'],
        price: 0,
        description: '',
        daysToMake: "Express 24H",
        ownerId: loggedInUser?._id,
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

    function handleImageUpload(newImgUrl, index) {
        const updatedImgUrls = [...fields.imgUrls]
        updatedImgUrls[index] = newImgUrl
        setFields({ ...fields, imgUrls: updatedImgUrls })
    }

    return (
        <main className="gig-edit-container flex full">
            <section className="gig-edit flex layout-row">
                <form className="flex column" onSubmit={handleSubmit}>
                    <div className="actions flex row">
                        <button type="button" className="flex row"
                            onClick={() => navigate(`/user/${loggedInUser._id}`)}>
                            <SvgIcon iconName={'arrowDown'} />
                            Cancel
                        </button>
                        <button type="submit" className="flex row">
                            Save
                            <SvgIcon iconName={'checkmarkBlackIcon'} />
                        </button>
                    </div>

                    <div className="form-inputs flex column">
                        <div className="input-group grid">
                            <div className="info flex column">
                                <label htmlFor="title">Gig Title</label>
                                <p>As your gig storefront, your title is the most important place to include keywords that buyers would likely use to search for a service like yours.</p>
                                <input
                                    id="title"
                                    type="text"
                                    name="title"
                                    placeholder="I will..."
                                    value={fields.title}
                                    onChange={handleChange}
                                    maxLength={80}
                                />
                                <p className="character-counter">{fields.title.length} / 80</p>
                            </div>
                        </div>

                        <div className="input-group grid">
                            <div className="info flex column">
                                <label htmlFor="description">Description</label>
                                <p>Provide a detailed description of your gig, highlighting what you offer and the ideal customer for your services. To enhance the buyer experience, it's important to be as informative and transparent as possible in your description.</p>
                                <textarea
                                    id="description"
                                    name="description"
                                    placeholder="Description here..."
                                    value={fields.description}
                                    onChange={handleChange}
                                    maxLength={1200}
                                ></textarea>
                                <p className="character-counter">{fields.description.length} / 1200</p>
                            </div>
                        </div>

                        <div className="input-group grid">
                            <div className="info flex column">
                                <label htmlFor="category">Category</label>
                                <p>Choose the category most suitable for your gig, with which thousands of users will be able to find it.</p>
                                <select
                                    id="category"
                                    name="category"
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
                                <p>Precision is key, select the most relevant subcategories for your gig (we recommend picking 3 at least).</p>
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

                        <div className="input-group grid">
                            <div className="info flex column">
                                <label htmlFor="days">Delivery Time</label>
                                <p>Days it will take you on average to finish this gig.</p>
                                <select
                                    id="days"
                                    name="daysToMake"
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
                                <p>Define a price, that you believe the gig is worth the effort.</p>
                                <input
                                    id="price"
                                    type="number"
                                    name="price"
                                    min={0}
                                    max={10000}
                                    placeholder='Price'
                                    value={fields.price}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="input-group grid">
                            <div className="info grid">
                                <p>Show the world the quality of your gig, by uploading images that explain your service the best. By default, we provide you with 5 images to use. Select one of the slots below to change a certain image of a gig:</p>
                                {fields.imgUrls.map((url, index) => (
                                    <ImgUploader
                                        key={index}
                                        index={index}
                                        defaultImgUrl={url}
                                        onUploaded={handleImageUpload}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </form>
                <GigEditPreview gig={fields} loggedInUser={loggedInUser} />
            </section>
        </main>
    )
}