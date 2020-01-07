function loadobject (mtlFile, objFile){
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000);
  var renderer = new THREE.WebGLRenderer();
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild( renderer.domElement );

  var obj;
  var mtl = new THREE.MTLLoader()
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
        },
        function ( xhr ) {
      		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
          //document.querySelector('.load-text').textContent = ( xhr.loaded / xhr.total * 100 ) + '%';
      	},
      	function ( error ) {
      		console.log( 'An error happened' );
        }
      );
  } );

  var objProperties = {
    color: 0x0080aa,
    bg: 0xffffff,
    autoRotation: true,
    title: 'Iron Man',
    lightColor: 0xffffff,
    lightHelper: false
  };

  var ambientLight = new THREE.AmbientLight( objProperties.lightColor, 0.4 );
  scene.add( ambientLight );

  //scene background
  renderer.setClearColor(objProperties.bg);

  camera.position.z = 5;

  function animate() {
  	requestAnimationFrame( animate );
  	renderer.render( scene, camera );
    if(objProperties.autoRotation){
      obj.rotation.y += .01;
    }
  }

  window.addEventListener('resize', function(){
    renderer.setSize(innerWidth, innerHeight);
    camera.updateProjectionMatrix();
  });

  //controls
  function objControl(obj){

      const gui = new dat.GUI({ autoPlace: false });
      var f1 = gui.addFolder('position');
      f1.add(obj.position, 'x', -5, 5).onChange = function(e){
        obj.position.x = e;
      };
      f1.add(obj.position, 'y', -5, 5).onChange = function(e){
        obj.position.y = e;
      };
      f1.add(obj.position, 'z', -5, 5).onChange = function(e){
        obj.position.z = e;
      };
      var f2 = gui.addFolder('rotation');
      f2.add(obj.rotation, 'x', -5, 5).onChange = function(e){
        obj.rottion.x = e;
      };
      f2.add(obj.rotation, 'y', -5, 5).onChange = function(e){
        obj.rotation.y = e;
      };
      f2.add(obj.rotation, 'z', -5, 5).onChange = function(e){
        obj.rotation.z = e;
      };

      var f3 = gui.addFolder('scene');
      f3.add(objProperties, 'title').onChange(
        function (e){
          document.querySelector('h1').textContent = e;
        }
      )
      // f3.addColor(objProperties, 'color').onChange(
      //   function(e){
      //     obj.material.color.set( objProperties.color );
      //   }
      // )
      f3.addColor(objProperties, 'bg').onChange(
        function(e){
          renderer.setClearColor( objProperties.bg );
        }
      )
      f3.add(objProperties, 'autoRotation')

      var f4 = gui.addFolder('light');
      f4.addColor( objProperties, 'lightColor').onChange(
        function(e){
          ambientLight.color.setHex( objProperties.lightColor );
        }
      );
      f1.open();
      f2.open();
      f3.open();
      f4.open();

      //gui.close();
      var customContainer = document.getElementById('my-gui-container');
      customContainer.appendChild(gui.domElement);
  }

  window.onresize = function(){
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.updateProjectionMatrix();
  };
}
