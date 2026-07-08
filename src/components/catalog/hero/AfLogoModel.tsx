import { useEffect, useMemo } from "react";
import * as THREE from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { useLoader } from "@react-three/fiber";

const LOGO_SVG = "/brand/hero/af-logo.svg";
const TARGET_XY = 1.55;
const DEPTH_RATIO = 0.14;
const BEVEL_RATIO = 0.08;

function collectShapes(paths: ReturnType<SVGLoader["parse"]>["paths"]) {
  const shapes: THREE.Shape[] = [];
  for (const svgPath of paths) {
    shapes.push(...SVGLoader.createShapes(svgPath));
  }
  return shapes;
}

function measureShapeBounds(shapes: THREE.Shape[]) {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  for (const shape of shapes) {
    for (const point of shape.getPoints(24)) {
      minX = Math.min(minX, point.x);
      maxX = Math.max(maxX, point.x);
      minY = Math.min(minY, point.y);
      maxY = Math.max(maxY, point.y);
    }
  }

  const width = maxX - minX;
  const height = maxY - minY;
  const maxXY = Math.max(width, height, 1e-6);

  return {
    centerX: (minX + maxX) / 2,
    centerY: (minY + maxY) / 2,
    maxXY,
  };
}

function buildLogoGeometry(paths: ReturnType<SVGLoader["parse"]>["paths"]) {
  const shapes = collectShapes(paths);
  if (shapes.length === 0) return null;

  const { centerX, centerY, maxXY } = measureShapeBounds(shapes);
  const depth = maxXY * DEPTH_RATIO;
  const bevel = depth * BEVEL_RATIO;
  const pieces: THREE.BufferGeometry[] = [];

  for (const shape of shapes) {
    pieces.push(
      new THREE.ExtrudeGeometry(shape, {
        depth,
        bevelEnabled: true,
        bevelThickness: bevel,
        bevelSize: bevel,
        bevelSegments: 4,
        curveSegments: 12,
      }),
    );
  }

  const merged = mergeGeometries(pieces, false);
  pieces.forEach((geometry) => geometry.dispose());
  if (!merged) return null;

  const xyScale = TARGET_XY / maxXY;
  merged.translate(-centerX, -centerY, -depth / 2);
  merged.scale(xyScale, -xyScale, xyScale);
  merged.computeVertexNormals();

  return merged;
}

function createBrushedNormalMap(size = 256) {
  const data = new Uint8Array(size * size * 4);

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const i = (y * size + x) * 4;
      const grain = Math.sin(y * 0.42 + x * 0.03) * 0.06 + Math.sin(y * 1.7) * 0.025;
      const nx = grain;
      const nz = Math.sqrt(Math.max(0.04, 1 - nx * nx));
      data[i] = Math.floor((nx * 0.5 + 0.5) * 255);
      data[i + 1] = 128;
      data[i + 2] = Math.floor((nz * 0.5 + 0.5) * 255);
      data[i + 3] = 255;
    }
  }

  const texture = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2.8, 2.8);
  texture.needsUpdate = true;
  return texture;
}

function createMicroRoughnessMap(size = 256) {
  const data = new Uint8Array(size * size * 4);

  for (let i = 0; i < size * size; i++) {
    const n = 210 + Math.random() * 38;
    const offset = i * 4;
    data[offset] = n;
    data[offset + 1] = n;
    data[offset + 2] = n;
    data[offset + 3] = 255;
  }

  const texture = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 4);
  texture.needsUpdate = true;
  return texture;
}

function useLogoSurfaceMaps() {
  return useMemo(() => {
    const normalMap = createBrushedNormalMap();
    const roughnessMap = createMicroRoughnessMap();
    return { normalMap, roughnessMap };
  }, []);
}

export function AfLogoModel() {
  const { paths } = useLoader(SVGLoader, LOGO_SVG);
  const geometry = useMemo(() => buildLogoGeometry(paths), [paths]);
  const { normalMap, roughnessMap } = useLogoSurfaceMaps();

  useEffect(() => {
    return () => {
      normalMap.dispose();
      roughnessMap.dispose();
    };
  }, [normalMap, roughnessMap]);

  if (!geometry) return null;

  return (
    <mesh geometry={geometry} rotation={[0.12, 0.06, 0]}>
      <meshPhysicalMaterial
        color="#ffffff"
        roughness={0.1}
        metalness={0.78}
        clearcoat={1}
        clearcoatRoughness={0.035}
        envMapIntensity={2.25}
        normalMap={normalMap}
        normalScale={new THREE.Vector2(0.22, 0.22)}
        roughnessMap={roughnessMap}
        sheen={0.42}
        sheenRoughness={0.24}
        sheenColor="#dceeff"
        iridescence={0.12}
        iridescenceIOR={1.28}
        iridescenceThicknessRange={[120, 360]}
      />
    </mesh>
  );
}
