import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useMyStore } from '../store/index';


export default function Card({ id, img, name, description, setSelectedCard, selectedCard }) {

  const { selectedBeerIds, addToSelectedBeer } = useMyStore();
  console.log(selectedBeerIds)
  const navigate = useNavigate();

  const rigthClickHandler = (e) => {
    e.preventDefault()
    addToSelectedBeer(id)
  }

  const leftCliclHandler = () => {
    if (!selectedBeerIds.includes(id)) navigate(`/${id}`)
  }


  return (
    <div className={`card ${selectedBeerIds.includes(id) ? 'selected' : ''}`} onClick={leftCliclHandler} onContextMenu={(e) => rigthClickHandler(e)}>
      <div className='card__img-block'>
        <img src={img} alt="" />
      </div>
      <div className="card__name">
        {name}
      </div>
      <div className="card__ingredients">
        {
          description.slice(0, 10) + '...'
        }
      </div>
    </div>
  )
}
