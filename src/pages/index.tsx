import type { ReactNode } from "react"
import clsx from "clsx"
import Link from "@docusaurus/Link"
import useDocusaurusContext from "@docusaurus/useDocusaurusContext"
import Layout from "@theme/Layout"
import HomepageFeatures from "@site/src/components/HomepageFeatures"
import Heading from "@theme/Heading"
import styles from "./index.module.css"

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext()
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <Heading as="h1" className={clsx("hero__title", styles.heroTitle)}>
              {siteConfig.title}
            </Heading>
            <p className={clsx("hero__subtitle", styles.heroSubtitle)}>
              Empowering businesses with innovative software solutions and cutting-edge technology
            </p>
            <p className={styles.heroDescription}>
              We specialize in custom software development, web applications, mobile apps, and digital transformation
              services that drive growth and efficiency for businesses of all sizes.
            </p>
            <div className={styles.buttons}>
              <Link className="button button--secondary button--lg" to="/docs/intro">
                Developer Documentation
              </Link>
              <Link className={clsx("button button--outline button--lg", styles.secondaryButton)} to="https://himosoft.com.bd/#footer">
                Contact Us
              </Link>
            </div>
          </div>
          <div className={styles.heroImage}>
            <img src="/img/software.webp" alt="Himosoft Software Solutions" className={styles.heroImg} />
          </div>
        </div>
      </div>
    </header>
  )
}

