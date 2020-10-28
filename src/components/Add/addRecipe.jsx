import React, { useState } from "react";
import apiService from "../../services/apiService.js";

class AddRecipe extends React.Component {
  constructor(props) {
    super(props);
  this.state = {
    uuid: null,
    title: "",
    description: "",
    ingredients: "",
    servings: null,
    prepTime: null,
    cookTime: null,
    postDate: "",
    editDate: "",
    submitted: false
  };
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  saveRecipe = () => {
    let data = {
      title: this.state.title,
      description: this.state.description
    };
    apiService.create(data)
      .then(res => {
        if (res.data) {
        this.setState({
          submitted: true
        });
        } else {
          this.setState({
            submitted: false
          })
        }
        console.log(res.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  newRecipe = () => {
    setRecipes(this.state);
    setSubmitted(false);
  };

  render (){
  return (
   <div className="submit-form">
      {this.state.submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={this.newRecipe}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={this.state.title}
              onChange={this.handleChange}
              name="title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={this.state.description}
              onChange={this.handleChange}
              name="description"
            />
          </div>


          <div className="form-group">
            <label htmlFor="description">Ingredients</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={this.state.description}
              onChange={this.handleChange}
              name="ingredients"
            />
          </div>


          <div className="form-group">
            <label htmlFor="description">Directions</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={this.state.description}
              onChange={this.handleChange}
              name="directions"
            />
          </div>


          <button onClick={this.saveRecipe} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
  
  };
};

export default AddRecipe;
