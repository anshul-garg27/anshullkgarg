import React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const ProofBand: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  const companies = [
    { name: 'Walmart NRT', logo: 'W' },
    { name: 'Good Creator Co.', logo: 'GCC' },
    { name: 'PayU', logo: 'P' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: prefersReducedMotion ? 0.01 : 0.6,
        staggerChildren: prefersReducedMotion ? 0 : 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: prefersReducedMotion ? 0.01 : 0.5, ease: "easeOut" }
    }
  };

  return (
    <section className="py-16 bg-neutral-50/50 dark:bg-neutral-900/50 border-y border-neutral-200/50 dark:border-neutral-800/50">
      <div className="max-w-content mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="text-center"
        >
          <motion.p
            variants={itemVariants}
            className="text-small text-neutral-500 dark:text-neutral-400 font-medium mb-8"
          >
            Worked on mission-critical systems at
          </motion.p>
          
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center items-center gap-8 md:gap-12"
          >
            {companies.map((company) => (
              <motion.div
                key={company.name}
                className="flex items-center gap-3 text-neutral-600 dark:text-neutral-400"
                whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-600 to-accent-600 flex items-center justify-center text-white font-bold text-sm">
                  {company.logo}
                </div>
                <span className="font-medium">{company.name}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Key metrics */}
          <motion.div
            variants={itemVariants}
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                Zero
              </div>
              <div className="text-small text-neutral-600 dark:text-neutral-400">
                Downtime Migrations
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-accent-600 dark:text-accent-400 mb-2">
                10M+
              </div>
              <div className="text-small text-neutral-600 dark:text-neutral-400">
                Daily Data Points
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-innovation-600 dark:text-innovation-400 mb-2">
                50%
              </div>
              <div className="text-small text-neutral-600 dark:text-neutral-400">
                Latency Reduction
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProofBand;
