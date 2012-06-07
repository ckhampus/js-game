define(function (require) {
  var THREE = require('three');

  var CabinetCamera = function (left, right, top, bottom, near, far) {
    THREE.OrthographicCamera.call( this );

    this.left = left;
    this.right = right;
    this.top = top;
    this.bottom = bottom;

    this.near = ( near !== undefined ) ? near : 0.1;
    this.far = ( far !== undefined ) ? far : 2000;

    this.updateProjectionMatrix();
  };

  CabinetCamera.prototype = new THREE.OrthographicCamera();
  CabinetCamera.prototype.constructor = CabinetCamera;

  /*
  THREE.OrthographicCamera = function ( left, right, top, bottom, near, far ) {

    THREE.Camera.call( this );

    this.left = left;
    this.right = right;
    this.top = top;
    this.bottom = bottom;

    this.near = ( near !== undefined ) ? near : 0.1;
    this.far = ( far !== undefined ) ? far : 2000;

    this.updateProjectionMatrix();

  };

  THREE.OrthographicCamera.prototype = new THREE.Camera();
  THREE.OrthographicCamera.prototype.constructor = THREE.OrthographicCamera;

  THREE.OrthographicCamera.prototype.updateProjectionMatrix = function () {

    this.projectionMatrix.makeOrthographic( this.left, this.right, this.top, this.bottom, this.near, this.far );

  };
  */
 
 return CabinetCamera;
});