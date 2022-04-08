import '../index.css'

export default function Card({ card }) {
    
    // const cardClick 
    
    return (
        <div className='card'>
            <div>
                <img className='front' src={card.src} alt='card front'/>
                <img className='back' src=' /img/cardback.png' alt='card back'/>
            </div>
        </div>
    )
}