import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

let arrLine = []
let getLine = false
let line1 = 0
let arrSphere = []
let getSphere = false
let sphere1 = 0
let arrEllipse = []
let getEllipse = false
let Ellipses1 = 0
let arrPolyLine = []
let getPolyLine = false
let PolyLine1 = 0
let creatingLine = false;
let creatingSphere = false;
let creatingEllipse = false;
let creatingPolyLine = false;
let line2 = 1
let sphere2 = 1
let ellipse2 = 1
let PolyLine2 = 1
let arrObjects = []

const colorNames = {
    'rgb(255, 0, 0)': 'Red',
    'rgb(0, 255, 0)': 'Green',
    'rgb(0, 0, 255)': 'Blue',
    'rgb(255, 255, 0)': 'Yellow',
    'rgb(0, 255, 255)': 'Cyan',
    'rgb(255, 0, 255)': 'Magenta',
    'rgb(255, 165, 0)': 'Orange',
    'rgb(128, 0, 128)': 'Purple',
    // Add more colors as needed
};

const planeSize = 30;
const geometry0 = new THREE.PlaneGeometry(11, 7);
const material0 = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
const planeMesh = new THREE.Mesh(geometry0, material0);
planeMesh.position.set(0, 0, 0); // Example position
scene.add(planeMesh);

const raycaster = new THREE.Raycaster();
//const mouse = new THREE.Vector2();

/**
 * Object
 */

function createSphere(arrSphere){
    let point1 = arrSphere[0]
    let point2 = arrSphere[1]
    const rad = Math.sqrt(Math.pow(point1[0] - point2[0], 2) + Math.pow(point1[1] - point2[1], 2) + Math.pow(point1[2] - point2[2], 2))
    const circle = new THREE.Mesh(
        new THREE.CircleGeometry(rad, 64, 64),
        new THREE.MeshBasicMaterial({ color: '#ff0000' })
    )
    circle.name = 'Circle' + sphere2
    circle.position.set(point1[0], point1[1], point1[2] + 0.001)
    scene.add(circle)
}

function createLine(arrLine) {
    const points = [];
    points.push(new THREE.Vector3(arrLine[0][0], arrLine[0][1], arrLine[0][2]));
    points.push(new THREE.Vector3(arrLine[1][0], arrLine[1][1], arrLine[1][2]));
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
    const materialP = new THREE.MeshBasicMaterial({ color: 0x26A49B });
    //const line = new THREE.Line(geometry, material);
    if (getPolyLine) {
        const line = new THREE.Line(geometry, materialP);
        line.position.z += 0.01
        scene.add(line);
    }
    else if(getLine){
        const line = new THREE.Line(geometry, material);
        line.name = 'Line' + line2
        line.position.z += 0.01
        scene.add(line);
    }
    
}
function removePreviewLine() {
    const previewLine = scene.getObjectByName('Line' + line2);
    if (previewLine) {
        previewLine.material.dispose()
        previewLine.geometry.dispose()
        scene.remove(previewLine);
    }
}
function removePreviewSphere() {
    const previewSphere = scene.getObjectByName('Circle' + sphere2);
    if (previewSphere) {
        previewSphere.material.dispose()
        previewSphere.geometry.dispose()
        scene.remove(previewSphere);
    }
}

function removePreviewEllipse() {
    const previewEllipse = scene.getObjectByName('Ellipse' + ellipse2);
    if (previewEllipse) {
        previewEllipse.material.dispose()
        previewEllipse.geometry.dispose()
        scene.remove(previewEllipse);
    }
}
function removePreviewPolyLine() {
    const previewPolyLine = scene.getObjectByName('PolyLine' + PolyLine2);
    if (previewPolyLine) {
        console.log("previewPolyLine called")
        previewPolyLine.material.dispose()
        previewPolyLine.geometry.dispose()
        scene.remove(previewPolyLine);
    }
}
function createEllipse(arrEllipse) {
    let center = arrEllipse[0]
    let x = arrEllipse[1]
    let y = arrEllipse[2]
    let xRad =  Math.sqrt(Math.pow(center[0] - x[0], 2) + Math.pow(center[1] - x[1], 2) + Math.pow(center[2] - x[2], 2))
    let yRad =  Math.sqrt(Math.pow(center[0] - y[0], 2) + Math.pow(center[1] - y[1], 2) + Math.pow(center[2] - y[2], 2))
        
    const curve = new THREE.EllipseCurve(
        center[0],  center[1],            // ax, aY
        xRad,  yRad,           // xRadius, yRadius
        0,  2 * Math.PI,  // aStartAngle, aEndAngle
        false,            // aClockwise
        0                 // aRotation
    );

    const points1 = curve.getPoints( 50 );
    const shape = new THREE.Shape(points1);
    shape.autoClose = true; // Ensure the shape is closed

    // Create geometry from the shape
    const geometry1 = new THREE.ShapeGeometry(shape);

    // Create material with color
    const material1 = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

    // Create mesh with geometry and material
    const ellipseMesh = new THREE.Mesh(geometry1, material1);
    ellipseMesh.name = 'Ellipse' + ellipse2
    ellipseMesh.position.z += 0.01

    //Add the ellipse mesh to the scene
    scene.add(ellipseMesh);
}




