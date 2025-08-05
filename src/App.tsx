"use client"

import { useState, useEffect } from "react"
import { Button } from "./components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card"
import { Badge } from "./components/ui/badge"
import { Input } from "./components/ui/input"
import { Textarea } from "./components/ui/textarea"
import { useForm, ValidationError } from '@formspree/react';
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"
import {
  Github,
  Linkedin,
  Instagram,
  ExternalLink,
  Code,
  Palette,
  Smartphone,
  ChevronDown,
  Menu,
  X,
  Send,
} from "lucide-react"
import DarkVeil from "./components/DarkVeil"
import Barbershop from "./assets/projects/Barbershop.png"
import Seoul from "./assets/projects/Seoul.png"
import BarberMentor from "./assets/projects/BarberMentor.png"
import BlurText from "./components/BlurText"
import TextType from "./components/TextType"
import LogoNavbar from "./assets/logo_navbar.png"
import PersonajeHero from "./assets/personaje_hero.png"
import FadeContent from "./components/FadeContent"


export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "about", "skills", "projects", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    } 
    setIsMenuOpen(false)
  }

  // Cerrar menú al cambiar tamaño de pantalla
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false)
      }
    }
    
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const skills = [
    { name: "React", level: 95 },
    { name: "Next.js", level: 84 },
    { name: "TypeScript", level: 72 },
    { name: "Node.js", level: 89 },
    { name: "Python", level: 39 },
    { name: "MongoDB", level: 78 },
  ]

  const projects = [
    {
      title: "Barber Landing Page",
      description: "Basic template structure for a barbershop: general information and booking. React and Tailwind CSS.",
      image: Barbershop,
      tech: ["React", "Tailwind CSS", "Vite"],
      github: "https://github.com/FacundoMartinezR/barber",
      demo: "https://barberluxuryproject.vercel.app/",
    },
    {
      title: "Parallax Zoom Effect",
      description: "Interactive parallax zoom effect with smooth transitions.",
      image: Seoul,
      tech: ["React", "Vite", "Tailwind CSS"],
      github: "https://github.com/FacundoMartinezR/agencyseoul",
      demo: "https://agencyseoul.vercel.app/",
    },
    {
      title: "Barber Mentorships",
      description: "Website offering mentorship services, booking system, payments via Stripe API, and email confirmation.",
      image: BarberMentor,
      tech: ["React", "Stripe", "Typescript", "Node.js"],
      github: "https://github.com/FacundoMartinezR/leandroherrera",
      demo: "https://leandroherrera.vercel.app/",
      inProgress: true,
    },
  ]

  const [state, handleSubmit] = useForm("meozreww")

  return (
    <div className="min-h-screen">
      <SpeedInsights />
      <Analytics />
      {/* Navigation Mejorada */}
      <nav 
        className={`fixed top-5 left-1/2 transform -translate-x-1/2 z-50 bg-white/10 backdrop-blur-md border border-white/30 ${
          isMenuOpen ? "rounded-2xl" : "rounded-full"
        } w-[95%] max-w-3xl`}
      >
        <div className="px-4 py-2 sm:px-6">
          <div className="flex justify-between items-center">
            <img 
              src={LogoNavbar} 
              alt="Logo" 
              className="w-14 h-14 md:w-16 md:h-16" 
            />

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-4 lg:space-x-6">
              {["hero", "about", "skills", "projects", "contact"].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`text-white font-medium hover:text-purple-300 transition-colors capitalize whitespace-nowrap px-2 py-1 ${
                    activeSection === section ? "text-purple-400" : ""
                  }`}
                >
                  {section === "hero"
                    ? "Home"
                    : section === "about"
                      ? "About Me"
                      : section === "skills"
                        ? "Skills"
                        : section === "projects"
                          ? "Projects"
                          : "Contact"}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-white p-2 rounded-full hover:bg-white/20 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation Mejorada */}
          {isMenuOpen && (
            <div className="md:hidden mt-2 pb-3 animate-in slide-in-from-top duration-200">
              {["hero", "about", "skills", "projects", "contact"].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`block w-full text-center py-3 text-white/90 hover:text-white transition-colors capitalize rounded-lg hover:bg-white/10 ${
                    activeSection === section ? "text-purple-400 font-medium" : ""
                  }`}
                >
                  {section === "hero"
                    ? "Home"
                    : section === "about"
                      ? "About Me"
                      : section === "skills"
                        ? "Skills"
                        : section === "projects"
                          ? "Projects"
                          : "Contact"}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>
      
{/* Hero Section */}
<section id="hero" className="h-screen flex items-center justify-center relative overflow-hidden pt-10">
  {/* DarkVeil Background */}
  <div className="absolute inset-0">
    <DarkVeil speed={1.3} hueShift={0} />
  </div>
  
  <div className="container mx-auto px-4 relative z-10">
    <div className="grid lg:grid-cols-2 gap-8 items-center">
      {/* Left Column - Text Content */}
      <div className="pt-2 max-md:pb-20 lg:pt-20 order-2 lg:order-1">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 lg:mb-6">
          <TextType
            text={["Hi! I'm Facundo", "Full Stack Developer"]}
            typingSpeed={75}
            pauseDuration={2200}
            showCursor={true}
            cursorCharacter="|"
          />
        </h1>
        <p className="text-lg md:text-xl max-md:pt-2 lg:text-2xl text-white/80 mb-6 lg:mb-8 max-w-2xl leading-relaxed">
          <BlurText
            text="+2 Years experience specializing in crafting exceptional web experiences with modern technologies and innovative design."
            delay={50}
            animateBy="words"
            direction="bottom"
          />
        </p>
        <div className="flex flex-col max-md:pt-2 sm:flex-row gap-3 sm:gap-4 justify-start mb-8 lg:mb-12">
          <Button
            size="lg"
            className="bg-[#1b17ff] hover:bg-[#1b17ff]/70 text-white px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg"
            onClick={() => scrollToSection('projects')}
          >
            Projects
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white/30 text-white hover:bg-white/10 hover:text-white px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg bg-transparent"
            onClick={() => scrollToSection('contact')}
          >
            Talk me
          </Button>
        </div>
        <div className="flex space-x-4 sm:space-x-6">
          <a href="https://github.com/FacundoMartinezR" target="_blank" className="text-white/60 hover:text-white transition-colors">
            <Github size={20} className="w-5 h-5 sm:w-6 sm:h-6" />
          </a>
          <a href="https://www.linkedin.com/in/facundo-mart%C3%ADnez-7050561aa/" target="_blank" className="text-white/60 hover:text-white transition-colors">
            <Linkedin size={20} className="w-5 h-5 sm:w-6 sm:h-6" />
          </a>
          <a href="https://www.instagram.com/byfacudev/" target="_blank" className="text-white/60 hover:text-white transition-colors">
            <Instagram size={20} className="w-5 h-5 sm:w-6 sm:h-6" />
          </a>
        </div>
      </div>

      {/* Right Column - Character Image */}
      <div className="order-2 lg:order-1 max-lg:hidden flex justify-end items-end animate-in fade-in slide-in-from-right duration-1000 delay-300 bottom-0">
        <div className="w-full max-w-md lg:max-w-none flex items-end justify-end bottom-0">
          <img
            src={PersonajeHero}
            alt="Character" 
            className="bottom-0 h-auto w-auto object-contain animate-float"
          />
        </div>
      </div>
    </div>
  </div>

  {/* Scroll Indicator */}
  <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
    <ChevronDown className="text-white/60" size={28} />
  </div>
</section>


      {/* Resto del código permanece igual */}
      {/* About Section */}
      <section id="about" className="py-20 bg-black backdrop-blur-md">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-extrabold text-white mb-4 text-center uppercase">About Me</h2>
            <div className="w-18 h-1 bg-[#4845f6] mx-auto mb-8" />
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="w-80 h-80 mx-auto bg-gradient-to-br from-[#4845f6] to-[#1b17ff] rounded-full p-1">
                  <img
                    src="/placeholder.svg?height=320&width=320"
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
              <div className="space-y-6">
                <p className="text-white text-lg mb-6 leading-relaxed">
                  <BlurText
                  text="I am a Full Stack developer passionate about creating innovative digital solutions. With over 2 years of experience, I specialize in React, TypeScript, Tailwind CSS, MongoDB and Node.js."
                  delay={25}
                  animateBy="words"
                  direction="bottom"
                  />
                </p>
                <p className="text-white text-lg mb-8 leading-relaxed">
                  <BlurText
                    text="My focus is on writing clean code, creating intuitive interfaces, and optimizing performanceto deliver the best possible user experience."
                    delay={25}
                    animateBy="words"
                    direction="bottom"
                  />
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <Code className="text-[#4845f6]" size={20} />
                    <span className="text-white">Clean Code</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Palette className="text-[#4845f6]" size={20} />
                    <span className="text-white">UI/UX Design</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Smartphone className="text-[#4845f6]" size={20} />
                    <span className="text-white">Responsive</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <ExternalLink className="text-[#4845f6]" size={20} />
                    <span className="text-white">Performance</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-extrabold text-white mb-4 text-center uppercase">Skills</h2>
          <div className="w-18 h-1 bg-[#4845f6] mx-auto mb-8" />
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {skills.map((skill, index) => (
                <div
                  key={skill.name}
                  className="animate-in fade-in slide-in-from-bottom duration-1000"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white font-medium">{skill.name}</span>
                    <span className="text-[#4845f6]">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-[#4845f6] to-[#1b17ff] h-3 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-extrabold text-white mb-4 text-center uppercase">Projects</h2>
          <div className="w-18 h-1 bg-[#4845f6] mx-auto mb-8" />
          <FadeContent blur={true} duration={1500} easing="ease-out" initialOpacity={0}>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {projects.map((project, index) => (
              <Card
                key={project.title}
                className="bg-white/5 border-white/10 hover:bg-white/10"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <CardHeader className="p-0">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                </CardHeader>
                <CardContent className="p-6">
                  <CardTitle className="text-white mb-2">{project.title}</CardTitle>
                  {project.inProgress && (
                    <Badge variant="destructive" className="text-white mb-2">
                      In Progress
                    </Badge>
                  )}
                  <CardDescription className="text-white/70 mb-4">{project.description}</CardDescription>
                  <div className="flex flex-wrap gap-2 mb-4 items-end">
                    {project.tech.map((tech) => (
                      <Badge key={tech} variant="secondary" className="bg-[#1b17ff]/20 text-white/80">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex space-x-4">
                    <a href={project.github} target="_blank" className="text-white/60 hover:text-white transition-colors">
                      <Github size={20} />
                    </a>
                    <a href={project.demo} target="_blank" className="text-white/60 hover:text-white transition-colors">
                      <ExternalLink size={20} />
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </FadeContent>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-extrabold text-white mb-4 text-center uppercase">
            Contact
          </h2>
          <div className="w-18 h-1 bg-[#4845f6] mx-auto mb-8" />

          <div className="max-w-2xl mx-auto">
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-8">
                {state.succeeded ? (
                  /* AQUÍ: el mensaje que quieres ver tras enviar */
                  <p className="text-white text-center text-xl">
                    Thanks for your message! I'll get back to you soon. 🙌
                  </p>
                ) : (
                  /* Y si no ha enviado: el formulario */
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    {/* ...todos tus campos con name + ValidationError */}
                    {/* Nombre */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="text-white mb-2 block">
                          Name
                        </label>
                        <Input
                          id="name"
                          name="name"
                          required
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                          placeholder="Your name"
                        />
                        <ValidationError
                          prefix="Name"
                          field="name"
                          errors={state.errors}
                        />
                      </div>
                      {/* Email */}
                      <div>
                        <label htmlFor="email" className="text-white mb-2 block">
                          Email
                        </label>
                        <Input
                          id="email"
                          type="email"
                          name="email"
                          required
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                          placeholder="your@email.com"
                        />
                        <ValidationError
                          prefix="Email"
                          field="email"
                          errors={state.errors}
                        />
                      </div>
                    </div>
                    {/* Mensaje */}
                    <div>
                      <label htmlFor="message" className="text-white mb-2 block">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50 min-h-32"
                        placeholder="Tell me about your project..."
                      />
                      <ValidationError
                        prefix="Message"
                        field="message"
                        errors={state.errors}
                      />
                    </div>
                    {/* Botón */}
                    <Button
                      type="submit"
                      disabled={state.submitting}
                      className="w-full bg-[#1b17ff] hover:bg-[#1b17ff]/70 text-white flex items-center justify-center"
                    >
                      <Send className="mr-2" size={16} />
                      {state.submitting ? "Sending…" : "Send Message"}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="py-8 bg-black border-t border-white/10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-white/60">© 2025 <a href="https://www.instagram.com/byfacudev/" target="_blank" rel="noopener noreferrer">byFacuDev</a>. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}