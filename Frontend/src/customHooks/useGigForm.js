import { useState, useEffect } from 'react'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

export function useGigForm(initialValues, saveGig, navigate, loggedInUser, id, gigService, subcategories) {
    const [fields, setFields] = useState(initialValues)
    const [availableTags, setAvailableTags] = useState([])

    // Handles input changes
    function handleChange(e) {
        const { name, value } = e.target
        const updatedValue = name === 'price' ? Number(value) : value
        if (name === 'title' && value.length > 80) return
        if (name === 'description' && value.length > 1200) return
        setFields(prevFields => ({ ...prevFields, [name]: updatedValue }))
    }

    // Handles form submission
    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const gigToSave = (!id || id === 'edit') ?
                { ...fields, ownerId: loggedInUser._id } : fields

            await saveGig(gigToSave)
            navigate(`/user/${loggedInUser._id}`)

            showSuccessMsg(
                {
                    title: 'GIG SAVED',
                    body: `Gig saved successfully!`,
                },
                {
                    userMsgLeft: '55%',
                    messageAreaPadding: '2em 1.5em 2em 8em',
                    msgStatusTranslateX: '-12em',
                }
            )
        } catch (err) {
            showErrorMsg(
                {
                    title: 'FAILED TO SAVE',
                    body: `Please try again later.`,
                },
                {
                    userMsgLeft: '55%',
                    messageAreaPadding: '2em 1.5em 2em 8em',
                    msgStatusTranslateX: '-12em',
                }
            )
        }
    }

    // Update availableTags based on category
    function updateAvailableTags(selectedCategory) {
        const categoryKey = selectedCategory.replace(/\s+/g, '_').replace('&', 'And')
        setAvailableTags(subcategories[categoryKey] || [])
    }

    useEffect(() => {
        async function fetchGig() {
            if (id) {
                try {
                    const gig = await gigService.getById(id)
                    if (gig) setFields(gig)
                } catch (err) {
                    console.error('Failed to load gig:', err)
                }
            }
        }
        fetchGig()
    }, [id, gigService])

    useEffect(() => {
        updateAvailableTags(fields.category)
    }, [fields.category])

    return { fields, handleChange, handleSubmit, availableTags, updateAvailableTags, setFields }
}