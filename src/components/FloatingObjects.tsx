import React from 'react';
import { motion } from 'framer-motion';

const FloatingObjects: React.FC = () => {
  const objects = [
    {
      id: 'lhc',
      component: (
        <div className="w-16 h-16 relative">
          {/* LHC Ring */}
          <div className="absolute inset-0 border-4 border-blue-400/60 rounded-full">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
          </div>
          <div className="absolute inset-2 border-2 border-purple-400/40 rounded-full" />
        </div>
      ),
      position: { x: '15%', y: '20%' },
      animation: {
        y: [0, -20, 0],
        rotate: [0, 360],
      },
      duration: 8,
    },
    {
      id: 'telescope',
      component: (
        <div className="w-12 h-12 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-400 to-gray-600 rounded-lg transform rotate-12">
            <div className="absolute top-1 right-1 w-2 h-2 bg-blue-400 rounded-full" />
            <div className="absolute bottom-1 left-1 w-3 h-1 bg-gray-300 rounded" />
          </div>
        </div>
      ),
      position: { x: '85%', y: '25%' },
      animation: {
        y: [0, -15, 0],
        x: [0, 10, 0],
      },
      duration: 6,
    },
    {
      id: 'shoe',
      component: (
        <div className="w-14 h-8 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-full">
            <div className="absolute top-1 left-2 w-8 h-4 bg-orange-600 rounded-full" />
            <div className="absolute bottom-0 left-0 right-0 h-2 bg-gray-800 rounded-full" />
          </div>
        </div>
      ),
      position: { x: '20%', y: '70%' },
      animation: {
        y: [0, -25, 0],
        rotate: [0, 5, -5, 0],
      },
      duration: 7,
    },
    {
      id: 'mountain',
      component: (
        <div className="w-12 h-12 relative">
          <div className="absolute bottom-0 left-0 w-0 h-0 border-l-6 border-r-6 border-b-8 border-l-transparent border-r-transparent border-b-green-600" />
          <div className="absolute bottom-0 left-2 w-0 h-0 border-l-4 border-r-4 border-b-6 border-l-transparent border-r-transparent border-b-green-700" />
          <div className="absolute top-1 left-3 w-2 h-2 bg-white rounded-full" />
        </div>
      ),
      position: { x: '80%', y: '65%' },
      animation: {
        y: [0, -18, 0],
        x: [0, -8, 0],
      },
      duration: 9,
    },
    {
      id: 'computer',
      component: (
        <div className="w-14 h-10 relative">
          <div className="absolute inset-0 bg-gray-800 rounded border border-gray-600">
            <div className="absolute inset-1 bg-black rounded">
              <div className="absolute top-1 left-1 text-green-400 text-xs font-mono">$</div>
              <div className="absolute top-3 left-1 w-6 h-0.5 bg-green-400" />
              <div className="absolute top-4 left-1 w-4 h-0.5 bg-green-400" />
            </div>
          </div>
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-gray-700 rounded" />
        </div>
      ),
      position: { x: '10%', y: '45%' },
      animation: {
        y: [0, -12, 0],
        rotate: [0, 2, -2, 0],
      },
      duration: 5,
    },
    {
      id: 'atlas',
      component: (
        <div className="w-12 h-12 relative">
          <div className="absolute inset-0 border-2 border-cyan-400 rounded-full">
            <div className="absolute inset-2 border border-cyan-300 rounded-full">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-cyan-200 rounded-full" />
            </div>
          </div>
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0.5 h-3 bg-cyan-400" />
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0.5 h-3 bg-cyan-400" />
        </div>
      ),
      position: { x: '90%', y: '45%' },
      animation: {
        y: [0, -22, 0],
        rotate: [0, 180, 360],
      },
      duration: 10,
    },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {objects.map((obj) => (
        <motion.div
          key={obj.id}
          className="absolute"
          style={{
            left: obj.position.x,
            top: obj.position.y,
          }}
          animate={obj.animation}
          transition={{
            duration: obj.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {obj.component}
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingObjects;