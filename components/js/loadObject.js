
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000);
let renderer = new THREE.WebGLRenderer({alpha: true});
controls = new THREE.OrbitControls(camera, renderer.domElement);
renderer.setSize(window.innerWidth, window.innerHeight);
let objContainer = document.getElementById('obj-container');
let obj;
function loadobject (mtlFile, objFile){
  objContainer.appendChild( renderer.domElement );
  loading(mtlFile, objFile);
}


function loading(mtlFile, objFile){
  let mtl = new THREE.MTLLoader()
  mtl.setPath( '../components/models/' );
  mtl.load( mtlFile, function ( materials ) {
      materials.preload();
      new THREE.OBJLoader()
      .setMaterials( materials )
      .setPath( '../components/models/' )
      .load(objFile, function ( object ) {
          // object.position.y = -2;
          // object.scale.x = .02;
          // object.scale.y = .02;
          // object.scale.z = .02;
          obj = object
          scene.add( object );
          objControl(object);
          animate();
          document.querySelector('.container').style.display = "none";
          document.getElementById('comp-load').style.display = "none";
        },
        function ( xhr ) {
          let percent = Math.ceil( ( xhr.loaded / xhr.total * 100 ), 2 ) + '%'
      		console.log( percent);
          document.getElementById('load-percent').textContent = percent;
          document.querySelector('.fill').style.width = percent;

      	},
      	function ( error ) {
      		console.log( 'An error happened' );
        }
      );
  } );
}

let objProperties = {
  ['لون النص']: '#222222',
  ['الخلفية']: '#dddddd',
  ['الدوران الآلي']: true,
  ['الإضاءة']: 0xffffff,
  ['إعادة تعيين']: function (){
    this.color= '#222222';
    this.bg= '#dddddd';
    //this.autoRotation= true;
    this.lightColor= 0xffffff;
    document.getElementById('compName').style.color = objProperties.color;
    document.body.style.background = objProperties.bg;
    ambientLight.color.setHex( objProperties.lightColor );
    obj.position.set(0,0,0);
    obj.rotation.set(0,0,0);
    // camera.position.z = 5;
    controls.reset();
    camera.position.set(0,0,5)
  }
};
let ambientLight = new THREE.AmbientLight( objProperties.lightColor, 0.4 );
scene.add( ambientLight );
//scene background
document.body.style.background = objProperties.bg;
camera.position.z = 5;
function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
  if(objProperties['الدوران الآلي']){
    obj.rotation.y += .005;
  }
}

window.addEventListener('resize', onResize);

  //controls
function objControl(obj){

    const gui = new dat.GUI({ autoPlace: false });

    //position
    let f1 = gui.addFolder('الموضع');
    f1.add(obj.position, 'x', obj.position.x - 25, obj.position.x + 25)
    .onChange = function(e){
      changProp(e)
    };
    f1.add(obj.position, 'y', obj.position.y - 25, obj.position.y + 25)
    .onChange = function(e){
      changProp(e)
    };
    f1.add(obj.position, 'z', obj.position.z - 25, obj.position.z + 25)
    .onChange = function(e){
      changProp(e)
    };

    //rotation
    let f2 = gui.addFolder('الدوران');
    f2.add(obj.rotation, 'x', obj.rotation.x - 5, obj.rotation.x + 5)
    .onChange = function(e){
      changProp(e)
    };
    f2.add(obj.rotation, 'y', obj.rotation.y - 5, obj.rotation.y + 5)
    .onChange = function(e){
      changProp(e)
    };
    f2.add(obj.rotation, 'z', obj.rotation.z - 5, obj.rotation.z + 5)
    .onChange = function(e){
      changProp(e)
    };

    //scene
    let f3 = gui.addFolder('المشهد');
    f3.add(objProperties, ['الدوران الآلي'])
    f3.addColor(objProperties, ['لون النص']).onChange(
      function(e){
        document.getElementById('compName').style.color = objProperties['لون النص']
      }
    )
    f3.addColor(objProperties, ['الخلفية']).onChange(
      function(e){
        document.body.style.background = objProperties['الخلفية'];
      }
    )
    f3.addColor( objProperties, ['الإضاءة']).onChange(
      function(e){
        ambientLight.color.setHex( objProperties['الإضاءة'] );
      }
    );
    f3.add(objProperties, ['إعادة تعيين'])
    f1.open();
    f2.open();
    f3.open();

    //gui.close();
    document.getElementById('my-gui-container').style.display = "block";
    let customContainer = document.getElementById('my-gui-container');
    customContainer.appendChild(gui.domElement);
}

function changProp(e){
  obj.rotation.x = e;
  obj.rotation.y = e;
  obj.rotation.z = e;
  obj.position.x = e;
  obj.position.y = e;
  obj.position.z = e;
}
function onResize(){
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.updateProjectionMatrix();
};
