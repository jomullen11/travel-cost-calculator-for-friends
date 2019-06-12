import React, { useState, useEffect } from 'react';
import { useInput } from './hooks-input'

function App () {
  const { value:person, bind:bindPersonInput, reset:resetPersonInput } = useInput('');
  const { value:days, bind:bindDaysInput, reset: resetDaysInput } = useInput();
  const { value:costInput, bind:bindCostInput, reset:resetCostInput } = useInput();
  const [cost, setCost] = useState(1500)
  const [people, setPeople] = useState(['Jordan'])
  const [daysPerPerson, setDaysPerPerson] = useState([5])
  const [totalDays, setTotalDays] = useState(5)
  const [pricePerDayPerPerson, setPricePerDayPerPerson] = useState(0)

  const handleSubmit = (event) => {
    event.preventDefault()
    resetPersonInput()
    resetDaysInput()
  }

  const setPeopleArray = () => {
    setPeople([...people, person])
    setDaysPerPerson([...daysPerPerson, parseInt(days)])
  }

  const totalCostSubmit = (event) => {
    event.preventDefault()
    setCost(costInput)
    resetCostInput()
  }

  const calculateTotalDaysPerPeople = () => {
    setTotalDays(daysPerPerson.reduce((a, b) => a + b))
  }

  const calculatePricePerDayPerPerson = () => {
    setPricePerDayPerPerson(cost / totalDays)
  }


  useEffect( () => {
    calculateTotalDaysPerPeople()
    calculatePricePerDayPerPerson()
  });

console.log(people)
console.log(daysPerPerson)
console.log(totalDays)
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="Name" value={person} placeholder='Name' {...bindPersonInput} required/>
        <input type="number" name="Days Stayed" value={days} placeholder='# of days stayed' {...bindDaysInput} min='1' max='7' required />
        <input type="submit" value="Submit" onClick={setPeopleArray}/>
      </form>

      <form onSubmit={totalCostSubmit}> 
        <input type="number" name='Total Cost' placeholder='Total Cost of Trip' {...bindCostInput} min='500' max='1000000' required />
        <input type='submit' name='Submit' value='Submit' />
      </form>


      {'The total cost of the trip is: ' + cost} <br/>
      {'The total amount of days for everyone is: ' + totalDays} <br/>
      {'The amount owed per day is: ' + pricePerDayPerPerson}
    </div>
  )
}

export default App