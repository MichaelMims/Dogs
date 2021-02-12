import React, { useEffect, useState } from 'react';
import { Pet } from './utils/utils'
import List from './components/list/List'
import Loading from './components/utils/Loading'
import { getAllPets } from './sites/sites'
import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css'

import styled from 'styled-components'

const Application = styled.div`
height:100%;
`

const Nav = styled.div`

`

const Title = styled.a`

`

const Footer = styled.div`
`
const FooterText = styled.p`
`

function App() {
  let emptyArray: Pet[] = []
  const [loading, setLoading] = useState(false)
  const [adoptablePets, setAdoptablePets] = useState(emptyArray)

  useEffect(() => {
    setLoading(true)
    console.log(`${process.env.REACT_APP_API_BASE_URL}/pets`)
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/pets`)
      .then((res: any) => {
        let last_modified = res.data.last_modified;
        let count = res.data.count;
        let pets = res.data.pets;
          const sorted = pets.sort((a: Pet, b: Pet) => {
            const aName = a.name.toLowerCase();
            const bName = b.name.toLowerCase();

            if (aName < bName)
              return -1
            if (bName < aName)
              return 1
            else
              return 0;
          })
        setAdoptablePets(sorted)
        setLoading(false)
    } )
    .catch((err) => {
      console.log(err)
    })
  }, [])

  return (
    <Application>
      { loading ?
      <Loading message="Loading adorable adoptable canines"/> 
          : 
          <List pets={adoptablePets}/>   
      }

    </Application>
  );
}

export default App;
