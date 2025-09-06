import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { 
  Code2, Database, Cloud, Wrench, Target, 
  Radar, Grid3X3, Circle, Clock, Map, Search,
  Play, Pause
} from 'lucide-react';

// Enhanced skill data structure
interface Skill {
  id: string;
  name: string;
  proficiency: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  category: 'languages' | 'frameworks' | 'databases' | 'tools' | 'cloud';
  yearsOfExperience: number;
  x?: number; // For constellation positioning
  y?: number;
  connections?: string[]; // Connected skills
  color?: string;
  icon?: React.ComponentType<any>;
}

// Visualization modes
type VisualizationMode = 'constellation' | 'radar' | 'hexagon' | 'orbital' | 'timeline' | 'traditional';

const skillsData: Skill[] = [
  // Languages
  { id: 'java', name: 'Java', proficiency: 'expert', category: 'languages', yearsOfExperience: 5, connections: ['spring', 'hibernate'], color: '#f89820' },
  { id: 'python', name: 'Python', proficiency: 'expert', category: 'languages', yearsOfExperience: 4, connections: ['django', 'fastapi'], color: '#3776ab' },
  { id: 'golang', name: 'Golang', proficiency: 'advanced', category: 'languages', yearsOfExperience: 3, connections: ['docker', 'kubernetes'], color: '#00add8' },
  { id: 'javascript', name: 'JavaScript', proficiency: 'advanced', category: 'languages', yearsOfExperience: 3, connections: ['react', 'nodejs'], color: '#f7df1e' },
  { id: 'typescript', name: 'TypeScript', proficiency: 'advanced', category: 'languages', yearsOfExperience: 2, connections: ['react', 'nodejs'], color: '#3178c6' },
  
  // Frameworks
  { id: 'spring', name: 'Spring Boot', proficiency: 'expert', category: 'frameworks', yearsOfExperience: 4, connections: ['java', 'postgresql'], color: '#6db33f' },
  { id: 'django', name: 'Django', proficiency: 'advanced', category: 'frameworks', yearsOfExperience: 3, connections: ['python', 'postgresql'], color: '#092e20' },
  { id: 'fastapi', name: 'FastAPI', proficiency: 'advanced', category: 'frameworks', yearsOfExperience: 2, connections: ['python', 'postgresql'], color: '#009688' },
  { id: 'react', name: 'React', proficiency: 'advanced', category: 'frameworks', yearsOfExperience: 2, connections: ['javascript', 'typescript'], color: '#61dafb' },
  
  // Databases
  { id: 'postgresql', name: 'PostgreSQL', proficiency: 'expert', category: 'databases', yearsOfExperience: 4, connections: ['spring', 'django'], color: '#336791' },
  { id: 'clickhouse', name: 'ClickHouse', proficiency: 'advanced', category: 'databases', yearsOfExperience: 2, connections: ['python', 'golang'], color: '#ffcc02' },
  { id: 'redis', name: 'Redis', proficiency: 'advanced', category: 'databases', yearsOfExperience: 3, connections: ['spring', 'django'], color: '#dc382d' },
  { id: 'mysql', name: 'MySQL', proficiency: 'intermediate', category: 'databases', yearsOfExperience: 3, connections: ['java', 'python'], color: '#4479a1' },
  
  // Tools
  { id: 'docker', name: 'Docker', proficiency: 'expert', category: 'tools', yearsOfExperience: 4, connections: ['kubernetes', 'golang'], color: '#2496ed' },
  { id: 'kubernetes', name: 'Kubernetes', proficiency: 'advanced', category: 'tools', yearsOfExperience: 2, connections: ['docker', 'aws'], color: '#326ce5' },
  { id: 'kafka', name: 'Apache Kafka', proficiency: 'advanced', category: 'tools', yearsOfExperience: 2, connections: ['java', 'python'], color: '#231f20' },
  { id: 'airflow', name: 'Apache Airflow', proficiency: 'advanced', category: 'tools', yearsOfExperience: 2, connections: ['python', 'postgresql'], color: '#017cee' },
  
  // Cloud
  { id: 'aws', name: 'AWS', proficiency: 'advanced', category: 'cloud', yearsOfExperience: 3, connections: ['docker', 'kubernetes'], color: '#ff9900' },
  { id: 'azure', name: 'Azure', proficiency: 'intermediate', category: 'cloud', yearsOfExperience: 1, connections: ['docker'], color: '#0078d4' },
];

