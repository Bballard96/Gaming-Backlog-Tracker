<script src='/scripts/ipload.js'></script>

// Wait for the DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
  const fileInput = document.querySelector('input[name="gameImage"]');
  
  fileInput.addEventListener('change', async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = async (e) => {
      const imageData = e.target.result; // Base64-encoded image data

      // Send imageData to your server using AJAX or Fetch API
      const response = await fetch('/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageData }),
      });

      const result = await response.json();
      console.log(result);
    };

    reader.readAsDataURL(file);
  });
});
