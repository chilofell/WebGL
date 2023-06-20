function initBuffers(gl) {
    const positionBuffer = initPositionBuffer(gl);

    const colorBuffer = initColorBuffer(gl);

    const indexBuffer = initIndexBuffer(gl);

    return {
        position: positionBuffer,
        color: colorBuffer,
        indices: indexBuffer,
    };
}

function initPositionBuffer(gl) {
    // Создаём буфер для позиций квадрата.
    const positionBuffer = gl.createBuffer();

    // Выбераем positionBuffer как тот, к которому будут применяться операции с буфером отсюда.
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    const positions = [
        // Лицевая сторона
        -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0, 1.0,

        // Задняя сторона
        -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, -1.0, -1.0,

        // Верхняя сторна
        -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0,

        // Нижняя сторона
        -1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, -1.0, 1.0, -1.0, -1.0, 1.0,

        // Правая сторона
        1.0, -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0,

        // Девая сторона
        -1.0, -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, -1.0,
    ];

    // Теперь передаём список позиций в WebGL, чтобы построить фигуру.
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    return positionBuffer;
}

function initColorBuffer(gl) {
    const faceColors = [
        [1.0, 0.7, 0.7, 1.0], // Лицевая сторона: розовая
        [0.5, 1.0, 1.0, 1.0], // Задняя сторона: голубая
        [0.7, 1.0, 0.7, 1], // Верхняя сторона: зелёная
        [1.0, 0.8, 0.6, 1.0 ], // Нижняя сторона: персиковая
        [0.8, 0.6, 1.0, 1.0], // Правая сторона: лиловая
        [0.5, 0.8, 0.8, 1.0], // Левая сторона: бирюзовая
    ];

    // Преобразуем массив цветов в таблицу для всех вершин.

    var colors = [];

    for (var j = 0; j < faceColors.length; ++j) {
        const c = faceColors[j];
        // Повторяем каждый цвет четыре раза для четырех вершин.
        colors = colors.concat(c, c, c, c);
    }

    const colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

    return colorBuffer;
}

function initIndexBuffer(gl) {
    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

    // Этот массив определяет каждую грань как два треугольника, используя индексы в массиве вершин для указания положения каждого треугольника.

    const indices = [
        0,
        1,
        2,
        0,
        2,
        3, // перед
        4,
        5,
        6,
        4,
        6,
        7, // сзади
        8,
        9,
        10,
        8,
        10,
        11, // вершина
        12,
        13,
        14,
        12,
        14,
        15, // низ
        16,
        17,
        18,
        16,
        18,
        19, // право
        20,
        21,
        22,
        20,
        22,
        23, // лево
    ];

    // Отправляем массив элементов в GL

    gl.bufferData(
        gl.ELEMENT_ARRAY_BUFFER,
        new Uint16Array(indices),
        gl.STATIC_DRAW
    );

    return indexBuffer;
}

export { initBuffers };