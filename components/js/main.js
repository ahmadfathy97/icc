let params = new URLSearchParams(document.location.search.substring(1)),
    name = params.get("name"),
    container = document.getElementsByClassName('container')[0],
    infoBtn = document.getElementById('infoBtn'),
    info = document.getElementById('info'),
    objName = document.getElementById('objName'),
    objDesc = document.getElementById('details'),
    closInfo = document.getElementById('closeInfo');
if(name){
    fetch('./data/components.json')
    .then(res => res.json())
    .then((data)=>{
      let comp = data.components.filter((comp)=>{
        return comp.id == name
      });
      if(comp && comp.length){
        //console.log(comp[0].id, name);
        loadobject(comp[0].mtlFile, comp[0].objFile);
        details(comp[0].name, comp[0].description);
      } else {
        //console.log('مفيش الكلام ده حضرتك وبطل تلعب في اللينك');
        container.innerHTML =
          `<div class="col-md-4 component">
            مفيش الكلام ده حضرتك وبطل تلعب في اللينك
          </div>
          `
      }
    })
} else{
  document.getElementById('comp-load').style.display = "none";
  fetch('./data/components.json')
  .then(res => res.json())
  .then((data)=>{
    data.components.forEach((comp)=>{
      container.innerHTML +=
      `
        <div class="card">
          <img src="./images/test.jpg" class="card-img-top" width="200" height="200" alt="">
          <div class="card-body">
            <h3 class="card-title">${comp.name}</h3>
            <p class="card-text">${comp.description}</p>
            <a href="/components/?name=${comp.id}" class="btn btn-primary">شاهد المكون 3D</a>
          </div>
        </div>
      `
    })
  })
}

infoBtn.addEventListener('click', openInfoCon);
closeInfo.addEventListener('click', closeInfoCon);



function details(name, desc){
  infoBtn.style.display = "block";
  objName.textContent = name;
  objDesc.textContent = desc;
}

function openInfoCon() {
  info.style.display = "flex";
}
function closeInfoCon(){
  info.style.display = "none";
}
