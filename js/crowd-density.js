class App {
    constructor() {
        this.scene = new THREE.Scene();
        this.renderer = new THREE.WebGLRenderer({
            antialias: true
        });
        this.camera = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 0.5, 500);
        this.camera.position.z = -19;
        this.camera.position.y = 5;
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        document.body.appendChild(this.renderer.domElement);
        this.renderer.setSize(innerWidth, innerHeight);

        this.renderer.setAnimationLoop(e => this.update(e));

        this.scene.fog = new THREE.FogExp2(0, 0.082);

        const floor = new THREE.Mesh(
            new THREE.BoxGeometry(15, 0.2, 15),
            new THREE.MeshBasicMaterial({
                color: 'lightblue'
            }));
        // this.scene.add(floor);
        const human = new Person();
        var p = 0;
        for (var x = -7.0; x < 7; x++) {

            for (var z = -7.0; z < 7; z++) {

                const hXZ = human.clone();
                const m = new THREE.MeshBasicMaterial();
                m.color.g = m.color.b = m.color.r = 1 - 0.1 * Math.random();
                hXZ.children[0].material = m;

                floor.add(hXZ);
                hXZ.position.x = x + 0.5;
                hXZ.position.z = z + 0.5;
                p++;
            }
        }

        for (var y = -3; y < 3; y++) {
            var floorY = floor.clone();
            this.scene.add(floorY);
            floorY.position.y = 2.5 * y;
        }
    }

    update() {
        this.renderer.render(this.scene, this.camera);
    }
}


class Person extends THREE.Object3D {

    constructor() {

        super();

        //let's make some super basic limbs etc.

        this.skinMaterial = new THREE.MeshBasicMaterial({
            color: 'white',
            wireframe: false
        });

        this.head = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.2, 0.11), this.skinMaterial);
        this.head.position.y = 1.54;
        this.add(this.head)

        this.shoulders = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.2, 0.16), this.skinMaterial);
        this.shoulders.position.y = 1.3;
        this.add(this.shoulders);

        this.hips = new THREE.Mesh(new THREE.BoxGeometry(0.305, 0.22, 0.18), this.skinMaterial);
        this.hips.position.y = 0.79;
        this.add(this.hips);

        this.trunk = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.5, 0.13), this.skinMaterial);
        this.trunk.position.y = 1.1;
        this.add(this.trunk);

        this.leftLeg = new THREE.Mesh(new THREE.BoxGeometry(0.13, 0.44, 0.13), this.skinMaterial);
        this.leftLeg.position.y = 0.5;
        this.leftLeg.position.x = 0.14;
        this.add(this.leftLeg);

        this.rightLeg = this.leftLeg.clone();
        this.rightLeg.position.x *= -1;
        this.add(this.rightLeg);

        this.lowerLeftLeg = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.4, 0.07), this.skinMaterial);
        this.lowerLeftLeg.position.y = 0.2;
        this.lowerLeftLeg.position.x = 0.14;
        this.add(this.lowerLeftLeg);

        this.lowerRightLeg = this.lowerLeftLeg.clone();
        this.lowerRightLeg.position.x *= -1;

        this.add(this.lowerRightLeg);

        this.leftArm = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.35, 0.08), this.skinMaterial);
        this.leftArm.position.y = 1.18;
        this.leftArm.position.x = 0.22;
        this.add(this.leftArm);
        this.rightArm = this.leftArm.clone();
        this.rightArm.position.x *= -1;
        this.add(this.rightArm);

        this.lowerLeftArm = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.35, 0.06), this.skinMaterial);
        this.lowerLeftArm.position.y = 0.93;
        this.lowerLeftArm.position.x = 0.22;
        this.add(this.lowerLeftArm);
        this.lowerRightArm = this.lowerLeftArm.clone();
        this.lowerRightArm.position.x *= -1;
        this.add(this.lowerRightArm);

        this.leftFoot = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.08, 0.2), this.skinMaterial);
        this.leftFoot.position.y = 0.03;
        this.leftFoot.position.x = 0.14;
        this.leftFoot.position.z = 0.04;
        this.add(this.leftFoot);
        this.rightFoot = this.leftFoot.clone();
        this.rightFoot.position.x *= -1;
        this.add(this.rightFoot);

        this.position.y = 0.1;

        const geo = new THREE.Geometry();
        while (this.children.length > 0) {
            geo.mergeMesh(this.children[0]);
            this.remove(this.children[0]);
        }
        const bGeo = new THREE.BufferGeometry().fromGeometry(geo);
        const final = new THREE.Mesh(bGeo, this.skinMaterial);
        this.add(final);
    }
}
const app = new App();