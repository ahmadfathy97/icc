var toggleNav = document.getElementById('toggle-nav'),
    navBar = document.getElementById('nav-bar'),
    load = document.getElementById('load-wrapp')
toggleNav.onclick = ()=>{
  if(navBar.dataset.toggle == "hidden"){
    navBar.classList.add('show')
    toggleNav.classList.add('active-btn')
    navBar.dataset.toggle = "show"
  } else{
    navBar.classList.remove('show')
    navBar.dataset.toggle = "hidden"
    toggleNav.classList.remove('active-btn')
  }
}
window.onload = ()=>{
  handleLoading();
}
function handleLoading() {
  document.body.style.overflow = 'auto';
  load.style.display = 'none';
  let date = new Date();
  let year = date.getFullYear();
  document.getElementById("year").textContent = year;
}
