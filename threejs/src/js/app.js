import * as THREE from "three";
import Stats from "three/examples/jsm/libs/stats.module.js";
import fragment from "../shader/fragment.glsl";
import vertex from "../shader/vertex.glsl";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import { GUI } from "three/examples/jsm/libs/lil-gui.module.min.js";

export default class Sketch {
    constructor(options) {
        this.scene = new THREE.Scene();
        // this.gui = new GUI();
        this.stats = new Stats();

        this.container = options.dom;
        this.width = this.container.offsetWidth;
        this.height = this.container.offsetHeight;
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(this.width, this.height);
        this.renderer.setClearColor(0xeeeeee, 1);
        this.renderer.outputEncoding = THREE.sRGBEncoding;

        this.container.appendChild(this.renderer.domElement);
        this.container.appendChild(this.stats.dom);

        this.camera = this.setup_camera("perspective");
        this.camera.position.set(0, 0, 2);

        this.controls = new OrbitControls(
            this.camera,
            this.renderer.domElement,
        );
        this.time0 = Date.now();
        this.time = this.time0;

        this.isPlaying = true;

        this.add_objects();
        this.resize();
        this.render();
        this.setup_event_listeners();
        // this.settings();
    }

    // settings() {
    //     this.settings = {
    //         progress: 0,
    //     };
    //     this.gui.add(this.settings, "progress", 0, 1, 0.01);
    // }

    setup_camera(type) {
        let camera = undefined;
        if (type == "perspective") {
            camera = new THREE.PerspectiveCamera(
                70,
                window.innerWidth / window.innerHeight,
                0.001,
                1000,
            );
        } else {
            var frustumSize = 10;
            var aspect = window.innerWidth / window.innerHeight;
            camera = new THREE.OrthographicCamera(
                (frustumSize * aspect) / -2,
                (frustumSize * aspect) / 2,
                frustumSize / 2,
                frustumSize / -2,
                -1000,
                1000,
            );
        }
        return camera;
    }

    setup_event_listeners() {
        window.addEventListener("resize", this.resize.bind(this));
    }

    resize() {
        this.width = this.container.offsetWidth;
        this.height = this.container.offsetHeight;
        this.renderer.setSize(this.width, this.height);
        this.camera.aspect = this.width / this.height;
        this.camera.updateProjectionMatrix();
    }

    load_texture(url) {
        var texture = new THREE.TextureLoader().load(url);
        texture.encoding = THREE.sRGBEncoding;
        // texture.wrapS = THREE.RepeatWrapping;
        // texture.wrapT = THREE.RepeatWrapping;
        return texture;
    }

    add_objects() {
        this.material = new THREE.ShaderMaterial({
            extensions: {
                derivatives: "#extension GL_OES_standard_derivatives : enable",
            },
            side: THREE.DoubleSide,
            uniforms: {
                time: { type: "f", value: 0 },
                resolution: { type: "v4", value: new THREE.Vector4() },
                uvRate1: {
                    value: new THREE.Vector2(1, 1),
                },
            },
            // wireframe: true,
            // transparent: true,
            vertexShader: vertex,
            fragmentShader: fragment,
        });

        this.geometry = new THREE.PlaneGeometry(1, 1, 1, 1);

        this.plane = new THREE.Mesh(this.geometry, this.material);
        this.scene.add(this.plane);
    }

    stop() {
        this.isPlaying = false;
    }

    play() {
        if (!this.isPlaying) {
            this.render();
            this.isPlaying = true;
        }
    }

    render() {
        if (!this.isPlaying) return;
        this.time = 0.001 * (Date.now() - this.time0);
        this.material.uniforms.time.value = this.time;
        requestAnimationFrame(this.render.bind(this));
        this.renderer.render(this.scene, this.camera);
        this.stats.update();
    }
}

new Sketch({
    dom: document.getElementById("sketch"),
});
