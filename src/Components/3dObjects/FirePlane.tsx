import { MeshBuilder, StandardMaterial, Vector3 } from '@babylonjs/core';
import { FireProceduralTexture } from '@babylonjs/procedural-textures';
import React, { useEffect } from 'react';
import { useScene } from 'react-babylonjs';
import { useWindowSize } from 'react-use';
import { ANIMATION_FRAMERATE, visibilityAnimation } from '..';

export const FirePlane: React.FC = () => {
  const scene = useScene();
  const windowSize = useWindowSize();

  useEffect(() => {
    if (scene) {
      if (scene._activeCamera) {
        const c = scene._activeCamera;
        const fov = c?.fov;
        const aspectRatio = windowSize.width / windowSize.height;
        const d = c.position.length();

        console.debug('FOV:' + fov, 'aspectRatio:' + aspectRatio, 'd:' + d);

        const y = d * Math.tan(fov);
        const x = y * aspectRatio;

        const size = Math.max(y, x);

        const plane = MeshBuilder.CreatePlane(
          'plane',
          { width: size, height: size },
          scene
        );

        const fireTexture = new FireProceduralTexture('fire', 256, scene);
        const fireMaterial = new StandardMaterial('fireMaterial', scene);
        fireMaterial.diffuseTexture = fireTexture;
        fireMaterial.opacityTexture = fireTexture;

        plane.material = fireMaterial;
        plane.animations.push(visibilityAnimation(3000));

        scene.beginAnimation(plane, 0, 3 * ANIMATION_FRAMERATE, false);

        scene.clearColor.set(0, 0, 0, 0.7);
      }
    }
  }, [scene, windowSize.width, windowSize.height]);

  useEffect(() => {
    return () => {
      scene?.clearColor.set(0, 0, 0, 0);
    };
  }, [scene]);

  return <hemisphericLight name="Light" direction={new Vector3(0, 10, 0)} />;
};
