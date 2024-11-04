function main() {
    const canvas = document.querySelector("#canvas");
    const gl = canvas.getContext('webgl', { preserveDrawingBuffer: true });

    if (!gl) {
        throw new Error('WebGL not supported');
    }

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

    // Define cores indexadas para cada tecla
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

    let currentColor = colorMap['0'];  // Cor inicial

    canvas.addEventListener("mousedown", mouseClick, false);
    document.addEventListener("keydown", changeColor, false);

    let points = [];

    function mouseClick(event) {
        let x = (2 / canvas.width * event.offsetX) - 1;
        let y = (-2 / canvas.height * event.offsetY) + 1;
        
        points.push([x, y]);

        if (points.length === 2) {
            drawLine(points[0], points[1]);
            points = [];  // Reinicia para permitir novos pontos após desenhar a linha
        } else {
            drawPoint(x, y);
        }
    }

    function changeColor(event) {
        if (event.key in colorMap) {
            currentColor = colorMap[event.key];
        }
    }

    function drawPoint(x, y) {
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([x, y]), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(currentColor), gl.STATIC_DRAW);
        gl.drawArrays(gl.POINTS, 0, 1);
    }

    function drawLine(start, end) {
        const [x0, y0] = start;
        const [x1, y1] = end;

        let points = bresenhamLine(x0, y0, x1, y1);

        points.forEach(([x, y]) => {
            drawPoint(x, y);
        });
    }

    function bresenhamLine(x0, y0, x1, y1) {
        let points = [];
        let dx = Math.abs(x1 - x0);
        let dy = Math.abs(y1 - y0);
        let sx = x0 < x1 ? 1 : -1;
        let sy = y0 < y1 ? 1 : -1;
        let err = dx - dy;

        while (true) {
            points.push([x0, y0]);

            if (Math.abs(x0 - x1) < 0.01 && Math.abs(y0 - y1) < 0.01) break;

            let e2 = 2 * err;
            if (e2 > -dy) {
                err -= dy;
                x0 += sx * 0.01;
            }
            if (e2 < dx) {
                err += dx;
                y0 += sy * 0.01;
            }
        }

        return points;
    }

    drawPoints();
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

main();
