
/**
 * Traslacion: Construye la matriz de traslacion THREEJS para el vector de traslacion vt y la retorna
 * ENTRADAS: vt = Vector de traslacion (arreglo de enteros)
 * SALIDAS: matrizT = Matriz de traslacion 
 */
function Traslacion(vt){
    var matrizT = new THREE.Matrix4();
    matrizT.set(1, 0, 0, vt[0],
            0, 1, 0, vt[1],
            0, 0, 1, vt[2],
            0, 0, 0, 1);
        
    return matrizT;
}

/**
 * Rotacion: Contruye la matriz de rotacion THREEJS y la retorna
 * Entradas: ar = Angulo de rotacion (entero)
 *          eje = eje sobre el que rota la figura (entero) 
 * Salidas:Return= retorna la matriz
 */

function Rotacion(rt,eje){
    var matrizR = new THREE.Matrix4();
    let rad = rt * Math.PI / 180;
    [cs, sn] = [Math.cos(rad), Math.sin(rad)];
    switch(eje){
        case 1:
            matrizR.set(1, 0, 0, 0,
                0, cs, -sn, 0,
                0, sn, cs, 0,
                0, 0, 0, 1);
                return matrizR;
                break;
        case 2:
            matrizR.set(cs,  0, sn, 0,
                0, 1, 0, 0, 
                -sn, 0, cs, 0,
                0, 0, 0, 1);
                return matrizR;
                 break;
        case 3:
            matrizR.set(cs, -sn, 0, 0,
                sn, cs, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1);
                return matrizR;
                break;  
    }

}

/**
 * RotacionReal: Aplica el angulo a la figura "fig"
 * Entradas: fig = objeto tipo THREE.LINE que representa el objeto grafico
 *           posini = posicion inicial de fig
 *           rt = angulo de rotacion (entero)
 *           eje = eje sobre el que rota la figura (entero) 
 * Salidas: rotacion del objeto       
 *  */

function RotacionReal(fig, posini, rt,eje){
    tr = [-posini[0], -posini[1], -posini[2]]; //vector para llevar al origen
    fig.applyMatrix(Traslacion(tr));//traslacion al origen
    switch(eje){

        case 1:fig.applyMatrix(Rotacion(rt,1)); break;
           
        case 2:fig.applyMatrix(Rotacion(rt,2)); break;
           
        case 3:fig.applyMatrix(Rotacion(rt,3)); break;

    }
    fig.applyMatrix(Traslacion(posini));//traslacion a posicion inicial
}

/**
 * Escalado: Construye la matriz de escalado THREEJS para el vector vs y la retorna
 * ENTRADAS: vs = Vector de Escalado (arreglo de enteros)
 * SALIDAS: matrizS = Matriz de Escalado
 */
function Escalado(vs) {
    var matrizS = new THREE.Matrix4();
    matrizS.set(vs[0], 0, 0, 0,
            0, vs[1], 0, 0,
            0, 0, vs[2], 0,
            0, 0, 0, 1);
    return matrizS;

}
/**
 * EscaladoReal: Aplica el vector de Escalado vs al objeto fig
 * ENTRADAS: fig = objeto tipo THREE.LINE que representa el objeto grafico
 *           posini = posicion inicial de fig
 *           vs = Vector de Escalado (arreglo de enteros)
 * SALIDAS: objeto escalado
 * 
 */
function EscaladoReal(fig, posini, vs){
    tr = [-posini[0], -posini[1], -posini[2]]; //vector para llevar al origen
    fig.applyMatrix(Traslacion(tr));//traslacion al origen
    fig.applyMatrix(Escalado(vs)); //escalado de la figura
    fig.applyMatrix(Traslacion(posini));//traslacion a posicion inicial
}