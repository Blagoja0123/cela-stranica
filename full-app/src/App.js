
import { useEffect, useState } from "react";
import './App.css';
import axios from 'axios';
import Products from "./components/products/Products"

function App() {
  const [shopProducts, setShopProducts] = useState([]);

  useEffect(()=>{
    const getProducts = async () => {
      try{
        const result = await axios.get('http://localhost:3000/product');
        setShopProducts(result.data);
        console.log('render');
      }catch(err){
        console.log(err);
      }
    }
    getProducts();
  }, []);
  return (
    <>
    <div className="App">
     {shopProducts.map((item) =>(
        <ul>
          <>
          <li key = {item.id}>{item.name}</li>
          <li>{item.price}</li> 
          <li><img src = {item?.images?.[0]?.src} height = "300px" width = "300px"/></li>
         </>
         </ul>
       
      ))}
     
    </div>
    <Products/>
    </>
  );
}

export default App;
