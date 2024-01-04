import HomePageComponent from "../components/HomePageComponent";
import axios from "axios";
import {useEffect, useState} from "react";

const HomePage = () => {
    const [categories, setCategories] = useState([])

    const getCategories = async () => {
        const { data } = await axios.get("/api/categories/");
        return data;
      }

      useEffect(() => {
        getCategories()
        .then((res) => {
            setCategories(res);
            console.log("res", res);        
        })
        .catch((er) => console.log(er));
    }, [])

      



  return <HomePageComponent categories={categories} />;
};

export default HomePage;

