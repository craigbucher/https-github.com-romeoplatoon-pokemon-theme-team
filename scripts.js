async function generatePokemon() {
    const rand = getRandomInt(100); 
    // console.log(rand)
    // actually queries API with random number
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${rand}/`);
    // console.log(response)
    // returns the type url for the pokemon generated above
    const pokeType = response.data.types[0].type.url;
    // console.log(pokeType)
    // gets the default icon/sprite url for this random pokemon
    const typeUrl = response.data.sprites.front_default;
    // console.log(typeUrl)

    let img = document.createElement('img');    // Create new 'img' element
    img.src = typeUrl;                          // based on response 'typeUrl'
    document.getElementById("sec").appendChild(img); // append it in the document to the "sec" element

    for (let i = 0; i < 5; i++){            // loop 5 times
        await getPokeFromType(pokeType);    // call to API
    }
}

async function getPokeFromType(pokeType){
    // == response.data.types[0].type.url (from other function)
    const response = await axios.get(pokeType);
    const pokePage = response.data.pokemon[getRandomInt(response.data.pokemon.length)].pokemon.url;
    // response.data.pokemon = returns all pokemon of same type
    // getRandomInt(response.data.pokemon.length) = returns pokemon with id of random number
    // .pokemon.url = get url for this specific pokemon
    // console.log(response.data.pokemon[getRandomInt(response.data.pokemon.length)].pokemon.url);
    const pokeData = await axios.get(pokePage);
    let img = document.createElement('img');
    // extract sprite from pokemon data
    img.src = pokeData.data.sprites.front_default;
    document.getElementById("sec").appendChild(img);
}


function getRandomInt(max){
    return Math.floor(Math.random()*max)
}