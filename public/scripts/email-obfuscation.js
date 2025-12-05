// Email obfuscation script for Celestra website
// Decodes base64-encoded emails to prevent bot harvesting
// Progressive enhancement - works without JS (fallback mailto link)

document.addEventListener('DOMContentLoaded', function() {
  const obfuscatedLinks = document.querySelectorAll('.obfuscated-email');

  obfuscatedLinks.forEach(link => {
    const encoded = link.getAttribute('data-encoded');
    const subject = link.getAttribute('data-subject');

    if (encoded) {
      try {
        const decoded = atob(encoded);
        let mailtoUrl = `mailto:${decoded}`;

        if (subject) {
          mailtoUrl += `?subject=${encodeURIComponent(subject)}`;
        }

        link.setAttribute('href', mailtoUrl);
      } catch (e) {
        // Fallback to existing href if decoding fails
        console.error('Email decoding failed', e);
      }
    }
  });
});
