 // 1. Get references to the HTML elements
        const inputField = document.getElementById('qr-input');
        const qrCodeBox = document.getElementById('qr-code-box');


        // 2. Define the generator function
        function generateQR() {
            const data = inputField.value.trim();


            // Check if the input field is empty
            if (data === "") {
                alert("Please enter some text or a URL.");
                return;
            }

            // 3. Clear any previous QR code
            qrCodeBox.innerHTML = "";

            

            // 4. Use the QRCode library to generate the code
            // The library creates a new <div> or <img> element inside 'qrC odeBox'
            new QRCode(qrCodeBox, {
                text: data,
                width: 150,
                height: 150,
                colorDark: "#000000",
                colorLight: "#ffffff",
                correctLevel: QRCode.CorrectLevel.H
            });

            // Optional: Log the data to the console
            console.log("QR code generated for:", data);
        }

        // Optional: Add an event listener to trigger generation on 'Enter' key press
        inputField.addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
                generateQR();
            }
        });