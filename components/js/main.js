let params = new URLSearchParams(document.location.search.substring(1));
let name = params.get("name");
let container = document.getElementsByClassName('container')[0];
if(name){
    fetch('./data/components.json')
    .then(res => res.json())
    .then((data)=>{
      var comp = data.components.filter((comp)=>{
        return comp.id == name
      });
      if(comp && comp.length){
        console.log(comp[0].id, name);
        loadobject(comp[0].mtlFile, comp[0].objFile)
      } else {
        console.log('مفيش الكلام ده حضرتك وبطل تلعب في اللينك');
        container.innerHTML =
          `<div class="col-md-4 component">
            مفيش الكلام ده حضرتك وبطل تلعب في اللينك
          </div>
          `
      }
    })
} else{
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
