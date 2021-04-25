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
                setStoredValue()
                window.localStorage.removeItem(key);
            }
        } catch (error){
            console.error(error)
        }
    }

    const getValue = () => {
        const item = window.localStorage.getItem(key)
        const result = item && JSON.parse(item)
        setStoredValue(result)
    }

    return [ storedValue, setValue, getValue]
}