function createPolyLine(arrPolyLine) {
    // let arr1 = [arrPolyLine[PolyLine1 - 2], arrPolyLine[PolyLine1 - 1]] 
    // //console.log(arr1)
    // createLine(arr1)
    const points2 = [];
    for (let i = 0; i < arrPolyLine.length; i++) {
        points2.push(new THREE.Vector3(arrPolyLine[i][0], arrPolyLine[i][1], arrPolyLine[i][2]));
        
    }
    

    // Create geometry
    const geometry2 = new THREE.BufferGeometry().setFromPoints(points2);
    // Create material
    const material2 = new THREE.MeshBasicMaterial({ color: 0x26A49B });

    // Create line
    const polyline = new THREE.Line(geometry2, material2);
    polyline.name = 'PolyLine' + PolyLine2
    polyline.position.z += 0.01
    
    scene.add(polyline)
}

function onMouseClick(event) {

    // Update the picking ray with the camera and mouse position
    raycaster.setFromCamera(mouse, camera);

    // Calculate intersection of the ray with the plane
    const intersects = raycaster.intersectObject(planeMesh);

    if (intersects.length > 0) {
        // Take the first intersection point
        const intersectionPoint = intersects[0].point;
        if (getLine) {
            if ((line1 == 1) && (creatingLine == false)) {
                arrLine[0] = [intersectionPoint.x, intersectionPoint.y, intersectionPoint.z]
                console.log(arrLine)
            }
            else if(line1 == 3){
                arrLine[1] = [intersectionPoint.x, intersectionPoint.y, intersectionPoint.z]
            }
            else if((line1 == 2) && (creatingLine == true)){
            
                arrLine[1] = [intersectionPoint.x, intersectionPoint.y, intersectionPoint.z]
                removePreviewLine()
                createLine(arrLine)
                
                
            }
            
        }
        else if(getSphere){
            if ((sphere1 == 1) && (creatingSphere == false)) {
                arrSphere[0] = [intersectionPoint.x, intersectionPoint.y, intersectionPoint.z]
                console.log(arrSphere)
            }
            else if(sphere1 == 3){
                arrSphere[1] = [intersectionPoint.x, intersectionPoint.y, intersectionPoint.z]
            }
            else if((sphere1 == 2) && (creatingSphere == true)){
            
                arrSphere[1] = [intersectionPoint.x, intersectionPoint.y, intersectionPoint.z]
                removePreviewSphere()
                createSphere(arrSphere)
                
            }
        }
        else if(getEllipse){
            if ((Ellipses1 == 1) && (creatingEllipse == false)) {
                arrEllipse[0] = [intersectionPoint.x, intersectionPoint.y, intersectionPoint.z]
                console.log(arrEllipse)
            }
            else if(Ellipses1 == 3){
                arrEllipse[2] = [intersectionPoint.x, intersectionPoint.y, intersectionPoint.z]
                removePreviewEllipse()
                createEllipse(arrEllipse)
                //console.log(arrEllipse)
            }
            else if((Ellipses1 == 2) && (creatingEllipse == true)){
            
                arrEllipse[1] = [intersectionPoint.x, intersectionPoint.y, intersectionPoint.z]
                arrEllipse[2] = [intersectionPoint.x, intersectionPoint.y, intersectionPoint.z]
                removePreviewEllipse()
                createEllipse(arrEllipse)
                //console.log(arrEllipse)
            }
        }
        else if(getPolyLine){
            if ((PolyLine1 == 1) && (creatingPolyLine == false)) {
                arrPolyLine[0] = ([intersectionPoint.x, intersectionPoint.y, intersectionPoint.z])
                //console.log(arrPolyLine)
            }
            else if((PolyLine1 > 1) && (creatingPolyLine == true)){
                arrPolyLine[PolyLine1 - 1] = ([intersectionPoint.x, intersectionPoint.y, intersectionPoint.z])
                removePreviewPolyLine()
                createPolyLine(arrPolyLine)
                //console.log(arrPolyLine)
            }
            
        }
        
    }
}

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

