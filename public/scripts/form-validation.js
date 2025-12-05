// Form validation script for Celestra TestFlight signup
// Progressive enhancement - form works with HTML5 validation if JS disabled

document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('form[name="testflight-signup"]');

  if (!form) return;

  const emailInput = form.querySelector('#email');
  const submitButton = form.querySelector('button[type="submit"]');
  const originalButtonText = submitButton ? submitButton.textContent : '';

  // Email validation on blur
  if (emailInput) {
    emailInput.addEventListener('blur', validateEmail);
    emailInput.addEventListener('input', function(e) {
      clearError(e.target);
    });
  }

  // Form submission handling
  form.addEventListener('submit', handleSubmit);

  function validateEmail(e) {
    const email = e.target.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email && !emailRegex.test(email)) {
      showError(e.target, 'Please enter a valid email address');
      return false;
    } else {
      clearError(e.target);
      return true;
    }
  }

  function showError(input, message) {
    let errorEl = input.parentElement.querySelector('.error-message');
    if (!errorEl) {
      errorEl = document.createElement('span');
      errorEl.className = 'error-message';
      input.parentElement.appendChild(errorEl);
    }
    errorEl.textContent = message;
    input.classList.add('error');
  }

  function clearError(input) {
    const errorEl = input.parentElement.querySelector('.error-message');
    if (errorEl) {
      errorEl.remove();
    }
    input.classList.remove('error');
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // Validate email before submission
    if (emailInput && !validateEmail({ target: emailInput })) {
      return;
    }

    // Set loading state
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.innerHTML = '<span class="spinner"></span> Joining...';
    }

    const formData = new FormData(form);

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString(),
      });

      if (response.ok) {
        window.location.href = '/thank-you';
      } else {
        // Reset button on error
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = originalButtonText;
        }
        showError(emailInput, 'Something went wrong. Please try again.');
      }
    } catch (error) {
      // Reset button on error
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
      }
      showError(emailInput, 'Network error. Please check your connection and try again.');
    }
  }
});
