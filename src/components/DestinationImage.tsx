import React from 'react';

interface DestinationImageProps {
  destination: string;
  width?: number;
  height?: number;
  className?: string;
}

const DestinationImage: React.FC<DestinationImageProps> = ({ 
  destination, 
  width = 400, 
  height = 200, 
  className = '' 
}) => {
  // 预定义的目的地背景图
  const destinationImages = {
    'Paris': 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=400&h=200&fit=crop&crop=center&auto=format&q=80',
    'Tokyo': 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=200&fit=crop&crop=center&auto=format&q=80',
    'London': 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=200&fit=crop&crop=center&auto=format&q=80',
    'Sydney': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop&crop=center&auto=format&q=80',
    'Bali': 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=400&h=200&fit=crop&crop=center&auto=format&q=80',
    'Dubai': 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=200&fit=crop&crop=center&auto=format&q=80'
  };

  const imageUrl = destinationImages[destination as keyof typeof destinationImages];

  if (!imageUrl) {
    // 如果没有找到图片，生成一个渐变背景
    const gradients = {
      'Paris': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      'Tokyo': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      'London': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      'Sydney': 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      'Bali': 'linear-gradient(135deg, #56ab2f 0%, #a8e6cf 100%)',
      'Dubai': 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)'
    };

    const gradient = gradients[destination as keyof typeof gradients] || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';

    return (
      <div
        className={className}
        style={{
          width,
          height,
          background: gradient,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '18px',
          fontWeight: 'bold',
          textShadow: '0 2px 4px rgba(0,0,0,0.3)'
        }}
      >
        {destination}
      </div>
    );
  }

  return (
    <img
      src={imageUrl}
      alt={destination}
      className={className}
      style={{ width, height, objectFit: 'cover' }}
      onError={(e) => {
        // 如果图片加载失败，替换为渐变背景
        const target = e.target as HTMLImageElement;
        target.style.display = 'none';
        target.parentElement!.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        target.parentElement!.style.display = 'flex';
        target.parentElement!.style.alignItems = 'center';
        target.parentElement!.style.justifyContent = 'center';
        target.parentElement!.style.color = 'white';
        target.parentElement!.style.fontSize = '18px';
        target.parentElement!.style.fontWeight = 'bold';
        target.parentElement!.innerHTML = destination;
      }}
    />
  );
};

export default DestinationImage;
