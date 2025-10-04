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

    // 1. เพิ่มเอฟเฟกต์โมเสก (ตาม CSS transition 1 วินาที)
    mainPhotoElement.classList.add('mosaic-effect');

    // 2. หน่วงเวลา 1 วินาที เพื่อให้เอฟเฟกต์ปรากฏเต็มที่
    setTimeout(() => {
        // เลือกรูปภาพแบบสุ่ม
        const randomIndex = Math.floor(Math.random() * imageFiles.length);
        const randomImage = imageFiles[randomIndex];
        mainPhotoElement.src = randomImage;

        // 3. หน่วงเวลา 0.5 วินาที แล้วลบเอฟเฟกต์โมเสกออก (จางหายไป 1 วินาที)
        setTimeout(() => {
            mainPhotoElement.classList.remove('mosaic-effect');
        }, 500);
        
    }, 1000);
}

document.addEventListener('DOMContentLoaded', () => {
    const keypadButtons = document.querySelectorAll('.keypad-btn');
    const passcodeDots = document.querySelectorAll('.passcode-dot');
    const errorMessage = document.getElementById('error-message');
    
    // **รหัสผ่าน: "260725"**
    const correctPasscode = "260725"; 
    let enteredPasscode = "";

    // *** เริ่มต้นการสุ่มรูปภาพและตั้งเวลา ***
    randomizeImage();
    // สุ่มเปลี่ยนรูปภาพทุก 4 วินาที
    setInterval(randomizeImage, 4000); 
    // ************************************
    
    keypadButtons.forEach(button => {
        button.addEventListener('click', () => {
            const key = button.textContent;
            
            // ตรวจสอบว่าเป็นตัวเลขและยังกรอกไม่ครบ 6 หลัก
            if (!isNaN(key) && enteredPasscode.length < 6) {
                enteredPasscode += key;
                updatePasscodeDisplay();

                // ตรวจสอบรหัสทันทีเมื่อครบ 6 หลัก
                if (enteredPasscode.length === 6) {
                    setTimeout(checkPasscode, 300);
                }
            } else if (key === 'ลบ') {
                // ถ้ากดปุ่ม 'ลบ'
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
            // รหัสถูกต้อง
            window.location.href = "index2.html";
        } else {
            // รหัสผิด
            errorMessage.textContent = "Incorrect password, please try again";
            errorMessage.classList.add('show-error');
            enteredPasscode = "";
            setTimeout(updatePasscodeDisplay, 500);
        }
    }
});
