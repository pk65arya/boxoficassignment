import axios from "axios";
import React, { useEffect, useState } from "react";

 export const FetchProduct=()=>{
const [data,setData]=useState([]);
const [loading,setLoading]=useState(false);
const [error,setError]=useState(null);

useEffect(()=>{
  setLoading(true);
   
  const fetchData=async()=>{
    try {
      const res= await axios.get("https://fakestoreapi.com/products");
      setData(res.data);
      setLoading(false);
    } catch (error) {
      setError({message:"Error fetching data"});
      setLoading(false);
    }
  }
  fetchData()

},[]);

const handleSearch=(e)=>{
  const searchTerm=e.target.value.toLowerCase();
  const filteredData=data.filter((item)=>
    item.title.toLowerCase().includes(searchTerm)
  );
  setData(filteredData);
}

const filterByCategory=(category)=>{
  const filteredData=data.filter((item)=>item.category===category);
  setData(filteredData);
} 

const sortByPrice=(order)=>{
  const sortedData=[...data].sort((a,b)=>{
    if(order==="asc"){
      return a.price-b.price;
    }else{
      return b.price-a.price;
    }
  });
  setData(sortedData);
};

if(loading){
  return <div>Loading...</div>
}

if(error){
  return <div>{error.message}</div>
}
return(
  <div className="container mx-auto">
    <h1 className="text-3xl font-bold mb-4">Product List</h1>

    <input
      type="text"
      placeholder="Search products..."
      className="border-2 border-gray-300 p-2 mb-4 w-full"
      onChange={handleSearch}
    />
    
    <div className="mb-4">
      <select name="category" id="" onChange={(e)=>filterByCategory(e.target.value)}>
        <option value="">All</option>
        <option value="electronics">Electronics</option>
        <option value="jewelery">Jewelery</option>
        <option value="men's clothing">Men's Clothing</option>
        <option value="women's clothing">"women's clothing"</option>
      </select>
    </div>


      <div className="mb-4">
      <select name="sort" id="" onChange={(e)=>sortByPrice(e.target.value)}>
        <option value="">Sort by Price</option>
        <option value="asc">Low to High</option>
        <option value="desc">High to Low</option>
      </select>
    </div>


  <div className="grid grid-rows-4 md:grid-cols-4 lg:grid-cols-4 gap-4">
    {data.map((item)=>(
      <div key={item.id} className="min-h-fit border-2 border-gray-300 p-4 rounded">
        <img src={item.image} alt={item.title} className="w-64 h-64 object-cover mb-4"/>
        <h2 className="text-lg font-bold mb-2 p-2">{item.title}</h2>
        <p className="text-gray-600 mb-2">{item.description}</p>
        <p className="text-green-500 font-bold">${item.price}</p>
      </div>
    ))}
 
  </div>
  </div>
)

};