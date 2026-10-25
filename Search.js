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
        Container.innerHTML = Container.innerHTML + `<div class="result"><a href="${Links[i]}" target="_blank"><h1>${Titles[i]}</h1><span>${Descs[i]}</span></a></div>`;
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
  let titleNormalized;
  if (FixedTitle == FixedLink) {
    titleNormalized = true;
  } else {
    titleNormalized = false;
  }
  if (!Link.startsWith("http://") || !Link.startsWith("https://")) {
    FixedLink = "http://" + Link;
  }
  Links.push(FixedLink);
  if (Title == Link) {
    FixedTitle = FixedLink;
  }
  if (FixedLink.startsWith("http://")) {
    Titles.push(FixedTitle.slice(7,FixedTitle.length));
  } else {
    Titles.push(FixedTitle.slice(8,FixedTitle.length));
  }
  Descs.push(Description);
  if (RegisterVariants == true) {
    for (let i = 0; i < TLDs.length-1; i++) {
      Links.push(DeregisterTLD(FixedLink, i)+TLDs[i]);
      if (titleNormalized == false) {
        if (FixedLink.startsWith("http://")) {
          Titles.push(DeregisterTLD(FixedTitle.slice(7,FixedTitle.length),1)+TLDs[i]);
        } else if (!FixedLink.startsWith("http://")) {
          Titles.push(DeregisterTLD(FixedTitle.slice(8,FixedTitle.length),1)+TLDs[i]);
        }
      } else {
        if (FixedLink.startsWith("http://")) {
          Titles.push(DeregisterTLD(FixedTitle,1)+TLDs[i]);
        } else if (!FixedLink.startsWith("http://")) {
          Titles.push(DeregisterTLD(FixedTitle,1)+TLDs[i]);
        }
      }
      Descs.push("This page does not have an associated description.");
    }
  }
}

RegisterLink("doggodgcodes.github.io", "The doggodgcodes website!", "Website");
