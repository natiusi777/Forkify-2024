// Global app controller

import Recipe from "./modules/Recipe";
import Search from "./modules/Search";
import { clearLoader, elements, renderLoader } from "./views/base"
import * as searchView from "./views/searchView";
import * as recipeView from "./views/recipeView.js";

/* 
- Search object
- Current recipe object
- Shoping List object
- Liked recipess
*/

const state = {};

/* Search Controller */
const controlSearch = async (e) => {
    e.preventDefault()

   // 1. Get Query value
    const query = searchView.getInput();

    if(query){ 
        // 2.New Search object
        state.search = new Search(query);

        // 3. Prepare UI for result
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchResList)

        try {
            // 4. Search API
            await state.search.getResults() 
        } catch (error) {
            alert ("Search Error")
        }
       
          // 5. Render results on UI
        searchView.renderResult(state.search.result)
        clearLoader()   
        
        console.log(state)
    }
 
}

elements.searchForm.addEventListener("submit", controlSearch);


elements.searchResPage.addEventListener("click", e => {
    const btn = e.target.closest(".btn-inline");

    if(btn){
        const goto = +btn.dataset.goto;
        searchView.clearResults();
        searchView.renderResult(state.search.result,goto)
    }
});

const  controlRecipe = async () => {
     // get id
    const id = window.location.hash.replace("#","")

    if(id){
        //Prepare UI and add Loader
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        //Create new Object
        state.recipe = new Recipe(id);

        //Get recipe
        await state.recipe.getRecipe();
        state.recipe.calcTime();
        state.recipe.calcServings();
        state.recipe.parseIngredients();

        // Clear Loader and Render Recipe
        clearLoader();
        recipeView.renderRecipe(state.recipe)
        
    }
}

window.addEventListener("hashchange", controlRecipe)