window.addEventListener('contextmenu', () =>
    {
        const previewPolyLine = scene.getObjectByName('PolyLine' + PolyLine2);
        previewPolyLine.name = `PolyLine${PolyLine2}`;
        arrObjects.push(previewPolyLine);
        //arrObjects.push({mesh : previewPolyLine.name, object : previewPolyLine})
        console.log(arrObjects)
        updateList()
        PolyLine2 += 1
        getPolyLine = false
        creatingPolyLine = false
        PolyLine1 = 0
        arrPolyLine = []
    }
)
const mouse = new THREE.Vector2()

window.addEventListener('mousemove', (event) =>
    {
        mouse.x = event.clientX / sizes.width * 2 - 1;
        mouse.y = - (event.clientY / sizes.height) * 2 + 1;

        //console.log("creating line")

        if (creatingLine) {
            onMouseClick()
        }
        if (creatingSphere) {
            onMouseClick()
        }
        if (creatingEllipse) {
            onMouseClick()
        }
        if (creatingPolyLine) {
            onMouseClick()
        }
     
        //console.log(mouse)
    })



window.addEventListener('click', () =>
    {
        if (getLine) {
            if (line1 == 0) {
                line1 = 1
                
            }
            else if((getLine == true) && (line1 == 1)) {
                onMouseClick()
                //console.log(arrLine)
                line1 = 2 
                creatingLine = true
                //console.log("creating line" + creatingLine)
            }
            else if(line1 == 2) {
                line1 == 3
                onMouseClick()
                removePreviewLine()
                createLine(arrLine)
                line1 = 0
                arrLine = []
                getLine = false
                const previewLine = scene.getObjectByName('Line' + line2);
                previewLine.name = `Line${line2}`;
                arrObjects.push(previewLine);
                //arrObjects.push({mesh : previewLine.name, object : previewLine})
                console.log(arrObjects)
                // scene.children.forEach((object, index) => {
                //     console.log(`Object ${index}:`, object);
                // });
                updateList()
                line2 += 1 
                creatingLine = false;
            }
        }
        if (getSphere) {
            if (sphere1 == 0) {
                sphere1 = 1
                // scene.children.forEach((object, index) => {
                //     console.log(`Object ${index}:`, object);
                // });
            }
            else if((getSphere == true) && (sphere1 == 1)) {
                onMouseClick()
                //console.log(arrLine)
                sphere1 = 2 
                creatingSphere = true
                
                //console.log("creating Sphere" + creatingSphere)
            }
            else if(sphere1 == 2) {
                sphere1 = 3
                onMouseClick()
                removePreviewSphere()
                createSphere(arrSphere)
                sphere1 = 0
                arrSphere = []
                getSphere = false 
                const previewSphere = scene.getObjectByName('Circle' + sphere2);
                // previewSphere.name = 'Circle' + sphere2
                previewSphere.name = `Circle${sphere2}`;
                arrObjects.push(previewSphere);
                //arrObjects.push({mesh : previewSphere.name, object : previewSphere})
                console.log(arrObjects)
                // scene.children.forEach((object, index) => {
                //     console.log(`Object ${index}:`, object);
                // });
                updateList()
                sphere2 += 1
                creatingSphere = false;
            }
        }
        if (getEllipse) {
            if (Ellipses1 == 0) {
                Ellipses1 = 1
            }
            else if((getEllipse == true) && ((Ellipses1 == 1) || (Ellipses1 == 2))) {
                onMouseClick()
                creatingEllipse = true
                //console.log(arrLine)
                Ellipses1 = (Ellipses1 + 1) 
            }
            else if(Ellipses1 == 3) {
                onMouseClick()
                removePreviewEllipse()
                createEllipse(arrEllipse)
                Ellipses1 = 0
                arrEllipse = []
                getEllipse = false
                const previewEllipse = scene.getObjectByName('Ellipse' + ellipse2);
                previewEllipse.name = `Ellipse${ellipse2}`;
                arrObjects.push(previewEllipse);
                console.log(previewEllipse)
                updateList()
                //arrObjects.push({mesh : previewEllipse.name, object : previewEllipse})
                console.log(arrObjects)
                ellipse2 += 1
                creatingEllipse = false; 
            }
        }
        if (getPolyLine) {
            if (PolyLine1 == 0) {
                PolyLine1 = 1
            }
            else if(PolyLine1 == 1){
                onMouseClick()
            
                creatingPolyLine = true
                //console.log(arrPolyLine)
                PolyLine1 = (PolyLine1 + 1)
            }
            else if(PolyLine1 > 1){
                onMouseClick()
                //console.log(arrPolyLine)
                removePreviewPolyLine()
                createPolyLine(arrPolyLine)
                PolyLine1 = (PolyLine1 + 1)
                
            }
        }
        if(currentIntersect)
            {
                const intersectedObject = currentIntersect.object;
                selectedObject = intersectedObject;
                //console.log(intersectedObject)
                updatePropertiesBox(intersectedObject.name, intersectedObject.material.color.getStyle());
                // scene.children.forEach((object, index) => {
                //     console.log(`Object ${index}:`, object);
                // });
            }
        
        
        
    })

