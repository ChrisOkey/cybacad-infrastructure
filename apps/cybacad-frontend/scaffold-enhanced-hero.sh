#!/bin/bash

echo "🚀 Scaffolding Enhanced CybAcad Hero Section..."

mkdir -p src/components src/services src/assets

# HeroSection.tsx
cat <<EOF > src/components/HeroSection.tsx
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { logRoleSelection } from '../services/analytics';

const roleMeta = {
  Junior: 'For young learners',
  Personal: 'For lifelong growth',
  Corporate: 'For team development',
  Government: 'For public sector impact',
};

const splitText = (text: string) => text.split('');

export const HeroSection = () => {
  const navigate = useNavigate();
  const [expandedRole, setExpandedRole] = useState<string | null>(null);
  const toggleRole = (role: string) => {
    setExpandedRole(prev => (prev === role ? null : role));
  };

  const handleRoleClick = (role: string) => {
    logRoleSelection(role);
    navigate(\`/dashboard/\${role.toLowerCase()}\`);
  };

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useTransform(scrollYProgress, [0, 1], [0, 50]);

  const headline = 'Empower Your Future with CybAcad';

  return (
    <section className="bg-gradient-to-br from-blue-50 to-white py-16 px-6 text-center md:text-left md:flex md:items-center md:justify-between overflow-hidden">
      <motion.div
        className="max-w-xl"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.03 } },
        }}
      >
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-blue-900 leading-tight flex flex-wrap justify-center md:justify-start"
        >
          {splitText(headline).map((char, i) => (
            <motion.span
              key={i}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              className="inline-block"
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          className="mt-4 text-lg text-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          Learn. Grow. Lead. Tailored pathways for every ambition.
        </motion.p>

        <motion.div
          className="mt-6 grid grid-cols-1 md:flex md:flex-wrap gap-6 justify-center md:justify-start"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.2 } },
          }}
        >
          {Object.entries(roleMeta).map(([role, tagline]) => (
            <motion.div
              key={role}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              className="w-full md:w-auto bg-white rounded shadow p-4 text-center cursor-pointer"
              onClick={() => toggleRole(role)}
            >
              <button
                onClick={() => handleRoleClick(role)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded w-full"
              >
                {role}
              </button>
              <span className="mt-2 block text-sm text-gray-600">{tagline}</span>
              {expandedRole === role && (
                <div className="mt-3 text-sm text-gray-700">
                  Explore tailored content for {role} learners. Click again to collapse.
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        className="hidden md:block"
        style={{ y }}
        ref={ref}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <img src="/assets/hero-bg.svg" alt="AI learning visual" className="w-96" />
      </motion.div>
    </section>
  );
};
EOF

# analytics.ts
cat <<EOF > src/services/analytics.ts
import { getFirestore, collection, addDoc, Timestamp } from 'firebase/firestore';

export const logRoleSelection = async (role: string) => {
  const db = getFirestore();
  try {
    await addDoc(collection(db, 'roleSelections'), {
      role,
      timestamp: Timestamp.now(),
    });
  } catch (error) {
    console.error('Error logging role selection:', error);
  }
};
EOF

echo "✅ Enhanced Hero 