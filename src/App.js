import './index.css'
import React, { useState, useEffect } from 'react'
import Card from './components/Card'
import minipekka from '../public/img/mini_pekka.png'
import mega_knight from '../public/img/mega_knight.png'
import king from '../public/img/king.png'
import prince from '../public/img/prince.png'
import princess from '../public/img/princess.png'
import royal_giant from '../public/img/royal_giant.png'
import skeletons from '../public/img/skeletons.png'
import valkyrie from '../public/img/valkyrie.png'
import wizard from '../public/img/wizard.png'

/**
 * este array sirve para crear las 16 cartas y relacionar dos
 */
const cardImages = [
    {"src": minipekka, matched: false },
    {"src": valkyrie, matched: false },
    {"src": prince, matched: false },
    {"src": skeletons, matched: false },
    {"src": royal_giant, matched: false },
    {"src": wizard, matched: false },
    {"src": mega_knight, matched: false },
    {"src": princess, matched: false },
]

/**
 * componente App
 * @returns el tablero con las 16 cartas y la info del juego
 */
export default function App () {
    // array con 8 pares de cartas
    const [cards, setCards] = useState([])
    // contador de jugadas hechas por el jugador
    const [turns, setTurns] = useState(0)
    // primer match de dos cartas iguales
    const [choiceOne, setChoiceOne] = useState(null)
    // segundo match de dos cartas iguales
    const [choiceTwo, setChoiceTwo] = useState(null)
    // estado de una carta volteada
    const [disabled, setDisabled] = useState(false)
    // estado donde un jugador ya hizo match todas las cartas
    const [won, setWon] = useState(false)

    /**
     * funcion que inicia/reinicia el juego
     * genera las posiciones en el array al azar asignandoles las imagenes
     * de cardImages a cards
     */
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

    /**
     * funcion que evalua el match de una carta con su pareja
     * @param {*} card cada carta en el array cards
     */
    const handleChoice = (card) => {
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
    }

    /**
     * efecto para evaluar si las cartas seleccionadas hacen match,
     * si hacen match, se quedan levantadas, si no se vuelven a voltear
     */
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

    /**
     * funcion para voltear las cartas si no hacen match, se llama por el efecto arriba
     */
    const resetIt = () => {
        setChoiceOne(null)
        setChoiceTwo(null)
        setTurns(prevTurns => prevTurns + 1)
        setDisabled(false)
    }

    /**
     * efecto para revolver las cartas al iniciar la app
     */
    useEffect(() => {
        shuffleCards()
    }, [])

    /**
     * funcion para verificar si todas las cartas estan levantadas,
     * si lo estan el jugador gano el juego
     */
    const checkWin = () => {
        var matches = cards.map(function(i) {
            return i.matched;
        })
        if (matches.every(v => v === true)) {
            setWon(true)
        }
    } 

    /**
     * efecto para ver si el jugador ha ganado el juego
     */
    useEffect(() => {
        checkWin()
    })

    /**
     * mostrar en el dom el juego
     */
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
                </div>
                <div className='king'>
                        {
                            won && <p>Felicidades, Ganaste! JIJIJIJA!</p>
                        }
                        <img src={king} alt='king' height={350}/>
                </div>
            </div>
        </div>
    );
}