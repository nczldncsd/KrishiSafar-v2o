import React from 'react';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';

const AnimatedIcon = ({ 
  icon, 
  size = 24, 
  className = '', 
  animate = true, 
  hoverEffect = true,
  color = 'currentColor',
  onClick,
  ...props 
}) => {
  const IconComponent = LucideIcons[icon] || LucideIcons['HelpCircle'];

  if (!animate) {
    return (
      <IconComponent 
        size={size} 
        className={className} 
        color={color}
        onClick={onClick}
        {...props}
      />
    );
  }

  return (
    <motion.div
      whileHover={hoverEffect ? { 
        scale: 1.1, 
        rotate: 5,
        transition: { duration: 0.2 } 
      } : {}}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={className}
      onClick={onClick}
    >
      <IconComponent 
        size={size} 
        color={color}
        {...props}
      />
    </motion.div>
  );
};

export default AnimatedIcon;