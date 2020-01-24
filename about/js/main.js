let supervisorsContainer = document.getElementById('supervisors'),
    teamContainer = document.getElementById('team');
window.addEventListener('load', bindingOurTeam())
function bindingOurTeam(){
  console.log(526565);
  fetch('../about/assets/team.json')
  .then(res => res.json())
  .then((data)=>{
    console.log(data.team);
    data.team.forEach((member)=>{
      if(member.position == "supervisor"){
        supervisorsContainer.innerHTML +=
        `
        <div class="card-container">
          <div class="card"><img class="avatar" src="../about/images/${member.image}" alt="avatar"/>
            <div class="info">
              <h2>${member.name}</h2>
              <p>${member.job}</p>
            </div>
          </div>
        </div>

        `
      } else{
        teamContainer.innerHTML +=
        `
        <div class="card-container">
          <div class="card"><img class="avatar" src="../about/images/${member.image}" alt="avatar"/>
            <div class="info">
              <h2>${member.name}</h2>
              <p>${member.job}</p>
            </div>
          </div>
        </div>

        `
      }
    })
  })
  .catch((err)=>{
    console.log('err', err);
  })
}
