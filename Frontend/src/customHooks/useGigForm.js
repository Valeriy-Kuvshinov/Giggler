import { useState, useEffect } from 'react'

export function useGigForm(initialValues, saveGig, navigate, loggedInUser, id, gigService, subcategories) {
    const [fields, setFields] = useState(initialValues)
    const [availableTags, setAvailableTags] = useState([])

    // Handles input changes
    function handleChange(e) {
        const { name, value } = e.target
        const updatedValue = name === 'price' ? Number(value) : value
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
        } catch (err) {
            console.error('Failed to save gig:', err)
        }
    }

    // Update availableTags based on category
    function updateAvailableTags(selectedCategory) {
        const categoryKey = selectedCategory.replace(/\s+/g, '_').replace('&', 'And')
        setAvailableTags(subcategories[categoryKey] || [])
    }

    useEffect(() => {
        async function fetchGig() {
            try {
                const gig = await gigService.getById(id)
                if (gig) setFields(gig)
            } catch (err) {
                console.error('Failed to load gig:', err)
            }
        }
        if (id && id !== 'edit') fetchGig()
    }, [id, gigService])

    useEffect(() => {
        updateAvailableTags(fields.category)
    }, [fields.category])

    return { fields, handleChange, handleSubmit, availableTags, updateAvailableTags, setFields }
}