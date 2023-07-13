import React, { useEffect, useRef, useState } from 'react';
import { useMyStore } from '../store/index';

import Card from './Card';

export default function DeskOfBeers() {
    const [countOfAPI, setCountOfAPI] = useState(2)
    const { beerList, removeBeer, fetchAdditionalBeer, selectedBeerIds, resetSelectedBeerIds } = useMyStore();
    const itemsPerPage = 5;
    const totalItems = 15;

    const [currentItems, setCurrentItems] = useState([]);
    const containerRef = useRef(null);

    useEffect(() => {
        if (beerList.length <= 15) {
            fetchAdditionalBeer(countOfAPI)
            setCountOfAPI(prev => prev + 1)
        }
        setCurrentItems(beerList.slice(0, itemsPerPage));
    }, [beerList]);

    const handleLazyScroll = () => {
        const container = containerRef.current;
        if (container.scrollTop + container.clientHeight >= container.scrollHeight) {
            setCurrentItems((prevItems) => {
                const startIndex = prevItems.length;
                const endIndex = prevItems.length + itemsPerPage;
                if (endIndex <= totalItems) {
                    return [...prevItems, ...beerList.slice(startIndex, endIndex)];
                }
                return prevItems;
            });
        }
    };

    useEffect(() => {
        const container = containerRef.current;
        container.addEventListener('scroll', handleLazyScroll);

        return () => {
            container.removeEventListener('scroll', handleLazyScroll);
        };
    });


    function deleteHandler() {
        resetSelectedBeerIds()
        removeBeer(selectedBeerIds)
    }




    return (
        <>
            <h1>All beers:</h1>
            <div className='desk'>
                <div className="desk__wrapper" style={{ flex: 1, overflowY: 'auto' }} ref={containerRef}>
                    {currentItems.map((card) => (
                        <Card
                            key={card.id}
                            id={card.id}
                            img={card.image_url}
                            description={card.description}
                            name={card.name}
                        />
                    ))}
                </div>
            </div>
            <div className='card__btn-wrapper'>
                {
                    selectedBeerIds.length
                        ?
                        <button className='desk__btn-delete' onClick={deleteHandler}>Delete</button>
                        :
                        null
                }
            </div>

        </>

    );
}
