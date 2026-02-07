// Three.js Background Animation
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('bg-canvas').appendChild(renderer.domElement);

// Create molecules (connected atoms)
const molecules = [];
const atomGeometry = new THREE.SphereGeometry(0.1, 24, 24);
const bondMaterial = new THREE.LineBasicMaterial({ color: 0x00d2ff, transparent: true, opacity: 0.3 });

function createMolecule() {
    const group = new THREE.Group();
    const atomsCount = 3 + Math.floor(Math.random() * 4);
    const atomPoints = [];

    for (let i = 0; i < atomsCount; i++) {
        const material = new THREE.MeshStandardMaterial({
            color: Math.random() > 0.5 ? 0x00d2ff : 0x2ecc71,
            emissive: Math.random() > 0.5 ? 0x00d2ff : 0x2ecc71,
            emissiveIntensity: 0.5
        });
        const atom = new THREE.Mesh(atomGeometry, material);
        const x = (Math.random() - 0.5) * 2;
        const y = (Math.random() - 0.5) * 2;
        const z = (Math.random() - 0.5) * 2;
        atom.position.set(x, y, z);
        group.add(atom);
        atomPoints.push(new THREE.Vector3(x, y, z));
    }

    // Connect atoms with lines
    for (let i = 0; i < atomPoints.length; i++) {
        for (let j = i + 1; j < atomPoints.length; j++) {
            if (atomPoints[i].distanceTo(atomPoints[j]) < 1.5) {
                const geometry = new THREE.BufferGeometry().setFromPoints([atomPoints[i], atomPoints[j]]);
                const line = new THREE.Line(geometry, bondMaterial);
                group.add(line);
            }
        }
    }

    group.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 10
    );

    scene.add(group);
    molecules.push({
        mesh: group,
        speed: 0.002 + Math.random() * 0.005,
        rotation: 0.01 + Math.random() * 0.02
    });
}

// Create multiple molecules
for (let i = 0; i < 15; i++) {
    createMolecule();
}

// Lights
const light1 = new THREE.PointLight(0x00d2ff, 1);
light1.position.set(5, 5, 5);
scene.add(light1);

const light2 = new THREE.PointLight(0x2ecc71, 0.5);
light2.position.set(-5, -5, 5);
scene.add(light2);

const ambient = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambient);

camera.position.z = 10;

// Animation Loop
function animate() {
    requestAnimationFrame(animate);

    molecules.forEach(mol => {
        mol.mesh.rotation.x += mol.rotation;
        mol.mesh.rotation.y += mol.rotation;
        mol.mesh.position.y += Math.sin(Date.now() * 0.001 * mol.speed) * 0.01;
    });

    renderer.render(scene, camera);
}

animate();

// Handle Resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Handle Resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// JavaScript logic for three.js and basic interactivity remains.

// Beta Form Submission
document.getElementById('beta-signup-form')?.addEventListener('submit', async function (e) {
    e.preventDefault();
    const form = e.target;
    const btn = form.querySelector('.btn-submit');
    const originalText = btn.innerHTML;

    // Change button state to loading
    btn.innerHTML = 'جاري الإرسال... <i data-lucide="loader"></i>';
    btn.disabled = true;
    lucide.createIcons();

    const formData = new FormData(form);

    try {
        const response = await fetch(form.action, {
            method: form.method,
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            btn.innerHTML = 'تم تسجيل اهتمامك بنجاح! <i data-lucide="check-circle"></i>';
            btn.style.background = 'linear-gradient(45deg, #2ecc71, #27ae60)';
            form.reset();
        } else {
            throw new Error('فشل الإرسال');
        }
    } catch (error) {
        btn.innerHTML = 'حدث خطأ، يرجى المحاولة لاحقاً <i data-lucide="alert-circle"></i>';
        btn.style.background = 'linear-gradient(45deg, #e74c3c, #c0392b)';
    } finally {
        lucide.createIcons();
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
            btn.disabled = false;
            lucide.createIcons();
        }, 5000);
    }
});