function StatsSection() {
  return (
    <section className={styles.statsSection}>
      <div className="container">
        <div className={styles.statsGrid}>
          <div className={styles.statItem}>
            <h3 className={styles.statNumber}>20+</h3>
            <p className={styles.statLabel}>Projects Completed</p>
          </div>
          <div className={styles.statItem}>
            <h3 className={styles.statNumber}>15+</h3>
            <p className={styles.statLabel}>Happy Clients</p>
          </div>
          <div className={styles.statItem}>
            <h3 className={styles.statNumber}>5+</h3>
            <p className={styles.statLabel}>Expert Developers</p>
          </div>
          <div className={styles.statItem}>
            <h3 className={styles.statNumber}>2+</h3>
            <p className={styles.statLabel}>Years Experience</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function ServicesSection() {
  const services = [
    {
      title: "Custom Software Development",
      description: "Tailored software solutions designed to meet your specific business requirements and objectives.",
      icon: "💻",
    },
    {
      title: "Web Application Development",
      description: "Modern, responsive web applications built with the latest technologies and best practices.",
      icon: "🌐",
    },
    {
      title: "Mobile App Development",
      description: "Native and cross-platform mobile applications for iOS and Android platforms.",
      icon: "📱",
    },
    {
      title: "Cloud Solutions",
      description: "Scalable cloud infrastructure and migration services to optimize your business operations.",
      icon: "☁️",
    },
    {
      title: "Digital Transformation",
      description: "Comprehensive digital transformation strategies to modernize your business processes.",
      icon: "🚀",
    },
    {
      title: "Technical Consulting",
      description: "Expert technical guidance and consulting to help you make informed technology decisions.",
      icon: "🎯",
    },
  ]

  return (
    <section className={styles.statsSection}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <Heading as="h2" className={styles.sectionTitle}>
            Our Services
          </Heading>
          <p className={styles.sectionSubtitle}>Comprehensive software solutions to accelerate your business growth</p>
        </div>
        <div className={styles.servicesGrid}>
          {services.map((service, index) => (
            <div key={index} className={styles.serviceCard}>
              <div className={styles.serviceIcon}>{service.icon}</div>
              <h3 className={styles.serviceTitle}>{service.title}</h3>
              <p className={styles.serviceDescription}>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function TechnologiesSection() {
  const technologies = [
    { name: ".net", logo: "/img/tech/dotnet.png" },
    { name: "Node.js", logo: "/img/tech/nodejs.png" },
    { name: "React", logo: "/img/tech/react.png" },
    { name: "Next.js", logo: "/img/tech/nextjs.jpg" },
    { name: "Python", logo: "/img/tech/python.webp" },
    { name: "Django", logo: "/img/tech/django.jpeg" },
    { name: "Java", logo: "/img/tech/java.png" },
    { name: "PHP", logo: "/img/tech/php.png" },
    { name: "AWS", logo: "/img/tech/aws.webp" },
    { name: "Docker", logo: "/img/tech/docker.png" },
    { name: "MongoDB", logo: "/img/tech/mongodb.jpg" },
    { name: "PostgreSQL", logo: "/img/tech/postgresql.png" },
    { name: "MySQL", logo: "/img/tech/mysql.jpg" },
    { name: "Flutter", logo: "/img/tech/flutter.png" },
    { name: "Hetzner", logo: "/img/tech/hetzner.png" },
    { name: "DigitalOcean", logo: "/img/tech/digitalocean.png" },
    
  ]



  return (
    <section className={styles.technologiesSection}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <Heading as="h2" className={styles.sectionTitle}>
            Technologies We Use
          </Heading>
          <p className={styles.sectionSubtitle}>Cutting-edge technologies to build robust and scalable solutions</p>
        </div>
        <div className={styles.techGrid}>
          {technologies.map((tech, index) => (
            <div key={index} className={styles.techItem}>
              <img src={tech.logo || "/placeholder.svg"} alt={tech.name} className={styles.techLogo} />
              <span className={styles.techName}>{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
function PaymentGatewaySection() {
  const paymentGateways = [
    { name: "Bank Transfer", logo: "/img/gateways/bank-transfer.webp" },
    { name: "Visa", logo: "/img/gateways/visa.webp" },
    { name: "Mastercard", logo: "/img/gateways/mastercard.webp" },
    { name: "Bkash", logo: "/img/gateways/bkash.webp" },
    { name: "Nagad", logo: "/img/gateways/nagad.webp" },
    { name: "Opay", logo: "/img/gateways/upay.png" },
    { name: "Rocket", logo: "/img/gateways/rocket.webp" }
  ]
  return (
    <section className={styles.technologiesSection}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <Heading as="h2" className={styles.sectionTitle}>
          Instant Online Payment Processing We Provide/Support
          </Heading>
          <p className={styles.sectionSubtitle}>Cutting-edge technologies to build robust and scalable solutions</p>
        </div>
        <div className={styles.techGrid}>
          {paymentGateways.map((tech, index) => (
            <div key={index} className={styles.techItem}>
              <img src={tech.logo || "/placeholder.svg"} alt={tech.name} className={styles.techLogo} />
              <span className={styles.techName}>{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
  
}

function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      position: "CTO, TechCorp",
      content:
        "Himosoft delivered an exceptional solution that exceeded our expectations. Their team is professional, skilled, and truly understands business needs.",
      avatar: "/img/avatars/sarah.jpg",
    },
    {
      name: "Michael Chen",
      position: "Founder, StartupXYZ",
      content:
        "Working with Himosoft was a game-changer for our startup. They helped us build a scalable platform that supports our rapid growth.",
      avatar: "/img/avatars/michael.jpg",
    },
    {
      name: "Emily Rodriguez",
      position: "Director of IT, Enterprise Inc",
      content:
        "The digital transformation project led by Himosoft significantly improved our operational efficiency and reduced costs.",
      avatar: "/img/avatars/emily.jpg",
    },
  ]

  return (
    <section className={styles.testimonialsSection}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <Heading as="h2" className={styles.sectionTitle}>
            What Our Clients Say
          </Heading>
          <p className={styles.sectionSubtitle}>Trusted by businesses worldwide for delivering exceptional results</p>
        </div>
        <div className={styles.testimonialsGrid}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className={styles.testimonialCard}>
              <div className={styles.testimonialContent}>
                <p>"{testimonial.content}"</p>
              </div>
              <div className={styles.testimonialAuthor}>
                <img
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.name}
                  className={styles.authorAvatar}
                />
                <div>
                  <h4 className={styles.authorName}>{testimonial.name}</h4>
                  <p className={styles.authorPosition}>{testimonial.position}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CTASection() {
  return (
    <section className={styles.ctaSection}>
      <div className="container">
        <div className={styles.ctaContent}>
          <Heading as="h2" className={styles.ctaTitle}>
            Ready to Transform Your Business?
          </Heading>
          <p className={styles.ctaSubtitle}>
            Let's discuss how we can help you achieve your technology goals and drive business growth.
          </p>
          <div className={styles.ctaButtons}>
            <Link className="button button--secondary button--lg" to="mailto:info@himosoft.com.bd">
              Develop Your Project with Us
            </Link>
             
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext()
  return (
    <Layout
      title={`Welcome to ${siteConfig.title}`}
      description="Leading software development company specializing in custom solutions, web applications, mobile apps, and digital transformation services."
    >
      <HomepageHeader />
      <main>
        <StatsSection />
        {/* <HomepageFeatures /> */}
        <ServicesSection />
        <TechnologiesSection />
        <PaymentGatewaySection />
        {/* <TestimonialsSection /> */}
        <CTASection />
      </main>
    </Layout>
  )
}
