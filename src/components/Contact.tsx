import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle, 
  AlertCircle, 
  Linkedin,
  Github,
  MessageSquare,
  Copy,
  ExternalLink,
  Clock,
  Zap,
  Shield,
  User,
  AtSign,
  FileText,
  MessageCircle
} from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

interface ContactMethod {
  id: string;
  label: string;
  value: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  responseTime: string;
  preferred?: boolean;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  
  const prefersReducedMotion = useReducedMotion();

  // Contact methods with real data from resume
  const contactMethods: ContactMethod[] = [
    {
      id: 'email',
      label: 'Email',
      value: 'anshulgarg.garg509@gmail.com',
      href: 'mailto:anshulgarg.garg509@gmail.com',
      icon: Mail,
      description: 'Best for detailed discussions and project inquiries',
      responseTime: 'Within 24 hours',
      preferred: true
    },
    {
      id: 'phone',
      label: 'Phone',
      value: '+91-8560826690',
      href: 'tel:+918560826690',
      icon: Phone,
      description: 'For urgent matters and quick discussions',
      responseTime: 'Business hours (IST)',
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      value: 'anshullkgarg',
      href: 'https://linkedin.com/in/anshullkgarg',
      icon: Linkedin,
      description: 'Professional networking and career opportunities',
      responseTime: 'Within 2-3 days',
    },
    {
      id: 'github',
      label: 'GitHub',
      value: 'anshul-garg27',
      href: 'https://github.com/anshul-garg27',
      icon: Github,
      description: 'Code reviews, technical discussions, and collaborations',
      responseTime: 'Within 1-2 days',
    }
  ];

