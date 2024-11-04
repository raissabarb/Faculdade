function main() {
    const canvas = document.querySelector("#canvas");
    const gl = canvas.getContext('webgl', { preserveDrawingBuffer: true });

    if (!gl) {
        throw new Error('WebGL not supported');
    }

    // Vertex shader e fragment shader
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

    const colorMap = {
        '0': [0.0, 0.0, 0.0],    // Preto
        '1': [1.0, 0.0, 0.0],    // Vermelho
        '2': [0.0, 1.0, 0.0],    // Verde
        '3': [0.0, 0.0, 1.0],    // Azul
        '4': [1.0, 1.0, 0.0],    // Amarelo
        '5': [0.0, 1.0, 1.0],    // Ciano
        '6': [1.0, 0.0, 1.0],    // Magenta
        '7': [1.0, 0.5, 0.5],    // Rosa claro
        '8': [0.5, 1.0, 0.5],    // Verde claro
        '9': [0.5, 0.5, 1.0]     // Azul claro
    };

    let currentColor = colorMap['0'];
    let isDrawingLine = true;

    let linePoints = [];
    let trianglePoints = [];

    canvas.addEventListener("mousedown", handleMouseClick, false);
    document.addEventListener("keydown", handleKeyPress, false);

    function handleMouseClick(event) {
        let [x, y] = convertCoordinates(event.offsetX, event.offsetY);

        if (isDrawingLine) {
            if (linePoints.length < 2) {
                linePoints.push([x, y]);
                drawPoint(x, y);
            }

            if (linePoints.length === 2) {
                clearCanvas();
                drawBresenhamLine(linePoints[0], linePoints[1]);
                linePoints = [];
            }
        } else {
            if (trianglePoints.length < 3) {
                trianglePoints.push([x, y]);
                drawPoint(x, y);
            }

            if (trianglePoints.length === 3) {
                clearCanvas();
                drawBresenhamTriangle(trianglePoints[0], trianglePoints[1], trianglePoints[2]);
                trianglePoints = [];
            }
        }
    }

    function handleKeyPress(event) {
        if (event.key in colorMap) {
            currentColor = colorMap[event.key];
        } else if (event.key === 'r' || event.key === 'R') {
            isDrawingLine = true;
            clearCanvas();
            linePoints = [];
        } else if (event.key === 't' || event.key === 'T') {
            isDrawingLine = false;
            clearCanvas();
            trianglePoints = [];
        }
    }

    function clearCanvas() {
        gl.clear(gl.COLOR_BUFFER_BIT);
    }

    function drawPoint(x, y) {
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([x, y]), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(currentColor), gl.STATIC_DRAW);
        gl.drawArrays(gl.POINTS, 0, 1);
    }

    function drawBresenhamLine(start, end) {
        const points = bresenhamLine(start[0], start[1], end[0], end[1]);

        points.forEach(([x, y]) => {
            gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([x, y]), gl.STATIC_DRAW);
            gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(currentColor), gl.STATIC_DRAW);
            gl.drawArrays(gl.POINTS, 0, 1);
        });
    }

    function drawBresenhamTriangle(p1, p2, p3) {
        drawBresenhamLine(p1, p2);
        drawBresenhamLine(p2, p3);
        drawBresenhamLine(p3, p1);
    }

    function bresenhamLine(x0, y0, x1, y1) {
        let points = [];
        let dx = Math.abs(x1 - x0);
        let dy = Math.abs(y1 - y0);
        let sx = x0 < x1 ? 0.01 : -0.01;
        let sy = y0 < y1 ? 0.01 : -0.01;
        let err = dx - dy;

        while (true) {
            points.push([x0, y0]);
            if (Math.abs(x0 - x1) < 0.01 && Math.abs(y0 - y1) < 0.01) break;

            let e2 = 2 * err;
            if (e2 > -dy) {
                err -= dy;
                x0 += sx;
            }
            if (e2 < dx) {
                err += dx;
                y0 += sy;
            }
        }
        return points;
    }

    function convertCoordinates(x, y) {
        const normalizedX = (x / canvas.width) * 2 - 1;
        const normalizedY = (y / canvas.height) * -2 + 1;
        return [normalizedX, normalizedY];
    }
}

function createShader(gl, type, source) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        return shader;
    }
    console.error(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
}

function createProgram(gl, vertexShader, fragmentShader) {
    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (gl.getProgramParameter(program, gl.LINK_STATUS)) {
        return program;
    }
    console.error(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
}

main();
