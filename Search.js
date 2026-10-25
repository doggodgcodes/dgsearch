const SearchBar = document.getElementById("searchBar");
const Container = document.getElementById("container");
let Links = [];
let Titles = [];
let Descs = [];
let TLDs = [".com",".net",".co",".io",".github.io"]
window.RegisterVariants = true;

document.addEventListener("keydown", function(e) {
  if (e.key == "Enter") {
    Container.innerHTML = "<ul";
    for (let i = 0; i < Links.length-1; i++) {
      if (Links[i].includes(SearchBar.value)) {
        Container.innerHTML = Container.innerHTML + `<a href="${Links[i]}"><h1>${Titles[i]}</h1><br><br><span>${Descs[i]}</span></a><br><br>`;
      }
    }
  }
});

function DeregisterTLD(Link, Index) {
  return Link.slice(0, (TLDs.length-Index)-1);
}

function RegisterLink(Link, Title = Link, Description = "This page does not have an associated description.", RegisterVariants = window.RegisterVariants) {
  let FixedLink = Link;
  let FixedTitle = Title;
  if (!Link.startsWith("http://") || !Link.startsWith("https://")) {
    FixedLink = "http://" + Link;
  }
  Links.push(FixedLink);
  if (Title == Link) {
    FixedTitle = FixedLink;
  }
  if (FixedLink.startsWith("http://")) {
    Titles.push(FixedTitle.slice(6,FixedTitle.length-1));
  } else {
    Titles.push(FixedTitle.slice(7,FixedTitle.length-1));
  }
  Descs.push(Description);
  if (RegisterVariants == true) {
    for (let i = 0; i < TLDs.length-1; i++) {
      Links.push(DeregisterTLD(FixedLink, i)+TLDs[i]);
      if (FixedLink.startsWith("http://")) {
        Titles.push(DeregisterTLD(FixedTitle.slice(6,FixedTitle.length-1),1)+TLDs[i]);
      } else {
        Titles.push(DeregisterTLD(FixedTitle.slice(7,FixedTitle.length-1),1)+TLDs[i]);
      }
      Descs.push("This page does not have an associated description.");
    }
  }
}

RegisterLink("doggodgcodes.github.io");