/* ==========================================================================
   DRAKEN FC - INTERACTIVE CONTROLS (NATURAL & PROFESSIONAL)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initModals();
    initCopyAndShare();
});

/* --------------------------------------------------------------------------
   1. MODAL MANAGEMENT
   -------------------------------------------------------------------------- */
function initModals() {
    // Tournament Modal
    const tournamentModal = document.getElementById('tournament-modal');
    const openTournamentBtn = document.getElementById('open-tournament-modal');
    const closeTournamentBtn = document.getElementById('close-tournament-modal');

    if (openTournamentBtn && tournamentModal) {
        openTournamentBtn.addEventListener('click', () => {
            tournamentModal.classList.add('active');
        });
    }

    if (closeTournamentBtn && tournamentModal) {
        closeTournamentBtn.addEventListener('click', () => {
            tournamentModal.classList.remove('active');
        });
    }

    // Collaboration Modal
    const collabModal = document.getElementById('collab-modal');
    const openCollabBtn = document.getElementById('open-collab-modal');
    const closeCollabBtn = document.getElementById('close-collab-modal');
    const collabForm = document.getElementById('collab-form');

    if (openCollabBtn && collabModal) {
        openCollabBtn.addEventListener('click', () => {
            collabModal.classList.add('active');
        });
    }

    if (closeCollabBtn && collabModal) {
        closeCollabBtn.addEventListener('click', () => {
            collabModal.classList.remove('active');
        });
    }

    // Close on backdrop click
    document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
        backdrop.addEventListener('click', (e) => {
            if (e.target === backdrop) {
                backdrop.classList.remove('active');
            }
        });
    });

    // Form submission simulation
    if (collabForm) {
        collabForm.addEventListener('submit', (e) => {
            e.preventDefault();
            collabModal.classList.remove('active');
            showToast('¡Propuesta enviada! Te responderemos a la brevedad.');
            collabForm.reset();
        });
    }
}

/* --------------------------------------------------------------------------
   2. COPY & SHARE LOGIC
   -------------------------------------------------------------------------- */
function initCopyAndShare() {
    // Copy Email
    const copyEmailBtn = document.getElementById('copy-email-btn');
    const contactEmail = document.getElementById('contact-email');

    if (copyEmailBtn && contactEmail) {
        copyEmailBtn.addEventListener('click', () => {
            const emailText = contactEmail.textContent.trim();
            navigator.clipboard.writeText(emailText).then(() => {
                showToast('Correo copiado: ' + emailText);
            }).catch(() => {
                showToast('Correo: ' + emailText);
            });
        });
    }

    // Share Button
    const shareBtn = document.getElementById('share-btn');
    if (shareBtn) {
        shareBtn.addEventListener('click', () => {
            if (navigator.share) {
                navigator.share({
                    title: 'DRAKEN FC - Creador Oficial FC Mobile',
                    text: 'Página oficial de enlaces de DRAKEN FC',
                    url: window.location.href,
                }).catch(() => {});
            } else {
                navigator.clipboard.writeText(window.location.href).then(() => {
                    showToast('¡Enlace de la página copiado!');
                });
            }
        });
    }
}

/* Toast Helper */
function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
    
    if (!toast || !toastMessage) return;

    toastMessage.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}
