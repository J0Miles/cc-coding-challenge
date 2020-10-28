import React, { useState, useEffect } from "react";
import apiService from "../../services/apiService.js"
import { Link } from "react-router-dom";

const RecipesList = () => {
  const [recipes, setRecipes] = useState([]);
  const [currentRecipe, setCurrentRecipe] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [specials, setCurrentSpecials] = useState([]);
 

  useEffect(() => {
      retrieveRecipes();
  }, []);

  const retrieveRecipes = () => {
    apiService.getAll()
      .then(response => {
        setRecipes(response.data);
        console.log(response.data);
      })
    apiService.getSpecials()
      .then(response => {
        setCurrentSpecials(response.data);
        console.log(`Specials: `, response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveRecipes();
    setCurrentRecipe(null);
    setCurrentIndex(-1);
  };

  const setActiveRecipe = (recipe, index) => {
    setCurrentRecipe(recipe);
    setCurrentIndex(index);
  };

  const removeAllRecipes = () => {
    apiService.removeAll()
      .then(response => {
        console.log(response.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const removeRecipe = (id, index) => {
    apiService.remove(id)
      .then(response => {
        console.log(response.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const compareSpecials = (specials, ingredient) => {
    let specialss = specials
        for (let special of specialss) {
          if (special.ingredientId === ingredient.uuid) {
          let matchedSpecials = special;
            let specialObj = [<b><br/>{special.title}<br/>{special.text}<br/>{special.type}</b>];
            return specialObj;
            console.log(matchedSpecials);
          }
        }



  };
      // const specialsId = specials.map(special => special.ingredientId);
      // console.log(specialsId);
      // const match = currentRecipe.ingredients.filter(ingredient => specialsId.includes(ingredient.uuid));
      // console.log(`Match Found: `, match);      

  // };

  return (
    <div className="list row">
      <div className="col-md-6">
        <h4>Recipes List</h4>

        <ul className="list-group">
          {recipes &&
            recipes.map((recipe, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveRecipe(recipe, index) && compareSpecials(specials, currentRecipe)}
                key={index}
              >
                {recipe.title}
              </li>
            ))}
        </ul>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllRecipes}
        >
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        {currentRecipe ? (
          <div>
            <h4>Recipe</h4>
            {currentRecipe.images ? (
              <div>
              <img src={currentRecipe.images["full"]}></img>
            </div>
            ): null}
            
            <div>
              <label>
                <strong>Title:</strong>
              </label>{" "}
              {currentRecipe.title}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {currentRecipe.description}
            </div>
            <div>

            <div>
              <label>
                <strong>ingredients:</strong>
              </label>{" "}
              {currentRecipe.ingredients && currentRecipe.ingredients.map((ingredient, index) => (
              <li
              className="list-group-item display:grid"
              key={index}
            >
              {ingredient.amount}&nbsp;
              {ingredient.measurement}&nbsp;
              {ingredient.name}&nbsp;
              {compareSpecials(specials, ingredient)}
            </li>
                ))}
            </div>

              <label>
                <strong>Directions:</strong>
              </label>{" "}
              {currentRecipe.directions && currentRecipe.directions.map((recipe, index) => (
              <li
              className=
                "list-group-item"
              key={index}
            >
              {recipe.optional ? recipe.instructions + '\n' + `(Optional) `: recipe.instructions}
            </li>
                ))}
            </div>

            <Link
              to={"/recipes/" + currentRecipe.id}
              className="badge badge-warning"
            >
              Edit
            </Link>
          <button className="m-3 btn btn-sm btn-danger"
            onClick={() => removeRecipe(currentRecipe.uuid, currentIndex.index)}>
              Delete
            </button>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Recipe...</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default RecipesList;
