import { useState, useRef } from 'react';
import styles from './index.module.css';
import sqlLogo from './assets/sql-server.png';


function App() {
  const [queryDescription, setQueryDescription] = useState('');
  const [sqlQuery, setSqlQuery] = useState('')
  const queryInput = useRef();

  async function handleSubmit(event) {
    event.preventDefault();
    setQueryDescription(queryInput.current.value)

    const generatedQuery = await generateQuery();
    console.log("returned from server: ", sqlQuery)
    setSqlQuery(generatedQuery);
  }

  const generateQuery = async ()=> {
    const response = await fetch('http://localhost:3005/generate', {
      method: "POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({queryDescription: queryDescription}),
    })

    if (!response.ok) {
      throw new Error ("Failed to fetch queries!")
    }

    const data = await response.json();
    return data.reponse.trim();
  };

  return (
    <>
      <main className={styles.main}>
        <img src={sqlLogo} alt="" className={styles.icon} />
        <h3>Generate SQL with AI</h3>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Describe your query" name="query-description" ref={queryInput}/>
          <input type="submit" value="Generate your query" />
          <pre>{sqlQuery}</pre>
        </form>
      </main>
    </>
  )
}

export default App
