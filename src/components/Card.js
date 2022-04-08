import '../index.css'

export default function Card({ card, handleChoice, flipped }) {
    
    const cardClick = () => {
        handleChoice(card)
    }
    
    return (
        <div className='card'>
            <div className={flipped ? "flipped" : ""}>
                <img className='front' src={card.src} alt='card front'/>
                <img className='back' src=' /img/cardback.png' onClick={cardClick} alt='card back'/>
            </div>
        </div>
    )
}