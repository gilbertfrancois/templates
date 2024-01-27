uniform sampler2D iChannel0;
uniform vec2 iResolution;
varying vec2      vUv;

#define RENDER_MODE 1

void main() {
   
#if RENDER_MODE == 0
	gl_FragColor = vec4(texture2D(iChannel0, vUv).rgb, 1.0);
#elif RENDER_MODE == 1
    vec4 col = vec4(0.0);
    col += vec4(texture2D(iChannel0, vUv).rgb, 0.0); // +
        // vec4(texture2D(iChannel0, vUv + vec2(1.0 / iResolution.x, 0.0)).rgb, 0.15) +
        // vec4(texture2D(iChannel0, vUv - vec2(1.0 / iResolution.x, 0.0)).rgb, 0.15);
    gl_FragColor = col;
#endif
}

