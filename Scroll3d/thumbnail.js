// This script generates a thumbnail of the animation
// To use: Open the animation in a browser, then run this in the console
// It will open a new window with the image that you can save

// Wait for the page to be fully loaded with animations
setTimeout(() => {
    // Scroll to a point where cards are visible
    window.scrollTo({
        top: window.innerHeight * 0.8,
        behavior: 'auto'
    });
    
    // Wait for scroll to complete
    setTimeout(() => {
        // Create a screenshot
        html2canvas(document.querySelector('.sticky')).then(canvas => {
            // Convert to image data
            const imageData = canvas.toDataURL('image/png');
            
            // Open in new window to save
            const newWindow = window.open();
            newWindow.document.write(`<img src="${imageData}" alt="Thumbnail">`);
            newWindow.document.title = "Scroll3D Animation Thumbnail";
            
            console.log("Thumbnail created! Save the image from the new window.");
        });
    }, 1000);
}, 1000);

// Note: This requires html2canvas library
// Add this to your HTML before using: <script src="https://html2canvas.hertzen.com/dist/html2canvas.min.js"></script> 