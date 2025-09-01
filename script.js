// Variables globales
let selectedRating = 0;
let isAdminMode = false;
let adminKeySequence = [];

// Inicialización cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// InicializaciÓN DE APLICACIÓN
function initializeApp() {
    initPageLoader();
    initNavbar();
    initDropdowns();
    initRatingSystem();
    initAdminMode();
    loadReviews();
    updateRatingSummary();
    initScrollAnimations();
    initMobileMenu();
}

// ==================== PAGE LOADER ====================
function initPageLoader() {
    window.addEventListener('load', function() {
        setTimeout(() => {
            const pageLoader = document.getElementById('pageLoader');
            if (pageLoader) {
                pageLoader.classList.add('hidden');
            }
        }, 1500);
    });
}

// ==================== NAVBAR ====================
function initNavbar() {
    window.addEventListener('scroll', function() {
        const navbar = document.getElementById('navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });
}

// ==================== DROPDOWNS ====================
function initDropdowns() {
    const quickAccessDropdowns = document.querySelectorAll('.dropdown');
    
    quickAccessDropdowns.forEach(dropdown => {
        const button = dropdown.querySelector('button');
        const content = dropdown.querySelector('.dropdown-content');
        
        if (button && content) {
            button.addEventListener('click', function(e) {
                e.stopPropagation();
                
                // Cerrar otros dropdowns
                quickAccessDropdowns.forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        const otherContent = otherDropdown.querySelector('.dropdown-content');
                        if (otherContent) {
                            otherContent.style.display = 'none';
                        }
                    }
                });
                
                // Toggle dropdown actual
                content.style.display = content.style.display === 'block' ? 'none' : 'block';
            });
        }
    });
    
    // Cerrar dropdowns al hacer clic fuera
    document.addEventListener('click', function(e) {
        quickAccessDropdowns.forEach(dropdown => {
            const content = dropdown.querySelector('.dropdown-content');
            if (content && !dropdown.contains(e.target)) {
                content.style.display = 'none';
            }
        });
    });
}

// ==================== MOBILE MENU ====================
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        });
    }
}

// ==================== MODAL INSCRIPCIONES ====================
function showInscripcionesModal() {
    const modal = document.getElementById('inscripcionesModal');
    if (modal) {
        modal.style.display = 'flex';
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
        document.body.style.overflow = 'hidden';
    }
}

function closeInscripcionesModal() {
    const modal = document.getElementById('inscripcionesModal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }
}

function openFormulario() {
    // Cerrar modal de inscripciones
    closeInscripcionesModal();
    
    // Abrir modal de formulario
    setTimeout(() => {
        const modal = document.getElementById('formularioModal');
        if (modal) {
            // URL del formulario de Google Forms
            const embedUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSeFZdSWzURjpBqSzrpt_SEPI76CkNze6pAR_DCwFUEtXDb-Zw/viewform?embedded=true';
            
            // Actualizar el iframe
            const iframe = modal.querySelector('iframe');
            if (iframe) {
                iframe.src = embedUrl;
            }
            
            modal.style.display = 'flex';
            setTimeout(() => {
                modal.classList.add('active');
            }, 10);
            document.body.style.overflow = 'hidden';
        }
    }, 300);
}

function closeFormularioModal() {
    const modal = document.getElementById('formularioModal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }
}

// Cerrar modales al hacer clic en el overlay
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal-overlay')) {
        if (e.target.id === 'inscripcionesModal') {
            closeInscripcionesModal();
        } else if (e.target.id === 'formularioModal') {
            closeFormularioModal();
        }
    }
});

// ==================== NAVIGATION FUNCTIONS ====================
function showHome() {
    document.getElementById('mainContent').style.display = 'block';
    document.getElementById('servicesSection').classList.remove('active');
    document.getElementById('programSection').classList.remove('active');
    window.scrollTo(0, 0);
}

