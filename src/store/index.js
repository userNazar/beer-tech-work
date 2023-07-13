import { create } from 'zustand';

export const useMyStore = create((set) => ({
    beerList: [],
    selectedBeerIds: [],

    fetchBeerList: async () => {
        try {
            const response = await fetch('https://api.punkapi.com/v2/beers?page=1');
            const data = await response.json();
            set({ beerList: data });
        } catch (error) {
            console.error('Error fetching beer list:', error);
        }
    },

    removeBeer: (ids) => {
        set((state) => ({
            beerList: state.beerList.filter((beer) => !ids.includes(beer.id)),
        }));
    },

    addToSelectedBeer: (id) => {
        set((state) => {
            const updatedSelectedBeerIds = state.selectedBeerIds.includes(id)
                ? state.selectedBeerIds.filter((beerId) => beerId !== id)
                : [...state.selectedBeerIds, id];

            return {
                selectedBeerIds: updatedSelectedBeerIds,
            };
        });
    },
    resetSelectedBeerIds: () => {
        set((state) => ({
            selectedBeerIds: []
        }));
    },


    fetchAdditionalBeer: async (numberOfPage = 2) => {
        try {
            const response = await fetch(`https://api.punkapi.com/v2/beers?page=${numberOfPage}`);
            const data = await response.json();

            set((state) => ({
                beerList: [...state.beerList, ...data],
            }));
        } catch (error) {
            console.error('Error fetching additional recipes:', error);
        }
    },

}));
