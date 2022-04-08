import './index.css'
import React, { useState, useEffect } from 'react'
import Card from './components/Card'

const cardImages = [
    {"src": "/img/mini_pekka.png", matched: false },
    {"src": "/img/valkyrie.png", matched: false },
    {"src": "/img/prince.png", matched: false },
    {"src": "/img/skeletons.png", matched: false },
    {"src": "/img/royal_giant.png", matched: false },
    {"src": "/img/wizard.png", matched: false },

]

export default function App () {
    const [cards, setCards] = useState([])
    const [turns, setTurns] = useState(0)
    const [choiceOne, setChoiceOne] = useState(null)
    const [choiceTwo, setChoiceTwo] = useState(null)
    const [disabled, setDisabled] = useState(false)

    const shuffleCards = () => {
        const shuffledCards = [...cardImages, ...cardImages]
            .sort(() => Math.random() - 0.5)
            .map((card) => ({...card, id: Math.random()}))
        
        setChoiceOne(null)
        setChoiceTwo(null)
        setCards(shuffledCards)  
        setTurns(0)
    }

    const handleChoice = (card) => {
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
    }

    useEffect(() => {
        if (choiceOne && choiceTwo) {
            setDisabled(true)
            if (choiceOne.src === choiceTwo.src) {
                setCards(prevCards => {
                    return prevCards.map(card => {
                        if (card.src === choiceOne.src) {
                            return {...card, matched: true}
                        } else {
                            return card
                        }
                    })
                })
                resetIt()
            } else {
                setTimeout(() => resetIt(), 1000) // ponerle 1 segundos de espera
            }
        } 
    }, [choiceOne, choiceTwo])

    const resetIt = () => {
        setChoiceOne(null)
        setChoiceTwo(null)
        setTurns(prevTurns => prevTurns + 1)
        setDisabled(false)
    }

    useEffect(() => {
        shuffleCards()
    }, [])

    return (
        <div className='App'>
            <h1>Memory Game</h1>
            <button onClick={shuffleCards}>Start</button>
            <div className='card-grid'>
                {cards.map(card => (
                    <Card key={card.id} card={card} handleChoice={handleChoice}
                        flipped={card === choiceOne || card === choiceTwo || card.matched}
                        disabled={disabled}
                    />  
                ))}
            </div>
            <p>Jugadas: {turns}</p>
        </div>
    );
}