import React, { useState } from 'react'
import './App.css'

const App = () => {
  const [image, setImage] = useState('')
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [title, setTitle] = useState('')


  return (
    <div className="App">
      <div className={image !== '' ? 'container justify-start' : 'container justify-center'}>
        {loading && (
          <div className="loading-container">
            <p className="loading">loading...</p>
          </div>
        )}
        <form> 
        {/* onSubmit={fetchData()}> */}
          <input className="search" placeholder="find art." type="text" onChange={e => setSearchQuery(e.target.value)} />
          <div className="image-container">
            {image !== '' && (
              <p className="title">
                {title}
              </p>
            )}
            {image !== '' && 
              <img className="image" src={image} alt={title} onLoad="finishedLoad" />
            }
          </div>
        </form>
        <p v-if="error" class="no-results">No results, try again.</p>
        <div className="background-image" />
      </div>
    </div>
  );
}

export default App;
