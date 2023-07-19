import React from "react";

const useLocalStorage = {

    setItemInLocalStorage : (item ) => {
        if (typeof window !== 'undefined')
            localStorage.setItem(item.key , item.value);
    },

    getItemFromLocalStorage : (item) => {
        if (typeof window !== 'undefined')
            localStorage.getItem(item);
    },

    removeItemFromLocalStorage : (item) => {
        if (typeof window !== 'undefined')
            localStorage.removeItem(item);
    },

    clearLocalStorage : () => {
        if (typeof window !== 'undefined')
            localStorage.clear();
    }
}

export default useLocalStorage;