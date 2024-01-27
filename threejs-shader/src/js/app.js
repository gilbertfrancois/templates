import * as THREE from "three"
// import * as dat from "dat.gui";
import {GUI} from "./lib/dat.gui.module"
import Stats from './lib/stats.module'

import fragment_shader_a from "./shader/fragment_a.glsl"
import fragment_shader_b from "./shader/fragment_b.glsl"
import vertex_shader from "./shader/vertex.glsl"


class ShaderCinema {

    constructor(vertex_shader, fragment_shader_a, fragment_shader_b,
        framebuffer_enable = false, framebuffer_size = 1024, framebuffer_antialias = true) {

        // Application settings, stored in a dictionary, so that they can be modified by the DAT gui.
        this.settings = {
            "framebuffer": {
                "enable": framebuffer_enable,
                "size": framebuffer_size,
                "antialias": framebuffer_antialias
            },
            "stats": {"enable": true},
            "debug": {"log": false}
        };
        this.stats = null;
        // this.render_size = new THREE.Vector2(512, 512);
        this.fragment_shader_a = fragment_shader_a;
        this.fragment_shader_b = fragment_shader_b;
        this.vertex_shader = vertex_shader;
        // Normalized coordinates, specified by its center and square minimum size (width or height).
        // The min and max values are computed and dependent on the screen and its aspect ratio.
        this.viewport = {
            "size": 2.0,
            "center": new THREE.Vector2(0.0, 0.0),
            "min": new THREE.Vector2(-1.0, -1.0),
            "max": new THREE.Vector2(1.0, 1.0),
            "ratio": 1.0
        };
        // Normalized coordinates from the window view: 0.0 ≤ mouse.xy ≤ 1.0.
        this.mouse = new THREE.Vector2(0.5, 0.5);

        // Renderer
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.autoClear = false;
        this.container = document.getElementById('container');
        this.container.appendChild(this.renderer.domElement);

        // Uniforms
        this.uniforms_a = {
            iGlobalTime: {type: 'f', value: 0.0},
            iResolution: {value: new THREE.Vector2()},
            iRatio: {type: 'f', value: this.viewport.ratio},
            iMouse: {type: 'v2', value: this.mouse},
            iViewPortMin: {type: 'v2', value: this.viewport.min},
            iViewPortMax: {type: 'v2', value: this.viewport.max},
        };
        this.uniforms_b = {
            iResolution: {
                type: "v2", value: new THREE.Vector2(this.renderer.domElement.width, this.renderer.domElement.height)
            },
            iChannel0: {type: 't', value: null}
        };

        // Render Target A
        this.scene_a = new THREE.Scene();
        this.camera_a = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
        const geometry_a = new THREE.PlaneBufferGeometry(2, 2);
        const material_a = new THREE.ShaderMaterial({
            uniforms: this.uniforms_a,
            vertexShader: this.vertex_shader,
            fragmentShader: this.fragment_shader_a
        });
        const mesh_a = new THREE.Mesh(geometry_a, material_a);
        this.scene_a.add(mesh_a);

        // Render Target B
        this._setup_render_target_a();
        this.scene_b = new THREE.Scene();
        this.camera_b = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
        const geometry_b = new THREE.PlaneBufferGeometry(2, 2);
        const material_b = new THREE.ShaderMaterial({
            uniforms: this.uniforms_b,
            vertexShader: this.vertex_shader,
            fragmentShader: this.fragment_shader_b
        });
        const mesh_b = new THREE.Mesh(geometry_b, material_b);
        this.scene_b.add(mesh_b);

        // Clock
        this.clock = new THREE.Clock();

        // Stats
        this.stats = new Stats();
        if (this.settings.stats.enable) {
            this._toggle_stats();
        }

        // Controls
        this.gui = new GUI();
        const gui_viewport = this.gui.addFolder("Viewport");
        gui_viewport.add(this.viewport.center, "x", -10, 10, 0.01).onFinishChange(this._update_viewport.bind(this));
        gui_viewport.add(this.viewport.center, "y", -10, 10, 0.01).onFinishChange(this._update_viewport.bind(this));
        gui_viewport.add(this.viewport, "size", 0.0001, 10).onFinishChange(this._update_viewport.bind(this));
        gui_viewport.open();
        const gui_settings = this.gui.addFolder("Settings");
        gui_settings.add(this.settings.framebuffer, "antialias", true).onFinishChange(this._setup_render_target_a.bind(this));;

        gui_settings.add(this.settings.stats, "enable", true).name("stats").onFinishChange(this._toggle_stats.bind(this));
        gui_settings.add(this.settings.debug, "log", true).name("debug output");
        gui_settings.open();
        this.gui.close();

        // Listeners
        window.addEventListener('resize', this._onWindowResize.bind(this));
        document.addEventListener('mousemove', function (event) {
            this.mouse.x = (event.clientX / window.innerWidth);
            this.mouse.y = (event.clientY / window.innerHeight);
        }.bind(this), false);

        this._onWindowResize();
    }

