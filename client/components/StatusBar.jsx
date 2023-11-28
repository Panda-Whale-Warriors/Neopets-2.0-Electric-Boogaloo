import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router';

function StatusBar () {
    // set states for both hunger and thirst
    const [hunger, setHunger] = useState(0);
    const [thirst, setThirst] = useState(0);
    // handle feed and hydrate button click
    const {id} = useParams();

    const handleFeedButton = () => {
        setHunger((prevHunger) => Math.min(prevHunger + 10, 100));
        updateServerValues({hunger: hunger + 10});
    }

    const handleHydrateButton = () => {
        setThirst((prevThirst) => Math.min(prevThirst + 10, 100));
        updateServerValues({thirst: thirst + 10});
    }


    // useEffect
        // fetch the initial values from the server/database
        // use the fetched value to update the state
        // decrement of hunger and thirst over time
    useEffect(() => {
        fetch(`http://localhost:3000/create/pets/${id}`)
        .then((data) => {
            return data.json()
        })
        .then((data) => {
            if(data && data.hunger !== undefined && data.thirst !== undefined){
            setHunger(data.hunger);
            setThirst(data.thirst);
            console.log(data.thirst)
            console.log(data.hunger)
            }
        })
        .catch((error) => console.log('Error fetching values:', error))

        const decreaseHungerThirst = setInterval(() => {
            setHunger((prevHunger) => Math.max(prevHunger - 5, 0));
            setThirst((prevThirst) => Math.max(prevThirst - 5, 0));
        }, 5000)

        return () => clearInterval(decreaseHungerThirst);
    }, [id])

    // update the server side values
    const updateServerValues = (updatedValues) => {

        fetch(`http://localhost:3000/create/pets/${id}`, {
                method: 'PATCH',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedValues)
            })
            .then((data) => data.json())
            .then((updatedData) => {
                setHunger(updatedData.hunger);
                setThirst(updatedData.thirst);
            })
            .catch(error => console.log('Error updating: ', error))
    }
    // render

    return(
    <div>
        <>
        <span id="hunger">Hunger:</span>
        <progress value={hunger} max="100"></progress>
        <br/>
        <button onClick={handleFeedButton}>Feed</button>
        </>
        <>
        <span id="thirst">Thirst:</span>
        <progress value={thirst} max="100"></progress>
        <br/>
        <button onClick={handleHydrateButton}>Hydrate</button>
        </>
    </div>
    )



}

export default StatusBar
