import { useState } from 'react'

export function useLocalStorage ( key, initialValue ){
    const [ storedValue, setStoredValue] = useState(() => {
        try{
            const item = window.localStorage.getItem(key)
            return item ? JSON.parse(item) : initialValue;
        }catch (error){
            return initialValue;
        }
    })

    const setValue = (value, boolean) => {
        try {
            if(!boolean){
                setStoredValue(value)
                window.localStorage.setItem(key, JSON.stringify(value))
            }else{
                window.localStorage.removeItem(key);
            }
        } catch (error){
            console.error(error)
        }
    }

    return [ storedValue, setValue]
}