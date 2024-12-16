import React, { useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom';

import{Link} from "react-router-dom";
import "./Header.css"

import{
    Home,HomeOutlined,Add,
    AddOutlined,Search,SearchOutlined,AccountCircle,
    AccountCircleOutlined,
} from "@mui/icons-material";
import { Typography } from '@mui/material';

const Header = () => {
    const[tab,setTab] = useState(window.location.pathname)


  return (
    <div className='header'>
      <Link to = "/" onClick={()=> setTab("/")}>
      {tab ==="/" ?  <Home style = {{color: "rgb(109, 33, 0)"}}/>:<HomeOutlined style = {{color: "rgb(109, 33, 0)"}}/> }
      </Link>
      {/* <Link to = "/" onClick={()=> setTab("/")}>
      {tab ==="/" ? <Typography > Home <Home style = {{color: "rgb(248, 182, 147)"}}/></Typography>: <Typography > Home <HomeOutlined style = {{color: "rgb(248, 182, 147)"}}/></Typography> }
      </Link> */}
      
      <Link to = "/newpost" onClick={()=> setTab("/newpost")}>
      {tab ==="/newpost" ? <Add style = {{color: "rgb(109, 33, 0)"}}/>:  <AddOutlined style = {{color: "rgb(109, 33, 0)"}}/>}
      </Link>
      {/* <Link to = "/newpost" onClick={()=> setTab("/newpost")}>
      {tab ==="/newpost" ?<Typography > Add  <Add style = {{color: "rgb(248, 182, 147)"}}/> </Typography>: <Typography > Add  <AddOutlined style = {{color: "rgb(248, 182, 147)"}}/></Typography>}
      </Link> */}

      <Link  to = "/search" onClick={()=> setTab("/search")}>
      {tab ==="/search" ? <Search style = {{color: "rgb(109, 33, 0)"}}/> : <SearchOutlined style = {{color: "rgb(109, 33, 0)"}}/>}

      </Link>

      <Link to = "/account" onClick={()=> setTab("/account")}>
      {tab ==="/account" ? <AccountCircle style = {{color: "rgb(109, 33, 0)"}} /> : <AccountCircleOutlined style = {{color: "rgb(109, 33, 0)"}}/>}
      </Link>
      
      <Link to = "/addfunds" onClick={()=> setTab("/addfunds")}>
      {tab ==="/addfunds" ? <AccountCircle style = {{color: "rgb(109, 33, 0)"}} /> : <AccountCircleOutlined style = {{color: "rgb(109, 33, 0)"}}/>}
      </Link>
      

    </div>
  )
}

export default Header
