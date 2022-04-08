import './index.css'
import React, { useState } from 'react'
import Card from './components/Card'

const cardImages = [
    {"src": "/img/mini_pekka.png"},
    {"src": "/img/valkyrie.png"},
    {"src": "/img/prince.png"},
    {"src": "/img/skeletons.png"},
    {"src": "/img/royal_giant.png"},
    {"src": "/img/wizard.png"},

]

export default function App () {
    const [cards, setCards] = useState([])
    const [turns, setTurns] = useState(0)

    const shuffleCards = () => {
        const shuffledCards = [...cardImages, ...cardImages]
            .sort(() => Math.random() - 0.5)
            .map((card) => ({...card, id: Math.random()}))
        setCards(shuffledCards)  
        setTurns(0)
    }

    return (
        <div>
            <h1>Memory Game</h1>
            <button onClick={shuffleCards}>Start</button>
            <div className='card-grid'>
                {cards.map(card => (
                    <Card key={card.id} card={card} />  
                ))}
            </div>
        </div>
    );
}