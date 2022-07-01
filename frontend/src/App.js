import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Products from "./view/Products/Products";
import Product from "./view/Product/Product";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route exact path={"/"} element={<Products/>}/>
                <Route exact path={'/product/:id'} element={<Product/>}/>
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