    run() {
        requestAnimationFrame(this.run.bind(this));
        if (this.settings.stats.enable) {
            this.stats.update();
        }
        this.renderer.clear();
        if (this.settings.framebuffer.enable) {
            // render target a
            this.renderer.setRenderTarget(this.render_target_a);
            this.renderer.render(this.scene_a, this.camera_a);
            this.renderer.setRenderTarget(null);
            this.uniforms_b.iChannel0.value = this.render_target_a.texture;
            // render target b
            this.renderer.render(this.scene_b, this.camera_b);
        }
        else {
            this.renderer.render(this.scene_a, this.camera_a);
        }
    }

    _onWindowResize() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        if (this.settings.framebuffer.enable) {
            this._setup_render_target_a();
        }
        this._update_viewport();
        this._update_uniforms();
    }

    _update_viewport() {
        this.viewport.ratio = this.renderer.domElement.width / this.renderer.domElement.height;
        let ratio_xy = new THREE.Vector2(1.0, 1.0);
        if (this.viewport.ratio > 1.0) {
            ratio_xy.x = this.viewport.ratio;
        }
        else {
            ratio_xy.y = 1.0 / this.viewport.ratio;
        }
        this.viewport.min.x = this.viewport.center.x - 0.5 * this.viewport.size * ratio_xy.x;
        this.viewport.min.y = this.viewport.center.y - 0.5 * this.viewport.size * ratio_xy.y;
        this.viewport.max.x = this.viewport.center.x + 0.5 * this.viewport.size * ratio_xy.x;
        this.viewport.max.y = this.viewport.center.y + 0.5 * this.viewport.size * ratio_xy.y;
        if (this.settings.debug.log) {
            console.log("viewport: min = (" +
                this.viewport.min.x + " ," + this.viewport.min.y + " ), max = (" +
                this.viewport.max.x + " ," + this.viewport.max.y + " ), center = (" +
                this.viewport.center.x + " ," + this.viewport.center.y + " ), ratio = " + this.viewport.ratio);
        }
    }

    _update_uniforms() {
        this.uniforms_a.iGlobalTime.value += this.clock.getDelta();
        if (this.settings.framebuffer.enable) {
            this.uniforms_a.iResolution.value.x = this.render_target_a.width;
            this.uniforms_a.iResolution.value.y = this.render_target_a.height;
        }
        else {
            this.uniforms_a.iResolution.value.x = this.renderer.domElement.width;
            this.uniforms_a.iResolution.value.y = this.renderer.domElement.height;
        }
        this.uniforms_a.iRatio = this.viewport.ratio;
        this.uniforms_a.iViewPortMin.value = this.viewport.min;
        this.uniforms_a.iViewPortMax.value = this.viewport.max;
        this.uniforms_a.iMouse.value = this.mouse;
        this.uniforms_b.iResolution.value.x = this.renderer.domElement.width;
        this.uniforms_b.iResolution.value.y = this.renderer.domElement.height;
        if (this.settings.debug.log) {
            console.log("render_target_b = (" + this.renderer.domElement.width + ", " + this.renderer.domElement.height + ")");
        }
    }

    _setup_render_target_a() {
        let aspect_ratio = this.renderer.domElement.width / this.renderer.domElement.height;
        let width, height, params;
        if (aspect_ratio > 1.0) {
            width = this.settings.framebuffer.size;
            height = this.settings.framebuffer.size / aspect_ratio;
        }
        else {
            width = this.settings.framebuffer.size * aspect_ratio;
            height = this.settings.framebuffer.size;
        }
        width = Math.floor(width);
        height = Math.floor(height);
        if (this.settings.framebuffer.antialias) {
            params = {minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter}
        }
        else {
            params = {minFilter: THREE.NearestFilter, magFilter: THREE.NearestFilter}
        }
        this.render_target_a = new THREE.WebGLRenderTarget(width, height, params);
        if (this.settings.debug.log) {
            console.log(
                "render_target_a = (" + this.render_target_a.width + ", " + this.render_target_a.height +
                "), ratio = " + aspect_ratio);
        }
        this._update_viewport();
        this.uniforms_b.iChannel0.value = this.render_target_a.texture;
    }

    _toggle_stats() {
        if (this.settings.stats.enable) {
            this.container.appendChild(this.stats.dom);
            this.stats.showPanel(0);
        }
        else {
            this.container.removeChild(this.stats.dom);
        }
    }
}


let shader_cinema = new ShaderCinema(vertex_shader, fragment_shader_a, fragment_shader_b, true, 64, false);
shader_cinema.run();
