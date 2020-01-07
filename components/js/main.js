let params = new URLSearchParams(document.location.search.substring(1));
let name = params.get("name");
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
        $('.row').append(
          `<div class="col-md-4 component">
            مفيش الكلام ده حضرتك وبطل تلعب في اللينك
          </div>
          `
        )
      }
    })
} else{
  fetch('./data/components.json')
  .then(res => res.json())
  .then((data)=>{
    data.components.forEach((comp)=>{
      $('.row').append(
      `<div class="col-md-4 component">
        <div class="card">
          <img src="./images/test.jpg" class="card-img-top" alt="">
          <div class="card-body">
            <h5 class="card-title">${comp.name}</h5>
            <p class="card-text">${comp.description}</p>
            <a href="/components/?name=${comp.id}" class="btn btn-primary">go to componetn</a>
          </div>
        </div>
      </div>
      `)
    })
  })
}
