uniform sampler2D iChannel0;
uniform vec2      iResolution;
varying vec2      vUv;


/* #extension GL_OES_standard_derivatives:enable */

// change this value to compare different interpolation methods.
//
// 0: antialiased blocky interpolation
// 1: linear interpolation
// 2: aliased blocky interpolation
// 3: no antialiasing
#define RENDER_MODE 3

// Calculates the lengths of (a.x, b.x) and (a.y, b.y) at the same time
vec2 v2len(in vec2 a, in vec2 b) {
    return sqrt(a*a+b*b);
}

//
// samples from a linearly-interpolated texture to produce an appearance similar to
// nearest-neighbor interpolation, but with resolution-dependent antialiasing
//
// this function's interface is exactly the same as texture's, aside from the 'res'
// parameter, which represents the resolution of the texture 'tex'.
vec4 textureBlocky(in sampler2D tex, in vec2 uv, in vec2 res) {

    // enter texel coordinate space.
    uv *= res;

    // find the nearest seam between texels.
    vec2 seam = floor(uv + 0.5); // find the nearest seam between texels.

    // here's where the magic happens. scale up the distance to the seam so that all
    // interpolation happens in a one-pixel-wide space.
    uv = (uv - seam)/v2len(dFdx(uv), dFdy(uv)) + seam;
    uv = clamp(uv, seam - 0.5, seam + 0.5); // clamp to the center of a texel.

    return texture2D(tex, uv/res, -1000.0); // convert back to 0..1 coordinate space.
}


// simulates nearest-neighbor interpolation on a linearly-interpolated texture
//
// this function's interface is exactly the same as textureBlocky's.
vec4 textureUgly(in sampler2D tex, in vec2 uv, in vec2 res) {
    return texture2D(tex, (floor(uv*res) + 0.5)/res, -1000.0);
}


void main() {

#if RENDER_MODE == 0
    gl_FragColor = vec4(textureBlocky(iChannel0, vUv, iResolution.xy).rgb, 1.0);
#elif RENDER_MODE == 1
    gl_FragColor = vec4(texture2D(iChannel0, vUv).rgb, 1.0) +
                   vec4(texture2D(iChannel0, vUv + 1.0 / iResolution.xy).rgb, 0.25) +
                   vec4(texture2D(iChannel0, vUv - 1.0 / iResolution.xy).rgb, 0.25);
#elif RENDER_MODE == 2
    gl_FragColor = textureUgly(iChannel0, vUv, iResolution.xy);
#elif RENDER_MODE == 3
	gl_FragColor = vec4(texture2D(iChannel0, vUv).rgb, 1.0);
#endif
}
