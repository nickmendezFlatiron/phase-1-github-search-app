
document.addEventListener('DOMContentLoaded', () => {
  const form =  document.querySelector('#github-form')
  
  form.addEventListener('submit',submitForm)


  function submitForm(e) {
    e.preventDefault()
    const searchValue = document.querySelector('#search').value
    //console.log(searchValue)
    fetch(`https://api.github.com/search/users?q=${searchValue}`)
    .then(res => res.json())
    .then(searchResults => {
      searchArr = (Object.values(searchResults)[2])
      document.querySelector('#user-list').innerHTML = ''
      searchArr.forEach(result => { 
        userSearch(result)
      })
    }) 
  }

  //creates a search list result for all matching users from search value 
  function userSearch(result) {
    let ul = document.createElement('ul')
        ul.classList = result.login
        ul.innerHTML = `
          <li class='${result.login}'>Username: ${result.login}</li>
          <li class='${result.login}'><a href ='${result.html_url}' target="_blank" rel="noopener noreferrer">Profile</a></li>
          <li class='${result.login}'><img src='${result.avatar_url} class='${result.login}'></li>
          <br>
        `
    document.querySelector('#user-list').appendChild(ul)
   // console.log(document.querySelectorAll(`li.${result.login}`))
    const userClass = document.querySelector(`li.${result.login}`)
    userClass.addEventListener('click', e => userRepos(e) )
  }

  //pulls up all repos for user who was clicked on
  function userRepos(e) {
    const clickedOnUser = e.target.classList.value
    fetch(`https://api.github.com/users/${clickedOnUser}/repos`)
      .then(res => res.json())
      .then(repos => reposList(repos))
  }

  function reposList(repos) {
    document.querySelector('#repos-list').innerHTML = ''
    repos.forEach(repo =>{
      let ul = document.createElement('ul')
          ul.classList = repo.name
          ul.innerHTML = `
            <li>Repo name: ${repo.name}</li>
            <li><a href ='${repo.html_url}' target="_blank" rel="noopener noreferrer">Repo Link</a></li>
            <li>Watchers: ${repo.watchers_count}</li>
            <br>
          `
          document.querySelector('#repos-list').appendChild(ul)  
    })
    const h2 = document.createElement('h2')
      h2.innerText = `${repos[0].owner.login}'s Repos`
    document.querySelector('#repos-list').prepend(h2)
  } 
})  