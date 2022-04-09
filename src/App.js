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
    {"src": "/img/mega_knight.png", matched: false },
    {"src": "/img/princess.png", matched: false },
]

export default function App () {
    const [cards, setCards] = useState([])
    const [turns, setTurns] = useState(0)
    const [choiceOne, setChoiceOne] = useState(null)
    const [choiceTwo, setChoiceTwo] = useState(null)
    const [disabled, setDisabled] = useState(false)
    const [won, setWon] = useState(false)

    const shuffleCards = () => {
        const shuffledCards = [...cardImages, ...cardImages]
            .sort(() => Math.random() - 0.5)
            .map((card) => ({...card, id: Math.random()}))
        
        setChoiceOne(null)
        setChoiceTwo(null)
        setCards(shuffledCards)  
        setTurns(0)
        setWon(false)
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
                setTimeout(() => resetIt(), 1000) // ponerle 1 segundo de espera
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

    useEffect(() => {
        if (condition) {
            // no he terminado esta parte
        }
    }, [won])

    return (
        <div className='App'>
            <div className='card-grid inside-app'>
                {cards.map(card => (
                    <Card key={card.id} card={card} handleChoice={handleChoice}
                        flipped={card === choiceOne || card === choiceTwo || card.matched}
                        disabled={disabled}
                    />  
                ))}
            </div>
            <div>
                <div className='inside-app'>
                    <h1>ROYALE MEMORY GAME</h1>
                    <button onClick={shuffleCards}>RESTART</button>
                    <p>JUGADAS: {turns}</p>
                    <p>LABORATORIO 8. ROBERTO RIOS, 20979.</p>
                    <button onClick={() => setWon(!won)}>Ye</button>
                </div>
                <div className='king'>
                        {
                            won && <p>Felicidades, Ganaste! JIJIJIJA!</p>
                        }
                        <img src='/img/king.png' alt='king' height={350}/>
                </div>
            </div>
        </div>
    );
}