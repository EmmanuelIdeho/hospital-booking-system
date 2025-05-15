import { useState } from 'react'
import './App.css'
import axios from 'axios'


function App() {
  const [words, setWords] = useState<string[]>([]);

  const helloWorld = async (): Promise<void> => {
    try {
        const response = await axios.get<string>("http://localhost:8080/api/hello");
        console.log(response.data);
        setWords((prevWords) => [...prevWords, response.data]);
    } catch (e) {
        console.log(e);
    }
};

  return (
    <>
      <form>
        <input type="text" name="name" id="name"/>
        <input type="date" name="date" id="date"/>
        <input type="time" name="time" id="time"/>
      </form>
    </>
  )
}

export default App
