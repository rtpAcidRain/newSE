// import { ScrollTrigger } from "gsap/ScrollTrigger";

// export function setImagesTransformAnimation(scrollset) {
//   if (ScrollTrigger.isTouch === 0 || ScrollTrigger.isTouch === 2) {
//     if ($(".uc-images").length > 0) {
//       loadScript(
//         "https://svet-expert.com/bitrix/templates/svetexpert2_release/js/three.js",
//         setImagesAnim
//       );
//       function setImagesAnim() {
//         $(".uc-images")
//           .children()
//           .each((i, el) => {
//             $(el).addClass(`image-inside-${i + 1}`);
//             $(el).children().addClass("tn-atom");
//             $(el).find("img").addClass("tn-atom__img");
//           });

//         var cards = $(".uc-images .tn-atom__img");
//         cards.addClass("img-box");

//         const fragmentShader = ` uniform sampler2D uTexture;
//              uniform float uAlpha;
//              uniform vec2 uOffset;
//              varying vec2 vUv;

//             vec3 rgbShift(sampler2D textureImage, vec2 uv, vec2 offset) {
//                float r = texture2D(textureImage,uv).r;
//                vec2 gb = texture2D(textureImage,uv).gb;
//                return vec3(r,gb);
//              }

//             void main() {
//                vec3 color = rgbShift(uTexture,vUv,uOffset);
//                gl_FragColor = vec4(color,uAlpha);
//              }
//              `;
//         const vertexShader = `uniform sampler2D uTexture;
//             uniform vec2 uOffset;
//             varying vec2 vUv;

//             #define M_PI 3.1415926535897932384626433832795

//             vec3 deformationCurve(vec3 position, vec2 uv, vec2 offset) {
//                position.x = position.x + (sin(uv.y * M_PI) * offset.x);
//                position.y = position.y + (sin(uv.x * M_PI) * offset.y);
//                return position;
//             }

//             void main() {
//                vUv = uv;
//                vec3 newPosition = deformationCurve(position, uv, uOffset);
//                gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );
//             }
//             `;

//         let scrollable = document.querySelector(".uc-images");

//         let current = 0;
//         let target = 0;
//         let ease = 0.1;

//         function lerp(start, end, t) {
//           return start * (1 - t) + end * t;
//         }

//         function init() {
//           // document.body.style.height = `${
//           //   scrollable.getBoundingClientRect().height
//           // }px`;
//         }

//         scrollset.on("scroll", ({ scroll }) => {
//           target = scroll.y;
//         });

//         function smoothScroll() {
//           target = target;
//           current = lerp(current, target, ease);
//           scrollable.style.transform = `translate3d(0)`;
//         }

//         class EffectCanvas {
//           constructor() {
//             this.container = document.querySelector(".main");
//             this.images = [...document.querySelectorAll(".img-box")];
//             this.meshItems = []; // Used to store all meshes we will be creating.
//             this.setupCamera();
//             this.createMeshItems();
//             this.render();
//           }

//           get viewport() {
//             let width = window.innerWidth;
//             let height = window.innerHeight;
//             let aspectRatio = width / height;
//             return {
//               width,
//               height,
//               aspectRatio,
//             };
//           }

//           setupCamera() {
//             window.addEventListener(
//               "resize",
//               this.onWindowResize.bind(this),
//               false
//             );

//             this.scene = new THREE.Scene();

//             let perspective = 1000;
//             const fov =
//               (180 * (2 * Math.atan(window.innerHeight / 2 / perspective))) /
//               Math.PI; // see fov image for a picture breakdown of this fov setting.
//             this.camera = new THREE.PerspectiveCamera(
//               fov,
//               this.viewport.aspectRatio,
//               1,
//               1000
//             );
//             this.camera.position.set(0, 0, perspective); // set the camera position on the z axis.

//             // this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
//             this.renderer = new THREE.WebGL1Renderer({
//               antialias: true,
//               alpha: true,
//             });
//             this.renderer.setSize(this.viewport.width, this.viewport.height); // uses the getter viewport function above to set size of canvas / renderer
//             this.renderer.setPixelRatio(window.devicePixelRatio); // Import to ensure image textures do not appear blurred.
//             this.container.appendChild(this.renderer.domElement); // append the canvas to the main element
//           }

//           onWindowResize() {
//             init();
//             this.camera.aspect = this.viewport.aspectRatio; // readjust the aspect ratio.
//             this.camera.updateProjectionMatrix(); // Used to recalulate projectin dimensions.
//             this.renderer.setSize(this.viewport.width, this.viewport.height);
//           }

//           createMeshItems() {
//             this.images.forEach((image) => {
//               let meshItem = new MeshItem(image, this.scene);
//               this.meshItems.push(meshItem);
//             });
//           }

//           render() {
//             smoothScroll();
//             for (let i = 0; i < this.meshItems.length; i++) {
//               this.meshItems[i].render();
//             }
//             this.renderer.render(this.scene, this.camera);
//             requestAnimationFrame(this.render.bind(this));
//           }
//         }

//         class MeshItem {
//           // Pass in the scene as we will be adding meshes to this scene.
//           constructor(element, scene) {
//             this.element = element;
//             this.scene = scene;
//             this.offset = new THREE.Vector2(0, 0);
//             this.sizes = new THREE.Vector2(0, 0);
//             this.createMesh();
//           }

//           getDimensions() {
//             const { width, height, top, left } =
//               this.element.getBoundingClientRect();
//             this.sizes.set(width, height);
//             this.offset.set(
//               left - window.innerWidth / 2 + width / 2,
//               -top + window.innerHeight / 2 - height / 2
//             );
//           }

//           createMesh() {
//             this.geometry = new THREE.PlaneBufferGeometry(1, 1, 100, 100);
//             this.imageTexture = new THREE.TextureLoader().load(
//               this.element.src
//             );
//             this.imageTexture.minFilter = THREE.NearestFilter;
//             this.uniforms = {
//               uTexture: {
//                 //texture data
//                 value: this.imageTexture,
//               },
//               uOffset: {
//                 //distortion strength
//                 value: new THREE.Vector2(0.0, 0.0),
//               },
//               uAlpha: {
//                 //opacity
//                 value: 1,
//               },
//             };
//             this.material = new THREE.ShaderMaterial({
//               uniforms: this.uniforms,
//               vertexShader: vertexShader,
//               fragmentShader: fragmentShader,
//               transparent: true,
//               // wireframe: true,
//               side: THREE.DoubleSide,
//             });
//             this.mesh = new THREE.Mesh(this.geometry, this.material);
//             this.getDimensions(); // set offsetand sizes for placement on the scene
//             this.mesh.position.set(this.offset.x, this.offset.y, 0);
//             this.mesh.scale.set(this.sizes.x, this.sizes.y, 1);

//             this.scene.add(this.mesh);
//           }

//           render() {
//             // this function is repeatidly called for each instance in the aboce
//             this.getDimensions();
//             this.mesh.position.set(this.offset.x, this.offset.y, 0);
//             this.mesh.scale.set(this.sizes.x, this.sizes.y, 1);
//             this.uniforms.uOffset.value.set(
//               this.offset.x * 0.0,
//               -(target - current) * 0.0003
//             );
//           }
//         }

//         init();
//         new EffectCanvas();
//       }
//     }
//   }
// }