function deleteObjects() {
    if (selectedObject) {
        // Remove from scene
        scene.remove(selectedObject);

        // Dispose of material and geometry
        selectedObject.material.dispose();
        selectedObject.geometry.dispose();

        // Remove from arrObjects array
        arrObjects = arrObjects.filter(obj => obj !== selectedObject);

        // Clear selected object reference
        selectedObject = null;

        // Optional: Update any UI elements or lists
        updateList();
    }
    updateAfterFirst()
}
function rgbToHex(colorHex) {
    // Check for the format 'rgb(r, g, b)'
    const regex = /rgb\((\d+),(\d+),(\d+)\)/;
    const match = colorHex.match(regex);

    if (!match) {
        throw new Error('Invalid RGB format');
    }

    const r = parseInt(match[1]);
    const g = parseInt(match[2]);
    const b = parseInt(match[3]);

    // Convert each component to hexadecimal
    const rHex = r.toString(16).padStart(2, '0');
    const gHex = g.toString(16).padStart(2, '0');
    const bHex = b.toString(16).padStart(2, '0');

    // Concatenate the hexadecimal values with '#' prefix
    const hexColor = `#${rHex}${gHex}${bHex}`;

    return hexColor;
}
let selectedObject = null;
function updatePropertiesBox(objectName, color) {
    //console.log("update event called")
    const selectedObjectName = document.getElementById('selectedObjectName');
    const selectedObjectColor = document.getElementById('selectedObjectColor');
    const colorIndicator = document.getElementById('colorIndicator');
    const colorPicker = document.getElementById('colorPicker')
        
    selectedObjectName.textContent = `Selected Object: ${objectName}`;
    selectedObjectColor.textContent = `Color: ${color}`;

    colorIndicator.textContent = colorNames[color] || color;
    colorIndicator.style.color = color;
    let colorName = color
    let colorHex = rgbToHex(colorName)
    colorPicker.value = (colorHex);
    if (objectName.includes('Circle')) {
        const radiusIndicator = document.getElementById('radiusInput');
        const radius1Indicator = document.getElementById('radiusInput1');
        const radiusLabel = document.getElementById('radiusLabel')
        const radiusLabel1 = document.getElementById('radiusLabel1')
        const updateButton = document.getElementById('updateRadius')
        radius1Indicator.value = ""
        

        if (selectedObject) {
            // Display radius information
            console.log(selectedObject.geometry.parameters.radius)
            radiusIndicator.value = selectedObject.geometry.parameters.radius;
            radiusLabel.textContent = 'Radius: '
            radiusLabel1.textContent = ""
            radius1Indicator.style.visibility = "hidden"
            radiusIndicator.style.visibility = "visible"
            updateButton.style.visibility = "visible"
            updateButton.style.top = "270px" 

        } else {
            radiusIndicator.textContent = '';
        }
    }
    else if (objectName.includes('Ellipse')) {
        const radiusIndicator = document.getElementById('radiusInput');
        const radius1Indicator = document.getElementById('radiusInput1');
        const radiusLabel = document.getElementById('radiusLabel')
        const radiusLabel1 = document.getElementById('radiusLabel1')
        const updateButton = document.getElementById('updateRadius')

        if (selectedObject) {
            // Display radius information
            console.log(selectedObject.geometry.boundingSphere.radius)
            //console.log(selectedObject.geometry.parameters)
            radiusIndicator.value = selectedObject.geometry.boundingSphere.radius;
            radius1Indicator.value = 1.0166525363922125;

            radiusLabel.textContent = 'RadiusX: '
            radiusIndicator.style.visibility = "visible"
            radius1Indicator.style.visibility = "visible"
            radiusLabel1.textContent = 'RadiusY: '
            updateButton.style.visibility = "visible"
            updateButton.style.top = "325px"
        } else {
            radiusIndicator.textContent = 'Radius: N/A';
        }

    } 
    else if((objectName.includes('Line')) || (objectName.includes('PolyLine'))){
        const radiusIndicator = document.getElementById('radiusInput');
        const radius1Indicator = document.getElementById('radiusInput1');
        const radiusLabel = document.getElementById('radiusLabel')
        const radiusLabel1 = document.getElementById('radiusLabel1')
        const updateButton = document.getElementById('updateRadius')

        if (selectedObject) {
            radiusIndicator.style.visibility = "hidden"
            radius1Indicator.style.visibility = "hidden"
            updateButton.style.visibility = "hidden"
            radiusLabel.textContent = ""
            radiusLabel1.textContent = ""
        }
    }
    colorPicker.addEventListener('change', (e) => {
        const newColorHex = e.target.value;
        const newColor = new THREE.Color(newColorHex);

        if (selectedObject) {
            console.log(selectedObject.material.color)
            //console.log((newColorHex))
            //scene.remove(selectedObject)
            selectedObject.material.color.set(newColor);
            renderer.render(scene,camera)
            selectedObject.material.needsUpdate = true;
            console.log(selectedObject.material.color)
            updateAfterFirst(selectedObject.name, newColor.getStyle());
            console.log(`Color updated to ${newColor.getStyle()} for ${selectedObject.name}`)
            console.log(selectedObject.material.color)
            // scene.children.forEach((object, index) => {
            //     console.log(`Object ${index}:`, object);
            // });
        }
    });
}

