const SearchBar = document.getElementById("searchBar");
const Container = document.getElementById("container");
let LinksArray = [];

document.addEventListener("keydown", function(e) {
  if (e.key == "Enter") {
    Container.innerHTML = "<ul>";
    for (let i = 0; i < LinksArray.length-1; i++) {
      if (LinksArray[i].includes(SearchBar.value)) {
        Container.innerHTML += `<li><a href="${a}"><h1>${a}</h1></a></li>`;
      }
    }
    Container.innerHTML = "</ul>";
  }
});