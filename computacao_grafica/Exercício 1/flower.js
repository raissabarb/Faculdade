function main(){
    const canvas = document.querySelector("#c");
    const gl = canvas.getContext('webgl');

    if (!gl) {
        throw new Error('WebGL not supported');
    }

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);

    var vertexShaderSource = document.querySelector("#vertex-shader-2d").text;
    var fragmentShaderSource = document.querySelector("#fragment-shader-2d").text;
    
    var vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

    var program = createProgram(gl, vertexShader, fragmentShader);

    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    const colorBuffer = gl.createBuffer();
    
    const positionLocation = gl.getAttribLocation(program, `position`);
    gl.enableVertexAttribArray(positionLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const colorLocation = gl.getAttribLocation(program, `color`);
    gl.enableVertexAttribArray(colorLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.vertexAttribPointer(colorLocation, 3, gl.FLOAT, false, 0, 0);

    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // talo
    gl.bindBuffer(gl.ARRAY_BUFFER,positionBuffer);
    setRectangleVertices(gl, -0.03, -0.7, 0.06, 0.7);
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    setRectangleColor(gl,[0.0, 1.0, 0.0]);
    gl.drawArrays(gl.TRIANGLES, 0, 6);

    // flor
    n = 30;
    x = 0
    y = 0
    gl.bindBuffer(gl.ARRAY_BUFFER,positionBuffer);
    setCircleVertices(gl, n, 0.05, x, y);
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    setCircleColor(gl,n,[1.0, 1.0, 0.5]);
    gl.drawArrays(gl.TRIANGLES, 0, 3*n);

    n = 30;
    x = 0
    y = 0.17
    gl.bindBuffer(gl.ARRAY_BUFFER,positionBuffer);
    setCircleVertices(gl, n, 0.12, x, y);
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    setCircleColor(gl,n,[0.5, 0.0, 0.5]);
    gl.drawArrays(gl.TRIANGLES, 0, 3*n);
    
    n = 30;
    x = 0
    y = -0.17
    gl.bindBuffer(gl.ARRAY_BUFFER,positionBuffer);
    setCircleVertices(gl, n, 0.12, x, y);
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    setCircleColor(gl,n,[0.5, 0.0, 0.5]);
    gl.drawArrays(gl.TRIANGLES, 0, 3*n);
    
    n = 30;
    x = 0.17
    y = 0
    gl.bindBuffer(gl.ARRAY_BUFFER,positionBuffer);
    setCircleVertices(gl, n, 0.12, x, y);
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    setCircleColor(gl,n,[0.5, 0.0, 0.5]);
    gl.drawArrays(gl.TRIANGLES, 0, 3*n);
    
    n = 30;
    x = -0.17
    y = 0
    gl.bindBuffer(gl.ARRAY_BUFFER,positionBuffer);
    setCircleVertices(gl, n, 0.12, x, y);
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    setCircleColor(gl,n,[0.5, 0.0, 0.5]);
    gl.drawArrays(gl.TRIANGLES, 0, 3*n);

    // folhas
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    setTriangleVertices(gl, [0.3, -0.4], [0.2, -0.5], [0.03, -0.5]);
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    setTriangleColor(gl, [0.0, 1.0, 0.0]); 
    gl.drawArrays(gl.TRIANGLES, 0, 3);

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    setTriangleVertices(gl, [-0.3, -0.4], [-0.2, -0.5], [-0.03, -0.5]);
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    setTriangleColor(gl, [0.0, 1.0, 0.0]); 
    gl.drawArrays(gl.TRIANGLES, 0, 3);
}

function createShader(gl, type, source) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) {
        return shader;
    }
  
    console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
}
  
function createProgram(gl, vertexShader, fragmentShader) {
    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    var success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) {
        return program;
    }
  
    console.log(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
}

function setRectangleVertices(gl, x, y, width, height) {
    var x1 = x;
    var x2 = x + width;
    var y1 = y;
    var y2 = y + height;
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
        x1, y1,
        x2, y1,
        x1, y2,
        x1, y2,
        x2, y1,
        x2, y2,
    ]), gl.STATIC_DRAW);
}
  
function setRectangleColor(gl,color) {
    colorData = [];
    for (let triangle = 0; triangle < 2; triangle++) {
        for(let vertex=0; vertex<3; vertex++)
            colorData.push(...color);
    }
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorData), gl.STATIC_DRAW);
}

function setCircleVertices(gl, n, radius, x, y) {
    let vertexData = [];
    for (let i = 0; i < n; i++) {
        vertexData.push(x, y); 
        vertexData.push(x + radius * Math.cos(i * (2 * Math.PI) / n), y + radius * Math.sin(i * (2 * Math.PI) / n));
        vertexData.push(x + radius * Math.cos((i + 1) * (2 * Math.PI) / n), y + radius * Math.sin((i + 1) * (2 * Math.PI) / n));
    }
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData), gl.STATIC_DRAW);
}
  
function setCircleColor(gl,n,color){
    colorData = [];
    for (let triangle = 0; triangle < n; triangle++) {
        for(let vertex=0; vertex<3; vertex++)
            colorData.push(...color);
    }
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorData), gl.STATIC_DRAW);
}

function setTriangleVertices(gl, v1, v2, v3) {
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
        v1[0], v1[1],
        v2[0], v2[1],
        v3[0], v3[1],
    ]), gl.STATIC_DRAW);
}
  
function setTriangleColor(gl, color) {
    let colorData = [];
    for (let i = 0; i < 3; i++) {
        colorData.push(...color);
    }
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorData), gl.STATIC_DRAW);
}

main();