function updateAfterFirst(objectName, color) {
    const selectedObjectName = document.getElementById('selectedObjectName');
    const selectedObjectColor = document.getElementById('selectedObjectColor');
    const colorIndicator = document.getElementById('colorIndicator');
    if (objectName) {
        selectedObjectName.textContent = `Selected Object: ${objectName}`;
        selectedObjectColor.textContent = `Color: ${color}`;
        colorIndicator.textContent = colorNames[color] || color;
        colorIndicator.style.color = color;

        const selectedObject = arrObjects.find(obj => obj.name === objectName);
        if (selectedObject) {
            selectedObject.material.color.set(color);
            // Optional: Update other properties of the object as needed
        } else {
            console.log(`Object ${objectName} not found in arrObjects`);
        }
    }
    else{
        selectedObjectName.textContent = `Selected Object: None`;
        selectedObjectColor.textContent = `Color: None`;
        colorIndicator.textContent = '';
    }
    
}



// window.addEventListener('click', onMouseClick);
/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)

camera.position.z = 5
scene.add(camera)

// // Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()
let currentIntersect = null
const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    // controls.update()


    // Render
    renderer.render(scene, camera)

    raycaster.setFromCamera(mouse, camera)

    if (arrObjects.length > 0) {
        const intersects = raycaster.intersectObjects(arrObjects);

        if(intersects.length)
            {
                if(!currentIntersect)
                {
                    //console.log('mouse enter')
                }
        
                currentIntersect = intersects[0]
            }
            else
            {
                if(currentIntersect)
                {
                    //console.log('mouse leave')
                }
                
                currentIntersect = null
            }
    }

    


    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()

