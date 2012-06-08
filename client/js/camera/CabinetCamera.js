define(function (require) {
  var THREE = require('three');

  var CabinetCamera = function (left, right, top, bottom, near, far, angle) {
    THREE.OrthographicCamera.call(this);

    this.left = left;
    this.right = right;
    this.top = top;
    this.bottom = bottom;

    this.near = (near !== undefined) ? near : 0.1;
    this.far = (far !== undefined) ? far : 2000;

    this.angle = (angle !== undefined) ? angle : 0;

    this.updateProjectionMatrix();
  };

  CabinetCamera.prototype = new THREE.OrthographicCamera();
  CabinetCamera.prototype.constructor = CabinetCamera;

  CabinetCamera.prototype.updateProjectionMatrix = function () {
    this.projectionMatrix.makeOrthographic(this.left, this.right, this.top, this.bottom, this.near, this.far);

    var cabinet = new THREE.Matrix4(
      1, 0, 0, 0,
      0, 1, 0, 0,
      (-0.5 * Math.cos(this.angle)), (-0.5 * Math.sin(this.angle)), 1, 0,
      0, 0, 0, 1
    );

    this.projectionMatrix.multiplySelf(cabinet);
  };

  return CabinetCamera;
});