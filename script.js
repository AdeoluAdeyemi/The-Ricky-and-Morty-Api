//Fetch the div element with the id=App
const app = document.querySelector('#root')

//Call Api using javascript XMLHTTPRequest method 

//Create a request constant and assign a new XMLHttpRequest
const request = new XMLHttpRequest();

//Open a new connectino, using the GET request on the URL endpoint
request.open('GET', 'https://rickandmortyapi.com/api/character', true);

request.onload = () => {
    //Begin accessing JSON data here
    let characters = JSON.parse(request.response)

    if (request.status >= 200 && request.status < 400){
        characters.results.forEach(character => {
            const card = document.createElement('div')
            card.setAttribute('class','card mb-4 box-shadow')

            const image = document.createElement('img')
            image.setAttribute('src', character.image)
            image.setAttribute('alt', character.name)

            const cardBody = document.createElement('div')
            cardBody.setAttribute('class','card-body')

            const cardTitle = document.createElement('h2')
            cardTitle.setAttribute('class', 'card-title')
            cardTitle.textContent = character.name

            const badgeStatus = document.createElement('span')

            if (character.status === 'Dead') {
                badgeStatus.setAttribute('class','badge badge-danger')
                badgeStatus.textContent = character.status    
            }
            else if(character.status === 'Alive'){
                badgeStatus.setAttribute('class','badge badge-success')
                badgeStatus.textContent = character.status
            }
            else {
                badgeStatus.setAttribute('class','badge badge-warning')
                badgeStatus.textContent = character.status
            }

            const badgeSpecies = document.createElement('span')
            if (character.species === 'Alien')
            badgeSpecies.setAttribute('class','badge badge-dark')
            badgeSpecies.textContent = character.species

            if(character.species === 'Human')
            badgeSpecies.setAttribute('class','badge badge-light')
            badgeSpecies.textContent = character.species

            const descriptionList = document.createElement('dl')
            
            const lastKnownLocation = document.createElement('dt')
            lastKnownLocation.textContent = 'Last known location:'

            const lastKnownLocationValue = document.createElement('dd')
            lastKnownLocationValue.textContent = character.location.name
            lastKnownLocationValue.setAttribute('class','lead text-muted')
            
            const firstSeenIn = document.createElement('dt')
            firstSeenIn.textContent = 'First seen in:'

            const firstSeenInValue = document.createElement('dd')
            firstSeenInValue.setAttribute('class','lead text-muted')

            const episodeFirstSeen = document.createElement('span')
            episodeFirstSeen.setAttribute('class', 'badge badge-pill badge-primary')

            //Call a secondary endpoint to retrieve episode first seen in.
            fetch((character.episode[0]), {
                headers: {
                    'Access-Control-Allow-Origin': '*'
                }
            })
            .then((response) => {
                return response.json()
            })
            .then ((episode) => {
                firstSeenInValue.textContent = episode.name + '  '
                episodeFirstSeen.textContent = episode.episode
                firstSeenInValue.appendChild(episodeFirstSeen)
            })  
            .catch((err) => {

            })

            //Append Card to Root Element
            app.appendChild(card)

            card.appendChild(image)
            card.appendChild(cardBody)

            cardBody.appendChild(cardTitle)
            cardBody.appendChild(badgeStatus)
            cardBody.appendChild(badgeSpecies)

            cardBody.appendChild(descriptionList)
            descriptionList.appendChild(lastKnownLocation)
            descriptionList.appendChild(lastKnownLocationValue)
            descriptionList.appendChild(firstSeenIn)
            descriptionList.appendChild(firstSeenInValue)
        });
    }
}

//Send Request
request.send()