function updateList() {
    const ul = document.getElementById('elementList');
    ul.innerHTML = ''; // Clear previous list items

    // Iterate through arrObjects and create list items
    arrObjects.forEach(obj => {
        const li = document.createElement('li');
        li.textContent = obj.name;
        li.addEventListener('click', () => {
            // Optional: Implement functionality to interact with selected object
            console.log(`Clicked on ${obj.name}`);
        });
        ul.appendChild(li);
    });
}

document.getElementById('CircleButton').addEventListener('click', function() {
    
    
    getSphere = true
    sphere1 = 0
    getLine = false
    getEllipse = false
    getPolyLine = false
    
    
})

document.getElementById('LineButton').addEventListener('click', function() {
    
  
    getLine = true
    line1 = 0
    getSphere = false
    getEllipse = false
    getPolyLine = false
    
    

    
    

})

document.getElementById('EllipseButton').addEventListener('click', function() {
    
 
    getEllipse = true
    Ellipses1 = 0
    getSphere = false
    getLine = false
    getPolyLine = false
    
})

document.getElementById('PolyLineButton').addEventListener('click', function() {
    
   
    getPolyLine = true
    getLine = false
    getSphere = false
    getEllipse = false

    
})

document.getElementById('deleteObject').addEventListener('click',function() {
    
    deleteObjects()
    
})

document.getElementById('updateRadius').addEventListener('click',function() {
    
    if (selectedObject && selectedObject.name.includes('Circle')) {
        const newRadius = parseFloat(radiusInput.value);

        // Update the selected circle's radius
        selectedObject.geometry.dispose();
        selectedObject.geometry = new THREE.CircleGeometry(newRadius, 64, 64);
        selectedObject.position.z += 0.001;

        // Optionally update other properties like material or position if needed
        // selectedObject.material.color.set('#ff0000'); // Example update

        renderer.render(scene, camera);

        // Update the right panel (optional)
        updatePropertiesBox(selectedObject.name, selectedObject.material.color.getStyle());
    }
    
    if (selectedObject && selectedObject.name.includes('Ellipse')) {
        console.log("called")
        let newXRadius = parseFloat(radiusInput.value);
        let newYRadius = parseFloat(radiusInput1.value);
        if (!newYRadius) {
            newYRadius = 1.0166525363922125
        }

        //const mesh = scene.getObjectByName(selectedObject.name);
        const center = selectedObject.geometry.boundingSphere.center
        console.log(center)
        // Dispose of the existing geometry
        selectedObject.geometry.dispose();

        // Assuming arrEllipse contains the parameters to recreate the ellipse
        //const center = arrEllipse[0];
        //const x = arrEllipse[1];
        //const y = arrEllipse[2];
        //const xRad = Math.sqrt(Math.pow(center[0] - x[0], 2) + Math.pow(center[1] - x[1], 2) + Math.pow(center[2] - x[2], 2));
        //const yRad = Math.sqrt(Math.pow(center[0] - y[0], 2) + Math.pow(center[1] - y[1], 2) + Math.pow(center[2] - y[2], 2));

        // Create new ellipse geometry with updated radii
        const curve = new THREE.EllipseCurve(
            center.x, center.y,        // ax, aY
            newXRadius, newYRadius,           // xRadius, yRadius
            0, 2 * Math.PI,  // aStartAngle, aEndAngle
            false,            // aClockwise
            0                 // aRotation
        );

        const points = curve.getPoints(50);
        const shape = new THREE.Shape(points);
        shape.autoClose = true; // Ensure the shape is closed

        // Create geometry from the shape
        const geometry = new THREE.ShapeGeometry(shape);

        // Create material with color
        

        // Assign new geometry to the mesh
        selectedObject.geometry = geometry;

        // Update scene
        renderer.render(scene, camera);
    }
})
const ul = document.getElementById('elementList');

    // Attach click event listener to list items
ul.addEventListener('click', function(event) {
        // Check if the clicked element is an li
    if (event.target.tagName === 'LI') {
            // Retrieve the text content of the clicked li
        const clickedElement = event.target.textContent.trim();
        console.log('Clicked on:', clickedElement);

        const intersectedObject = scene.getObjectByName(clickedElement);
        
        selectedObject = intersectedObject

        updatePropertiesBox(intersectedObject.name, intersectedObject.material.color.getStyle());

            
            // You can perform further actions based on the clicked element
            // For example, update another part of the UI, fetch data, etc.
    }
});