function showServices(plan) {
    document.getElementById('mainContent').style.display = 'none';
    document.getElementById('programSection').classList.remove('active');
    
    const servicesSection = document.getElementById('servicesSection');
    const servicesTitle = document.getElementById('servicesTitle');
    const notasLink = document.getElementById('notasLink');
    const tareasLink = document.getElementById('tareasLink');
    
    if (servicesTitle) servicesTitle.textContent = `Servicios del Plan ${plan.charAt(0).toUpperCase() + plan.slice(1)}`;
    
    if (plan === 'diario') {
        if (notasLink) notasLink.href = 'https://maestrocreamos.github.io/NOTASPLANDIARIO.github.io/';
        if (tareasLink) tareasLink.href = 'https://maestrocreamos.github.io/TAREASDIARIO.github.io/';
    } else if (plan === 'domingo') {
        if (notasLink) notasLink.href = 'https://maestrocreamos.github.io/NOTASDOMINGO.github.io/';
        if (tareasLink) tareasLink.href = 'https://maestrocreamos.github.io/TAREADOMINGO.github.io/';
    }
    
    if (servicesSection) {
        servicesSection.classList.add('active');
        window.scrollTo(0, 0);
    }
}

function showProgram() {
    document.getElementById('mainContent').style.display = 'none';
    document.getElementById('servicesSection').classList.remove('active');
    document.getElementById('programSection').classList.add('active');
    window.scrollTo(0, 0);
}

function showPhotos(plan) {
    // URLs temporales para las galerÃ­as de fotos
    const photoUrls = {
        'diario': 'https://creamos-educacion.infinityfreeapp.com/?i=1',
        'domingo': 'https://example.com/galeria-plan-domingo'
    };
    
    showNotification(`Galería del Plan ${plan.charAt(0).toUpperCase() + plan.slice(1)} próximamente disponible`, 'info');
    
    // En el futuro aqui se abrirá una galería real
    // window.open(photoUrls[plan], '_blank');
}

function showComingSoon(service) {
    alert(`${service}\n\nEsta sección estará disponible próximamente. Por favor mantente atento a nuestras actualizaciones.\n\nPara más información, contáctanos por WhatsApp.`);
}

// ==================== RATING SYSTEM ====================
function initRatingSystem() {
    const starInputs = document.querySelectorAll('.star-input');
    
    starInputs.forEach((star, index) => {
        star.addEventListener('click', function() {
            selectedRating = parseInt(this.dataset.rating);
            updateStarDisplay();
            updateRatingText();
            
            // Animación
            this.classList.add('star-animation');
            setTimeout(() => {
                this.classList.remove('star-animation');
            }, 500);
        });
        
        star.addEventListener('mouseenter', function() {
            const rating = parseInt(this.dataset.rating);
            highlightStars(rating);
        });
    });
    
    const ratingInput = document.getElementById('ratingInput');
    if (ratingInput) {
        ratingInput.addEventListener('mouseleave', function() {
            updateStarDisplay();
        });
    }
}

