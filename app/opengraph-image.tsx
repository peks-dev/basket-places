import { ImageResponse } from 'next/og';

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        fontSize: 48,
        background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        padding: '40px',
        textAlign: 'center',
      }}
    >
      <div style={{ fontSize: 60, fontWeight: 'bold', marginBottom: 20 }}>
        🏀 Basket Places
      </div>
      <div style={{ fontSize: 28, maxWidth: 800, lineHeight: 1.3 }}>
        Directorio de comunidades de basketball
      </div>
      <div style={{ fontSize: 20, marginTop: 30, opacity: 0.9 }}>
        Encuentra tu comunidad local
      </div>
    </div>,
    {
      ...size,
    }
  );
}
