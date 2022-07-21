import React from "react";

const Paginate = (props)=>{
    const Next = ()=>{
        if(props.currPage+1 <= PageNumber.length){
            return(
                <li className="page-item">
                    <a onClick={()=> props.PageSelected(props.currPage+1)} href="!#" className="page-link">Next</a>
                </li>
            )
        }
        else{
            return(
                <li className="page-item disabled">
                    <a onClick={()=> props.PageSelected(props.currPage)}  href="!#" className="page-link">Next</a>
                </li>
            )
        }
    }

    const Prev = ()=>{
        if(props.currPage-1 >=1){
            return(
                <li className="page-item">
                    <a onClick={()=> props.PageSelected(props.currPage-1)}  href="!#" className="page-link">Prev</a>
                </li>
            )
        }
        else{
            return(
                <li className="page-item disabled">
                    <a onClick={()=> props.PageSelected(props.currPage)}  href="!#" className="page-link">Prev</a>
                </li>
            )
        }
    }

    const PageNumber = [];
    for(let i=1;i<=Math.ceil(props.totalItems/props.itemsPerPage);i++){
        PageNumber.push(i);
    }

    const Index = ()=>{
        return(
        PageNumber.map(num=>{
            let classes = "page-item";
            if(props.currPage === num){
                classes+= " active";
            }
            return(
                <li className={classes}>
                    <a onClick={()=> props.PageSelected(num)}  href="!#" className="page-link">{num}</a>
                </li>
            )
        })
        );
    }

    return(
        <nav className="nav navbar-nav">
            <ul className="pagination pagination-sm justify-content-center border-0">
                {Prev()}
                {Index()}
                {Next()}
            </ul>
        </nav>
    )
}

export default Paginate;