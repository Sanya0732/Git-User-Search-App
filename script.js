// logic handle for github api fetching and theme toggle
// searchbtn and searchinput are used to get the username from input
// with the help of id we can get the info
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
// usercard is for displaying the user info
const userCard = document.getElementById('userCard');
// toggleBtn is used to toggle the theme between light and dark
// querySelector is used to select the element with class theme-toggle
const toggleBtn = document.querySelector('.theme-toggle');
const body = document.body;

// toggle btn is used to toggle the theme btw light and dark
// when the button is clicked, it toggles the class dark in the body
toggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark');
    const isDark = body.classList.contains('dark');
    // innerhtml is used to change the content of button
    toggleBtn.innerHTML=`
    <span>${isDark ? 'Light': 'Dark'}</span>
    <i class="fas ${isDark ? 'fa-sun' : 'fa-moon'}"></i>
    `;
});

// on click of search button it will fetches the info of user from github api
searchBtn.addEventListener('click', () => {
  // trime to removing any extra space
  const username = searchInput.value.trim();
  // if empty return nothing
  if (username === '') return;
  // fetch is used to get the data from the api 
  fetch(`https://api.github.com/users/${username}`)
    // then is used to handle the response from the api
    .then(res => res.json())
    //res.json converting the response to json
    .then(data => {
      // if the user is not found, it will display a message
      userCard.innerHTML = ''; 
      if (data.message === "Not Found") {
        userCard.innerHTML = `<p>User not found.</p>`;
      } else {
        // if user is found, it will display the user info
        // innerHTML is used to set the content of userCard
userCard.innerHTML = `
  <div class="card">
    <div class="top-section">
      <img src="${data.avatar_url}" alt="Avatar" class="avatar">
      <div class="user-info">
        <h2>${data.name || data.login}</h2>
        <p class="username">@${data.login}</p>
        <p class="join-date">Joined ${new Date(data.created_at).toLocaleDateString()}</p>
      </div>
    </div>
    <p class="bio">${data.bio || 'This profile has no bio'}</p>
    
    <div class="stats">
      <div><p>Repos</p><p class="count">${data.public_repos}</p></div>
      <div><p>Followers</p><p class="count">${data.followers}</p></div>
      <div><p>Following</p><p class="count">${data.following}</p></div>
    </div>

    <div class="links">
      <p><i class="fa-solid fa-location-dot"></i> ${data.location || 'Not Available'}</p>
      <p><i class="fa-brands fa-twitter"></i> ${data.twitter_username || 'Not Available'}</p>
      <p><i class="fa-solid fa-link"></i> <a href="${data.blog}" target="_blank">${data.blog || 'Not Available'}</a></p>
      <p><i class="fa-solid fa-building"></i> ${data.company || 'Not Available'}</p>
    </div>
  </div>
`;
      }
    })
    //is any error while fetching catch will display error
    .catch(err => {
      userCard.innerHTML = `<p>Something went wrong. Try again!</p>`;
    });
});
