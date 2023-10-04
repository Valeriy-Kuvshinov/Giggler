import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { galleryService } from "../services/gallery.service.js"
import { useForm } from '../customHooks/useForm.js'

export function GigEdit() {
    const { categoryTexts } = galleryService
    const navigate = useNavigate()

    const [fields, , handleChange] = useForm({
        title: '',
        description: '',
        category: categoryTexts[0],
        days: 1,
        price: '',
        imgs: [
            'https://img.freepik.com/premium-vector/cute-robot-mascot-logo-cartoon-character-illustration_8169-227.jpg',
            'https://img.freepik.com/premium-vector/cute-robot-logo-vector-design-template_612390-492.jpg',
            'https://img.freepik.com/free-vector/hand-drawn-data-logo-template_23-2149203374.jpg?size=626&ext=jpg&ga=GA1.1.1028445320.1691753202&semt=ais',
            'https://img.freepik.com/free-vector/cute-bot-say-users-hello-chatbot-greets-online-consultation_80328-195.jpg?size=626&ext=jpg&ga=GA1.1.1028445320.1691753202&semt=ais',
            'https://img.freepik.com/free-vector/cute-robot-holding-clipboard-cartoon-vector-icon-illustration-science-technology-icon-isolated_138676-5184.jpg?size=626&ext=jpg&ga=GA1.1.1028445320.1691753202&semt=ais',
        ]
    })

    function onSave() {
        console.log(fields)
    }

    function onCancel() {
        navigate('/profile')
    }

    return (
        <div className="gig-edit-container flex column">
            <form onSubmit={(e) => e.preventDefault()}>
                <div className='form-inputs flex column'>
                    <div className="input-group flex row">
                        <div className="info flex column">
                            <label htmlFor="title">Gig Title</label>
                            <p>As your Gig storefront, your title is the most important place to include keywords that buyers would likely use to search for a service like yours.</p>
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
                            <p>Briefly Describe Your Gig</p>
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
                            <p>Choose the category most suitable for your Gig.</p>
                            <select
                                id="category"
                                name="category"
                                value={fields.category}
                                onChange={handleChange}>
                                {categoryTexts.map((cat, idx) => (
                                    <option key={idx} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="info flex column">
                            <label htmlFor="days">Days to Make</label>
                            <p>Days it will take you on average to finish this gig.</p>
                            <input
                                id="days"
                                type="number"
                                name="days"
                                min={0}
                                max={7}
                                value={fields.days}
                                onChange={handleChange}
                                placeholder="Number of days"
                            />
                        </div>
                        <div className="info flex column">
                            <label htmlFor="price">Price</label>
                            <p>Price you're offering for this gig.</p>
                            <input
                                id="price"
                                type="number"
                                name="price"
                                min={0}
                                max={1000}
                                style={{flex: '0'}}
                                placeholder="Price"
                                value={fields.price}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>

                <div className="actions flex row">
                    <button onClick={onCancel}>Cancel</button>
                    <button onClick={onSave}>Save</button>
                </div>
            </form>
        </div>
    )
}