// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger")
const navMenu = document.querySelector(".nav-menu")

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active")
  navMenu.classList.toggle("active")
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active")
    navMenu.classList.remove("active")
  }),
)

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(255, 255, 255, 0.98)"
    navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)"
  } else {
    navbar.style.background = "rgba(255, 255, 255, 0.95)"
    navbar.style.boxShadow = "none"
  }
})

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Contact form handling
const contactForm = document.getElementById("contactForm")
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault()

    // Get form data
    const formData = new FormData(this)
    const data = Object.fromEntries(formData)

    // Simple validation
    if (!data.name || !data.email || !data.interest) {
      alert("Please fill in all required fields.")
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      alert("Please enter a valid email address.")
      return
    }

    // Simulate form submission
    const submitButton = this.querySelector('button[type="submit"]')
    const originalText = submitButton.textContent

    submitButton.textContent = "Sending..."
    submitButton.disabled = true

    // Simulate API call
    setTimeout(() => {
      alert("Thank you for your interest! We will contact you within 24 hours to discuss your investment goals.")
      this.reset()
      submitButton.textContent = originalText
      submitButton.disabled = false
    }, 2000)
  })
}

// Investment Plan Selection and Registration
let selectedPlan = null
const investmentPlans = {
  residential: {
    name: "Residential Property Fund",
    returns: "8-12% Annual",
    minInvestment: 25000,
  },
  commercial: {
    name: "Commercial Real Estate Fund",
    returns: "10-15% Annual",
    minInvestment: 50000,
  },
  development: {
    name: "Development Projects",
    returns: "15-20% Annual",
    minInvestment: 100000,
  },
  reit: {
    name: "REIT Portfolio",
    returns: "6-10% Annual",
    minInvestment: 10000,
  },
}

document.addEventListener("DOMContentLoaded", () => {
  const planCards = document.querySelectorAll(".plan-card")
  const modal = document.getElementById("registrationModal")
  const closeModal = document.querySelector(".close")
  const registrationForm = document.getElementById("registrationForm")
  const selectedPlanInput = document.getElementById("selectedPlan")
  const investmentAmountInput = document.getElementById("investmentAmount")

  // Plan selection
  planCards.forEach((card) => {
    const selectButton = card.querySelector(".select-plan")
    selectButton.addEventListener("click", () => {
      const planType = card.dataset.plan
      selectedPlan = planType

      // Update UI
      planCards.forEach((c) => c.classList.remove("selected"))
      card.classList.add("selected")

      // Update modal form
      selectedPlanInput.value = investmentPlans[planType].name
      investmentAmountInput.min = investmentPlans[planType].minInvestment
      investmentAmountInput.placeholder = `Investment Amount (Min: $${investmentPlans[planType].minInvestment.toLocaleString()})`

      // Show modal
      modal.style.display = "block"
    })
  })

  // Close modal
  closeModal.addEventListener("click", () => {
    modal.style.display = "none"
  })

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none"
    }
  })

  // Registration form submission
  registrationForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const formData = new FormData(registrationForm)
    const data = Object.fromEntries(formData)

    // Validation
    if (!data.fullName || !data.emailAddress || !selectedPlan) {
      alert("Please fill in all required fields and select an investment plan.")
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.emailAddress)) {
      alert("Please enter a valid email address.")
      return
    }

    // Investment amount validation
    const minInvestment = investmentPlans[selectedPlan].minInvestment
    if (data.investmentAmount && Number(data.investmentAmount) < minInvestment) {
      alert(`Minimum investment for this plan is $${minInvestment.toLocaleString()}`)
      return
    }

    // Create Telegram message
    const plan = investmentPlans[selectedPlan]
    let message = `🏢 New Investment Inquiry - Centennial Investment%0A%0A`
    message += `👤 Name: ${data.fullName}%0A`
    message += `📧 Email: ${data.emailAddress}%0A`
    if (data.phoneNumber) message += `📱 Phone: ${data.phoneNumber}%0A`
    message += `💼 Selected Plan: ${plan.name}%0A`
    message += `📈 Expected Returns: ${plan.returns}%0A`
    if (data.investmentAmount) message += `💰 Investment Amount: $${Number(data.investmentAmount).toLocaleString()}%0A`
    message += `%0A🔗 Please contact me to discuss this investment opportunity.`

    // Open Telegram with pre-filled message
    const telegramUrl = `https://t.me/centennialinvestment?text=${message}`
    window.open(telegramUrl, "_blank")

    // Close modal and reset
    modal.style.display = "none"
    registrationForm.reset()
    planCards.forEach((c) => c.classList.remove("selected"))
    selectedPlan = null

    // Show success message
    alert("Registration completed! You'll be redirected to Telegram to connect with our investment team.")
  })
})

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in-up")
    }
  })
}, observerOptions)

// Observe elements for animation
document.addEventListener("DOMContentLoaded", () => {
  const animateElements = document.querySelectorAll(
    ".service-card, .certificate-card, .contact-card, .about-text, .video-content",
  )
  animateElements.forEach((el) => observer.observe(el))
})

// Counter animation for hero stats
function animateCounters() {
  const counters = document.querySelectorAll(".stat h3")

  counters.forEach((counter) => {
    const target = counter.textContent
    const numericValue = Number.parseFloat(target.replace(/[^0-9.]/g, ""))
    const suffix = target.replace(/[0-9.]/g, "")

    let current = 0
    const increment = numericValue / 100
    const timer = setInterval(() => {
      current += increment
      if (current >= numericValue) {
        current = numericValue
        clearInterval(timer)
      }
      counter.textContent = current.toFixed(1) + suffix
    }, 20)
  })
}

// Trigger counter animation when hero section is visible
const heroObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      animateCounters()
      heroObserver.unobserve(entry.target)
    }
  })
})

document.addEventListener("DOMContentLoaded", () => {
  const heroSection = document.querySelector(".hero")
  if (heroSection) {
    heroObserver.observe(heroSection)
  }
})

// Service card hover effects
document.addEventListener("DOMContentLoaded", () => {
  const serviceCards = document.querySelectorAll(".service-card")

  serviceCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-10px) scale(1.02)"
    })

    card.addEventListener("mouseleave", () => {
      if (card.classList.contains("featured")) {
        card.style.transform = "translateY(0) scale(1.05)"
      } else {
        card.style.transform = "translateY(0) scale(1)"
      }
    })
  })
})

// Video lazy loading
document.addEventListener("DOMContentLoaded", () => {
  const videoWrapper = document.querySelector(".video-wrapper")
  const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const iframe = entry.target.querySelector("iframe")
        if (iframe && !iframe.src) {
          iframe.src = iframe.dataset.src
        }
        videoObserver.unobserve(entry.target)
      }
    })
  })

  if (videoWrapper) {
    videoObserver.observe(videoWrapper)
  }
})

// Parallax effect for hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const hero = document.querySelector(".hero")
  if (hero) {
    const rate = scrolled * -0.5
    hero.style.transform = `translateY(${rate}px)`
  }
})

// Form field focus effects
document.addEventListener("DOMContentLoaded", () => {
  const formFields = document.querySelectorAll("input, select, textarea")

  formFields.forEach((field) => {
    field.addEventListener("focus", () => {
      field.parentElement.classList.add("focused")
    })

    field.addEventListener("blur", () => {
      if (!field.value) {
        field.parentElement.classList.remove("focused")
      }
    })
  })
})
