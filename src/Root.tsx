import React from 'react';
import { Composition } from 'remotion';
import { VideoTemplate } from './VideoTemplate';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="VideoTemplate"
        component={VideoTemplate}
        durationInFrames={900} // 30 segundos a 30fps
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          // Props por defecto
          titulo: 'Video Template',
          colores: ['#FF6B6B', '#4ECDC4'],
          texto_completo: 'Contenido del video'
        }}
      />
    </>
  );
};