import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { useForm } from '../customHooks/useForm.js'
import { saveGig } from '../store/gig.actions.js'
import { defaultImgUrls } from '../services/gallery.service.js'
import { deliveryTime, category, subcategories, gigService } from '../services/gig.service.js'

import { GigEditInputs } from '../cmps/GigEditInputs.jsx'

export function GigEdit() {
    const { id } = useParams()
    const [availableTags, setAvailableTags] = useState([])
    const navigate = useNavigate()
    const user = useSelector(storeState => storeState.userModule.user)

    const [fields, setFields, handleChange] = useForm({
        title: '',
        category: category[0],
        tags: ['logo-design', 'artisitic', 'proffesional', 'accessible'],
        price: '',
        description: '',
        daysToMake: "Express 24H",
        ownerId: user._id,
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
            const gigToSave = (!id || id === 'edit') ? { ...fields, ownerId: user._id } : fields

            await saveGig(gigToSave)
            navigate(`/user/${user._id}`)
        }
        catch (err) {
            console.error('Failed to save gig:', err)
        }
    }

    function onCancel() {
        navigate(`/user/${user._id}`)
    }

    return (
        <div className="gig-edit-container flex column">
            <form onSubmit={(e) => {
                e.preventDefault()
                onSave()
            }}>
                <GigEditInputs
                    fields={fields}
                    handleChange={handleChange}
                    handleCategoryChange={handleCategoryChange}
                    handleTagsChange={handleTagsChange}
                    category={category}
                    availableTags={availableTags}
                    deliveryTime={deliveryTime}
                />
                <div className="actions flex row">
                    <button type="button" onClick={onCancel}>Cancel</button>
                    <button type="submit">Save</button>
                </div>
            </form>
        </div>
    )
}