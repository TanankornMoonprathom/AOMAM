const imageFiles = [
    "picture/IMG_2575.jpg", 
    "picture/IMG_2434.JPG", 
    "picture/IMG_4179.jpg", 
    "picture/IMG_6147.JPG", 
    "picture/IMG_8113.JPG", 
    "picture/IMG_8150.JPG", 
];

function randomizeImage() {
    const mainPhotoElement = document.getElementById('main-photo');
    if (!mainPhotoElement || imageFiles.length === 0) return; 

    mainPhotoElement.classList.add('mosaic-effect');
    setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * imageFiles.length);
        const randomImage = imageFiles[randomIndex];
        mainPhotoElement.src = randomImage;
        setTimeout(() => {
            mainPhotoElement.classList.remove('mosaic-effect');
        }, 500);
    }, 1000);
}

document.addEventListener('DOMContentLoaded', () => {
    const keypadButtons = document.querySelectorAll('.keypad-btn');
    const passcodeDots = document.querySelectorAll('.passcode-dot');
    const errorMessage = document.getElementById('error-message');
    const correctPasscode = "260725"; // password
    let enteredPasscode = "";

    randomizeImage();
    setInterval(randomizeImage, 4000); 
    keypadButtons.forEach(button => {
        button.addEventListener('click', () => {
            const key = button.textContent;
            
            if (!isNaN(key) && enteredPasscode.length < 6) {
                enteredPasscode += key;
                updatePasscodeDisplay();

                if (enteredPasscode.length === 6) {
                    setTimeout(checkPasscode, 300);
                }
            } else if (key === 'ลบ') {
                enteredPasscode = enteredPasscode.slice(0, -1);
                updatePasscodeDisplay();
            }
        });
    });

    function updatePasscodeDisplay() {
        passcodeDots.forEach((dot, index) => {
            if (index < enteredPasscode.length) {
                dot.classList.add('filled');
            } else {
                dot.classList.remove('filled');
            }
        });
        errorMessage.classList.remove('show-error');
    }

    function checkPasscode() {
        if (enteredPasscode === correctPasscode) {
            window.location.href = "index2.html";
        } else {
            errorMessage.textContent = "Incorrect password, please try again";
            errorMessage.classList.add('show-error');
            enteredPasscode = "";
            setTimeout(updatePasscodeDisplay, 500);
        }
    }
});