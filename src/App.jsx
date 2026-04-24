import { useState } from 'react'
import './App.css'
import './theme.css'
import profilePhoto from './srinivas.jpg.jpeg'
import budgetTrackerPreview from './assets/budget-tracker-preview.png'
import searchFilterPreview from './assets/search-filter-preview.png'
import todoListPreview from './assets/todo-list-preview.png'
import { LayoutTextFlip } from './components/ui/LayoutTextFlip'

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [contactResult, setContactResult] = useState('')
  const [isSubmittingContact, setIsSubmittingContact] = useState(false)

  const handleNavClick = () => {
    setIsMobileMenuOpen(false)
  }

  const handleContactSubmit = async (event) => {
    event.preventDefault()
    setIsSubmittingContact(true)
    setContactResult('')

    const form = event.target
    const formData = new FormData(form)
    formData.append('access_key', '855b2d9a-44b9-449e-807f-86b9f853388f')

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (data.success) {
        setContactResult('Success! Your message has been sent.')
        form.reset()
      } else {
        setContactResult('Error. Please try again.')
      }
    } catch (error) {
      setContactResult('Network error. Please try again.')
    } finally {
      setIsSubmittingContact(false)
    }
  }

  return (
    <div className="site-shell">
      <div className="background-grid" aria-hidden="true" />
      <div className="site">
        <header className="topbar">
          <div className="topbar__inner">
            <a href="#profile" className="topbar__brand brand" onClick={handleNavClick}>
              <span className="brand__primary">Sai</span>
              <span className="brand__accent">Srinivas</span>
            </a>
            <button
              type="button"
              className={isMobileMenuOpen ? 'menu-toggle menu-toggle--open' : 'menu-toggle'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="site-navigation"
              aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              onClick={() => setIsMobileMenuOpen((open) => !open)}
            >
              <span />
              <span />
              <span />
            </button>
            <nav
              id="site-navigation"
              className={isMobileMenuOpen ? 'site-nav site-nav--open' : 'site-nav'}
            >
              <a href="#about" onClick={handleNavClick}>About</a>
              <a href="#experience" onClick={handleNavClick}>Experience</a>
              <a href="#techstuff" onClick={handleNavClick}>Skills</a>
              <a href="#projects" onClick={handleNavClick}>Projects</a>
              <a href="#contact" onClick={handleNavClick}>Contact</a>
            </nav>
          </div>
        </header>

        <section id="profile" className="profile-card hero-header">
          <div className="hero-header__media">
            <div className="hero-header__orbit hero-header__orbit--one" aria-hidden="true" />
            <div className="hero-header__orbit hero-header__orbit--two" aria-hidden="true" />
            <div className="hero-header__image-shell">
              <div className="photo-glow hero-header__glow" />
              <img
                className="hero-header__image"
                src={profilePhoto}
                alt="Portrait of Narsingoju Sai Srinivasu"
              />
            </div>
          </div>
          <div className="profile-content hero-header__content">
            <h2>Narsingoju Sai Srinivasu</h2>
            <div className="cta-row hero-header__actions">
              <a href="#contact" className="btn btn-primary">
                Connect with Me
              </a>
              <a href="#profile" className="btn btn-secondary">
                Explore
              </a>
            </div>
          </div>
        </section>

        <section id="about" className="about-section">
          <h2 className="about-section__title">
            <LayoutTextFlip text="About " words={['Me', 'Myself']} />
          </h2>
          <p className="profile-text">
            "I’m a Web Developer dedicated to building digital experiences that are as functional as they are beautiful. With a focus on clean code , I specialize in transforming complex problems into seamless web applications.
 and I’m constantly exploring new ways to optimize performance and accessibility. I don’t just write code; I build solutions that help brands and users connect more effectively."
          </p>
        </section>
        <section id="experience" className="experience-section">
          <h2 className="experience-section__title">Experience</h2>
          <article className="experience-card">
            <div className="experience-card__icon" aria-hidden="true">
              NS
            </div>
            <div className="experience-card__content">
              <div className="experience-card__header">
                <p className="experience-card__role">Web App Developer Intern</p>
                <span className="experience-card__time">Sep 2025 - Dec 2025</span>
              </div>
              <p className="experience-card__company">@ MicroSysLogic Technologies</p>
              <p className="experience-card__summary">
                Contributed to web application development and feature
                implementation within a dynamic six-person team.
              </p>
            </div>
          </article>
        </section>

        <section id="techstuff" className="techstuff-section">
          <h2 className="techstuff-section__title">My TechStuff</h2>
          <div className="techstuff-card">
            <div className="techstuff-group">
              <h3 className="techstuff-group__title">Frontend</h3>
              <ul className="techstuff-list">
                <li className="techstuff-item">
                  <div className="techstuff-badge">HTML</div>
                </li>
                <li className="techstuff-item">
                  <div className="techstuff-badge">CSS</div>
                </li>
                <li className="techstuff-item">
                  <div className="techstuff-badge">JS</div>
                </li>
                <li className="techstuff-item">
                  <div className="techstuff-badge">React</div>
                </li>
              </ul>
            </div>

            <div className="techstuff-group">
              <h3 className="techstuff-group__title">Backend</h3>
              <ul className="techstuff-list">
                <li className="techstuff-item">
                  <div className="techstuff-badge">Node</div>
                </li>
                <li className="techstuff-item">
                  <div className="techstuff-badge">MySQL</div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section id="projects" className="projects-showcase">
          <h2 className="projects-showcase__title">Projects</h2>
          <div className="projects-showcase__grid">
            <div className="project-showcase-card">
              <div className="project-showcase-card__shine" />
              <div className="project-showcase-card__glow" />
              <div className="project-showcase-card__content">
                <div className="project-showcase-card__badge">Featured</div>
                <div className="project-showcase-card__image project-showcase-card__image--screenshot">
                  <img
                    src={budgetTrackerPreview}
                    alt="Budget Tracker dashboard preview"
                    className="project-showcase-card__image-media"
                  />
                </div>
                <div className="project-showcase-card__text">
                  <p className="project-showcase-card__title">Budget Tracker</p>
                  <p className="project-showcase-card__description">
                    An interactive personal Budget tracker with animated sections,
                    refined dark-beige styling, and modern frontend presentation.
                  </p>
                </div>
                <div className="project-showcase-card__footer">
                  <a href="https://budget-tracker-omega-bice.vercel.app/" className="project-showcase-card__action">
                    Live
                  </a>
                  <a href="https://github.com/NSai01/personal-budget-tracker" className="project-showcase-card__action project-showcase-card__action--secondary">
                    Source
                  </a>
                </div>
              </div>
            </div>

            <div className="project-showcase-card">
              <div className="project-showcase-card__shine" />
              <div className="project-showcase-card__glow" />
              <div className="project-showcase-card__content">
                <div className="project-showcase-card__badge">UI</div>
                <div className="project-showcase-card__image project-showcase-card__image--screenshot">
                  <img
                    src={todoListPreview}
                    alt="To Do List app preview"
                    className="project-showcase-card__image-media"
                  />
                </div>
                <div className="project-showcase-card__text">
                  <p className="project-showcase-card__title">To Do List</p>
                  <p className="project-showcase-card__description">
                    A modern To Do List page build focused on elegant layouts,
                    responsive behavior, and smooth visual transitions.
                  </p>
                </div>
                <div className="project-showcase-card__footer">
                  <a href="https://to-do-list-nine-omega-40.vercel.app/" className="project-showcase-card__action">
                    Live
                  </a>
                  <a href="https://github.com/NSai01/to-do-list" className="project-showcase-card__action project-showcase-card__action--secondary">
                    Source
                  </a>
                </div>
              </div>
            </div>

            <div className="project-showcase-card">
              <div className="project-showcase-card__shine" />
              <div className="project-showcase-card__glow" />
              <div className="project-showcase-card__content">
                <div className="project-showcase-card__badge">React</div>
                <div className="project-showcase-card__image project-showcase-card__image--screenshot">
                  <img
                    src={searchFilterPreview}
                    alt="Search Filter Bar app preview"
                    className="project-showcase-card__image-media"
                  />
                </div>
                <div className="project-showcase-card__text">
                  <p className="project-showcase-card__title">Search Filter Bar</p>
                  <p className="project-showcase-card__description">
                    A polished React dashboard concept of Categorizing each and Every Product,
                    with readable data presentation, and Product Overviews.
                  </p>
                </div>
                <div className="project-showcase-card__footer">
                  <a href="https://search-filter-bar.vercel.app/" className="project-showcase-card__action">
                    Live
                  </a>
                  <a href="https://github.com/NSai01/search-filter-bar" className="project-showcase-card__action project-showcase-card__action--secondary">
                    Source
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="contact-section">
          <h2 className="contact-section__title">Contact</h2>
          <form className="contact-form" onSubmit={handleContactSubmit}>
            <span className="contact-form__group">
              <label htmlFor="name" className="contact-form__label">
                Name
              </label>
              <input type="text" name="name" id="name" placeholder="Your name" required />
            </span>

            <span className="contact-form__group">
              <label htmlFor="email" className="contact-form__label">
                Email
              </label>
              <input type="email" name="email" id="email" placeholder="you@example.com" required />
            </span>

            <span className="contact-form__group">
              <label htmlFor="message" className="contact-form__label">
                Message
              </label>
              <textarea
                name="message"
                id="message"
                rows="5"
                placeholder="Tell me about your project or opportunity"
                required
              />
            </span>

            <button className="contact-form__submit" type="submit" disabled={isSubmittingContact}>
              {isSubmittingContact ? 'Sending...' : 'Send Message'}
            </button>
            {contactResult ? (
              <p className="contact-form__result" role="status">
                {contactResult}
              </p>
            ) : null}
            <span className="contact-form__note">
              Prefer email? <a href="mailto:narsingojusaisrinivasu@gmail.com">Reach me directly</a>
            </span>
          </form>
        </section>

        <footer className="site-footer">
          <div className="site-footer__brand">
            <span className="site-footer__mark">NS</span>
            <span>N Sai Srinivas</span>
          </div>

          <div className="site-footer__meta">
            <p>
              ©2026 <span>N Sai Srinivas</span>
            </p>
            <p>Web Developer focused on polished frontend experiences.</p>
          </div>

          <nav className="site-footer__nav" aria-label="Footer">
            <a href="#profile">Profile</a>
            <a href="#projects">Projects</a>
            <a href="mailto:narsingojusaisrinivasu@gmail.com">Contact</a>
            <a href="#top">Back to top</a>
          </nav>

          <div className="site-footer__socials">
            <a href="https://github.com/NSai01" aria-label="GitHub">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M12 2C6.477 2 2 6.589 2 12.248c0 4.526 2.865 8.367 6.839 9.722.5.096.682-.222.682-.494 0-.244-.009-.89-.014-1.748-2.782.617-3.37-1.37-3.37-1.37-.454-1.177-1.11-1.49-1.11-1.49-.908-.636.069-.623.069-.623 1.004.072 1.532 1.055 1.532 1.055.892 1.568 2.341 1.115 2.91.853.091-.664.35-1.115.636-1.371-2.221-.259-4.555-1.137-4.555-5.062 0-1.118.389-2.033 1.029-2.75-.103-.259-.446-1.302.098-2.715 0 0 .84-.276 2.75 1.05A9.303 9.303 0 0 1 12 6.838a9.27 9.27 0 0 1 2.504.348c1.909-1.326 2.748-1.05 2.748-1.05.546 1.413.202 2.456.1 2.715.641.717 1.028 1.632 1.028 2.75 0 3.935-2.337 4.8-4.566 5.054.359.318.679.946.679 1.907 0 1.377-.012 2.487-.012 2.826 0 .275.18.595.688.493C19.138 20.611 22 16.772 22 12.248 22 6.589 17.523 2 12 2Z"
                  fill="currentColor"
                />
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/narsingoju-sai-srinivasu-5544722bb" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3A1.97 1.97 0 0 0 3.28 5c0 1.09.88 1.97 1.94 1.97h.03A1.97 1.97 0 0 0 7.22 5 1.97 1.97 0 0 0 5.25 3ZM20.44 12.67c0-3.46-1.85-5.07-4.33-5.07-2 0-2.9 1.12-3.4 1.91V8.5H9.33c.04.66 0 11.5 0 11.5h3.38v-6.42c0-.34.02-.68.12-.92.27-.68.88-1.38 1.91-1.38 1.35 0 1.89 1.04 1.89 2.56V20H20v-6.93c0-.15.01-.28 0-.4h.44Z"
                  fill="currentColor"
                />
              </svg>
            </a>
            <a href="https://x.com/SaiNarsingoju1" aria-label="Twitter">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M18.9 2H22l-6.77 7.73L23.2 22h-6.24l-4.89-6.92L6 22H2.9l7.24-8.28L.8 2h6.4l4.42 6.29L18.9 2Zm-1.09 18h1.73L6.27 3.9H4.41L17.81 20Z"
                  fill="currentColor"
                />
              </svg>
            </a>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App
