


const useLocalStorage = (item) => {

    setItemInLocalStorage : {
        localStorage.setItem(item.key , item.value);
    }

    getItemFromLocalStorage : {
        localStorage.getItem(item);
    }

    removeItemFromLocalStorage : {
        localStorage.removeItem(item);
    }

    clearLocalStorage : {
        localStorage.clear();
    }
}

export default useLocalStorage;