function highlightStars(rating) {
    const starInputs = document.querySelectorAll('.star-input');
    starInputs.forEach((star, index) => {
        if (index < rating) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
}

function updateStarDisplay() {
    const starInputs = document.querySelectorAll('.star-input');
    starInputs.forEach((star, index) => {
        if (index < selectedRating) {
            star.classList.add('active');
            star.innerHTML = '★';
        } else {
            star.classList.remove('active');
            star.innerHTML = '★';
        }
    });
}

function updateRatingText() {
    const ratingText = document.getElementById('ratingText');
    const ratings = {
        0: 'Selecciona una calificación',
        1: 'Muy malo - 1 estrella',
        2: 'Malo - 2 estrellas',
        3: 'Regular - 3 estrellas',
        4: 'Bueno - 4 estrellas',
        5: 'Excelente - 5 estrellas'
    };
    
    if (ratingText) {
        ratingText.textContent = ratings[selectedRating];
    }
}

// ==================== REVIEWS MANAGEMENT ====================
function submitReview() {
    const name = document.getElementById('reviewName').value.trim();
    const comment = document.getElementById('reviewComment').value.trim();
    
    // Validaciones
    if (!name) {
        showNotification('Por favor ingresa tu nombre', 'error');
        return;
    }
    
    if (selectedRating === 0) {
        showNotification('Por favor selecciona una calificación', 'error');
        return;
    }
    
    if (!comment) {
        showNotification('Por favor escribe un comentario', 'error');
        return;
    }
    
    // Crear objeto de review
    const review = {
        id: generateId(),
        name: name,
        rating: selectedRating,
        comment: comment,
        date: new Date().toLocaleDateString('es-GT'),
        timestamp: Date.now()
    };
    
    // Guardar review
    saveReview(review);
    
    // Limpiar formulario
    clearReviewForm();
    
    // Mostrar notificación de Éxito
    showNotification('¡Gracias por tu reseña! Se ha publicado exitosamente', 'success');
    
    // Scroll al Área de reviews
    setTimeout(() => {
        const reviewsList = document.getElementById('reviewsList');
        if (reviewsList) {
            reviewsList.scrollIntoView({ behavior: 'smooth' });
        }
    }, 500);
}

function saveReview(review) {
    let reviews = getReviews();
    reviews.unshift(review); // Agregar al inicio
    localStorage.setItem('creamos_reviews', JSON.stringify(reviews));
    loadReviews();
    updateRatingSummary();
}

function getReviews() {
    const reviews = localStorage.getItem('creamos_reviews');
    return reviews ? JSON.parse(reviews) : [];
}

function loadReviews() {
    const reviews = getReviews();
    const reviewsList = document.getElementById('reviewsList');
    const noReviews = document.getElementById('noReviews');
    
    if (!reviewsList) return;
    
    if (reviews.length === 0) {
        if (noReviews) noReviews.style.display = 'block';
        return;
    }
    
    if (noReviews) noReviews.style.display = 'none';
    
    // Limpiar lista existente
    reviewsList.innerHTML = '';
    
    reviews.forEach(review => {
        const reviewElement = createReviewElement(review);
        reviewsList.appendChild(reviewElement);
    });
}

function createReviewElement(review) {
    const reviewDiv = document.createElement('div');
    reviewDiv.className = 'review-item';
    reviewDiv.dataset.reviewId = review.id;
    
    const stars = '★'.repeat(review.rating) + '★'.repeat(5 - review.rating);
    
    reviewDiv.innerHTML = `
        <div class="review-header">
            <div>
                <div class="review-name">${escapeHtml(review.name)}</div>
                <div class="review-date">${review.date}</div>
            </div>
            <div class="review-rating">${stars}</div>
        </div>
        <div class="review-comment">${escapeHtml(review.comment)}</div>
        <div class="review-actions">
            <button class="delete-btn ${isAdminMode ? 'visible' : ''}" onclick="deleteReview('${review.id}')">
                Eliminar
            </button>
        </div>
    `;
    
    // Animación de aparición
    setTimeout(() => {
        reviewDiv.classList.add('review-submitted');
    }, 100);
    
    return reviewDiv;
}

function deleteReview(reviewId) {
    if (!isAdminMode) {
        showNotification('No tienes permisos para eliminar comentarios', 'error');
        return;
    }
    
    if (confirm('¿Estás seguro de que quieres eliminar este comentario?')) {
        let reviews = getReviews();
        reviews = reviews.filter(review => review.id !== reviewId);
        localStorage.setItem('creamos_reviews', JSON.stringify(reviews));
        loadReviews();
        updateRatingSummary();
        showNotification('Comentario eliminado exitosamente', 'success');
    }
}

function updateRatingSummary() {
    const reviews = getReviews();
    const averageRatingEl = document.getElementById('averageRating');
    const averageStarsEl = document.getElementById('averageStars');
    const totalReviewsEl = document.getElementById('totalReviews');
    
    if (!reviews.length) {
        if (averageRatingEl) averageRatingEl.textContent = '0.0';
        if (totalReviewsEl) totalReviewsEl.textContent = '0';
        if (averageStarsEl) {
            averageStarsEl.innerHTML = '★★★★★';
        }
        return;
    }
    
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = (totalRating / reviews.length).toFixed(1);
    const fullStars = Math.floor(averageRating);
    const hasHalfStar = averageRating % 1 >= 0.5;
    
    if (averageRatingEl) averageRatingEl.textContent = averageRating;
    if (totalReviewsEl) totalReviewsEl.textContent = reviews.length;
    
    if (averageStarsEl) {
        let starsHtml = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= fullStars) {
                starsHtml += '<span class="star filled">★…</span>';
            } else if (i === fullStars + 1 && hasHalfStar) {
                starsHtml += '<span class="star filled">★…</span>';
            } else {
                starsHtml += '<span class="star">★</span>';
            }
        }
        averageStarsEl.innerHTML = starsHtml;
    }
}

