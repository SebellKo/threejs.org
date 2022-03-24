import * as THREE from '../../node_modules/three/build/three.module.js';

const canvas = document.querySelector('#c');
const renderer = new THREE.WebGLRenderer({canvas}); // 데이터를 실제로 canvas에 그려주는 역할

const fov = 75; // field of view(시야각)
const aspect = 2; //canvas의 가로세로 비율
const near = 0.1; // near, far은 카메라 앞에 렌더링되는 공간 범위
const far = 5; //  near은 카메라 앞 어디거리부터, far은 어디까지 볼것인가
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 2;

const scene = new THREE.Scene();

const boxWidth = 1;
const boxHeight = 1;
const boxDepth = 1;
const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth); // 물체의 형태
const material = new THREE.MeshPhongMaterial({color: 0x44aa88}); // 물체의 색, 밝기, 질감

const color = 0xFFFFFF;
const intensity = 1;
const light = new THREE.DirectionalLight(color, intensity);
light.position.set(-1, 2, 4);

scene.add(light);

renderer.render(scene, camera);

function makeInstance(geometry, color, x) {
    const material = new THREE.MeshPhongMaterial({color});

    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    cube.position.x = x;

    return cube;
}

const cubes = [
    makeInstance(geometry, 0x44aa88, 0),
    makeInstance(geometry, 0x8844aa, -2),
    makeInstance(geometry, 0xaa8844, 2)
];

function render(time) {
    time *= 0.001;

    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix(); // 정육면체의 크기 고정

    cubes.forEach((cube, ndx) => {
        const speed = 1 + ndx * 0.1;
        const rot = time * speed;
        cube.rotation.x = rot;
        cube.rotation.y = rot;
    });

    if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
    }

    renderer.render(scene, camera);
    requestAnimationFrame(render); // 브라우저에 애니메이션 프레임을 요청하는 함수
}
requestAnimationFrame(render);

function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height; // canvas를 리사이징할 필요가 있는지 검사

    if (needResize) {
        renderer.setSize(width, height, false);
    }
    return needResize;
}
