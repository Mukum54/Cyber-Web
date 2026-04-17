import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Seed Services
  const services = [
    {
      id: 'svc-1',
      title: 'AI Automation & Solutions',
      shortDesc: 'Optimize workflows with AI-powered automation tools',
      description: 'We design and implement intelligent systems and automation tools that optimize workflows, reduce operational costs, and improve productivity.',
      category: 'AI_AUTOMATION',
      icon: 'Brain',
      price: 150000,
      features: JSON.stringify(['Business Process Automation', 'AI-Powered Tools & Integrations', 'Smart Data Processing', 'Custom ML Models', 'Workflow Optimization', 'Predictive Analytics', 'Natural Language Processing']),
      order: 0,
      isActive: true,
    },
    {
      id: 'svc-2',
      title: 'Custom Software Development',
      shortDesc: 'Tailored IT solutions built for your unique needs',
      description: 'We specialize in designing and building customized IT products tailored to organizational needs.',
      category: 'SOFTWARE_DEV',
      icon: 'Code2',
      price: 250000,
      features: JSON.stringify(['Web Applications', 'Mobile Apps', 'Business Platforms', 'System Architecture', 'API Development', 'Database Design', 'Cloud Deployment']),
      order: 1,
      isActive: true,
    },
    {
      id: 'svc-3',
      title: 'Digital Marketing & SEO',
      shortDesc: 'Grow your online presence and reach the right audience',
      description: 'We help businesses grow their online presence through data-driven strategies.',
      category: 'DIGITAL_MARKETING',
      icon: 'TrendingUp',
      price: 100000,
      features: JSON.stringify(['SEO Optimization', 'Social Media Marketing', 'Content Strategy', 'Brand Building', 'Analytics & Reporting', 'Paid Advertising']),
      order: 2,
      isActive: true,
    },
    {
      id: 'svc-4',
      title: 'Cybersecurity Solutions',
      shortDesc: 'Protect your digital assets with enterprise-grade security',
      description: 'We provide comprehensive cybersecurity solutions to safeguard your business from digital threats.',
      category: 'CYBER_SECURITY',
      icon: 'Shield',
      price: 200000,
      features: JSON.stringify(['Vulnerability Assessment', 'Penetration Testing', 'Security Audits', 'Incident Response Planning', 'Firewall & Network Security', 'Data Encryption & Protection']),
      order: 3,
      isActive: true,
    },
    {
      id: 'svc-5',
      title: 'Computer Hardware & Software Maintenance',
      shortDesc: 'Keep your IT infrastructure running smoothly and efficiently',
      description: 'We offer professional hardware and software maintenance services to ensure your IT infrastructure operates at peak performance.',
      category: 'HARDWARE_MAINTENANCE',
      icon: 'Wrench',
      price: 50000,
      features: JSON.stringify(['Hardware Diagnostics & Repair', 'Software Installation & Updates', 'System Optimization', 'Network Setup & Troubleshooting', 'Data Backup & Recovery', 'Preventive Maintenance']),
      order: 4,
      isActive: true,
    },
    {
      id: 'svc-6',
      title: 'IT Training & Mentorship',
      shortDesc: 'Equip yourself with practical digital skills',
      description: 'CYBER WEB offers structured training programs to equip students and professionals with practical digital skills.',
      category: 'TRAINING',
      icon: 'GraduationCap',
      price: 75000,
      features: JSON.stringify(['Programming Courses', 'Web Development', 'AI & Automation', 'Digital Marketing', 'Project-Based Learning', 'Career Mentorship']),
      order: 5,
      isActive: true,
    },
    {
      id: 'svc-7',
      title: 'Academic Project Support',
      shortDesc: 'Transform your ideas into impactful solutions',
      description: 'We assist students and researchers in the successful completion of technical and academic projects.',
      category: 'PROJECT_SUPPORT',
      icon: 'BookOpen',
      price: 50000,
      features: JSON.stringify(['Concept Development', 'Technical Mentorship', 'Implementation Support', 'Documentation', 'Prototype Development', 'Research Assistance']),
      order: 6,
      isActive: true,
    },
  ]

  for (const service of services) {
    await prisma.service.upsert({ where: { id: service.id }, update: service, create: service })
  }
  console.log('✅ Services seeded')

  // Seed Partner
  await prisma.partner.upsert({
    where: { id: 'partner-1' },
    update: {},
    create: {
      id: 'partner-1',
      name: 'KITASARL',
      description: 'KITASARL is a leading technology company in Cameroon, specializing in software development, IT consulting, and digital transformation solutions.',
      website: 'https://kitasarl.com',
      country: 'Cameroon',
      isActive: true,
      order: 0,
    },
  })
  console.log('✅ Partners seeded')

  // Seed Testimonials
  const testimonials = [
    { id: 'test-1', content: 'CYBER WEB transformed our business operations with their AI automation solutions. Our efficiency increased by 40% within the first three months.', author: 'Grace Mbarga', company: 'TechSolutions CM', role: 'CEO', rating: 5, isActive: true },
    { id: 'test-2', content: 'The training program was incredibly practical. I went from zero coding knowledge to building my first web application in just 8 weeks.', author: 'Herve Fotso', company: 'Freelance Developer', role: 'Student', rating: 5, isActive: true },
    { id: 'test-3', content: 'Their digital marketing strategy helped us triple our online traffic. The SEO improvements were exactly what we needed.', author: 'Sylvie Nganou', company: 'GreenTech Africa', role: 'Marketing Director', rating: 5, isActive: true },
    { id: 'test-4', content: 'Professional team, excellent communication, and they delivered our e-commerce platform ahead of schedule. Highly recommended.', author: 'Patrice Kamga', company: 'ShopMaster CM', role: 'Founder', rating: 4, isActive: true },
    { id: 'test-5', content: 'The cybersecurity audit they performed revealed critical vulnerabilities we were not aware of. Their remediation plan was thorough and effective.', author: 'Emmanuel Tabi', company: 'FinancePlus', role: 'CTO', rating: 5, isActive: true },
  ]
  for (const t of testimonials) {
    await prisma.testimonial.upsert({ where: { id: t.id }, update: t, create: t })
  }
  console.log('✅ Testimonials seeded')

  // Seed Achievements
  const achievements = [
    { id: 'ach-1', title: '50+ Projects Delivered', description: 'Successfully delivered over 50 projects across web, mobile, AI, and marketing domains for clients in Cameroon and beyond.', icon: 'FolderGit2', date: '2025', isActive: true, order: 0 },
    { id: 'ach-2', title: '200+ Students Trained', description: 'Trained and mentored over 200 students in programming, web development, AI, and digital marketing through our structured programs.', icon: 'Users', date: '2025', isActive: true, order: 1 },
    { id: 'ach-3', title: 'AI Innovation Award Nominee', description: 'Recognized as a nominee for the AI Innovation Award in Central Africa for our groundbreaking automation solutions.', icon: 'Award', date: '2025', isActive: true, order: 2 },
    { id: 'ach-4', title: 'Strategic Partnerships', description: 'Established strategic partnerships with leading technology companies including KITASARL, expanding our service capabilities.', icon: 'Handshake', date: '2026', isActive: true, order: 3 },
    { id: 'ach-5', title: 'Digital Transformation Leader', description: 'Recognized as a leading digital transformation company in Cameroon, helping businesses modernize their operations.', icon: 'TrendingUp', date: '2026', isActive: true, order: 4 },
    { id: 'ach-6', title: 'Community Impact', description: 'Contributed to the local tech community through free workshops, open-source projects, and mentorship programs.', icon: 'Heart', date: '2026', isActive: true, order: 5 },
  ]
  for (const a of achievements) {
    await prisma.achievement.upsert({ where: { id: a.id }, update: a, create: a })
  }
  console.log('✅ Achievements seeded')

  // Seed Products
  const products = [
    { id: 'prod-1', title: 'Dell Latitude 5540 Laptop', shortDesc: 'Professional business laptop with 15.6" display, Intel Core i7, 16GB RAM', description: 'The Dell Latitude 5540 is a professional-grade laptop designed for business users who demand reliability and performance. Featuring a 15.6-inch Full HD display, Intel Core i7-1365U processor, 16GB DDR4 RAM, and 512GB NVMe SSD storage. It includes Windows 11 Pro, a fingerprint reader, and all-day battery life.', price: 285000, comparePrice: 320000, category: 'ELECTRONICS', stock: 15, features: JSON.stringify(['Intel Core i7-1365U', '16GB DDR4 RAM', '512GB NVMe SSD', '15.6" FHD Display', 'Windows 11 Pro', 'Fingerprint Reader', 'Backlit Keyboard']), isActive: true, isFeatured: true },
    { id: 'prod-2', title: 'HP ProBook 450 G10', shortDesc: 'Reliable business laptop with Intel Core i5, 8GB RAM, 256GB SSD', description: 'The HP ProBook 450 G10 offers excellent value for business professionals. 15.6-inch display, Intel Core i5-1335U, 8GB RAM, 256GB SSD. Durable build with spill-resistant keyboard and TPM 2.0 security.', price: 195000, comparePrice: 230000, category: 'ELECTRONICS', stock: 20, features: JSON.stringify(['Intel Core i5-1335U', '8GB DDR4 RAM', '256GB SSD', '15.6" FHD Display', 'Windows 11', 'TPM 2.0 Security', 'Spill-Resistant Keyboard']), isActive: true, isFeatured: true },
    { id: 'prod-3', title: 'Logitech MX Master 3S Mouse', shortDesc: 'Premium wireless mouse with MagSpeed scroll and USB-C charging', description: 'The Logitech MX Master 3S is a premium wireless mouse designed for productivity. Features MagSpeed electromagnetic scrolling, USB-C charging, 8K DPI sensor, and multi-device support. Works on any surface including glass.', price: 45000, comparePrice: 55000, category: 'ACCESSORIES', stock: 30, features: JSON.stringify(['MagSpeed Scroll', 'USB-C Charging', '8K DPI Sensor', 'Multi-Device', 'Ergonomic Design', '70 Days Battery', 'Works on Glass']), isActive: true, isFeatured: false },
    { id: 'prod-4', title: 'TP-Link Archer AX73 Router', shortDesc: 'High-speed WiFi 6 router with 5400Mbps and 6 antennas', description: 'The TP-Link Archer AX73 delivers ultra-fast WiFi 6 speeds up to 5400Mbps. Features 6 high-gain antennas, 4 Gigabit LAN ports, USB 3.0 sharing, and OFDMA technology for multiple device support. Perfect for home and small office.', price: 65000, comparePrice: 78000, category: 'NETWORKING', stock: 12, features: JSON.stringify(['WiFi 6 - 5400Mbps', '6 High-Gain Antennas', '4 Gigabit LAN Ports', 'USB 3.0 Port', 'OFDMA Technology', 'MU-MIMO', 'HomeShield Security']), isActive: true, isFeatured: true },
    { id: 'prod-5', title: 'Samsung 27" Monitor (LF27T350)', shortDesc: 'Full HD IPS monitor with AMD FreeSync and slim design', description: 'The Samsung 27-inch LF27T350 monitor offers stunning Full HD visuals with IPS technology for wide viewing angles. Features AMD FreeSync for smooth gaming, a 75Hz refresh rate, and an ultra-slim design that saves desk space.', price: 95000, comparePrice: 115000, category: 'ELECTRONICS', stock: 8, features: JSON.stringify(['27" FHD IPS Display', 'AMD FreeSync', '75Hz Refresh Rate', 'HDMI + VGA', 'Slim Design', 'Eye Saver Mode', '3-Year Warranty']), isActive: true, isFeatured: false },
    { id: 'prod-6', title: 'Mechanical Gaming Keyboard', shortDesc: 'RGB backlit mechanical keyboard with blue switches', description: 'Premium mechanical gaming keyboard featuring blue switches for tactile feedback, customizable RGB backlighting, anti-ghosting, N-key rollover, and a durable aluminum frame. Comes with a detachable wrist rest.', price: 35000, comparePrice: 42000, category: 'PERIPHERALS', stock: 25, features: JSON.stringify(['Blue Mechanical Switches', 'RGB Backlighting', 'Anti-Ghosting NKRO', 'Aluminum Frame', 'Detachable Wrist Rest', 'Windows Lock Key', 'USB-C Connection']), isActive: true, isFeatured: false },
    { id: 'prod-7', title: 'USB-C Hub 7-in-1 Adapter', shortDesc: 'Multi-port USB-C hub with HDMI, USB 3.0, SD card reader', description: 'Compact 7-in-1 USB-C hub adapter featuring 4K HDMI output, 3x USB 3.0 ports, SD/TF card reader, and 100W PD charging pass-through. Compatible with laptops, tablets, and phones.', price: 15000, comparePrice: 20000, category: 'ACCESSORIES', stock: 40, features: JSON.stringify(['4K HDMI Output', '3x USB 3.0 Ports', 'SD/TF Card Reader', '100W PD Charging', 'Compact Design', 'Plug & Play', 'Universal Compatibility']), isActive: true, isFeatured: false },
    { id: 'prod-8', title: 'Cat6 Ethernet Cable 50m', shortDesc: 'High-speed Cat6 LAN cable for reliable gigabit networking', description: 'Premium Cat6 ethernet cable (50 meters) for high-speed networking. Supports up to 10Gbps speed and 250MHz bandwidth. Shielded twisted pair design reduces interference for stable connections.', price: 12000, comparePrice: 15000, category: 'NETWORKING', stock: 50, features: JSON.stringify(['Cat6 Standard', '50m Length', '10Gbps Speed', '250MHz Bandwidth', 'UTP Design', 'RJ45 Connectors', 'Universal Compatible']), isActive: true, isFeatured: false },
  ]
  for (const p of products) {
    await prisma.product.upsert({ where: { id: p.id }, update: p, create: p })
  }
  console.log('✅ Products seeded')

  // Seed Admin User (required before projects due to FK constraint)
  await prisma.user.upsert({
    where: { id: 'user-admin' },
    update: {},
    create: {
      id: 'user-admin',
      name: 'CYBER WEB Admin',
      email: 'admin@cyberweb.cm',
      role: 'SUPER_ADMIN',
      canPost: true,
      status: 'ACTIVE',
    },
  })
  console.log('✅ Admin user seeded')

  // Seed Projects
  const projects = [
    { id: 'proj-1', title: 'E-Commerce Platform', shortDesc: 'Full-stack e-commerce solution with payment integration', description: 'A comprehensive e-commerce platform built with Next.js and Node.js, featuring product catalog, shopping cart, payment integration with Orange Money and MTN Mobile Money, order management, and admin dashboard.', category: 'WEB', techStack: JSON.stringify(['Next.js', 'Node.js', 'PostgreSQL', 'Stripe', 'Tailwind CSS']), price: 350000, status: 'PUBLISHED', studentId: 'user-admin', repoUrl: 'https://github.com/cyberweb/ecommerce-platform', liveUrl: 'https://example.com' },
    { id: 'proj-2', title: 'AI Chatbot for Customer Support', shortDesc: 'Intelligent chatbot powered by OpenAI for customer service automation', description: 'An AI-powered chatbot that handles customer inquiries, provides product recommendations, and escalates complex issues to human agents. Built with Python, FastAPI, and OpenAI API with a React frontend.', category: 'AI', techStack: JSON.stringify(['Python', 'FastAPI', 'OpenAI', 'React', 'Docker']), price: 500000, status: 'PUBLISHED', studentId: 'user-admin', repoUrl: 'https://github.com/cyberweb/ai-chatbot' },
    { id: 'proj-3', title: 'School Management System', shortDesc: 'Complete school management solution for Cameroonian institutions', description: 'A comprehensive school management system handling student enrollment, grade tracking, attendance, timetable management, and parent communication. Designed specifically for the Cameroonian education system.', category: 'WEB', techStack: JSON.stringify(['Next.js', 'Prisma', 'PostgreSQL', 'Tailwind CSS', 'NextAuth']), price: 400000, status: 'PUBLISHED', studentId: 'user-admin', liveUrl: 'https://example.com/school' },
    { id: 'proj-4', title: 'Mobile Banking App Prototype', shortDesc: 'Fintech mobile app concept with secure authentication', description: 'A mobile banking application prototype featuring biometric authentication, real-time transaction notifications, bill payments, and money transfers. Built with React Native and integrated with a mock banking API.', category: 'MOBILE', techStack: JSON.stringify(['React Native', 'TypeScript', 'Node.js', 'MongoDB']), price: 600000, status: 'COMPLETED', studentId: 'user-admin' },
    { id: 'proj-5', title: 'SEO Analytics Dashboard', shortDesc: 'Data visualization dashboard for SEO performance tracking', description: 'An interactive analytics dashboard that tracks SEO performance metrics including keyword rankings, backlink profiles, organic traffic, and competitor analysis. Features data visualization with charts and automated reporting.', category: 'DATA', techStack: JSON.stringify(['Python', 'Plotly', 'FastAPI', 'PostgreSQL', 'Docker']), price: 200000, status: 'PUBLISHED', studentId: 'user-admin' },
    { id: 'proj-6', title: 'Social Media Marketing Tool', shortDesc: 'Automated social media management and scheduling platform', description: 'A social media management tool that allows businesses to schedule posts across multiple platforms, analyze engagement metrics, and generate content suggestions using AI. Includes a content calendar and team collaboration features.', category: 'MARKETING', techStack: JSON.stringify(['Next.js', 'Node.js', 'Redis', 'OpenAI API']), price: 250000, status: 'IN_PROGRESS', studentId: 'user-admin' },
  ]
  for (const p of projects) {
    await prisma.project.upsert({ where: { id: p.id }, update: p, create: p })
  }
  console.log('✅ Projects seeded')

  console.log('🎉 Seeding complete!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })
