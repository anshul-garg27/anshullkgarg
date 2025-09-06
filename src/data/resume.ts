import { ResumeData } from '@/types';

export const resumeData: ResumeData = {
  personalInfo: {
    name: "Anshul Garg",
    title: "Backend Software Engineer",
    email: "anshulgarg.garg509@gmail.com",
    phone: "+91-8560826690",
    location: "Bengaluru, Karnataka",
    website: "https://anshul-garg27.github.io/",
    linkedin: "https://linkedin.com/in/anshullkgarg",
    github: "https://github.com/anshul-garg27",
    leetcode: "https://leetcode.com/u/anshulkgarg/",
    instagram: "https://www.instagram.com/anshullkgarg/",
    summary: "Backend-focused Software Engineer with 3+ years of experience in scalable microservices, data platforms, and SaaS applications. M.Tech in Computer Science from IIIT Bangalore with expertise in Java, Python, and Golang. Known for collaborative nature and continuous learning, consistently delivering efficient, reliable, and high-performing backend solutions. Led critical migrations at Walmart ensuring zero downtime and improved system performance by 25-50% across multiple projects."
  },
  
  experience: [
    {
      id: "walmart",
      company: "Walmart (NRT - Data Venture)",
      position: "Software Engineer-III",
      location: "Bengaluru, Karnataka",
      startDate: "2024-06",
      endDate: null,
      description: [
        "Led a critical migration to Spring Boot 3 and Java 17, ensuring zero downtime and resolving high-severity vulnerabilities",
        "Revamped NRT application controllers using OpenAPI Specification, improving maintainability and documentation clarity",
        "Addressed challenges like backward compatibility, outdated libraries, and dependency management",
        "Implemented system migration strategies ensuring business continuity"
      ],
      technologies: ["Java 17", "Spring Boot 3", "OpenAPI", "Kafka", "PostgreSQL", "Azure Cosmos DB", "Grafana"],
      achievements: [
        "Reduced integration overhead by 30% through OpenAPI implementation",
        "Successfully migrated critical systems with zero downtime",
        "Resolved critical security vulnerabilities through Java/Spring Boot upgrade"
      ]
    },
    {
      id: "gcc",
      company: "Good Creator Co. (SaaS Social Media Analytics Platform)",
      position: "Software Engineer-I",
      location: "Bengaluru, Karnataka",
      startDate: "2023-02",
      endDate: "2024-05",
      description: [
        "Optimized API response times by 25% and reduced operational costs by 30% through platform development",
        "Designed asynchronous data processing system handling 10M+ daily data points",
        "Built high-performance logging system with RabbitMQ, Python and Golang, transitioning to ClickHouse",
        "Crafted and streamlined ETL data pipelines using Apache Airflow for batch data ingestion",
        "Built AWS S3-based asset upload system processing 8M images daily",
        "Developed real-time social media insights modules driving user engagement growth",
        "Spearheaded initial development and continuous improvement of a SaaS-based analytics platform, improving data pipeline performance by 25% and reducing costs by 30%",
        "Architected an asynchronous data system (Python) handling 10M+ daily scrapes, delivering real-time insights via PostgreSQL",
        "Orchestrated scalable ETL pipelines with Airflow, supporting ingestion of over 10M data points daily",
        "Built data stack and pipelines for the Leaderboard module, enabling influencer ranking by key metrics",
        "Improved data processing speed by 50% using DBT and ClickHouse data marts",
        "Revamped a Postgres logging system into an event-driven architecture (RabbitMQ, Python, Golang), reducing log retrieval times threefold and managing billions of logs in ClickHouse",
        "Developed Genre Insights and Social Keyword Analytics (Python, Golang, ClickHouse), boosting user engagement by 10%",
        "Deployed an asset upload system to process 8M images daily on S3 at minimal cost",
        "Launched a self-service Smart Campaign module, increasing platform users by 30% through programmatic campaigns and automated reward ladders",
        "Constructed a content verification module eliminating 100% of manual filtering",
        "Enhanced observability (Grafana, Prometheus, Slack) reducing downtime by 70%"
      ],
      technologies: ["Python", "Golang", "RabbitMQ", "ClickHouse", "Apache Airflow", "AWS S3", "ETL", "Real-time Processing"],
      achievements: [
        "Achieved 2.5x reduction in log retrieval times supporting billions of logs",
        "Cut data latency by 50% through optimized ETL pipelines",
        "Drove 10% user engagement growth through actionable insights",
        "Elevated data processing speed by 50% through automation"
      ]
    },
    {
      id: "payu-engineer",
      company: "PayU (API Lending)",
      position: "Software Engineer-I",
      location: "Bengaluru, Karnataka",
      startDate: "2022-07",
      endDate: "2023-02",
      description: [
        "Contributed to the API lending platform enabling partner integrations for automated loan disbursals",
        "Increased loan volume by 40% by enabling multi-source lending post-disbursal",
        "Scaled business by reducing loan journey issues from 4.6% to under 0.3% through new partner onboarding and process optimizations",
        "Optimized APIs, cutting loan disbursal turnaround from 3.2 to 1.1 minutes, improving user experience",
        "Implemented Django throttling for rate limiting, ensuring system stability and performance under heavy loads"
      ],
      technologies: ["Java", "Spring Boot", "API Development", "Microservices", "Financial Systems"],
      achievements: [
        "Reduced loan disbursal errors from 4.6% to under 0.3%",
        "Improved API response time by 65% (3.2min to 1.1min)",
        "Scaled business operations by 40% through system optimization"
      ]
    },
    {
      id: "payu-intern",
      company: "PayU",
      position: "Software Engineer Intern",
      location: "Bengaluru, Karnataka",
      startDate: "2022-01",
      endDate: "2022-07",
      description: [
        "Refactored the Loan Origination System (LOS) in Java, improving code quality and maintainability, increasing test coverage from 30% to 83%, and reducing production bugs",
        "Automated code quality checks and static analysis using SonarQube and GitHub Actions for continuous improvement",
        "Implemented Flyway DB migrations, enhancing deployment reliability and reducing developer overhead"
      ],
      technologies: ["Java", "SonarQube", "GitHub Actions", "Flyway", "Database Migration", "Unit Testing"],
      achievements: [
        "Increased unit test coverage from 30% to 83%",
        "Reduced deployment errors by 90% through Flyway implementation",
        "Improved release frequency by 2x",
        "Boosted code coverage by 20% through automated quality checks"
      ]
    }
  ],
  
  education: [
    {
      id: "iiit-bangalore",
      institution: "International Institute of Information Technology, Bangalore",
      degree: "Master of Technology",
      field: "Computer Science and Engineering (AI/ML)",
      startDate: "2020-08",
      endDate: "2022-06",
      gpa: "3.22/4.0",
      honors: ["Teaching Assistant for CS-816 Software Production Engineering"],
      achievements: [
        "GATE 2020: Secured AIR 1343 with a score of 659",
        "Core Member, Gender Cell, IIIT-B: Contributed to initiatives fostering an inclusive and supportive academic environment",
        "Event Manager, Infinite Cultural Fest, IIIT-B: Organized and managed large-scale cultural events, enhancing campus life",
        "Red Hat Certified Specialist in Ansible Automation",
        "Red Hat Certified System Administrator"
      ],
      coursework: [
        "Data Structures and Algorithms",
        "Machine Learning",
        "Functional Programming",
        "Design and Analysis of Algorithms",
        "Object Oriented Programming",
        "Operating System",
        "Theory of Computation",
        "Databases",
        "Artificial Intelligence"
      ]
    },
    {
      id: "skit-jaipur",
      institution: "Swami Keshvanand Institute of Technology, Jaipur",
      degree: "Bachelor of Technology",
      field: "Computer Science and Engineering",
      startDate: "2015-08",
      endDate: "2019-05",
      gpa: "7.43/10.0",
      coursework: [
        "Data Structures and Algorithms",
        "Database Systems",
        "Software Engineering",
        "Computer Networks",
        "Operating Systems",
        "Programming Languages"
      ]
    },
    {
      id: "maheshwari-school",
      institution: "Maheshwari Senior Secondary School, Jaipur",
      degree: "Class 12th",
      field: "Science",
      startDate: "2013-04",
      endDate: "2015-03",
      gpa: "78.80%",
      coursework: ["Physics", "Chemistry", "Mathematics", "English"]
    }
  ],
  
  projects: [
    {
      id: "sportease",
      name: "SportEase",
      description: "Web-based application to streamline the management of sports equipment and events for colleges and sports clubs.",
      technologies: ["FullStack", "DevOps", "Jenkins", "Docker", "Docker Compose"],
      features: [
        "Streamlined sports equipment and event management",
        "Robust CI/CD pipeline using Jenkins",
        "3-tier web deployment architecture using Docker containers",
        "Orchestrated multiple Docker-container applications using Docker Compose"
      ],
      demoUrl: undefined,
      githubUrl: "https://github.com/anshul-garg27/SportEase",
      category: "fullstack",
      status: "completed"
    },
    {
      id: "expense-tracker",
      name: "Expense Tracker",
      description: "Expense tracker application that analyzes and categorizes expenses, similar to Splitwise.",
      technologies: ["Python", "Django"],
      features: [
        "Add contacts and split expenses",
        "Simplify settlements and track spending habits",
        "Expense capping and automated alerts",
        "Categorization and analysis of expenses"
      ],
      demoUrl: undefined,
      githubUrl: "https://github.com/anshul-garg27/ExpenseTracker",
      category: "backend",
      status: "completed"
    },
    {
      id: "cube-column-store",
      name: "Cube Column Store",
      description: "Java-based columnar storage technique for a Data Cube, enabling faster OLAP queries.",
      technologies: ["Java"],
      features: [
        "Columnar storage technique for Data Cube",
        "Faster OLAP queries with 3x performance improvement",
        "Support for OLAP operations like SLICE, DICE, and ROLL-UP",
        "Enhanced data processing speed for large datasets"
      ],
      demoUrl: undefined,
      githubUrl: "https://github.com/anshul-garg27/ColumnStore-DataBase-for-Cube-DB",
      category: "backend",
      status: "completed"
    },
    {
      id: "banking-management",
      name: "Banking Management System",
      description: "Real-life banking management system using system calls in C.",
      technologies: ["C", "Linux"],
      features: [
        "Real-life banking management system",
        "Socket programming for secure transactions",
        "Database updates and file locking",
        "Multi-threaded environment consistency"
      ],
      demoUrl: undefined,
      githubUrl: undefined,
      category: "system",
      status: "completed"
    },
    {
      id: "better-reads",
      name: "Better Reads",
      description: "Platform to help users discover and track reading habits with a large dataset of books and user reviews.",
      technologies: ["Java", "Spring Boot", "Cassandra"],
      features: [
        "Book discovery and reading habit tracking",
        "Large dataset of books and user reviews",
        "Reading lists and recommendations",
        "User review analysis and management"
      ],
      demoUrl: undefined,
      githubUrl: undefined,
      category: "backend",
      status: "completed"
    }
  ],
  
  skills: [
    // Languages
    { id: "java", name: "Java", category: "languages", proficiency: "expert", yearsOfExperience: 3 },
    { id: "python", name: "Python", category: "languages", proficiency: "expert", yearsOfExperience: 3 },
    { id: "golang", name: "Golang", category: "languages", proficiency: "advanced", yearsOfExperience: 2 },
    { id: "cpp", name: "C++", category: "languages", proficiency: "intermediate", yearsOfExperience: 2 },
    { id: "c", name: "C", category: "languages", proficiency: "intermediate", yearsOfExperience: 2 },
    { id: "html", name: "HTML", category: "languages", proficiency: "intermediate", yearsOfExperience: 2 },
    { id: "css", name: "CSS", category: "languages", proficiency: "intermediate", yearsOfExperience: 2 },
    { id: "javascript", name: "JavaScript", category: "languages", proficiency: "intermediate", yearsOfExperience: 2 },
    
    // Backend Framework
    { id: "spring", name: "Spring Boot 3", category: "backend", proficiency: "expert", yearsOfExperience: 3 },
    { id: "hibernate", name: "Hibernate", category: "backend", proficiency: "advanced", yearsOfExperience: 2 },
    { id: "django", name: "Django", category: "backend", proficiency: "advanced", yearsOfExperience: 2 },
    { id: "fastapi", name: "FastAPI", category: "backend", proficiency: "advanced", yearsOfExperience: 2 },
    { id: "microservices", name: "Microservices", category: "backend", proficiency: "expert", yearsOfExperience: 3 },
    
    // Database
    { id: "postgresql", name: "PostgreSQL", category: "database", proficiency: "expert", yearsOfExperience: 3 },
    { id: "mysql", name: "MySQL", category: "database", proficiency: "expert", yearsOfExperience: 3 },
    { id: "cosmosdb", name: "Azure Cosmos DB", category: "database", proficiency: "advanced", yearsOfExperience: 1 },
    { id: "clickhouse", name: "ClickHouse", category: "database", proficiency: "advanced", yearsOfExperience: 1 },
    { id: "redis", name: "Redis", category: "database", proficiency: "advanced", yearsOfExperience: 2 },
    
    // Tools & Cloud
    { id: "airflow", name: "Apache Airflow", category: "tools", proficiency: "advanced", yearsOfExperience: 2 },
    { id: "kafka", name: "Apache Kafka", category: "tools", proficiency: "advanced", yearsOfExperience: 2 },
    { id: "rabbitmq", name: "RabbitMQ", category: "tools", proficiency: "advanced", yearsOfExperience: 2 },
    { id: "docker", name: "Docker", category: "tools", proficiency: "advanced", yearsOfExperience: 3 },
    { id: "kubernetes", name: "Kubernetes", category: "tools", proficiency: "intermediate", yearsOfExperience: 1 },
    { id: "jenkins", name: "Jenkins", category: "tools", proficiency: "advanced", yearsOfExperience: 2 },
    { id: "aws", name: "AWS Cloud", category: "cloud", proficiency: "advanced", yearsOfExperience: 2 },
    { id: "git", name: "Git", category: "tools", proficiency: "expert", yearsOfExperience: 4 },
    { id: "sonarqube", name: "SonarQube", category: "tools", proficiency: "advanced", yearsOfExperience: 2 },
    { id: "grafana", name: "Grafana", category: "tools", proficiency: "intermediate", yearsOfExperience: 1 },
    { id: "prometheus", name: "Prometheus", category: "tools", proficiency: "intermediate", yearsOfExperience: 1 },
    { id: "ansible", name: "Ansible", category: "tools", proficiency: "advanced", yearsOfExperience: 2 },
    { id: "dbt", name: "DBT", category: "tools", proficiency: "advanced", yearsOfExperience: 2 },
    { id: "etl", name: "ETL", category: "tools", proficiency: "advanced", yearsOfExperience: 2 },
    { id: "elk", name: "ELK Stack", category: "tools", proficiency: "intermediate", yearsOfExperience: 1 },
    { id: "aws-kinesis", name: "AWS Kinesis", category: "cloud", proficiency: "intermediate", yearsOfExperience: 1 },
    { id: "aws-sqs", name: "AWS SQS", category: "cloud", proficiency: "intermediate", yearsOfExperience: 1 },
    { id: "aws-lambda", name: "AWS Lambda", category: "cloud", proficiency: "intermediate", yearsOfExperience: 1 },
    { id: "aws-s3", name: "AWS S3", category: "cloud", proficiency: "advanced", yearsOfExperience: 2 },
    { id: "aws-ec2", name: "AWS EC2", category: "cloud", proficiency: "intermediate", yearsOfExperience: 1 }
  ],
  
  certifications: [
    {
      id: "gate-achievement",
      name: "GATE 2020 - AIR 1343 (Score: 659)",
      issuer: "IIT (Graduate Aptitude Test in Engineering)",
      issueDate: "2020-03",
      credentialId: "GATE-CSE-1343",
      url: "https://gate.iitb.ac.in/"
    },
    {
      id: "red-hat-ansible",
      name: "Red Hat Certified Specialist in Ansible Automation",
      issuer: "Red Hat",
      issueDate: "2022-01",
      credentialId: "RHCSA-ANSIBLE",
      url: "https://www.redhat.com/"
    },
    {
      id: "red-hat-rhcsa",
      name: "Red Hat Certified System Administrator",
      issuer: "Red Hat",
      issueDate: "2021-12",
      credentialId: "RHCSA",
      url: "https://www.redhat.com/"
    }
  ]
};
