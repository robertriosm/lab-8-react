import '../index.css'

export default function Card({ card, handleChoice, flipped, disabled }) {
    
    const cardClick = () => {
        if (!disabled) {
            handleChoice(card)
        }
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