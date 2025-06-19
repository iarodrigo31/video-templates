import React from 'react';
import { 
  AbsoluteFill, 
  Sequence, 
  useCurrentFrame, 
  interpolate,
  Img,
  Audio
} from 'remotion';

interface VideoProps {
  titulo: string;
  colores: string[];
  texto_completo: string;
  imagen?: {
    url: string;
  };
  remotion_config: {
    scenes: Array<{
      start: number;
      duration: number;
      text: string;
      emoji: string;
      background: string;
    }>;
  };
}

export const VideoTemplate: React.FC<VideoProps> = ({
  titulo,
  colores,
  texto_completo,
  imagen,
  remotion_config
}) => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{
      background: `linear-gradient(45deg, ${colores[0]}, ${colores[1]})`
    }}>
      {/* Imagen de fondo si existe */}
      {imagen && (
        <Img
          src={imagen.url}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.3
          }}
        />
      )}
      
      {/* Renderizar escenas */}
      {remotion_config.scenes.map((scene, index) => (
        <Sequence
          key={index}
          from={scene.start * 30} // Convertir segundos a frames
          durationInFrames={scene.duration * 30}
        >
          <SceneComponent scene={scene} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};

const SceneComponent: React.FC<{ scene: any }> = ({ scene }) => {
  const frame = useCurrentFrame();
  
  // Animación de entrada
  const opacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  });

  const scale = interpolate(frame, [0, 15], [0.8, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  });

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '100px 50px',
        opacity,
        transform: `scale(${scale})`
      }}
    >
      <div style={{
        fontSize: '150px',
        marginBottom: '50px'
      }}>
        {scene.emoji}
      </div>
      
      <div style={{
        fontSize: '60px',
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        textShadow: '3px 3px 6px rgba(0,0,0,0.7)',
        lineHeight: '1.2',
        maxWidth: '900px'
      }}>
        {scene.text}
      </div>
    </AbsoluteFill>
  );
};