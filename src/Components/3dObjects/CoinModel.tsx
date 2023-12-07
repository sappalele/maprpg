import {
  Color3,
  HemisphericLight,
  Mesh,
  PBRSpecularGlossinessMaterial,
  Vector3,
} from '@babylonjs/core';
import '@babylonjs/loaders/OBJ';
import React, { Suspense, useCallback, useEffect, useRef } from 'react';
import { Model, useBeforeRender, useScene } from 'react-babylonjs';

export const CoinModel: React.FC = () => {
  const coinRef = useRef<Mesh>(null);
  const scene = useScene();

  useBeforeRender((scene) => {
    if (coinRef.current) {
      // Delta time smoothes the animation.
      const deltaTimeInMillis = scene.getEngine().getDeltaTime();
      const newVal = (5 / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);

      //coinRef.current.rotation.x += newVal;
      coinRef.current.rotation.y += newVal;
      coinRef.current.rotation.z += newVal;
    }
  });

  const goldMaterial = useCallback(() => {
    const material = new PBRSpecularGlossinessMaterial('gold', scene!);

    material.alpha = 1;
    material.glossiness = 0.51;
    material.diffuseColor = new Color3(0, 0, 0);
    material.emissiveColor = new Color3(0, 0, 0);
    material.specularColor = new Color3(0.93, 0.93, 0.57);

    return material;
  }, [scene]);

  useEffect(() => {
    if (scene) {
      let light = new HemisphericLight(
        'HemiLight',
        new Vector3(0, 1, 0),
        scene
      );
      light.groundColor = new Color3(0.5, 0.5, 0.5);
      light.intensity = 8;
    }
  }, [scene]);

  return (
    <Suspense fallback={<mesh name="loading" />}>
      <mesh ref={coinRef} name="coinMesh">
        <Model
          rotation={new Vector3(-20, 0, 0)}
          rootUrl={require('./models/coin.obj').default}
          sceneFilename=""
          name="coinModel"
          onModelLoaded={(m) => {
            m.meshes?.forEach((m) => {
              m.material = goldMaterial();
            });
          }}
        ></Model>
      </mesh>
    </Suspense>
  );
};
