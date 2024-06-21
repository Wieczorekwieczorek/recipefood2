import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';

const App = () => {
    const [query, setQuery] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [show, setShow] = useState(false);

    const YOUR_APP_ID = 'cb581511'; 
    const YOUR_APP_KEY = 'ee75db47dc14dd919d684e943a574a18'; 

    const getRecipes = async () => {
        const result = await axios.get(`https://api.edamam.com/search?q=${query}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}`);
        setRecipes(result.data.hits);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        getRecipes();
    };

    const handleShow = (recipe) => {
        setSelectedRecipe(recipe);
        setShow(true);
    };

    const handleClose = () => {
        setShow(false);
        setSelectedRecipe(null);
    };

    return (
        <div className="container">
            <h1 className="text-center my-4">Wyszukiwarka Przepisów</h1>
            <form onSubmit={onSubmit} className="mb-4">
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Szukaj przepisów..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <div className="input-group-append">
                        <button className="btn btn-primary" type="submit">Szukaj</button>
                    </div>
                </div>
            </form>
            <div className="row">
                {recipes.map(({ recipe }) => (
                    <div key={recipe.uri} className="col-md-4 mb-4">
                        <div className="card">
                            <img src={recipe.image} className="card-img-top" alt={recipe.label} />
                            <div className="card-body">
                                <h5 className="card-title">{recipe.label}</h5>
                                <p className="card-text">Kalorie: {Math.round(recipe.calories)}</p>
                                <div className="d-flex justify-content-between">
                                    <button className="btn btn-secondary" onClick={() => handleShow(recipe)}>Składniki</button>
                                    <a href={recipe.url} className="btn btn-primary" target="_blank" rel="noopener noreferrer">Zobacz Przepis</a>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {selectedRecipe && (
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{selectedRecipe.label}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <img src={selectedRecipe.image} className="img-fluid" alt={selectedRecipe.label} />
                        <h5 className="mt-3">Kalorie: {Math.round(selectedRecipe.calories)}</h5>
                        <h6>Składniki:</h6>
                        <ul>
                            {selectedRecipe.ingredientLines.map((ingredient, index) => (
                                <li key={index}>{ingredient}</li>
                            ))}
                        </ul>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Zamknij
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
};

export default App;
