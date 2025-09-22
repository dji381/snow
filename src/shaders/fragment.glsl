uniform sampler2D uTexture;
void main() {
    vec4 texColor = texture2D(uTexture, gl_PointCoord);
    gl_FragColor = vec4(texColor.xyz,texColor.x);
}