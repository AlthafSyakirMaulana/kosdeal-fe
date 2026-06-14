document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('show');
        });
    }

    const profile = getUserProfile();
    const allProducts = getProducts();
    const userProducts = allProducts.filter(p => p.contact === profile.phone);
    const totalTerjual = userProducts.reduce((sum, p) => sum + (p.terjual || 0), 0);

    document.getElementById('profileDisplayName').textContent = profile.name;
    document.getElementById('profileProductCount').textContent = userProducts.length;
    document.getElementById('profileTerjualCount').textContent = totalTerjual;

    const badgesEl = document.getElementById('profileBadges');
    badgesEl.innerHTML = getRoleBadge(profile.role) + ' ' + getVerificationBadge(profile.isVerified);

    const verifStatus = document.getElementById('profileVerificationStatus');
    if (profile.verificationStatus === 'pending') {
        verifStatus.innerHTML = '<span class="verif-pending"><i class="fas fa-clock"></i> Verifikasi sedang diproses</span>';
    } else if (profile.verificationStatus === 'rejected') {
        verifStatus.innerHTML = '<span class="verif-rejected"><i class="fas fa-times-circle"></i> Verifikasi ditolak. Ajukan ulang.</span>';
    } else {
        verifStatus.innerHTML = '';
    }

    document.getElementById('profileName').value = profile.name || '';
    document.getElementById('profilePhone').value = profile.phone || '';
    document.getElementById('profileBio').value = profile.bio || '';

    const roleRadios = document.querySelectorAll('input[name="role"]');
    roleRadios.forEach(r => {
        if (r.value === profile.role) r.checked = true;
    });

    const campusSelect = document.getElementById('profileCampus');
    campuses.forEach(c => {
        const opt = document.createElement('option');
        opt.value = c;
        opt.textContent = c;
        if (c === profile.campus) opt.selected = true;
        campusSelect.appendChild(opt);
    });

    const campusField = document.getElementById('campusField');
    const verificationSection = document.getElementById('verificationSection');

    function toggleCampusAndVerif() {
        const selected = document.querySelector('input[name="role"]:checked');
        if (selected && selected.value === 'mahasiswa') {
            campusField.style.display = 'block';
            if (!profile.isVerified) {
                verificationSection.style.display = 'block';
            } else {
                verificationSection.style.display = 'none';
            }
        } else {
            campusField.style.display = 'none';
            verificationSection.style.display = 'none';
        }
    }

    roleRadios.forEach(r => r.addEventListener('change', toggleCampusAndVerif));
    toggleCampusAndVerif();

    let currentVerifImage = profile.verificationImage || '';
    let scanStream = null;

    const verifUpload = document.getElementById('verifUpload');
    const verifInput = document.getElementById('verifImage');
    const verifPreview = document.getElementById('verifPreview');
    const verifPreviewImg = document.getElementById('verifPreviewImg');
    const removeVerifBtn = document.getElementById('removeVerifImage');

    const scanArea = document.getElementById('scanArea');
    const scanVideo = document.getElementById('scanVideo');
    const scanCanvas = document.getElementById('scanCanvas');
    const scanPreview = document.getElementById('scanPreview');
    const scanPreviewImg = document.getElementById('scanPreviewImg');
    const captureBtn = document.getElementById('captureScan');
    const removeScanBtn = document.getElementById('removeScan');

    const verifUploadMethod = document.getElementById('verifUploadMethod');
    const verifScanMethod = document.getElementById('verifScanMethod');
    const methodBtns = document.querySelectorAll('.verif-method-btn');

    function stopScanStream() {
        if (scanStream) {
            scanStream.getTracks().forEach(t => t.stop());
            scanStream = null;
        }
    }

    function switchMethod(method) {
        methodBtns.forEach(b => b.classList.remove('active'));
        document.querySelector(`.verif-method-btn[data-method="${method}"]`).classList.add('active');

        if (method === 'upload') {
            stopScanStream();
            verifUploadMethod.style.display = 'block';
            verifScanMethod.style.display = 'none';
            scanVideo.style.display = 'none';
        } else {
            verifUploadMethod.style.display = 'none';
            verifScanMethod.style.display = 'block';
            startCamera();
        }
    }

    methodBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            switchMethod(this.dataset.method);
        });
    });

    async function startCamera() {
        try {
            stopScanStream();
            scanStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
            scanVideo.srcObject = scanStream;
            scanVideo.style.display = 'block';
            scanVideo.play();
        } catch (err) {
            alert('Tidak bisa mengakses kamera. Gunakan metode Upload KTM.');
            switchMethod('upload');
        }
    }

    captureBtn.addEventListener('click', function() {
        const context = scanCanvas.getContext('2d');
        scanCanvas.width = scanVideo.videoWidth;
        scanCanvas.height = scanVideo.videoHeight;
        context.drawImage(scanVideo, 0, 0);
        const dataUrl = scanCanvas.toDataURL('image/jpeg');
        scanPreviewImg.src = dataUrl;
        scanPreview.style.display = 'block';
        scanArea.style.display = 'none';
        currentVerifImage = dataUrl;
        stopScanStream();
    });

    removeScanBtn.addEventListener('click', function() {
        scanPreview.style.display = 'none';
        scanArea.style.display = 'block';
        currentVerifImage = '';
        startCamera();
    });

    if (profile.verificationImage) {
        verifPreviewImg.src = profile.verificationImage;
        verifUpload.style.display = 'none';
        verifPreview.style.display = 'block';
    }

    verifUpload.addEventListener('click', function() { verifInput.click(); });

    verifInput.addEventListener('change', function() {
        if (this.files && this.files[0]) {
            const file = this.files[0];
            if (file.size > 5 * 1024 * 1024) { alert('Ukuran foto maksimal 5MB!'); return; }
            const reader = new FileReader();
            reader.onload = function(e) {
                verifPreviewImg.src = e.target.result;
                currentVerifImage = e.target.result;
                verifUpload.style.display = 'none';
                verifPreview.style.display = 'block';
            };
            reader.readAsDataURL(file);
        }
    });

    removeVerifBtn.addEventListener('click', function() {
        verifPreviewImg.src = '';
        verifInput.value = '';
        currentVerifImage = '';
        verifUpload.style.display = 'flex';
        verifPreview.style.display = 'none';
    });

    document.getElementById('submitVerification').addEventListener('click', function() {
        if (!currentVerifImage) {
            alert('Upload atau scan KTM terlebih dahulu!');
            return;
        }
        const updated = getUserProfile();
        updated.verificationImage = currentVerifImage;
        updated.verificationStatus = 'pending';
        saveUserProfile(updated);
        stopScanStream();
        alert('Verifikasi berhasil diajukan! Admin akan memproses dalam 1x24 jam.');
        location.reload();
    });

    const verifInfo = document.getElementById('verifInfo');
    if (profile.verificationStatus === 'pending') {
        verifInfo.textContent = 'Verifikasi sedang diproses. Harap tunggu konfirmasi admin.';
        verifInfo.className = 'verif-info verif-pending-text';
        document.getElementById('submitVerification').disabled = true;
    } else if (profile.verificationStatus === 'rejected') {
        verifInfo.textContent = 'Verifikasi sebelumnya ditolak. Silakan upload/scan KTM yang jelas.';
        verifInfo.className = 'verif-info verif-rejected-text';
    }

    document.getElementById('profileForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const selectedRole = document.querySelector('input[name="role"]:checked');
        const updated = getUserProfile();
        updated.name = document.getElementById('profileName').value;
        updated.role = selectedRole ? selectedRole.value : '';
        updated.campus = selectedRole && selectedRole.value === 'mahasiswa' ? document.getElementById('profileCampus').value : '';
        updated.phone = document.getElementById('profilePhone').value;
        updated.bio = document.getElementById('profileBio').value;
        saveUserProfile(updated);
        alert('Profil berhasil disimpan!');
        location.reload();
    });
});