function clearReviewForm() {
    document.getElementById('reviewName').value = '';
    document.getElementById('reviewComment').value = '';
    selectedRating = 0;
    updateStarDisplay();
    updateRatingText();
}

// ==================== ADMIN MODE ====================
function initAdminMode() {
    document.addEventListener('keydown', function(e) {
        // Detectar combinación Ctrl+Alt+D
        if (e.ctrlKey && e.altKey && e.key.toLowerCase() === 'd') {
            e.preventDefault();
            toggleAdminMode();
        }
    });
}

function toggleAdminMode() {
    isAdminMode = !isAdminMode;
    
    const adminIndicator = document.getElementById('adminIndicator');
    const deleteButtons = document.querySelectorAll('.delete-btn');
    
    if (isAdminMode) {
        // Activar modo administrador
        if (adminIndicator) adminIndicator.style.display = 'flex';
        deleteButtons.forEach(btn => btn.classList.add('visible'));
        showNotification('Modo Administrador Activado', 'success');
    } else {
        // Desactivar modo administrador
        if (adminIndicator) adminIndicator.style.display = 'none';
        deleteButtons.forEach(btn => btn.classList.remove('visible'));
        showNotification('Modo Usuario Normal', 'info');
    }
}

function deactivateAdminMode() {
    isAdminMode = false;
    const adminIndicator = document.getElementById('adminIndicator');
    const deleteButtons = document.querySelectorAll('.delete-btn');
    
    if (adminIndicator) adminIndicator.style.display = 'none';
    deleteButtons.forEach(btn => btn.classList.remove('visible'));
    showNotification('ðŸ‘¤ Modo Administrador Desactivado', 'info');
}

// ==================== NOTIFICATIONS ====================
function showNotification(message, type = 'success') {
    const notification = document.getElementById('successNotification');
    const messageEl = document.getElementById('successMessage');
    
    if (!notification || !messageEl) return;
    
    messageEl.textContent = message;
    notification.className = `notification ${type} show`;
    
    // Auto-hide despuÃ©s de 5 segundos
    setTimeout(() => {
        hideNotification();
    }, 5000);
}

function hideNotification(type = 'success') {
    const notification = document.getElementById('successNotification');
    if (notification) {
        notification.classList.remove('show');
    }
}

// ==================== SCROLL ANIMATIONS ====================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observer elementos para animaciÃ³n
    const animatedElements = document.querySelectorAll('.service-card, .program-card, .feature-item, .review-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// ==================== SMOOTH SCROLLING ====================
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// ==================== UTILITY FUNCTIONS ====================
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

// ==================== PREINSCRPCIONES LEGACY ====================
function showPreinscripciones() {
    // Detectar si es móvil o desktop
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        const response = confirm('¡Excelente decisión! \n\n ¿Qué modalidad te interesa?\n\n… Presiona "Aceptar" para Plan Diario (Mujeres)\n Presiona "Cancelar" para Plan Domingo (Hombres)');
        
        if (response) {
            window.open('https://wa.me/50255709214?text=Hola,%20estoy%20interesada%20en%20el%20Plan%20Diario%20de%20EducaciÃ³n%20Acelerada.%20Â¿PodrÃ­an%20darme%20mÃ¡s%20informaciÃ³n?', '_blank');
        } else {
            window.open('https://wa.me/50244160597?text=Hola,%20estoy%20interesado%20en%20el%20Plan%20Domingo%20de%20EducaciÃ³n%20Acelerada.%20Â¿PodrÃ­an%20darme%20mÃ¡s%20informaciÃ³n?', '_blank');
        }
    } else {
        // En desktop, abrir modal directamente
        showInscripcionesModal();
    }
}


// ==================== PERFORMANCE MONITORING ====================
window.addEventListener('load', function() {
    // Log de rendimiento bÃ¡sico
    if (performance && performance.now) {
        console.log('Página cargada en:', Math.round(performance.now()), 'ms');
    }
});

// ==================== CLEANUP ====================
window.addEventListener('beforeunload', function() {
    // Cleanup si es necesario
    document.body.style.overflow = 'auto';
});

console.log('Script CREAMOS v2.0 cargado exitosamente - Todas las funcionalidades activas');

