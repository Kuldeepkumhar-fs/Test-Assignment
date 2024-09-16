document.getElementById('imageUploadForm').addEventListener('submit', async function (event) {
    event.preventDefault();  // Prevent the form from submitting in the traditional way
    
    const imageName = document.getElementById('imageName').value;
    const imageFile = document.getElementById('imageFile').files[0];

    if (!imageFile) {
        document.getElementById('responseMessage').innerText = 'Please select an image to upload.';
        return;
    }

    // Prepare the form data to send to the API Gateway
    const formData = new FormData();
    formData.append('imageName', imageName);
    formData.append('imageFile', imageFile);

    try {
        // Make a POST request to the API Gateway (replace API_GATEWAY_URL with the actual URL)
        const response = await fetch('YOUR_API_GATEWAY_URL', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            const data = await response.json();
            document.getElementById('responseMessage').innerText = `Image compressed successfully and stored in S3 bucket: ${data.s3BucketUrl}`;
        } else {
            document.getElementById('responseMessage').innerText = 'Error compressing or uploading the image.';
        }
    } catch (error) {
        document.getElementById('responseMessage').innerText = `Error: ${error.message}`;
    }
});
