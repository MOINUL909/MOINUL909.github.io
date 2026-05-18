(function() {
    'use strict';
    
    let portfolioData = null;
    
    // ==================== UTILITY FUNCTIONS ====================
    function escapeHtml(text) {
        if (!text) return '';
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return String(text).replace(/[&<>"']/g, m => map[m]);
    }
    
    // ==================== PRELOADER ====================
    window.addEventListener('load', () => {
        setTimeout(() => {
            document.getElementById('preloader').classList.add('hide');
        }, 1000);
    });
    
    // ==================== NAVIGATION ====================
    function setupNavigation() {
        const navbar = document.getElementById('navbar');
        const navToggle = document.getElementById('navToggle');
        const navLinks = document.getElementById('navLinks');
        
        // Scroll effect
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
        
        // Mobile toggle
        if (navToggle) {
            navToggle.addEventListener('click', () => {
                navLinks.classList.toggle('open');
            });
        }
        
        // Close mobile menu on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
            });
        });
        
        // Active link on scroll
        const sections = document.querySelectorAll('section[id]');
        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.scrollY >= (sectionTop - 100)) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.querySelectorAll('a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }
    
    // ==================== BACK TO TOP ====================
    function setupBackToTop() {
        const backToTop = document.getElementById('backToTop');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        });
        
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ==================== TYPING EFFECT ====================
    function typeWriter(element, texts, speed = 100) {
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        function type() {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                element.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                element.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }
            
            let typeSpeed = speed;
            
            if (isDeleting) {
                typeSpeed /= 2;
            }
            
            if (!isDeleting && charIndex === currentText.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typeSpeed = 500;
            }
            
            setTimeout(type, typeSpeed);
        }
        
        type();
    }
    
    // ==================== POPULATE NAVIGATION ====================
    function populateNavigation(data) {
        const navLinks = document.getElementById('navLinks');
        if (!navLinks || !data.nav) return;
        
        // Add home link
        const homeHtml = `<li><a href="#home" class="active"><i class="fas fa-home"></i> Home</a></li>`;
        
        const navHtml = data.nav.map(item => `
            <li><a href="#${escapeHtml(item.id)}">
                <i class="${escapeHtml(item.icon)}"></i> 
                ${escapeHtml(item.label)}
            </a></li>
        `).join('');
        
        navLinks.innerHTML = homeHtml + navHtml + 
            `<li><a href="#contact"><i class="fas fa-envelope"></i> Contact</a></li>`;
    }
    
    // ==================== POPULATE HERO ====================
    function populateHero(data) {
        const profile = data.profile;
        
        // Name
        document.getElementById('heroName').innerHTML = `
            <span class="text-gradient">${escapeHtml(profile.displayName)}</span>
        `;
        
        // Typing effect
        const typingElement = document.querySelector('.typing-text');
        const roles = ['AI Researcher', 'Machine Learning Engineer', 'Research Associate', 'Teaching Assistant'];
        typeWriter(typingElement, roles, 80);
        
        // Description
        document.getElementById('heroDescription').textContent = profile.bioParagraphs[0].replace(/<[^>]*>/g, '').substring(0, 200) + '...';
        
        // Photo
        const heroPhoto = document.getElementById('heroPhoto');
        if (profile.photo && profile.photo.src) {
            heroPhoto.src = profile.photo.src;
            heroPhoto.alt = profile.photo.alt || profile.displayName;
        }
        
        // Social links
        if (data.social) {
            const socialHtml = data.social.map(link => `
                <a href="${escapeHtml(link.href)}" target="_blank" rel="noopener noreferrer" title="${escapeHtml(link.title)}">
                    <i class="${escapeHtml(link.icon)}"></i>
                </a>
            `).join('');
            document.getElementById('socialLinksHero').innerHTML = socialHtml;
            document.getElementById('socialLinksLarge').innerHTML = socialHtml;
        }
        
        // Stats
        if (profile.highlights) {
            const statsHtml = profile.highlights.map(stat => `
                <div class="stat-card" data-aos="fade-up">
                    <div class="stat-icon">
                        <i class="${escapeHtml(stat.icon)}"></i>
                    </div>
                    <div class="stat-number">${escapeHtml(stat.number)}${escapeHtml(stat.suffix)}</div>
                    <div class="stat-label">${escapeHtml(stat.label)}</div>
                </div>
            `).join('');
            document.getElementById('statsGrid').innerHTML = statsHtml;
        }
    }
    
    // ==================== POPULATE ABOUT ====================
    function populateAbout(data) {
        const profile = data.profile;
        const contact = data.contact;
        
        // Bio
        const bioHtml = profile.bioParagraphs.map(p => `<p>${p}</p>`).join('');
        document.getElementById('bioContent').innerHTML = bioHtml;
        
        // Info
        document.getElementById('profileLocation').textContent = profile.location;
        const emailLink = document.getElementById('profileEmail');
        emailLink.textContent = contact.email;
        emailLink.href = `mailto:${contact.email}`;
        document.getElementById('profilePhone').textContent = profile.phone;
    }
    
    // ==================== POPULATE EXPERIENCE ====================
    function populateExperience(data) {
        if (!data.experience) return;
        
        const timeline = document.getElementById('experienceTimeline');
        const experienceHtml = data.experience.map(exp => {
            const achievementsHtml = exp.achievements 
                ? `<ul class="timeline-achievements">
                    ${exp.achievements.map(a => `<li>${escapeHtml(a)}</li>`).join('')}
                   </ul>`
                : '';
            
            return `
                <div class="timeline-item" data-aos="fade-up">
                    <div class="timeline-content">
                        <span class="experience-type">${escapeHtml(exp.type)}</span>
                        <h3>${escapeHtml(exp.title)}</h3>
                        <h4>${escapeHtml(exp.organization)}</h4>
                        <div class="timeline-location">
                            <i class="fas fa-map-marker-alt"></i>
                            ${escapeHtml(exp.location)}
                        </div>
                        <span class="timeline-date">
                            ${escapeHtml(exp.startDate)} - ${escapeHtml(exp.endDate)}
                            ${exp.current ? '<span class="badge">Current</span>' : ''}
                        </span>
                        <p class="timeline-description">${escapeHtml(exp.description)}</p>
                        ${achievementsHtml}
                    </div>
                    <div class="timeline-marker">
                        <i class="${escapeHtml(exp.icon)}"></i>
                    </div>
                </div>
            `;
        }).join('');
        
        timeline.innerHTML = experienceHtml;
    }
    
    // ==================== POPULATE EDUCATION ====================
    function populateEducation(data) {
        if (!data.education) return;
        
        const grid = document.getElementById('educationGrid');
        const educationHtml = data.education.map(edu => {
            const coursesHtml = edu.courses 
                ? `<div class="education-courses">
                    ${edu.courses.map(course => `<span class="course-tag">${escapeHtml(course)}</span>`).join('')}
                   </div>`
                : '';
            
            return `
                <div class="education-card" data-aos="fade-up">
                    <div class="education-icon">
                        <i class="${escapeHtml(edu.icon)}"></i>
                    </div>
                    <h3>${escapeHtml(edu.degree)}</h3>
                    <h4>${escapeHtml(edu.institution)}</h4>
                    <div class="education-location">
                        <i class="fas fa-map-marker-alt"></i>
                        ${escapeHtml(edu.location)}
                    </div>
                    <span class="education-years">${escapeHtml(edu.startYear)} - ${escapeHtml(edu.endYear)}</span>
                    <div class="education-gpa">
                        ${escapeHtml(edu.cgpa)} <span>/ ${escapeHtml(edu.scale)}</span>
                    </div>
                    <p class="education-description">${escapeHtml(edu.description)}</p>
                    ${coursesHtml}
                </div>
            `;
        }).join('');
        
        grid.innerHTML = educationHtml;
    }
    
    // ==================== POPULATE SKILLS ====================
    function populateSkills(data) {
        if (!data.skills) return;
        
        // Programming
        if (data.skills.programming) {
            const progHtml = data.skills.programming.map(skill => `
                <div class="skill-bar" data-aos="fade-right">
                    <div class="skill-info">
                        <span class="skill-name">
                            <i class="${escapeHtml(skill.icon)}" style="color: ${escapeHtml(skill.color)}"></i>
                            ${escapeHtml(skill.name)}
                        </span>
                        <span class="skill-percent">${skill.level}%</span>
                    </div>
                    <div class="skill-progress">
                        <div class="skill-progress-bar" style="width: ${skill.level}%"></div>
                    </div>
                </div>
            `).join('');
            document.getElementById('skillsProgramming').innerHTML = progHtml;
        }
        
        // AI/ML
        if (data.skills.aiml) {
            const aimlHtml = data.skills.aiml.map(skill => `
                <div class="skill-bar" data-aos="fade-right">
                    <div class="skill-info">
                        <span class="skill-name">
                            <i class="${escapeHtml(skill.icon)}"></i>
                            ${escapeHtml(skill.name)}
                        </span>
                        <span class="skill-percent">${skill.level}%</span>
                    </div>
                    <div class="skill-progress">
                        <div class="skill-progress-bar" style="width: ${skill.level}%"></div>
                    </div>
                </div>
            `).join('');
            document.getElementById('skillsAIML').innerHTML = aimlHtml;
        }
        
        // Tools
        if (data.skills.tools) {
            const toolsHtml = data.skills.tools.map(skill => `
                <div class="skill-badge" data-aos="zoom-in">
                    <i class="${escapeHtml(skill.icon)}"></i>
                    ${escapeHtml(skill.name)}
                </div>
            `).join('');
            document.getElementById('skillsTools').innerHTML = toolsHtml;
        }
        
        // Visualization
        if (data.skills.visualization) {
            const vizHtml = data.skills.visualization.map(skill => `
                <div class="skill-badge" data-aos="zoom-in">
                    <i class="${escapeHtml(skill.icon)}"></i>
                    ${escapeHtml(skill.name)}
                </div>
            `).join('');
            document.getElementById('skillsVisualization').innerHTML = vizHtml;
        }
        
        // Soft Skills
        if (data.skills.soft) {
            const softHtml = data.skills.soft.map(skill => `
                <div class="skill-badge" data-aos="zoom-in">
                    <i class="${escapeHtml(skill.icon)}"></i>
                    ${escapeHtml(skill.name)}
                </div>
            `).join('');
            document.getElementById('skillsSoft').innerHTML = softHtml;
        }
    }
    
    // ==================== POPULATE PUBLICATIONS ====================
    function populatePublications(data) {
        if (!data.publications) return;
        
        const container = document.getElementById('publicationsContent');
        
        const pubsHtml = data.publications.map(section => {
            const papersHtml = section.papers.map(paper => {
                const linksHtml = paper.links && paper.links.length > 0
                    ? paper.links.map(link => `
                        <a href="${escapeHtml(link.href)}" class="btn" target="_blank" rel="noopener noreferrer">
                            <i class="${escapeHtml(link.icon)}"></i> ${escapeHtml(link.label)}
                        </a>
                      `).join('')
                    : '';
                
                const abstractBtn = paper.abstractHtml 
                    ? `<button class="btn" onclick="showModal('abstract-${escapeHtml(paper.id)}')">
                        <i class="fas fa-align-left"></i> Abstract
                       </button>`
                    : '';
                
                const bibtexBtn = paper.bibtex
                    ? `<button class="btn" onclick="showModal('bibtex-${escapeHtml(paper.id)}')">
                        <i class="fas fa-quote-right"></i> BibTeX
                       </button>`
                    : '';
                
                return `
                    <div class="publication" data-aos="fade-up">
                        <h3>${escapeHtml(paper.title)}</h3>
                        <div class="authors">${paper.authorsHtml}</div>
                        <span class="venue">${paper.venueHtml}</span>
                        <div class="pub-links">
                            ${linksHtml}
                            ${abstractBtn}
                            ${bibtexBtn}
                        </div>
                    </div>
                `;
            }).join('');
            
            return `
                <div class="pub-subsection">
                    <h3 class="subsection-title">${escapeHtml(section.subsectionTitle)}</h3>
                    ${papersHtml}
                </div>
            `;
        }).join('');
        
        container.innerHTML = pubsHtml;
        buildModals(data);
    }
    
    // ==================== POPULATE LEADERSHIP ====================
    function populateLeadership(data) {
        if (!data.leadership) return;
        
        const grid = document.getElementById('leadershipGrid');
        const leadershipHtml = data.leadership.map(item => `
            <div class="leadership-card" data-aos="fade-up">
                <div class="leadership-icon">
                    <i class="${escapeHtml(item.icon)}"></i>
                </div>
                <h3>${escapeHtml(item.title)}</h3>
                <h4>${escapeHtml(item.organization)}</h4>
                ${item.description ? `<p>${escapeHtml(item.description)}</p>` : ''}
                <span class="leadership-date">${escapeHtml(item.date)}</span>
            </div>
        `).join('');
        
        grid.innerHTML = leadershipHtml;
    }
    
    // ==================== POPULATE AWARDS ====================
    function populateAwards(data) {
        if (!data.awards) return;
        
        const grid = document.getElementById('awardsGrid');
        const awardsHtml = data.awards.map(award => `
            <div class="award-card" data-aos="fade-up">
                <div class="award-icon">
                    <i class="${escapeHtml(award.icon)}"></i>
                </div>
                <div class="award-content">
                    <h4>${escapeHtml(award.title)}</h4>
                    <p>${escapeHtml(award.organization)}</p>
                    <span class="award-date">${escapeHtml(award.date)}</span>
                </div>
            </div>
        `).join('');
        
        grid.innerHTML = awardsHtml;
    }
    
    // ==================== POPULATE CERTIFICATES ====================
    function populateCertificates(data) {
        if (!data.certificates) return;
        
        const grid = document.getElementById('certificatesGrid');
        const certsHtml = data.certificates.map(cert => `
            <div class="certificate-card" data-aos="fade-up">
                <div class="certificate-header">
                    <div class="certificate-icon">
                        <i class="${escapeHtml(cert.icon)}"></i>
                    </div>
                    <div class="certificate-content">
                        <h4>${escapeHtml(cert.title)}</h4>
                        <p>${escapeHtml(cert.organization)}</p>
                    </div>
                </div>
                <span class="certificate-date">${escapeHtml(cert.date)}</span>
            </div>
        `).join('');
        
        grid.innerHTML = certsHtml;
    }
    
    // ==================== POPULATE CONTACT ====================
    function populateContact(data) {
        document.getElementById('contactEmail').innerHTML = `
            <a href="mailto:${escapeHtml(data.contact.email)}">${escapeHtml(data.contact.email)}</a>
        `;
        document.getElementById('contactPersonalEmail').innerHTML = `
            <a href="mailto:${escapeHtml(data.contact.personalEmail)}">${escapeHtml(data.contact.personalEmail)}</a>
        `;
        document.getElementById('contactPhone').textContent = data.profile.phone;
        document.getElementById('contactAddress').textContent = data.profile.address;
    }
    
    // ==================== FOOTER ====================
    function populateFooter(data) {
        document.getElementById('footerText').innerHTML = `
            &copy; ${data.meta.copyrightYear} ${escapeHtml(data.profile.displayName)}. All rights reserved.
        `;
    }
    
    // ==================== MODALS ====================
    function buildModals(data) {
        const modalRoot = document.getElementById('modalsRoot');
        if (!modalRoot || !data.publications) return;
        
        let modalsHtml = '';
        
        data.publications.forEach(section => {
            section.papers.forEach(paper => {
                if (paper.abstractHtml) {
                    modalsHtml += `
                        <div id="abstract-${escapeHtml(paper.id)}" class="modal">
                            <div class="modal-content">
                                <button class="modal-close" onclick="closeModal('abstract-${escapeHtml(paper.id)}')">&times;</button>
                                <h3>Abstract</h3>
                                <div class="abstract-text">${paper.abstractHtml}</div>
                            </div>
                        </div>
                    `;
                }
                
                if (paper.bibtex) {
                    modalsHtml += `
                        <div id="bibtex-${escapeHtml(paper.id)}" class="modal">
                            <div class="modal-content">
                                <button class="modal-close" onclick="closeModal('bibtex-${escapeHtml(paper.id)}')">&times;</button>
                                <h3>BibTeX</h3>
                                <pre>${escapeHtml(paper.bibtex)}</pre>
                                <button class="copy-btn" onclick="copyBibtex('bibtex-${escapeHtml(paper.id)}')">
                                    <i class="fas fa-copy"></i> Copy BibTeX
                                </button>
                            </div>
                        </div>
                    `;
                }
            });
        });
        
        modalRoot.innerHTML = modalsHtml;
    }
    
    window.showModal = function(id) {
        const modal = document.getElementById(id);
        if (modal) {
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
        }
    };
    
    window.closeModal = function(id) {
        const modal = document.getElementById(id);
        if (modal) {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }
    };
    
    window.copyBibtex = function(id) {
        const modal = document.getElementById(id);
        const pre = modal.querySelector('pre');
        if (pre && navigator.clipboard) {
            navigator.clipboard.writeText(pre.textContent).then(() => {
                const btn = modal.querySelector('.copy-btn');
                const originalHtml = btn.innerHTML;
                btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
                setTimeout(() => {
                    btn.innerHTML = originalHtml;
                }, 2000);
            });
        }
    };
    
    // Close modal on outside click
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('show');
            document.body.style.overflow = '';
        }
    });
    
    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal.show').forEach(modal => {
                modal.classList.remove('show');
            });
            document.body.style.overflow = '';
        }
    });
    
    // ==================== PARTICLES ====================
    function createParticles() {
        const container = document.getElementById('particles');
        if (!container) return;
        
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = Math.random() * 4 + 'px';
            particle.style.height = particle.style.width;
            particle.style.background = 'rgba(99, 102, 241, 0.3)';
            particle.style.borderRadius = '50%';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animation = `float ${Math.random() * 10 + 5}s ease-in-out infinite`;
            container.appendChild(particle);
        }
    }
    
    // ==================== INITIALIZATION ====================
    async function init() {
        try {
            const response = await fetch('data.json');
            if (!response.ok) throw new Error('Failed to load data');
            
            portfolioData = await response.json();
            
            // Populate all sections
            populateNavigation(portfolioData);
            populateHero(portfolioData);
            populateAbout(portfolioData);
            populateExperience(portfolioData);
            populateEducation(portfolioData);
            populateSkills(portfolioData);
            populatePublications(portfolioData);
            populateLeadership(portfolioData);
            populateAwards(portfolioData);
            populateCertificates(portfolioData);
            populateContact(portfolioData);
            populateFooter(portfolioData);
            
            // Setup interactivity
            setupNavigation();
            setupBackToTop();
            createParticles();
            
            // Initialize AOS
            AOS.init({
                duration: 800,
                easing: 'ease-out',
                once: true,
                offset: 100
            });
            
        } catch (error) {
            console.error('Error initializing portfolio:', error);
        }
    }
    
    // Start when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
})();