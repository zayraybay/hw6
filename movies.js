// First, sign up for an account at https://themoviedb.org
// Once verified and signed-in, go to Settings and create a new
// API key; in the form, indicate that you'll be using this API
// key for educational or personal use, and you should receive
// your new key right away.



// For this exercise, we'll be using the "now playing" API endpoint
// https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US

// Note: image data returned by the API will only give you the filename;
// prepend with `https://image.tmdb.org/t/p/w500/` to get the 
// complete image URL

window.addEventListener('DOMContentLoaded', async function(event) {
  // Step 1: Construct a URL to get movies playing now from TMDB, fetch
  // data and put the Array of movie Objects in a variable called
  // movies. Write the contents of this array to the JavaScript
  // console to ensure you've got good data
  // ⬇️ ⬇️ ⬇️
  let apiKey = `b0d16f6d15d68b0fbf7a55aea1b2b602`
  let response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US`)
  // console.log(response)
  let db = firebase.firestore()
  let movies = await response.json()
  console.log(movies)

  // ⬆️ ⬆️ ⬆️ 
  // End Step 1
  
  // Step 2: 
  // - Loop through the Array called movies and insert HTML
  //   into the existing DOM element with the class name .movies
  // - Include a "watched" button to click for each movie
  // - Give each "movie" a unique class name based on its numeric
  //   ID field.
  // Some HTML that would look pretty good... replace with real values :)
  // <div class="w-1/5 p-4 movie-abcdefg1234567">
  //   <img src="https://image.tmdb.org/t/p/w500/moviePosterPath.jpg" class="w-full">
  //   <a href="#" class="watched-button block text-center text-white bg-green-500 mt-4 px-4 py-2 rounded">I've watched this!</a>
  // </div>
  // ⬇️ ⬇️ ⬇️

  
  let watchedSnapshot = await db.collection('watched').get()
  let watchedChecks = watchedSnapshot.docs

  for (let i = 0; i < movies.results.length; i++){
    let movie = movies.results[i]
    // console.log(movie)
    let movieDesc = document.querySelector('.movies')
    movieDesc.insertAdjacentHTML('beforeend', `
    <div class='id-${movie.id} w-1/5 p-4'>
      <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" class="w-full">
      <a href="#" class="watched-button block text-center text-white bg-green-500 mt-4 px-4 py-2 rounded">I've watched this!</a>
    </div>`)
    // console.log(watchedChecks[0].id)
    let movieIdCheck = `id-${movie.id}`
    
    for (let j = 0; j < watchedChecks.length; j++) {
      let watchedCheck = watchedChecks[j].id
      console.log(watchedCheck)
    
      if (movieIdCheck == watchedCheck[j]){
        document.querySelector(`.id-${movie.id}`).classList.add('opacity-20')
      }
    }

         
  // ⬆️ ⬆️ ⬆️ 
  // End Step 2

  // Step 3: 
  // - Attach an event listener to each "watched button"
  // - Be sure to prevent the default behavior of the button
  // - When the "watched button" is clicked, changed the opacity
  //   of the entire "movie" by using .classList.add('opacity-20')
  // - When done, refresh the page... does the opacity stick?
  // - Bonus challenge: add code to "un-watch" the movie by
  //   using .classList.contains('opacity-20') to check if 
  //   the movie is watched. Use .classList.remove('opacity-20')
  //   to remove the class if the element already contains it.
  // ⬇️ ⬇️ ⬇️

 
  let watchedButton = document.querySelector(`.id-${movie.id} .watched-button`)
  watchedButton.addEventListener('click', async function(event){
    event.preventDefault()
    //Add opacity to movie poster and button when button is clicked
    document.querySelector(`.id-${movie.id}`).classList.add('opacity-20')
    
    //Add data to firebase when button is clicked
    await db.collection('watched').doc(`id-${movie.id}`).set({})
    
    // if (watchedButton.classList.contains('opacity-20')){
    //   document.querySelector(`.id-${movie.id} .watched-button`).classList.remove('opacity-20')
    // }
  })

  }
  // ⬆️ ⬆️ ⬆️ 
  // End Step 3

  // Step 4: 
  // - Properly configure Firebase and Firebase Cloud Firestore
  // - Inside your "watched button" event listener, you wrote in
  //   step 3, after successfully setting opacity, persist data
  //   for movies watched to Firebase.
  // - The data could be stored in a variety of ways, but the 
  //   easiest approach would be to use the TMDB movie ID as the
  //   document ID in a "watched" Firestore collection.
  // - Hint: you can use .set({}) to create a document with
  //   no data – in this case, the document doesn't need any data;
  //   if a TMDB movie ID is in the "watched" collection, the 
  //   movie has been watched, otherwise it hasn't.
  // - Modify the code you wrote in Step 2 to conditionally
  //   make the movie opaque if it's already watched in the 
  //   database.
  // - Hint: you can use if (document) with no comparison
  //   operator to test for the existence of an object.
})