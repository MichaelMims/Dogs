import react from 'react'
import { PetProp, ListProp } from '../../utils/utils'
import Loading from '../utils/Loading'
import styled from 'styled-components'

const Text = styled.span`
font-size: 1.4rem;
@media (max-width: 768px) {
    // font-size: 2em;
}
`

const ImageContainer = styled.div`
display: flex;
// flex: 0 0 100px;
// justify-content: center;
// align-items: center;
// overflow: hidden;
`
const ItemImage = styled.img`
width: 100%;
height: 20rem; 
object-fit: fill; 
`
const ItemTitle = styled.div`
font-size: 2em;
// margin: 0px;
font-weight: bold;
`

const ItemSubTitle = styled.div`

`


const InfoTextHeading = styled.span`
font-weight: bold;
display: block;
margin-bottom: 0px;
`

const ItemDetailLink = styled.a`
text-decoration: none;

:hover {
    color: red;
    text-decoration: none;
    // border: 1px dotted red;
}
`

const CardInfoBar = styled.div`
display: grid;
grid-template-columns: 1fr 1fr 1fr;
margin: 10px 0px;
`

const Info = styled.div`
padding: 10px;
`

const Divider = styled.div`
display: block;
height: 1px;
border: 0;
border-top: 1px solid #ccc;
margin: .2em 1em;
padding: 0;
`

const Card = styled.div`
display: grid;
// grid-gap: .5rem;
align-items: center;
font-family: 'Amatic SC', cursive;
width: 22rem;
padding: 1rem;
margin: 2rem;
// margin: 15px;
box-shadow: 10px 10px 50px 10px gray;
`

function ListItem({ pet }: PetProp) {
    return (
        <Card>
            <ImageContainer>
                <ItemImage src={pet.image} />
            </ImageContainer>
            <ItemTitle>{pet.name}</ItemTitle>
            <ItemSubTitle>{pet.sex}</ItemSubTitle>
            {/* <Text>{pet.sex}</Text> */}
            <CardInfoBar>
                <Info>
                    <InfoTextHeading>Breed</InfoTextHeading>
                    <Divider></Divider>
                    <Text>{pet.breed}</Text>
                </Info>
                {/* <Info>
                    <InfoTextHeading>Sex</InfoTextHeading>
                    <Divider></Divider>
                    <Text>{pet.sex}</Text>
                </Info> */}
                <Info>
                    <InfoTextHeading>Weight</InfoTextHeading>
                    <Divider></Divider>
                    <Text>{pet.weight}</Text>
                </Info>
                <Info>
                    <InfoTextHeading>Age</InfoTextHeading>
                    <Divider/>
                    <Text>{pet.age}</Text>
                </Info>
            </CardInfoBar>
            <ItemDetailLink href={pet.url}>More Details</ItemDetailLink> 
        </Card>
    )
}

const Container = styled.div`
text-align: center;
margin: 0% 15%;
margin-bottom: 50px;
`

const Message = styled.h1`
font-family: 'Josefin Slab', serif;
`

const ListContainer = styled.div`
display: flex;
flex-direction: row;
flex-wrap: wrap;
border: none;
align-items: stretch;
justify-content: center;
`

function List({ pets }: ListProp) {
    const list = () => {
        return (
            <>
                {pets.map((pet, index) => {
                    return <ListItem key={index} pet={pet} />
                })}
            </>

        )
    }

    return (
        <Container>
            <Message>
                {pets.length} dog{pets.length !== 1 ? "s" : ""} available for adoption in Houston
            </Message>
            <ListContainer>
                {list()}
            </ListContainer>
        </Container>
    )
}

export default List;