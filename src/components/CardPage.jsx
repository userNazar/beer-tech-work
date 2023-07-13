import React from 'react'
import { useMyStore } from '../store';
import { NavLink, useParams } from 'react-router-dom';

export default function CardPage() {

    const { id } = useParams();

    const { beerList } = useMyStore();

    const beerElement = beerList.find(item => item.id === +id)
   
    function getIngredients(obj, result = []) {
        Object.entries(obj).forEach(([key, value]) => {
            if (typeof value === 'object') {
                getIngredients(value, result);
            } else {
                result.push(value);
            }
        });

        return result;
    }




    return (
        <div className='cardpage'>
          <div className="cardpage__back">
            <NavLink to={'/'}>back</NavLink>
          </div>
          <div className="container">
            {beerElement ? (
              <div className="cardpage__wrapper">
                <div className="cardpage__info">
                  <p className='cardpage__name'><span>Name:  </span>{beerElement.name}</p>
                  <p className='cardpage__first_brewed'><span>First brewed:  </span>{beerElement.first_brewed}</p>
                  <p className='cardpage__description'><span>Description:  </span>{beerElement.description}</p>
                  <p className='cardpage__ingredients'><span>Ingredients:  </span>{getIngredients(beerElement.ingredients).join(' ')}</p>
                </div>
                <div className="cardpage__photo">
                  <img src={beerElement.image_url} alt="" />
                </div>
              </div>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      );
}
