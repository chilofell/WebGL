function drawScene(gl, programInfo, buffers, cubeRotation) {
    gl.clearColor(1.0, 1.0, 1.0, 1.0); // Цвет
    gl.clearDepth(1.0); // Очистить все
    gl.enable(gl.DEPTH_TEST); // Включить тестирование глубины
    gl.depthFunc(gl.LEQUAL); // Ближние вещи скрывают дальние вещи

    // Очищаем холст, прежде чем мы начнем рисовать на нем.

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // Создаём матрицу перспективы,

    const fieldOfView = (45 * Math.PI) / 180; // в радианах
    const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    const zNear = 0.1;
    const zFar = 100.0;
    const projectionMatrix = mat4.create();

    mat4.perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar);

    // Устанавливаем позицию рисования в точку «идентичности», которая является центром сцены.
    const modelViewMatrix = mat4.create();

    // Перемещаем позицию рисования туда, где мы хотим начать рисовать квадрат.
    mat4.translate(
        modelViewMatrix, // Целевая матрица
        modelViewMatrix, // Матрица для перевода
        [-0.0, 0.0, -6.0]
    ); // Количество для перевода

    mat4.rotate(
        modelViewMatrix, // Целевая матрица
        modelViewMatrix, // Матрица для вращения
        cubeRotation, // Количество оборотов в радианах
        [0, 0, 1]
    ); // Ось для вращения вокруг (Z)
    mat4.rotate(
        modelViewMatrix, // Целевая матрица
        modelViewMatrix, // Матрица для вращения
        cubeRotation * 0.7, // Количество оборотов в радианах
        [0, 1, 0]
    ); // Ось для вращения вокруг (Y)
    mat4.rotate(
        modelViewMatrix, // Целевая матрица
        modelViewMatrix, // Матрица для вращения
        cubeRotation * 0.3, // Количество оборотов в радианах
        [1, 0, 0]
    ); // Ось для вращения вокруг (X)

    // Сообщаем WebGL, как вытащить позиции из буфера позиций в атрибут vertexPosition.
    setPositionAttribute(gl, buffers, programInfo);

    setColorAttribute(gl, buffers, programInfo);

    // Сообщаем WebGL, какие индексы использовать для индексации вершин
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices);

    // Сообщаем WebGL использовать нашу программу при рисовании
    gl.useProgram(programInfo.program);

    // Установливаем форму шейдера
    gl.uniformMatrix4fv(
        programInfo.uniformLocations.projectionMatrix,
        false,
        projectionMatrix
    );
    gl.uniformMatrix4fv(
        programInfo.uniformLocations.modelViewMatrix,
        false,
        modelViewMatrix
    );

    {
        const vertexCount = 36;
        const type = gl.UNSIGNED_SHORT;
        const offset = 0;
        gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
    }
}

// Сообщаем WebGL, как вытащить позиции из буфера позиций в атрибут vertexPosition.
function setPositionAttribute(gl, buffers, programInfo) {
    const numComponents = 3;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
    gl.vertexAttribPointer(
        programInfo.attribLocations.vertexPosition,
        numComponents,
        type,
        normalize,
        stride,
        offset
    );
    gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
}

// Сообщаем WebGL, как вытащить цвета из цветового буфера в атрибут Color вершины.
function setColorAttribute(gl, buffers, programInfo) {
    const numComponents = 4;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color);
    gl.vertexAttribPointer(
        programInfo.attribLocations.vertexColor,
        numComponents,
        type,
        normalize,
        stride,
        offset
    );
    gl.enableVertexAttribArray(programInfo.attribLocations.vertexColor);
}

export { drawScene };