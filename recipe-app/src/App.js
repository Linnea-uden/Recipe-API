import './App.css';
import Recipe from "./Recipe";
import React,{useEffect, useState} from 'react'

const App = () => {
  const APP_ID = '75f0bb45'
  const APP_KEY = 'c687d2c5b6a936daee3d1a8105d26402'

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken');

  useEffect( () =>{
    getRecipes();
    dataOfTotalTime();

  },[query]);

  const getRecipes = async () =>{
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
    const data = await response.json();
    setRecipes(data.hits);
  };

  const updateSearch = e => {
    setSearch(e.target.value);
  };

  const getSearch = e => {
    e.preventDefault();
    setQuery(search)
    setSearch('');
  }
  const dataOfTotalTime = (totalTime) =>{
    console.log(totalTime)
  }
    return(
      <div className="App">
        <h1 className="header">Recipe api</h1>
        <form className="search-form" onSubmit={getSearch}>
          <input className="search-bar" type="text" value={search} onChange={updateSearch} placeholder="Enter a dish here...."/>
          <button className="search-button" type="submit">Search</button>
        </form>
        <div className="recipes">
        {recipes.map(recipe => (
          <Recipe 
          key={recipe.recipe.label}
          title={recipe.recipe.label} 
          totalTime={recipe.recipe.totalTime} 
          image={recipe.recipe.image}
          ingredients={recipe.recipe.ingredients}
          />
        ))}
        </div>
      </div>
    );

};
export default App;
