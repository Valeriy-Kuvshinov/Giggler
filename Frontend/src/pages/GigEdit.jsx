import React, { useState } from 'react'
import { galleryService } from "../services/gallery.service.js"

export function GigEdit() {
    const { categoryTexts } = galleryService
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState(categoryTexts[0])
    const [days, setDays] = useState(1)
    const [price, setPrice] = useState('')

    function onSave() {
        console.log({ title, description, category, days, price })
    }

    function onCancel() {
        // Handle cancel logic here
        // For instance, you can reset the state or navigate to another page
    }

    return (
        <div className="gig-edit-container">
            <form onSubmit={(e) => e.preventDefault()}>
                <input
                    type="text"
                    placeholder="I will..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    placeholder="Using hard work, dedication and time, I shall provide you the finest service or product there is"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    {categoryTexts.map((cat, idx) => (
                        <option key={idx} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>
                <input
                    type="number"
                    min={0}
                    max={7}
                    value={days}
                    onChange={(e) => setDays(+e.target.value)}
                    placeholder="Number of days"
                />
                <input
                    type="number"
                    min={0}
                    max={1000}
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(+e.target.value)}
                />
                <div className="actions">
                    <button onClick={onSave}>Save</button>
                    <button onClick={onCancel}>Cancel</button>
                </div>
            </form>
        </div>
    )
}