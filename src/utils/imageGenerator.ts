// 创建一个简单的图片组件来生成目的地卡片背景
export const createDestinationImage = (destination: string) => {
  const canvas = document.createElement('canvas');
  canvas.width = 400;
  canvas.height = 200;
  const ctx = canvas.getContext('2d');
  
  if (!ctx) return '';
  
  // 根据目的地设置不同的渐变色
  const gradients = {
    'Paris': ['#667eea', '#764ba2'],
    'Tokyo': ['#f093fb', '#f5576c'],
    'London': ['#4facfe', '#00f2fe'],
    'Sydney': ['#fa709a', '#fee140']
  };
  
  const colors = gradients[destination as keyof typeof gradients] || ['#667eea', '#764ba2'];
  const gradient = ctx.createLinearGradient(0, 0, 400, 200);
  gradient.addColorStop(0, colors[0]);
  gradient.addColorStop(1, colors[1]);
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 400, 200);
  
  return canvas.toDataURL();
};

export default createDestinationImage;
