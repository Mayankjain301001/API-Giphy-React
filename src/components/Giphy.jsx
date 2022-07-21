import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./Loader";
import Paginate from "./Paginate";

const Giphy = ()=>{
    const [data, setData] = useState([]);
    const [isLoading,setLoading] = useState(false);
    const [isError,setError] = useState(false);
    const [search,setSearch] = useState("");
    const [currPage,setCurrPage] = useState(1);
    const itemsPerPage = 3;

    const indexOfLastItem = currPage*itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const currItems = data.slice(indexOfFirstItem,indexOfLastItem);
    useEffect(()=>{
        const fetchData = async ()=>{
            setError(false);
            setLoading(true);
            try{
                const results = await axios("https://api.giphy.com/v1/gifs/trending",{
                    params: {
                        api_key: 'GlVGYHkr3WSBnllca54iNt0yFbjz7L65'
                    }
                });
                console.log(results);
                setData(results.data.data);
            } catch(err){
                setError(true);
                setTimeout(()=> setError(false),7000);
            }
            setLoading(false);
        }
        fetchData();
    },[]);

    const renderGIFS = ()=>{
        if(isLoading){
            return(
                <Loader />
            )
        }
        return currItems.map(ele =>{
            return(
                <div key={ele.id} className="gif col-md-4 col-lg-4">
                    <img className="rounded" src={ele.images.fixed_height.url} alt="" />
                </div>
            )
        })
    }

    const renderError = ()=>{
        if(isError){
            return(
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    Unable to load GIFS !!! Try again after sometime :(
                </div>
            );
        }
    }

    const handleSearchChange = event =>{
        setSearch(event.target.value);
    }

    const handleSubmit = async event =>{
        event.preventDefault();
        setError(false);
        setLoading(true);
        try{
            const results = await axios("https://api.giphy.com/v1/gifs/search",{
                params: {
                    api_key: 'GlVGYHkr3WSBnllca54iNt0yFbjz7L65',
                    q: search
                }
            });
            setData(results.data.data);
            setCurrPage(1);
        } catch(err){
            setError(true);
            setTimeout(()=> setError(false),7000);
        }
        setLoading(false);
    }

    const PageSelected = (PageNumber)=>{
        setCurrPage(PageNumber);
    }

    return(
        <>
            <div className="container rounded">
                {renderError()}
                <form className="form-inline justify-content-center">
                    <input value={search} onChange={handleSearchChange} type="text" placeholder="Article name or keywords..." className="form-control inp"/>
                    <i className="fa fa-search"></i>
                    <button onClick={handleSubmit} type="submit" className="btn rounded-pill">Search</button>
                </form>
                <div className="gifs">{renderGIFS()}</div>
                <Paginate PageSelected={PageSelected} currPage={currPage} itemsPerPage={itemsPerPage} totalItems={data.length} />
            </div>
        </>
    );
}
export default Giphy;