// Category configurations
const categoryConfig = {
  languages: { icon: Code2, color: '#3b82f6', label: 'Languages' },
  frameworks: { icon: Wrench, color: '#10b981', label: 'Frameworks' },
  databases: { icon: Database, color: '#f59e0b', label: 'Databases' },
  tools: { icon: Target, color: '#8b5cf6', label: 'Tools' },
  cloud: { icon: Cloud, color: '#06b6d4', label: 'Cloud' },
};

// Proficiency levels
const proficiencyLevels = {
  beginner: { value: 1, color: '#94a3b8', label: 'Beginner' },
  intermediate: { value: 2, color: '#3b82f6', label: 'Intermediate' },
  advanced: { value: 3, color: '#10b981', label: 'Advanced' },
  expert: { value: 4, color: '#f59e0b', label: 'Expert' },
};

// Constellation Map Component
const ConstellationMap: React.FC<{ skills: Skill[]; onSkillClick: (skill: Skill) => void }> = ({ skills, onSkillClick }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();

  // Generate constellation positions
  const positionedSkills = useMemo(() => {
    return skills.map((skill, index) => {
      const angle = (index / skills.length) * 2 * Math.PI;
      const radius = 120 + (proficiencyLevels[skill.proficiency].value * 30);
      const x = 200 + Math.cos(angle) * radius;
      const y = 200 + Math.sin(angle) * radius;
      return { ...skill, x, y };
    });
  }, [skills]);

  return (
    <div className="relative w-full h-96 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl overflow-hidden">
      <svg
        ref={svgRef}
        viewBox="0 0 400 400"
        className="w-full h-full"
        style={{ background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.1) 0%, transparent 70%)' }}
      >
        {/* Constellation connections */}
        {positionedSkills.map(skill => 
          skill.connections?.map(connId => {
            const connectedSkill = positionedSkills.find(s => s.id === connId);
            if (!connectedSkill) return null;
            
            return (
              <motion.line
                key={`${skill.id}-${connId}`}
                x1={skill.x}
                y1={skill.y}
                x2={connectedSkill.x}
                y2={connectedSkill.y}
                stroke="rgba(59, 130, 246, 0.3)"
                strokeWidth="1"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: 1, 
                  opacity: hoveredSkill === skill.id || hoveredSkill === connId ? 0.8 : 0.3 
                }}
                transition={{ duration: prefersReducedMotion ? 0.01 : 1, delay: 0.2 }}
              />
            );
          })
        )}

        {/* Skill nodes */}
        {positionedSkills.map((skill, index) => (
          <motion.g
            key={skill.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              duration: prefersReducedMotion ? 0.01 : 0.5, 
              delay: prefersReducedMotion ? 0 : index * 0.1 
            }}
            onMouseEnter={() => setHoveredSkill(skill.id)}
            onMouseLeave={() => setHoveredSkill(null)}
            onClick={() => onSkillClick(skill)}
            className="cursor-pointer"
          >
            {/* Glow effect */}
            <circle
              cx={skill.x}
              cy={skill.y}
              r={proficiencyLevels[skill.proficiency].value * 8}
              fill={skill.color}
              opacity={hoveredSkill === skill.id ? 0.3 : 0.1}
              className="transition-opacity duration-300"
            />
            
            {/* Main node */}
            <circle
              cx={skill.x}
              cy={skill.y}
              r={proficiencyLevels[skill.proficiency].value * 4 + 2}
              fill={skill.color}
              className="drop-shadow-lg"
            />
            
            {/* Skill name */}
            <text
              x={skill.x}
              y={skill.y + (proficiencyLevels[skill.proficiency].value * 4 + 15)}
              textAnchor="middle"
              className="fill-white text-xs font-medium"
              style={{ fontSize: '10px' }}
            >
              {skill.name}
            </text>
          </motion.g>
        ))}
      </svg>
      
      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg p-3">
        <div className="text-white text-xs font-medium mb-2">Proficiency</div>
        {Object.entries(proficiencyLevels).map(([level, config]) => (
          <div key={level} className="flex items-center gap-2 mb-1">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: config.color }}
            />
            <span className="text-white text-xs">{config.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Radar Chart Component
const RadarChart: React.FC<{ skills: Skill[] }> = ({ skills }) => {
  const categories = Object.keys(categoryConfig) as Array<keyof typeof categoryConfig>;
  const prefersReducedMotion = useReducedMotion();
  
  // Calculate average proficiency per category
  const categoryScores = categories.map(category => {
    const categorySkills = skills.filter(s => s.category === category);
    const avgScore = categorySkills.length > 0 
      ? categorySkills.reduce((sum, skill) => sum + proficiencyLevels[skill.proficiency].value, 0) / categorySkills.length
      : 0;
    return { category, score: avgScore, maxScore: 4 };
  });

  const centerX = 150;
  const centerY = 150;
  const maxRadius = 100;

  // Generate radar points
  const radarPoints = categoryScores.map((item, index) => {
    const angle = (index / categories.length) * 2 * Math.PI - Math.PI / 2;
    const radius = (item.score / item.maxScore) * maxRadius;
    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;
    return { x, y, ...item };
  });

  const pathData = radarPoints.map((point, index) => 
    `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
  ).join(' ') + ' Z';

  return (
    <div className="relative w-full h-80 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 rounded-2xl overflow-hidden">
      <svg viewBox="0 0 300 300" className="w-full h-full">
        {/* Grid circles */}
        {[0.25, 0.5, 0.75, 1].map(ratio => (
          <circle
            key={ratio}
            cx={centerX}
            cy={centerY}
            r={maxRadius * ratio}
            fill="none"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="1"
          />
        ))}

        {/* Grid lines */}
        {categories.map((_, index) => {
          const angle = (index / categories.length) * 2 * Math.PI - Math.PI / 2;
          const x = centerX + Math.cos(angle) * maxRadius;
          const y = centerY + Math.sin(angle) * maxRadius;
          return (
            <line
              key={index}
              x1={centerX}
              y1={centerY}
              x2={x}
              y2={y}
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth="1"
            />
          );
        })}

        {/* Radar area */}
        <motion.path
          d={pathData}
          fill="rgba(59, 130, 246, 0.3)"
          stroke="rgb(59, 130, 246)"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 1.5 }}
        />

        {/* Data points */}
        {radarPoints.map((point, index) => (
          <motion.circle
            key={index}
            cx={point.x}
            cy={point.y}
            r="4"
            fill="rgb(59, 130, 246)"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              duration: prefersReducedMotion ? 0.01 : 0.3, 
              delay: prefersReducedMotion ? 0 : index * 0.1 
            }}
          />
        ))}

        {/* Category labels */}
        {categories.map((category, index) => {
          const angle = (index / categories.length) * 2 * Math.PI - Math.PI / 2;
          const x = centerX + Math.cos(angle) * (maxRadius + 20);
          const y = centerY + Math.sin(angle) * (maxRadius + 20);
          return (
            <text
              key={category}
              x={x}
              y={y}
              textAnchor="middle"
              className="fill-white text-xs font-medium"
              style={{ fontSize: '11px' }}
            >
              {categoryConfig[category].label}
            </text>
          );
        })}
      </svg>
    </div>
  );
};

// Hexagonal Grid Component
const HexagonGrid: React.FC<{ skills: Skill[]; onSkillClick: (skill: Skill) => void }> = ({ skills, onSkillClick }) => {
  const prefersReducedMotion = useReducedMotion();
  
  // Hexagon path
  const hexPath = "M30,15 L45,7.5 L60,15 L60,30 L45,37.5 L30,30 Z";
  
  return (
    <div className="w-full bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900 rounded-2xl p-6 overflow-hidden">
      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 gap-2 justify-items-center">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.id}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              duration: prefersReducedMotion ? 0.01 : 0.5, 
              delay: prefersReducedMotion ? 0 : index * 0.05,
              type: "spring",
              stiffness: 100
            }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            onClick={() => onSkillClick(skill)}
            className="cursor-pointer"
          >
            <svg width="60" height="45" viewBox="0 0 90 45">
              <path
                d={hexPath}
                fill={skill.color}
                opacity={0.8}
                className="drop-shadow-lg"
              />
              <text
                x="45"
                y="25"
                textAnchor="middle"
                className="fill-white text-xs font-bold"
                style={{ fontSize: '8px' }}
              >
                {skill.name.length > 8 ? skill.name.substring(0, 6) + '...' : skill.name}
              </text>
            </svg>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Orbital System Component
const OrbitalSystem: React.FC<{ skills: Skill[]; onSkillClick: (skill: Skill) => void }> = ({ skills, onSkillClick }) => {
  const [isAnimating, setIsAnimating] = useState(true);
  const prefersReducedMotion = useReducedMotion();
  
  // Group skills by category
  const skillsByCategory = Object.entries(categoryConfig).map(([category, config]) => ({
    category: category as keyof typeof categoryConfig,
    config,
    skills: skills.filter(s => s.category === category),
  }));

  return (
    <div className="relative w-full h-96 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 rounded-2xl overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Central core */}
        <div className="absolute w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full shadow-2xl flex items-center justify-center">
          <Code2 className="w-8 h-8 text-white" />
        </div>

        {/* Orbital rings */}
        {skillsByCategory.map((categoryGroup, ringIndex) => {
          const radius = 80 + ringIndex * 40;
          const skillCount = categoryGroup.skills.length;
          
          return (
            <div key={categoryGroup.category} className="absolute">
              {/* Orbit path */}
              <div 
                className="absolute border border-white/10 rounded-full"
                style={{
                  width: radius * 2,
                  height: radius * 2,
                  left: -radius,
                  top: -radius,
                }}
              />
              
              {/* Orbiting skills */}
              {categoryGroup.skills.map((skill, skillIndex) => {
                const angle = (skillIndex / skillCount) * 2 * Math.PI;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                
                return (
                  <motion.div
                    key={skill.id}
                    className="absolute w-8 h-8 rounded-full flex items-center justify-center cursor-pointer shadow-lg"
                    style={{
                      backgroundColor: skill.color,
                      left: x - 16,
                      top: y - 16,
                    }}
                    animate={isAnimating && !prefersReducedMotion ? {
                      rotate: 360,
                    } : {}}
                    transition={{
                      duration: 10 + ringIndex * 5,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    whileHover={{ scale: 1.2 }}
                    onClick={() => onSkillClick(skill)}
                    title={skill.name}
                  >
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </motion.div>
                );
              })}
            </div>
          );
        })}
      </div>
      
      {/* Controls */}
      <div className="absolute top-4 right-4">
        <button
          onClick={() => setIsAnimating(!isAnimating)}
          className="bg-white/20 backdrop-blur-sm rounded-full p-2 text-white hover:bg-white/30 transition-colors"
        >
          {isAnimating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
};

// Timeline Component
const SkillTimeline: React.FC<{ skills: Skill[] }> = ({ skills }) => {
  const prefersReducedMotion = useReducedMotion();
  
  // Sort skills by years of experience
  const sortedSkills = [...skills].sort((a, b) => b.yearsOfExperience - a.yearsOfExperience);
  
  return (
    <div className="w-full bg-gradient-to-r from-slate-900 via-gray-900 to-slate-900 rounded-2xl p-6">
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500" />
        
        {sortedSkills.map((skill, index) => (
          <motion.div
            key={skill.id}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ 
              duration: prefersReducedMotion ? 0.01 : 0.5, 
              delay: prefersReducedMotion ? 0 : index * 0.1 
            }}
            className="relative flex items-center mb-6 last:mb-0"
          >
            {/* Timeline dot */}
            <div 
              className="w-4 h-4 rounded-full border-2 border-white shadow-lg z-10"
              style={{ backgroundColor: skill.color }}
            />
            
            {/* Content */}
            <div className="ml-6 bg-white/10 backdrop-blur-sm rounded-lg p-4 flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-white font-semibold">{skill.name}</h3>
                <span className="text-white/70 text-sm">
                  {skill.yearsOfExperience} year{skill.yearsOfExperience !== 1 ? 's' : ''}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs text-white/60 capitalize">{skill.category}</span>
                <div 
                  className="px-2 py-1 rounded-full text-xs font-medium"
                  style={{ 
                    backgroundColor: proficiencyLevels[skill.proficiency].color + '20',
                    color: proficiencyLevels[skill.proficiency].color
                  }}
                >
                  {skill.proficiency}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Main Skills Component
const InnovativeSkills: React.FC = () => {
  const [currentMode, setCurrentMode] = useState<VisualizationMode>('constellation');
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [filteredSkills, setFilteredSkills] = useState<Skill[]>(skillsData);
  const [searchTerm, setSearchTerm] = useState('');
  const prefersReducedMotion = useReducedMotion();

  const visualizationModes = [
    { id: 'constellation', label: 'Constellation', icon: Map },
    { id: 'radar', label: 'Radar', icon: Radar },
    { id: 'hexagon', label: 'Hexagon', icon: Grid3X3 },
    { id: 'orbital', label: 'Orbital', icon: Circle },
    { id: 'timeline', label: 'Timeline', icon: Clock },
  ] as const;

  // Filter skills based on search
  useEffect(() => {
    const filtered = skillsData.filter(skill =>
      skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      skill.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSkills(filtered);
  }, [searchTerm]);

  const handleSkillClick = (skill: Skill) => {
    setSelectedSkill(skill);
  };

  const renderVisualization = () => {
    switch (currentMode) {
      case 'constellation':
        return <ConstellationMap skills={filteredSkills} onSkillClick={handleSkillClick} />;
      case 'radar':
        return <RadarChart skills={filteredSkills} />;
      case 'hexagon':
        return <HexagonGrid skills={filteredSkills} onSkillClick={handleSkillClick} />;
      case 'orbital':
        return <OrbitalSystem skills={filteredSkills} onSkillClick={handleSkillClick} />;
      case 'timeline':
        return <SkillTimeline skills={filteredSkills} />;
      default:
        return <ConstellationMap skills={filteredSkills} onSkillClick={handleSkillClick} />;
    }
  };

  return (
    <section className="py-24 md:py-32 scroll-mt-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-h1 md:text-h1-lg font-display text-neutral-900 dark:text-white mb-4">
            Skills & Expertise
          </h2>
          <p className="text-body-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto mb-8">
            Interactive visualization of technical skills and proficiency levels across different domains
          </p>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.6, delay: 0.2 }}
          className="mb-8"
        >
          {/* Visualization Mode Selector */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
            {visualizationModes.map((mode) => (
              <button
                key={mode.id}
                onClick={() => setCurrentMode(mode.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                  currentMode === mode.id
                    ? 'bg-primary-500 text-white shadow-lg'
                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                }`}
              >
                <mode.icon className="w-4 h-4" />
                <span className="text-sm font-medium">{mode.label}</span>
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="flex justify-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                placeholder="Search skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-64 rounded-full bg-neutral-100 dark:bg-neutral-800 border-0 outline-none focus:ring-2 focus:ring-primary-300 text-sm text-neutral-900 dark:text-neutral-100 placeholder-neutral-500"
              />
            </div>
          </div>
        </motion.div>

        {/* Visualization */}
        <motion.div
          key={currentMode}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.5 }}
          className="mb-8"
        >
          {renderVisualization()}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.6, delay: 0.4 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center"
        >
          <div className="bg-white/50 dark:bg-neutral-800/50 backdrop-blur-sm rounded-lg p-4">
            <div className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-1">
              {skillsData.filter(s => s.proficiency === 'expert').length}
            </div>
            <div className="text-sm text-neutral-600 dark:text-neutral-400">Expert Level</div>
          </div>
          <div className="bg-white/50 dark:bg-neutral-800/50 backdrop-blur-sm rounded-lg p-4">
            <div className="text-2xl font-bold text-success-600 dark:text-success-400 mb-1">
              {skillsData.filter(s => s.proficiency === 'advanced').length}
            </div>
            <div className="text-sm text-neutral-600 dark:text-neutral-400">Advanced</div>
          </div>
          <div className="bg-white/50 dark:bg-neutral-800/50 backdrop-blur-sm rounded-lg p-4">
            <div className="text-2xl font-bold text-warning-600 dark:text-warning-400 mb-1">
              {Object.keys(categoryConfig).length}
            </div>
            <div className="text-sm text-neutral-600 dark:text-neutral-400">Categories</div>
          </div>
          <div className="bg-white/50 dark:bg-neutral-800/50 backdrop-blur-sm rounded-lg p-4">
            <div className="text-2xl font-bold text-info-600 dark:text-info-400 mb-1">
              {Math.round(skillsData.reduce((sum, skill) => sum + skill.yearsOfExperience, 0) / skillsData.length)}
            </div>
            <div className="text-sm text-neutral-600 dark:text-neutral-400">Avg Years</div>
          </div>
        </motion.div>

        {/* Skill Detail Modal */}
        <AnimatePresence>
          {selectedSkill && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedSkill(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white dark:bg-neutral-800 rounded-2xl p-6 max-w-md w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: selectedSkill.color + '20' }}
                  >
                    <div 
                      className="w-6 h-6 rounded-full"
                      style={{ backgroundColor: selectedSkill.color }}
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                      {selectedSkill.name}
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400 capitalize">
                      {selectedSkill.category}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-neutral-600 dark:text-neutral-400">Proficiency</span>
                    <span 
                      className="px-2 py-1 rounded-full text-sm font-medium capitalize"
                      style={{ 
                        backgroundColor: proficiencyLevels[selectedSkill.proficiency].color + '20',
                        color: proficiencyLevels[selectedSkill.proficiency].color
                      }}
                    >
                      {selectedSkill.proficiency}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600 dark:text-neutral-400">Experience</span>
                    <span className="text-neutral-900 dark:text-white font-medium">
                      {selectedSkill.yearsOfExperience} years
                    </span>
                  </div>
                  {selectedSkill.connections && selectedSkill.connections.length > 0 && (
                    <div>
                      <span className="text-neutral-600 dark:text-neutral-400 block mb-2">Connected Skills</span>
                      <div className="flex flex-wrap gap-2">
                        {selectedSkill.connections.map(connId => {
                          const connSkill = skillsData.find(s => s.id === connId);
                          return connSkill ? (
                            <span 
                              key={connId}
                              className="px-2 py-1 bg-neutral-100 dark:bg-neutral-700 rounded-full text-xs"
                            >
                              {connSkill.name}
                            </span>
                          ) : null;
                        })}
                      </div>
                    </div>
                  )}
                </div>
                
                <button
                  onClick={() => setSelectedSkill(null)}
                  className="mt-6 w-full bg-primary-500 text-white py-2 rounded-lg hover:bg-primary-600 transition-colors"
                >
                  Close
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default InnovativeSkills;
