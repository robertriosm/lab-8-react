import React from 'react';
import '../index.css';
import PropTypes from 'prop-types';
import cardback from '../../public/img/cardback.png';

/**
 * componente carta
 * @param {*} param0 imagen, funcion para el match,
 * si esta volteada y si ya no puede voltearse de nuevo
 * @returns una carta que se guarda en el array cards
 */
export default function Card({ card, handleChoice, flipped, disabled }) {
  /**
   * funcion para detectar si una carta puede voltearse o no
   */
  const cardClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
    handleChoice(card);
  };

  /**
   * el componente visualmente
   */
  return (
    <div className="card">
      <div className={flipped ? 'flipped' : ''}>
        <input type="image" className="front" src={card.src} alt="card front" />
        <input
          type="image"
          onClick={cardClick}
          className="back"
          src={cardback}
          alt="card back"
        />
      </div>
    </div>
  );
}

Card.propTypes = {
  card: PropTypes.func.isRequired,
  handleChoice: PropTypes.func.isRequired,
  flipped: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
};