  // Form validation
  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        if (value.trim().length > 50) return 'Name must be less than 50 characters';
        break;
      case 'email':
        if (!value.trim()) return 'Email is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Please enter a valid email address';
        break;
      case 'subject':
        if (!value.trim()) return 'Subject is required';
        if (value.trim().length < 5) return 'Subject must be at least 5 characters';
        if (value.trim().length > 100) return 'Subject must be less than 100 characters';
        break;
      case 'message':
        if (!value.trim()) return 'Message is required';
        if (value.trim().length < 10) return 'Message must be at least 10 characters';
        if (value.trim().length > 1000) return 'Message must be less than 1000 characters';
        break;
    }
    return undefined;
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key as keyof typeof formData]);
      if (error) newErrors[key as keyof FormErrors] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const copyToClipboard = async (text: string, fieldId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(fieldId);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  // Auto-clear success message after 5 seconds
  useEffect(() => {
    if (submitStatus === 'success') {
      const timer = setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched
    setTouched({ name: true, email: true, subject: true, message: true });
    
    // Validate form
    if (!validateForm()) {
      // Focus first error field
      const firstErrorField = Object.keys(errors)[0];
      if (firstErrorField && formRef.current) {
        const field = formRef.current.querySelector(`[name="${firstErrorField}"]`) as HTMLElement;
        field?.focus();
      }
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Simulate API call with realistic delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, you would send the form data to your backend
      console.log('Form submitted:', formData);
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTouched({});
      setErrors({});
      
      // Scroll to success message
      setTimeout(() => {
        const successElement = document.querySelector('[data-success-message]');
        successElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
      
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      id="contact" 
      className="py-24 md:py-32 bg-neutral-50 dark:bg-neutral-900/50"
      aria-labelledby="contact-heading"
    >
      <div className="max-w-[1100px] mx-auto px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 
              id="contact-heading"
              className="text-display font-bold text-neutral-900 dark:text-neutral-100 mb-6"
            >
              Let's Work Together
            </h2>
            <p className="text-body-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto mb-8">
              Ready to build something amazing? I'm always excited about new opportunities, 
              challenging projects, and meaningful collaborations. Let's connect!
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto rounded-full" />
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Methods */}
            <motion.div variants={itemVariants} className="space-y-8">
              <div className="card-bg rounded-card p-8">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
                    <MessageSquare className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="text-h3 font-bold text-neutral-900 dark:text-neutral-100">
                    Contact Methods
                  </h3>
                </div>
                
                <div className="space-y-6">
                  {contactMethods.map((method) => (
                    <motion.div
                      key={method.id}
                      className="group relative"
                      whileHover={prefersReducedMotion ? {} : { x: 4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex items-start gap-4 p-4 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-200 hover:shadow-md">
                        <div className={`p-3 rounded-lg flex-shrink-0 ${
                          method.preferred 
                            ? 'bg-primary-100 dark:bg-primary-900/30' 
                            : 'bg-neutral-100 dark:bg-neutral-800'
                        }`}>
                          <method.icon className={`w-5 h-5 ${
                            method.preferred 
                              ? 'text-primary-600 dark:text-primary-400' 
                              : 'text-neutral-600 dark:text-neutral-400'
                          }`} />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="text-body-lg font-semibold text-neutral-900 dark:text-neutral-100">
                              {method.label}
                            </h4>
                            {method.preferred && (
                              <span className="px-2 py-0.5 bg-accent-100 text-accent-800 dark:bg-accent-900/30 dark:text-accent-300 rounded-full text-xs font-medium">
                                Preferred
                              </span>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-2 mb-2">
                            <a 
                              href={method.href}
                              target={method.id === 'linkedin' || method.id === 'github' ? '_blank' : undefined}
                              rel={method.id === 'linkedin' || method.id === 'github' ? 'noopener noreferrer' : undefined}
                              className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors font-medium text-small"
                            >
                              {method.value}
                            </a>
                            <button
                              onClick={() => copyToClipboard(method.value, method.id)}
                              className="p-1 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                              title="Copy to clipboard"
                            >
                              {copiedField === method.id ? (
                                <CheckCircle className="w-4 h-4 text-accent-600 dark:text-accent-400" />
                              ) : (
                                <Copy className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
                              )}
                            </button>
                            {(method.id === 'linkedin' || method.id === 'github') && (
                              <ExternalLink className="w-3 h-3 text-neutral-400" />
                            )}
                          </div>
                          
                          <p className="text-small text-neutral-600 dark:text-neutral-400 mb-2">
                            {method.description}
                          </p>
                          
                          <div className="flex items-center gap-1 text-xs text-neutral-500 dark:text-neutral-500">
                            <Clock className="w-3 h-3" />
                            <span>{method.responseTime}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-700">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-accent-100 dark:bg-accent-900/30 rounded-lg flex-shrink-0">
                      <Zap className="w-4 h-4 text-accent-600 dark:text-accent-400" />
                    </div>
                    <div>
                      <h5 className="text-small font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
                        Quick Response Guarantee
                      </h5>
                      <p className="text-small text-neutral-600 dark:text-neutral-400 leading-relaxed">
                        I prioritize communication and typically respond within 24 hours. 
                        For urgent technical discussions, LinkedIn or email work best.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Location & Availability */}
              <div className="card-bg rounded-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  <h4 className="text-body-lg font-semibold text-neutral-900 dark:text-neutral-100">
                    Location & Availability
                  </h4>
                </div>
                <div className="space-y-3 text-small text-neutral-600 dark:text-neutral-400">
                  <p><strong className="text-neutral-900 dark:text-neutral-100">Based in:</strong> Bengaluru, Karnataka, India</p>
                  <p><strong className="text-neutral-900 dark:text-neutral-100">Timezone:</strong> IST (UTC+5:30)</p>
                  <p><strong className="text-neutral-900 dark:text-neutral-100">Available for:</strong> Full-time opportunities, consulting, and technical discussions</p>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={itemVariants}>
              <div className="card-bg rounded-card p-8">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2 bg-accent-100 dark:bg-accent-900/30 rounded-lg">
                    <MessageCircle className="w-5 h-5 text-accent-600 dark:text-accent-400" />
                  </div>
                  <h3 className="text-h3 font-bold text-neutral-900 dark:text-neutral-100">
                    Send a Message
                  </h3>
                </div>

                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label 
                        htmlFor="name" 
                        className="flex items-center gap-2 text-small font-semibold text-neutral-700 dark:text-neutral-300 mb-2"
                      >
                        <User className="w-4 h-4" />
                        Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        className={`w-full px-4 py-3 border rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 transition-all duration-200 ${
                          errors.name && touched.name
                            ? 'border-semantic-error-500 focus:ring-semantic-error-500 focus:border-semantic-error-500'
                            : 'border-neutral-300 dark:border-neutral-600 focus:ring-primary-500 focus:border-primary-500'
                        }`}
                        placeholder="Your full name"
                        aria-describedby={errors.name && touched.name ? 'name-error' : undefined}
                      />
                      <AnimatePresence>
                        {errors.name && touched.name && (
                          <motion.p
                            id="name-error"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="mt-1 text-xs text-semantic-error-600 dark:text-semantic-error-400 flex items-center gap-1"
                          >
                            <AlertCircle className="w-3 h-3" />
                            {errors.name}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>

                    <div>
                      <label 
                        htmlFor="email" 
                        className="flex items-center gap-2 text-small font-semibold text-neutral-700 dark:text-neutral-300 mb-2"
                      >
                        <AtSign className="w-4 h-4" />
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        className={`w-full px-4 py-3 border rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 transition-all duration-200 ${
                          errors.email && touched.email
                            ? 'border-semantic-error-500 focus:ring-semantic-error-500 focus:border-semantic-error-500'
                            : 'border-neutral-300 dark:border-neutral-600 focus:ring-primary-500 focus:border-primary-500'
                        }`}
                        placeholder="your.email@company.com"
                        aria-describedby={errors.email && touched.email ? 'email-error' : undefined}
                      />
                      <AnimatePresence>
                        {errors.email && touched.email && (
                          <motion.p
                            id="email-error"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="mt-1 text-xs text-semantic-error-600 dark:text-semantic-error-400 flex items-center gap-1"
                          >
                            <AlertCircle className="w-3 h-3" />
                            {errors.email}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  <div>
                    <label 
                      htmlFor="subject" 
                      className="flex items-center gap-2 text-small font-semibold text-neutral-700 dark:text-neutral-300 mb-2"
                    >
                      <FileText className="w-4 h-4" />
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={`w-full px-4 py-3 border rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 transition-all duration-200 ${
                        errors.subject && touched.subject
                          ? 'border-semantic-error-500 focus:ring-semantic-error-500 focus:border-semantic-error-500'
                          : 'border-neutral-300 dark:border-neutral-600 focus:ring-primary-500 focus:border-primary-500'
                      }`}
                      placeholder="Job opportunity, project collaboration, etc."
                      aria-describedby={errors.subject && touched.subject ? 'subject-error' : undefined}
                    />
                    <AnimatePresence>
                      {errors.subject && touched.subject && (
                        <motion.p
                          id="subject-error"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="mt-1 text-xs text-semantic-error-600 dark:text-semantic-error-400 flex items-center gap-1"
                        >
                          <AlertCircle className="w-3 h-3" />
                          {errors.subject}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <div>
                    <label 
                      htmlFor="message" 
                      className="flex items-center gap-2 text-small font-semibold text-neutral-700 dark:text-neutral-300 mb-2"
                    >
                      <MessageSquare className="w-4 h-4" />
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      rows={6}
                      className={`w-full px-4 py-3 border rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 transition-all duration-200 resize-vertical ${
                        errors.message && touched.message
                          ? 'border-semantic-error-500 focus:ring-semantic-error-500 focus:border-semantic-error-500'
                          : 'border-neutral-300 dark:border-neutral-600 focus:ring-primary-500 focus:border-primary-500'
                      }`}
                      placeholder="Tell me about your project, role requirements, or what you'd like to discuss..."
                      aria-describedby={errors.message && touched.message ? 'message-error' : undefined}
                    />
                    <div className="flex justify-between items-center mt-1">
                      <AnimatePresence>
                        {errors.message && touched.message && (
                          <motion.p
                            id="message-error"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="text-xs text-semantic-error-600 dark:text-semantic-error-400 flex items-center gap-1"
                          >
                            <AlertCircle className="w-3 h-3" />
                            {errors.message}
                          </motion.p>
                        )}
                      </AnimatePresence>
                      <span className={`text-xs ${
                        formData.message.length > 900 
                          ? 'text-semantic-warning-600 dark:text-semantic-warning-400' 
                          : 'text-neutral-500 dark:text-neutral-500'
                      }`}>
                        {formData.message.length}/1000
                      </span>
                    </div>
                  </div>

                  {/* Submit Status */}
                  <AnimatePresence>
                    {submitStatus === 'success' && (
                      <motion.div
                        data-success-message
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        className="p-4 bg-semantic-success-50 dark:bg-semantic-success-900/20 border border-semantic-success-200 dark:border-semantic-success-800 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-1 bg-semantic-success-100 dark:bg-semantic-success-900/30 rounded-full">
                            <CheckCircle className="w-5 h-5 text-semantic-success-600 dark:text-semantic-success-400" />
                          </div>
                          <div>
                            <h4 className="text-small font-semibold text-semantic-success-800 dark:text-semantic-success-200">
                              Message sent successfully!
                            </h4>
                            <p className="text-xs text-semantic-success-700 dark:text-semantic-success-300">
                              Thank you for reaching out. I'll get back to you within 24 hours.
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {submitStatus === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        className="p-4 bg-semantic-error-50 dark:bg-semantic-error-900/20 border border-semantic-error-200 dark:border-semantic-error-800 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-1 bg-semantic-error-100 dark:bg-semantic-error-900/30 rounded-full">
                            <AlertCircle className="w-5 h-5 text-semantic-error-600 dark:text-semantic-error-400" />
                          </div>
                          <div>
                            <h4 className="text-small font-semibold text-semantic-error-800 dark:text-semantic-error-200">
                              Failed to send message
                            </h4>
                            <p className="text-xs text-semantic-error-700 dark:text-semantic-error-300">
                              Please try again or email me directly at anshulgarg.garg509@gmail.com
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full px-8 py-4 rounded-lg font-semibold text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 shadow-lg flex items-center justify-center gap-3 ${
                      isSubmitting
                        ? 'bg-neutral-400 dark:bg-neutral-600 cursor-not-allowed'
                        : 'bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]'
                    }`}
                    whileHover={prefersReducedMotion ? {} : { scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={prefersReducedMotion ? {} : { scale: isSubmitting ? 1 : 0.98 }}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Send Message</span>
                        <div className="flex items-center gap-1 text-xs opacity-80">
                          <Shield className="w-3 h-3" />
                          <span>Secure</span>
                        </div>
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
