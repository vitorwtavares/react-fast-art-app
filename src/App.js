import React, { useState } from 'react'
import './App.css'

const App = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [image, setImage] = useState('')
  const [title, setTitle] = useState('')

  const fetchData = async e => {
    e.preventDefault()

    const base_url = 'https://collectionapi.metmuseum.org/public/collection/v1/'

    try {
      setLoading(true)
      const searchResponse = await fetch(`${base_url}search?q=${searchQuery}`)
      const searchData = await searchResponse.json()
      const objectResponse = await fetch(`${base_url}objects/${searchData.objectIDs[0]}`)
      const objectData = await objectResponse.json()
      setImage(objectData.primaryImage)
      setTitle(objectData.title)
      setError(false)
    } catch (err) {
      setError(true)
      setImage('')
      setTitle('')
    } finally {
      setSearchQuery('')
      e.target[0].value = ''
      setLoading(false)
    }
  }

  return (
    <div className="App">
      <div className='container'>
        {loading && (
          <div className="loading-container">
            <p className="loading">loading...</p>
          </div>
        )}
        <form onSubmit={fetchData}>
          <input 
            className="search"
            placeholder="find art."
            type="text"
            onChange={e => setSearchQuery(e.target.value)}
          />
        </form>
        {image.length > 0 && (
        <div className="image-container">
          <p className="title">
            {title}
          </p>
          <img 
            className="image"
            src={image}
            alt={title}
          />
        </div>
        )}
        {error && <p className="no-results">No results, try again.</p>}
        <div className="background-image" />
      </div>
    </div>
  );
}

export default App;
