/**
 * Rentalku - Application State & Logic
 * Framework: Bootstrap 5.3.3
 */
import './style.css';

// ==================== INTERFACES ====================
interface Car {
  id?: string;
  name: string;
  brand: 'Toyota' | 'Honda' | 'Mitsubishi' | 'Daihatsu' | 'Hyundai';
  transmission: 'Automatic' | 'Manual';
  plate: string;
  price: number;
  capacity: number;
  luggage: number;
  status: 'Tersedia' | 'Disewa';
  image: string;
}

interface Order {
  id: string;
  tenantName: string;
  carName: string;
  plate: string;
  startDate: string;
  endDate: string;
  duration: number;
  total: number;
  ktpUploaded: boolean;
  simUploaded: boolean;
  status: 'Menunggu Pembayaran' | 'Menunggu Konfirmasi' | 'Disetujui' | 'Ditolak' | 'Selesai' | 'Disewa' | 'Konfirmasi';
  paymentMethod: string;
  timestamp: string;
  dateRangeStr?: string;
  location?: string;
  startTime?: string;
  endTime?: string;
}

interface AppUser {
  name: string;
  email: string;
  password?: string;
  role: 'tenant' | 'admin';
  phone?: string;
}

// ==================== HELPER FUNCTIONS ====================
function getTodayDateString(): string {
  const today = new Date();
  return String(today.getDate()).padStart(2, '0') + '-' +
    String(today.getMonth() + 1).padStart(2, '0') + '-' +
    today.getFullYear();
}

function getTomorrowDateString(): string {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return String(tomorrow.getDate()).padStart(2, '0') + '-' +
    String(tomorrow.getMonth() + 1).padStart(2, '0') + '-' +
    tomorrow.getFullYear();
}

function formatRupiah(amount: number): string {
  const formatted = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(amount);
  return formatted.replace(/\s+/g, '');
}

// ==================== DATA DEFAULT ====================
let cars: Car[] = [
  {
    id: 'car-1',
    name: 'Toyota Yaris',
    brand: 'Toyota',
    transmission: 'Automatic',
    plate: 'AB 0902 AC',
    price: 300000,
    capacity: 7,
    luggage: 2,
    status: 'Tersedia',
    image: 'src/assets/images/yaris.png'
  },
  {
    id: 'car-2',
    name: 'Honda Brio',
    brand: 'Honda',
    transmission: 'Automatic',
    plate: 'AB 2502 DE',
    price: 350000,
    capacity: 5,
    luggage: 2,
    status: 'Tersedia',
    image: 'src/assets/images/brio.png'
  },
  {
    id: 'car-3',
    name: 'Toyota Avanza',
    brand: 'Toyota',
    transmission: 'Automatic',
    plate: 'AB 3017 GI',
    price: 350000,
    capacity: 7,
    luggage: 2,
    status: 'Tersedia',
    image: 'src/assets/images/avanza.png'
  },
  {
    id: 'car-4',
    name: 'Toyota Innova',
    brand: 'Toyota',
    transmission: 'Automatic',
    plate: 'AB 3107 HI',
    price: 400000,
    capacity: 7,
    luggage: 2,
    status: 'Tersedia',
    image: 'src/assets/images/innova.png'
  },
  {
    id: 'car-5',
    name: 'Mitsubishi Xpander',
    brand: 'Mitsubishi',
    transmission: 'Automatic',
    plate: 'AB 2910 JK',
    price: 450000,
    capacity: 7,
    luggage: 2,
    status: 'Tersedia',
    image: 'src/assets/images/xpender.png'
  },
  {
    id: 'car-6',
    name: 'Toyota Fortuner',
    brand: 'Toyota',
    transmission: 'Automatic',
    plate: 'AB 0607 NK',
    price: 500000,
    capacity: 7,
    luggage: 2,
    status: 'Tersedia',
    image: 'src/assets/images/fortuner.png'
  }
];

let orders: Order[] = [
  {
    id: 'INV-902345-01',
    tenantName: 'Rifqy Affandi',
    carName: 'Toyota Innova',
    plate: 'AB 3107 HI',
    startDate: '02 Juli 2026',
    endDate: '04 Juli 2026',
    duration: 3,
    total: 1200000,
    ktpUploaded: true,
    simUploaded: true,
    status: 'Selesai',
    paymentMethod: 'BCA Virtual Account',
    timestamp: '03/08/2026',
    dateRangeStr: '02-04 Juli 2026',
    location: 'Yogyakarta',
    startTime: '12:00',
    endTime: '10:00'
  },
  {
    id: 'INV-902345-02',
    tenantName: 'Tiffany Abel',
    carName: 'Mitsubishi Xpander',
    plate: 'AB 2910 JK',
    startDate: '04 Juli 2026',
    endDate: '05 Juli 2026',
    duration: 2,
    total: 900000,
    ktpUploaded: true,
    simUploaded: true,
    status: 'Selesai',
    paymentMethod: 'Mandiri Virtual Account',
    timestamp: '17/08/2026',
    dateRangeStr: '04-05 Juli 2026',
    location: 'Jakarta',
    startTime: '12:00',
    endTime: '10:00'
  },
  {
    id: 'INV-902345-03',
    tenantName: 'Syera Anjani',
    carName: 'Toyota Fortuner',
    plate: 'AB 0607 NK',
    startDate: '06 Juli 2026',
    endDate: '08 Juli 2026',
    duration: 3,
    total: 1500000,
    ktpUploaded: true,
    simUploaded: true,
    status: 'Selesai',
    paymentMethod: 'GoPay',
    timestamp: '10/09/2026',
    dateRangeStr: '06-08 Juli 2026',
    location: 'Yogyakarta',
    startTime: '12:00',
    endTime: '10:00'
  },
  {
    id: 'INV-902345-04',
    tenantName: 'Zaura Allysa',
    carName: 'Honda Brio',
    plate: 'AB 2502 DE',
    startDate: '09 Juli 2026',
    endDate: '10 Juli 2026',
    duration: 2,
    total: 700000,
    ktpUploaded: true,
    simUploaded: true,
    status: 'Konfirmasi',
    paymentMethod: 'OVO',
    timestamp: '30/09/2026',
    dateRangeStr: '09-10 Juli 2026',
    location: 'Bandung',
    startTime: '12:00',
    endTime: '10:00'
  }
];

// ==================== STATE ====================
let currentUser: 'guest' | 'tenant' | 'admin' = 'guest';
let selectedCarIndex: number | null = null;
let editingCarId: string | null = null;
let verifOrderId: string | null = null;

let settings = {
  rentalName: 'RentalKu',
  rentalPhone: '+62 812-3456-7890',
  rentalAddress: 'Jl. Malioboro No. 45, Gedongtengen, Kota Yogyakarta, Daerah Istimewa Yogyakarta 55271',
  rentalEmail: 'support@rentalku.com',
  timezone: 'WIB'
};

// ==================== TEMPORARY STATES ====================
let tempKtpUploaded = false;
let tempSimUploaded = false;
let tempSelectedPaymentMethod = 'BCA';
let tempCarPhotoUrl = '';
let countdownInterval: any = null;

// Calendar states
let selectedStartDate = '';
let selectedEndDate = '';
let calendarYear = 2026;
let calendarMonth = 9;

// Finance Calendar State
let financeCalendarYear = new Date().getFullYear();
let financeCalendarMonth = new Date().getMonth();
let financeSelectedStartDate: string | null = null;
let financeSelectedEndDate: string | null = null;

// ==================== APPLY SETTINGS ====================
function applySettingsToDOM() {
  const loginTitle = document.getElementById('login-app-title');
  if (loginTitle) loginTitle.textContent = settings.rentalName;

  const nameInput = document.getElementById('settings-rental-name') as HTMLInputElement;
  if (nameInput) nameInput.value = settings.rentalName;

  const phoneInput = document.getElementById('settings-rental-phone') as HTMLInputElement;
  if (phoneInput) phoneInput.value = settings.rentalPhone;

  const addrInput = document.getElementById('settings-rental-address') as HTMLTextAreaElement;
  if (addrInput) addrInput.value = settings.rentalAddress;

  const emailInput = document.getElementById('settings-rental-email') as HTMLInputElement;
  if (emailInput) emailInput.value = settings.rentalEmail;

  const tzInput = document.getElementById('settings-rental-timezone') as HTMLSelectElement;
  if (tzInput) tzInput.value = settings.timezone;
}

// ==================== VIEW TOGGLE FUNCTIONS ====================
function showSection(sectionId: 'login-section' | 'tenant-section' | 'admin-section') {
  document.getElementById('login-section')?.classList.add('d-none');
  document.getElementById('tenant-section')?.classList.add('d-none');
  document.getElementById('admin-section')?.classList.add('d-none');
  document.getElementById(sectionId)?.classList.remove('d-none');
}

function showTenantSubView(viewId: 'catalog' | 'detail' | 'history') {
  document.getElementById('tenant-catalog-view')?.classList.add('d-none');
  document.getElementById('tenant-detail-view')?.classList.add('d-none');
  document.getElementById('tenant-history-view')?.classList.add('d-none');

  const navHome = document.getElementById('tenant-nav-home');
  const navCatalog = document.getElementById('tenant-nav-catalog');
  const navHistory = document.getElementById('tenant-nav-history');

  // Reset semua nav link - pakai setAttribute untuk memastikan
  if (navHome) {
    navHome.className = 'nav-link text-muted fw-medium';
    navHome.style.color = '#64748B';
    navHome.style.fontWeight = '500';
    navHome.classList.remove('active', 'text-primary', 'fw-semibold');
  }
  if (navCatalog) {
    navCatalog.className = 'nav-link text-muted fw-medium';
    navCatalog.style.color = '#64748B';
    navCatalog.style.fontWeight = '500';
    navCatalog.classList.remove('active', 'text-primary', 'fw-semibold');
  }
  if (navHistory) {
    navHistory.className = 'nav-link text-muted fw-medium';
    navHistory.style.color = '#64748B';
    navHistory.style.fontWeight = '500';
    navHistory.classList.remove('active', 'text-primary', 'fw-semibold');
  }

  if (viewId === 'catalog') {
    document.getElementById('tenant-catalog-view')?.classList.remove('d-none');
    if (navCatalog) {
      navCatalog.className = 'nav-link text-primary fw-semibold active';
      navCatalog.style.color = '#0084FF';
      navCatalog.style.fontWeight = '600';
      navCatalog.classList.add('active', 'text-primary', 'fw-semibold');
    }
    renderTenantCatalog();
  } else if (viewId === 'detail') {
    document.getElementById('tenant-detail-view')?.classList.remove('d-none');
    if (navCatalog) {
      navCatalog.className = 'nav-link text-primary fw-semibold active';
      navCatalog.style.color = '#0084FF';
      navCatalog.style.fontWeight = '600';
      navCatalog.classList.add('active', 'text-primary', 'fw-semibold');
    }
    renderCarDetail();
  } else if (viewId === 'history') {
    document.getElementById('tenant-history-view')?.classList.remove('d-none');
    if (navHistory) {
      navHistory.className = 'nav-link text-primary fw-semibold active';
      navHistory.style.color = '#0084FF';
      navHistory.style.fontWeight = '600';
      navHistory.classList.add('active', 'text-primary', 'fw-semibold');
    }
    renderTenantHistory();
  }
}

function showAdminSubView(viewId: 'dashboard' | 'cars' | 'orders' | 'finance' | 'settings') {
  document.getElementById('admin-dashboard-view')?.classList.add('d-none');
  document.getElementById('admin-cars-view')?.classList.add('d-none');
  document.getElementById('admin-orders-view')?.classList.add('d-none');
  document.getElementById('admin-finance-view')?.classList.add('d-none');
  document.getElementById('admin-settings-view')?.classList.add('d-none');

  const links = document.querySelectorAll('#admin-nav-links .nav-link');
  links.forEach(link => link.classList.remove('active'));

  if (viewId === 'dashboard') {
    document.getElementById('admin-dashboard-view')?.classList.remove('d-none');
    document.getElementById('admin-nav-dashboard')?.classList.add('active');
    updateAdminDashboardStats();
  } else if (viewId === 'cars') {
    document.getElementById('admin-cars-view')?.classList.remove('d-none');
    document.getElementById('admin-nav-cars')?.classList.add('active');
    renderAdminCarsTable();
  } else if (viewId === 'orders') {
    document.getElementById('admin-orders-view')?.classList.remove('d-none');
    document.getElementById('admin-nav-orders')?.classList.add('active');
    renderAdminOrdersTable();
  } else if (viewId === 'finance') {
    document.getElementById('admin-finance-view')?.classList.remove('d-none');
    document.getElementById('admin-nav-finance')?.classList.add('active');
    renderAdminFinance();
  } else if (viewId === 'settings') {
    document.getElementById('admin-settings-view')?.classList.remove('d-none');
    document.getElementById('admin-nav-settings')?.classList.add('active');
  }
}

// ==================== USER STORAGE SYSTEM ====================
const DEFAULT_USERS: AppUser[] = [
  { name: 'Ana Wijaya', email: 'ana@rentalku.com', password: 'password123', role: 'tenant', phone: '08123456781' },
  { name: 'Owner RentalKu', email: 'admin@rentalku.com', password: 'password123', role: 'admin', phone: '08123456782' },
  { name: 'Budi Santoso', email: 'budi@email.com', password: 'password123', role: 'tenant', phone: '08123456789' }
];

function getUsers(): AppUser[] {
  const stored = localStorage.getItem('rentalku_users');
  if (!stored) {
    localStorage.setItem('rentalku_users', JSON.stringify(DEFAULT_USERS));
    return DEFAULT_USERS;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    return DEFAULT_USERS;
  }
}

function saveUser(user: AppUser) {
  const users = getUsers();
  if (users.some(u => u.email.toLowerCase() === user.email.toLowerCase())) {
    return false;
  }
  users.push(user);
  localStorage.setItem('rentalku_users', JSON.stringify(users));
  return true;
}

// ==================== 1. LOGIN CONTROLLER ====================
function initLoginHandlers() {
  const tabLogin = document.getElementById('tab-login') as HTMLButtonElement;
  const tabRegister = document.getElementById('tab-register') as HTMLButtonElement;
  const loginForm = document.getElementById('login-form-container');
  const registerForm = document.getElementById('register-form-container');
  const linkToRegister = document.getElementById('link-to-register');
  const linkToLogin = document.getElementById('link-to-login');
  const registerRoleTenant = document.getElementById('register-role-tenant') as HTMLButtonElement;
  const registerRoleAdmin = document.getElementById('register-role-admin') as HTMLButtonElement;
  const btnLoginSubmit = document.getElementById('btn-login-submit') as HTMLButtonElement;
  const btnRegisterSubmit = document.getElementById('btn-register-submit') as HTMLButtonElement;

  let selectedRegisterRole: 'tenant' | 'admin' = 'tenant';

  function setRegisterRole(role: 'tenant' | 'admin') {
    selectedRegisterRole = role;
    if (role === 'tenant') {
      registerRoleTenant.className = "btn w-50 py-2 d-flex align-items-center justify-content-center gap-2 border fw-semibold text-primary border-primary";
      registerRoleTenant.style.backgroundColor = "rgba(13, 110, 253, 0.05)";
      registerRoleAdmin.className = "btn w-50 py-2 d-flex align-items-center justify-content-center gap-2 border fw-semibold text-muted";
      registerRoleAdmin.style.backgroundColor = "transparent";
      registerRoleAdmin.style.borderColor = "#dee2e6";
    } else {
      registerRoleAdmin.className = "btn w-50 py-2 d-flex align-items-center justify-content-center gap-2 border fw-semibold text-dark border-dark";
      registerRoleAdmin.style.backgroundColor = "rgba(33, 37, 41, 0.05)";
      registerRoleTenant.className = "btn w-50 py-2 d-flex align-items-center justify-content-center gap-2 border fw-semibold text-muted";
      registerRoleTenant.style.backgroundColor = "transparent";
      registerRoleTenant.style.borderColor = "#dee2e6";
    }
  }

  function showTab(view: 'login' | 'register') {
    if (view === 'login') {
      tabLogin.className = "btn w-50 py-2 fw-bold rounded-2 bg-white text-primary shadow-sm border-0";
      tabRegister.className = "btn w-50 py-2 fw-semibold rounded-2 text-muted border-0 bg-transparent";
      loginForm?.classList.remove('d-none');
      registerForm?.classList.add('d-none');
    } else {
      tabRegister.className = "btn w-50 py-2 fw-bold rounded-2 bg-white text-primary shadow-sm border-0";
      tabLogin.className = "btn w-50 py-2 fw-semibold rounded-2 text-muted border-0 bg-transparent";
      registerForm?.classList.remove('d-none');
      loginForm?.classList.add('d-none');
    }
  }

  registerRoleTenant?.addEventListener('click', () => setRegisterRole('tenant'));
  registerRoleAdmin?.addEventListener('click', () => setRegisterRole('admin'));
  tabLogin?.addEventListener('click', () => showTab('login'));
  tabRegister?.addEventListener('click', () => showTab('register'));
  linkToRegister?.addEventListener('click', (e) => { e.preventDefault(); showTab('register'); });
  linkToLogin?.addEventListener('click', (e) => { e.preventDefault(); showTab('login'); });

  const quickFillTenant = document.getElementById('quick-fill-tenant');
  const quickFillAdmin = document.getElementById('quick-fill-admin');

  const showLoginError = (msg: string) => {
    const alertEl = document.getElementById('login-alert-error');
    if (alertEl) {
      alertEl.textContent = msg;
      alertEl.classList.remove('d-none');
    }
  };

  const hideLoginError = () => {
    const alertEl = document.getElementById('login-alert-error');
    if (alertEl) {
      alertEl.classList.add('d-none');
      alertEl.textContent = '';
    }
  };

  quickFillTenant?.addEventListener('click', () => {
    hideLoginError();
    const emailEl = document.getElementById('login-email') as HTMLInputElement;
    const passEl = document.getElementById('login-password') as HTMLInputElement;
    if (emailEl) emailEl.value = 'ana@rentalku.com';
    if (passEl) passEl.value = 'password123';
  });

  quickFillAdmin?.addEventListener('click', () => {
    hideLoginError();
    const emailEl = document.getElementById('login-email') as HTMLInputElement;
    const passEl = document.getElementById('login-password') as HTMLInputElement;
    if (emailEl) emailEl.value = 'admin@rentalku.com';
    if (passEl) passEl.value = 'password123';
  });

  const handleLoginSubmit = () => {
    hideLoginError();
    const emailInput = (document.getElementById('login-email') as HTMLInputElement)?.value.trim() || '';
    const passwordInput = (document.getElementById('login-password') as HTMLInputElement)?.value.trim() || '';

    if (!emailInput || !passwordInput) {
      showLoginError('Silakan masukkan email dan kata sandi Anda.');
      return;
    }

    const users = getUsers();
    let matchedUser = users.find(u => u.email.toLowerCase() === emailInput.toLowerCase());

    if (!matchedUser) {
      const isAdmin = emailInput.toLowerCase().includes('admin') || emailInput.toLowerCase().includes('owner');
      matchedUser = {
        name: isAdmin ? 'Owner RentalKu' : 'Pengguna RentalKu',
        email: emailInput,
        password: passwordInput,
        role: isAdmin ? 'admin' : 'tenant'
      };
      saveUser(matchedUser);
    }

    if (matchedUser.role === 'tenant') {
      currentUser = 'tenant';
      const profNameEl = document.getElementById('tenant-profile-name');
      if (profNameEl) profNameEl.textContent = matchedUser.name;
      showSection('tenant-section');
      showTenantSubView('catalog');
    } else {
      currentUser = 'admin';
      showSection('admin-section');
      showAdminSubView('cars');
    }
  };

  btnLoginSubmit?.addEventListener('click', handleLoginSubmit);

  document.getElementById('login-email')?.addEventListener('keydown', (e) => {
    if ((e as KeyboardEvent).key === 'Enter') handleLoginSubmit();
  });
  document.getElementById('login-password')?.addEventListener('keydown', (e) => {
    if ((e as KeyboardEvent).key === 'Enter') handleLoginSubmit();
  });

  btnRegisterSubmit?.addEventListener('click', () => {
    const name = (document.getElementById('register-name') as HTMLInputElement).value.trim();
    const email = (document.getElementById('register-email') as HTMLInputElement).value.trim();
    const phone = (document.getElementById('register-phone') as HTMLInputElement).value.trim();
    const password = (document.getElementById('register-password') as HTMLInputElement).value.trim();

    if (!name || !email || !phone || !password) {
      alert('Silakan lengkapi semua data pendaftaran.');
      return;
    }

    if (password.length < 6) {
      alert('Kata sandi harus minimal 6 karakter.');
      return;
    }

    const newUser: AppUser = { name, email, phone, password, role: selectedRegisterRole };
    const isSaved = saveUser(newUser);
    if (!isSaved) {
      alert('Email sudah terdaftar. Silakan gunakan email lain atau silakan masuk.');
      return;
    }

    alert(`Pendaftaran Berhasil sebagai ${selectedRegisterRole === 'tenant' ? 'Penyewa' : 'Admin/Pemilik'}! Anda akan otomatis masuk.`);

    if (selectedRegisterRole === 'tenant') {
      currentUser = 'tenant';
      const profNameEl = document.getElementById('tenant-profile-name');
      if (profNameEl) profNameEl.textContent = name;
      showSection('tenant-section');
      showTenantSubView('catalog');
    } else {
      currentUser = 'admin';
      showSection('admin-section');
      showAdminSubView('cars');
    }
  });
}

// ==================== 2. TENANT CONTROLLER ====================
function initTenantHandlers() {
  // Navigation actions
  document.getElementById('tenant-nav-home')?.addEventListener('click', (e) => {
    e.preventDefault();
    showTenantSubView('catalog');
  });
  document.getElementById('tenant-nav-catalog')?.addEventListener('click', (e) => {
    e.preventDefault();
    showTenantSubView('catalog');
  });
  document.getElementById('tenant-nav-history')?.addEventListener('click', (e) => {
    e.preventDefault();
    showTenantSubView('history');
  });

  // Logout Tenant
  const logoutBtn = document.getElementById('tenant-btn-logout');
  if (logoutBtn) {
    logoutBtn.onclick = function (e) {
      e.preventDefault();
      console.log('🔴 Logout tenant');
      currentUser = 'guest';
      showSection('login-section');
    };
  }
  // Event listener untuk tombol reset filter
  const resetBtn = document.getElementById('btn-reset-filters');
  if (resetBtn) {
    resetBtn.addEventListener('click', function (e) {
      e.preventDefault();
      resetFilters();
    });
  }

  // Event listener untuk tombol apply filter (jika belum ada)
  const applyBtn = document.getElementById('btn-apply-filters');
  if (applyBtn) {
    applyBtn.addEventListener('click', function (e) {
      e.preventDefault();
      renderTenantCatalog();
      // showToast('✅ Filter diterapkan', 'success');
    });
  }

  // ========== NAVIGASI BREADCRUMB ==========
  // Event listener untuk breadcrumb di detail mobil
  document.addEventListener('click', function (e) {
    const target = e.target as HTMLElement;
    // Cek apakah klik pada breadcrumb "Katalog Mobil"
    if (target.id === 'breadcrumb-catalog-btn' || target.closest('#breadcrumb-catalog-btn')) {
      e.preventDefault();
      console.log('🔙 Kembali ke Katalog Mobil');
      showTenantSubView('catalog');
    }
  });
}

function resetFilters() {
  // Reset kapasitas
  const capAll = document.getElementById('cap-all') as HTMLInputElement;
  if (capAll) capAll.checked = true;
  const capCbs = document.querySelectorAll('.capacity-checkbox') as NodeListOf<HTMLInputElement>;
  capCbs.forEach(cb => {
    if (cb.id !== 'cap-all') cb.checked = false;
  });

  // Reset transmisi
  const transAll = document.getElementById('trans-all') as HTMLInputElement;
  if (transAll) transAll.checked = true;
  const transCbs = document.querySelectorAll('.transmission-checkbox') as NodeListOf<HTMLInputElement>;
  transCbs.forEach(cb => {
    if (cb.id !== 'trans-all') cb.checked = false;
  });

  // Reset brand
  const checkBoxes = document.querySelectorAll('.brand-checkbox') as NodeListOf<HTMLInputElement>;
  checkBoxes.forEach(box => {
    box.checked = false;
  });

  // Render ulang catalog
  renderTenantCatalog();

  // Tampilkan notifikasi
  // showToast('🔄 Semua filter telah direset', 'info');
}

function renderTenantCatalog() {
  const grid = document.getElementById('tenant-cars-grid');
  if (!grid) return;
  grid.innerHTML = '';

  const capacityCheckboxes = document.querySelectorAll('.capacity-checkbox') as NodeListOf<HTMLInputElement>;
  let selectedCapacities: string[] = [];
  capacityCheckboxes.forEach(cb => {
    if (cb.checked) selectedCapacities.push(cb.value);
  });
  const hasCapacityFilter = selectedCapacities.length > 0 && !selectedCapacities.includes('all');

  const transmissionCheckboxes = document.querySelectorAll('.transmission-checkbox') as NodeListOf<HTMLInputElement>;
  let selectedTransmissions: string[] = [];
  transmissionCheckboxes.forEach(cb => {
    if (cb.checked) selectedTransmissions.push(cb.value);
  });
  const hasTransFilter = selectedTransmissions.length > 0 && !selectedTransmissions.includes('all');

  const brandCheckboxes = document.querySelectorAll('.brand-checkbox') as NodeListOf<HTMLInputElement>;
  const activeBrands: string[] = [];
  brandCheckboxes.forEach(cb => {
    if (cb.checked) activeBrands.push(cb.value);
  });

  let filteredCars = cars.filter(car => {
    if (hasCapacityFilter) {
      let match = false;
      if (selectedCapacities.includes('4') && car.capacity === 4) match = true;
      if (selectedCapacities.includes('5-6') && (car.capacity >= 5 && car.capacity <= 6)) match = true;
      if (selectedCapacities.includes('7') && car.capacity >= 7) match = true;
      if (!match) return false;
    }
    if (hasTransFilter) {
      if (!selectedTransmissions.includes(car.transmission)) return false;
    }
    if (activeBrands.length > 0 && !activeBrands.includes(car.brand)) return false;
    return true;
  });

  const sortSelect = document.getElementById('sort-price') as HTMLSelectElement;
  const sortVal = sortSelect?.value || 'lowest';
  if (sortVal === 'lowest') {
    filteredCars.sort((a, b) => a.price - b.price);
  } else {
    filteredCars.sort((a, b) => b.price - a.price);
  }

  const emptyState = document.getElementById('catalog-empty-state');
  if (filteredCars.length === 0) {
    emptyState?.classList.remove('d-none');
    return;
  } else {
    emptyState?.classList.add('d-none');
  }

  filteredCars.forEach((car) => {
    const originalIndex = cars.findIndex(c => c.id === car.id);
    const cardCol = document.createElement('div');
    cardCol.className = 'col';
    cardCol.innerHTML = `
      <div class="car-card shadow-sm" id="tenant-car-card-${originalIndex}">
        <div class="car-card-img-wrapper">
          <img src="${car.image}" class="car-card-img" alt="${car.name}">
        </div>
        <div class="pt-3 px-1 flex-grow-1 d-flex flex-column justify-content-between">
          <div>
            <h5 class="fw-bold text-dark mb-1">${car.name}</h5>
            <div class="d-flex align-items-center gap-2 mb-3 text-muted small" style="font-size: 0.85rem;">
              <span>${car.transmission}</span>
              <span class="d-flex align-items-center gap-1 ms-1"><iconify-icon icon="ph:user" class="align-middle"></iconify-icon> ${car.capacity}</span>
              <span class="d-flex align-items-center gap-1 ms-1"><iconify-icon icon="ph:briefcase" class="align-middle"></iconify-icon> ${car.luggage}</span>
            </div>
          </div>
          <div>
            <div class="fw-bold fs-5 mb-3" style="color: #FF5C00;">${formatRupiah(car.price)}</div>
            <button class="btn btn-black w-100 py-2.5 fw-semibold btn-pesan-mobil" data-id="${car.id}" id="btn-pesan-${car.id}">Pesan</button>
          </div>
        </div>
      </div>
    `;
    grid.appendChild(cardCol);
  });

  const pesanBtns = grid.querySelectorAll('.btn-pesan-mobil');
  pesanBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const carId = (e.currentTarget as HTMLElement).getAttribute('data-id') || '';
      const idx = cars.findIndex(c => c.id === carId);
      if (idx !== -1) {
        selectedCarIndex = idx;
        showTenantSubView('detail');
      }
    });
  });
}

function renderCarDetail() {
  if (selectedCarIndex === null) return;
  const car = cars[selectedCarIndex];

  const imgEl = document.getElementById('detail-car-img') as HTMLImageElement;
  if (imgEl) imgEl.src = car.image;

  const nameEl = document.getElementById('detail-car-name');
  if (nameEl) nameEl.textContent = car.name;

  const priceEl = document.getElementById('detail-car-price');
  if (priceEl) priceEl.textContent = formatRupiah(car.price);

  const specCapVal = document.getElementById('detail-spec-cap-val');
  if (specCapVal) specCapVal.textContent = car.capacity.toString();

  const specTransVal = document.getElementById('detail-spec-trans-val');
  if (specTransVal) specTransVal.textContent = car.transmission === 'Automatic' ? 'Automatic' : 'Manual';

  const specLugVal = document.getElementById('detail-spec-lug-val');
  if (specLugVal) specLugVal.textContent = car.luggage.toString();

  let days = 2;
  let sDateLabel = '12 Oktober 2026';
  let eDateLabel = '14 Oktober 2026';
  let pTime = '12:00';
  let rTime = '10:00';

  const datesInput = document.getElementById('rent-dates') as HTMLInputElement;
  if (datesInput && datesInput.value) {
    const parts = datesInput.value.split(' -> ');
    if (parts.length === 2) {
      const d1Parts = parts[0].split('-');
      const d2Parts = parts[1].split('-');
      if (d1Parts.length === 3 && d2Parts.length === 3) {
        const d1 = new Date(`${d1Parts[2]}-${d1Parts[1]}-${d1Parts[0]}`);
        const d2 = new Date(`${d2Parts[2]}-${d2Parts[1]}-${d2Parts[0]}`);
        const monthsIndoFull = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
        if (!isNaN(d1.getTime()) && !isNaN(d2.getTime())) {
          sDateLabel = `${parseInt(d1Parts[0])} ${monthsIndoFull[parseInt(d1Parts[1]) - 1]} ${d1Parts[2]}`;
          eDateLabel = `${parseInt(d2Parts[0])} ${monthsIndoFull[parseInt(d2Parts[1]) - 1]} ${d2Parts[2]}`;
          const diffTime = Math.abs(d2.getTime() - d1.getTime());
          days = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
        }
      }
    }
  }

  const timeInput = document.getElementById('rent-time') as HTMLInputElement;
  if (timeInput && timeInput.value) {
    const parts = timeInput.value.split(' -> ');
    if (parts.length === 2) {
      pTime = parts[0];
      rTime = parts[1];
    }
  }

  const priceBreakdownLabel = document.getElementById('price-breakdown-label');
  if (priceBreakdownLabel) priceBreakdownLabel.textContent = `Harga per hari`;

  const priceBreakdownVal = document.getElementById('price-breakdown-val');
  if (priceBreakdownVal) priceBreakdownVal.textContent = formatRupiah(car.price);

  const durationBreakdownLabel = document.getElementById('duration-breakdown-label');
  if (durationBreakdownLabel) durationBreakdownLabel.textContent = `Durasi (${days} Hari)`;

  const totalCost = car.price * days;
  const durationBreakdownVal = document.getElementById('duration-breakdown-val');
  if (durationBreakdownVal) durationBreakdownVal.textContent = formatRupiah(totalCost);

  const totalPayment = document.getElementById('detail-total-payment');
  if (totalPayment) totalPayment.textContent = formatRupiah(totalCost);

  const pickupDate = document.getElementById('sum-pickup-date');
  if (pickupDate) pickupDate.textContent = sDateLabel;
  const pickupTime = document.getElementById('sum-pickup-time');
  if (pickupTime) pickupTime.textContent = pTime;

  const returnDate = document.getElementById('sum-return-date');
  if (returnDate) returnDate.textContent = eDateLabel;
  const returnTime = document.getElementById('sum-return-time');
  if (returnTime) returnTime.textContent = rTime;

  const sumDuration = document.getElementById('sum-duration');
  if (sumDuration) {
    const startParts = sDateLabel.split(' ');
    const endParts = eDateLabel.split(' ');
    const startDay = startParts[0];
    const endDay = endParts[0];
    const monthYear = startParts.slice(1).join(' ');
    sumDuration.textContent = `${startDay}-${endDay} ${monthYear}`;
  }
}

function renderTenantHistory() {
  const tbody = document.getElementById('history-orders-tbody');
  const emptyState = document.getElementById('history-empty-state');
  const tableCard = document.getElementById('history-table-card');

  if (!tbody) return;
  tbody.innerHTML = '';

  const activeTenantName = document.getElementById('tenant-profile-name')?.textContent || 'Ana';
  const tenantOrders = orders.filter(o => o.tenantName.toLowerCase() === activeTenantName.toLowerCase());

  if (tenantOrders.length === 0) {
    emptyState?.classList.remove('d-none');
    tableCard?.classList.add('d-none');
    return;
  } else {
    emptyState?.classList.add('d-none');
    tableCard?.classList.remove('d-none');
  }

  tenantOrders.forEach((o) => {
    // Hapus nomor urut di belakang (contoh: INV-902345-01 -> INV-902345)
    let invoiceNumber = o.id;
    // Jika ada format INV-XXXXXX-XX, hapus -XX di belakang
    const match = invoiceNumber.match(/^(INV-\d{6})/);
    if (match) {
      invoiceNumber = match[1]; // Ambil hanya INV-902345
    }

    const location = o.location || 'Yogyakarta';

    const tr = document.createElement('tr');
    tr.id = `tenant-history-row-${o.id}`;
    tr.innerHTML = `
      <td class="fw-bold text-primary small">${invoiceNumber}</td>
      <td class="fw-semibold text-dark">${o.carName}</td>
      <td class="text-muted">${o.startDate || '-'}</td>
      <td class="text-muted">${o.endDate || '-'}</td>
      <td class="text-muted">${location}</td>
      <td class="fw-bold">${formatRupiah(o.total)}</td>
      <td class="text-end">
        <button class="btn btn-outline-primary btn-sm btn-detail-order d-inline-flex align-items-center gap-1 ms-auto" data-id="${o.id}" id="btn-detail-${o.id}">
          <iconify-icon icon="ph:eye" class="align-middle"></iconify-icon> Lihat Detail
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  const detailBtns = tbody.querySelectorAll('.btn-detail-order');
  detailBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const orderId = (e.currentTarget as HTMLElement).getAttribute('data-id') || '';
      showOrderDetail(orderId);
    });
  });
}

function showOrderDetail(orderId: string) {
  const order = orders.find(o => o.id === orderId);
  if (!order) {
    alert('Pesanan tidak ditemukan!');
    return;
  }

  const invoiceNumber = order.id.startsWith('INV-') ? order.id : `INV-${String(Math.floor(100000 + Math.random() * 900000))}`;

  const detailMessage = `
    ===== DETAIL PESANAN =====
    No Pesanan    : ${invoiceNumber}
    Nama Mobil    : ${order.carName}
    Plat Nomor    : ${order.plate}
    Tanggal Sewa  : ${order.startDate || '-'}
    Tanggal Kembali: ${order.endDate || '-'}
    Lokasi        : ${order.location || 'Yogyakarta'}
    Durasi        : ${order.duration} hari
    Total Bayar   : ${formatRupiah(order.total)}
    Metode Bayar  : ${order.paymentMethod}
    Status        : ${order.status}
    ============================
  `;

  alert(detailMessage);
}

// ==================== 3. ADMIN CONTROLLER ====================
function initAdminHandlers() {
  document.getElementById('admin-nav-dashboard')?.addEventListener('click', (e) => {
    e.preventDefault();
    showAdminSubView('dashboard');
  });
  document.getElementById('admin-nav-cars')?.addEventListener('click', (e) => {
    e.preventDefault();
    showAdminSubView('cars');
  });
  document.getElementById('admin-nav-orders')?.addEventListener('click', (e) => {
    e.preventDefault();
    showAdminSubView('orders');
  });
  document.getElementById('admin-nav-finance')?.addEventListener('click', (e) => {
    e.preventDefault();
    showAdminSubView('finance');
  });
  document.getElementById('admin-nav-settings')?.addEventListener('click', (e) => {
    e.preventDefault();
    showAdminSubView('settings');
  });
  document.getElementById('admin-btn-logout')?.addEventListener('click', () => {
    currentUser = 'guest';
    showSection('login-section');
  });
  document.getElementById('admin-header-btn-logout')?.addEventListener('click', () => {
    currentUser = 'guest';
    showSection('login-section');
  });
  document.getElementById('btn-dash-view-all-orders')?.addEventListener('click', (e) => {
    e.preventDefault();
    showAdminSubView('orders');
  });
  document.getElementById('btn-show-tambah-mobil')?.addEventListener('click', openTambahMobilModal);
  document.getElementById('btn-save-settings')?.addEventListener('click', saveSettings);
  document.getElementById('btn-print-finance')?.addEventListener('click', openPrintFinanceModal);
}

// ==================== TOAST NOTIFICATION ====================
function showToast(message: string, type: 'success' | 'error' | 'info' = 'success') {
  const toastEl = document.getElementById('liveToast');
  const toastMessage = document.getElementById('toast-notif-message');

  if (!toastEl || !toastMessage) return;

  // Set message
  toastMessage.textContent = message;

  // Set color based on type
  if (type === 'success') {
    toastEl.style.backgroundColor = '#059669';
  } else if (type === 'error') {
    toastEl.style.backgroundColor = '#DC2626';
  } else {
    toastEl.style.backgroundColor = '#0084FF';
  }

  // Show toast
  const toast = new bootstrap.Toast(toastEl, {
    delay: 3500,
    animation: true
  });
  toast.show();
}

function saveSettings() {
  const nameVal = (document.getElementById('settings-rental-name') as HTMLInputElement).value;
  const phoneVal = (document.getElementById('settings-rental-phone') as HTMLInputElement).value;
  const addrVal = (document.getElementById('settings-rental-address') as HTMLTextAreaElement).value;
  const emailVal = (document.getElementById('settings-rental-email') as HTMLInputElement).value;
  const tzVal = (document.getElementById('settings-rental-timezone') as HTMLSelectElement).value;

  if (!nameVal || !phoneVal || !addrVal || !emailVal) {
    showToast('Harap lengkapi semua bidang pengaturan!', 'error');
    return;
  }

  settings.rentalName = nameVal;
  settings.rentalPhone = phoneVal;
  settings.rentalAddress = addrVal;
  settings.rentalEmail = emailVal;
  settings.timezone = tzVal;

  applySettingsToDOM();
  showToast('Pengaturan rental berhasil diperbarui!', 'success');
}

function updateAdminDashboardStats() {
  const totalCarsEl = document.getElementById('dash-total-cars');
  if (totalCarsEl) totalCarsEl.textContent = cars.length.toString();

  const activeCount = orders.filter(o => o.status === 'Disetujui' || o.status === 'Selesai').length;
  const activeOrdersEl = document.getElementById('dash-active-orders');
  if (activeOrdersEl) activeOrdersEl.textContent = activeCount.toString();

  const pendingCount = orders.filter(o => o.status === 'Menunggu Konfirmasi' || o.status === 'Menunggu Pembayaran').length;
  const pendingOrdersEl = document.getElementById('dash-pending-orders');
  if (pendingOrdersEl) pendingOrdersEl.textContent = pendingCount.toString();

  const completedOrders = orders.filter(o => o.status === 'Selesai' || o.status === 'Disetujui');
  const sumEarnings = completedOrders.reduce((sum, order) => sum + order.total, 0);
  const totalEarningsEl = document.getElementById('dash-total-earnings');
  if (totalEarningsEl) totalEarningsEl.textContent = formatRupiah(sumEarnings);

  const availableCars = cars.filter(c => c.status === 'Tersedia').length;
  const availPct = Math.round((availableCars / cars.length) * 100) || 0;

  const gaugeEl = document.getElementById('status-gauge');
  if (gaugeEl) {
    gaugeEl.style.borderTopColor = '#0D6EFD';
    gaugeEl.style.transform = `rotate(${(availPct / 100) * 360}deg)`;
  }

  const gaugePctEl = document.getElementById('gauge-avail-pct');
  if (gaugePctEl) gaugePctEl.textContent = `${availPct}%`;

  const gaugeAvailCnt = document.getElementById('gauge-avail-cnt');
  if (gaugeAvailCnt) gaugeAvailCnt.textContent = availableCars.toString();

  const gaugeRentedCnt = document.getElementById('gauge-rented-cnt');
  if (gaugeRentedCnt) gaugeRentedCnt.textContent = (cars.length - availableCars).toString();

  const tbody = document.getElementById('dash-orders-tbody');
  if (tbody) {
    tbody.innerHTML = '';
    const sortedOrders = [...orders].reverse().slice(0, 5);
    sortedOrders.forEach((o) => {
      let statusHTML = '';
      if (o.status === 'Selesai') {
        statusHTML = `<span class="badge rounded-pill px-3 py-1.5 fw-bold" style="background-color: #EFF6FF; color: #0084FF; border: 1px solid #BFDBFE; font-size: 0.8rem;">Selesai</span>`;
      } else if (o.status === 'Disewa') {
        statusHTML = `<span class="badge rounded-pill px-3 py-1.5 fw-bold" style="background-color: #FEF3C7; color: #D97706; border: 1px solid #FDE68A; font-size: 0.8rem;">Disewa</span>`;
      } else if (o.status === 'Konfirmasi') {
        statusHTML = `<button class="btn btn-sm btn-primary px-3 py-1 fw-bold rounded-pill shadow-sm btn-konfirmasi-order" data-id="${o.id}" style="font-size: 0.82rem; background-color: #FF5C00; border-color: #FF5C00;">Konfirmasi</button>`;
      } else {
        statusHTML = `<span class="badge bg-light text-dark border px-3 py-1.5 fw-semibold" style="font-size: 0.8rem;">${o.status}</span>`;
      }

      const tr = document.createElement('tr');
      tr.style.borderBottom = '1px solid #F1F5F9';
      tr.innerHTML = `
        <td class="py-3 px-3 text-secondary fw-semibold">${o.id}</td>
        <td class="py-3 px-3 text-dark fw-bold">${o.tenantName}</td>
        <td class="py-3 px-3 text-dark fw-medium">${o.carName}</td>
        <td class="py-3 px-3 text-secondary">${o.dateRangeStr || `${o.startDate} - ${o.endDate}`}</td>
        <td class="py-3 px-3 text-dark fw-bold">${formatRupiah(o.total)}</td>
        <td class="py-3 px-3">${statusHTML}</td>
      `;
      tbody.appendChild(tr);
    });

    tbody.querySelectorAll('.btn-konfirmasi-order').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const orderId = (e.currentTarget as HTMLElement).getAttribute('data-id') || '';
        openVerifikasiModal(orderId);
      });
    });
  }
}

function renderAdminCarsTable() {
  const tbody = document.getElementById('admin-cars-tbody');
  if (!tbody) return;
  tbody.innerHTML = '';

  cars.forEach((car, index) => {
    const isAvailable = car.status === 'Tersedia';
    const statusHTML = isAvailable
      ? '<span class="badge rounded-pill px-3 py-1.5 fw-bold" style="background-color: #ECFDF5; color: #059669; border: 1px solid #A7F3D0; font-size: 0.8rem;">Tersedia</span>'
      : '<span class="badge rounded-pill px-3 py-1.5 fw-bold" style="background-color: #FEF3C7; color: #D97706; border: 1px solid #FDE68A; font-size: 0.8rem;">Disewa</span>';

    const tr = document.createElement('tr');
    tr.id = `admin-car-row-${car.id}`;
    tr.style.borderBottom = '1px solid #F1F5F9';
    tr.innerHTML = `
      <td class="py-3 px-3 text-muted fw-medium">${index + 1}</td>
      <td class="py-3 px-3 text-dark fw-bold">${car.name}</td>
      <td class="py-3 px-3 text-secondary fw-medium">${car.transmission}</td>
      <td class="py-3 px-3 text-dark fw-semibold"><span class="badge bg-light text-dark border px-2.5 py-1" style="font-weight: 600; font-size: 0.82rem;">${car.plate}</span></td>
      <td class="py-3 px-3 text-dark fw-bold">${formatRupiah(car.price)}</td>
      <td class="py-3 px-3">${statusHTML}</td>
      <td class="py-3 px-3 text-center">
        <div class="d-flex align-items-center justify-content-center gap-2">
          <button class="btn btn-sm btn-light border p-1.5 rounded-2 btn-edit-car" data-id="${car.id}" id="btn-edit-car-${car.id}" style="color: #2563EB;" title="Edit Mobil">
            <iconify-icon icon="ph:pencil-simple" class="fs-5 d-block"></iconify-icon>
          </button>
          <button class="btn btn-sm btn-light border p-1.5 rounded-2 btn-delete-car" data-id="${car.id}" id="btn-delete-car-${car.id}" style="color: #EF4444;" title="Hapus Mobil">
            <iconify-icon icon="ph:trash" class="fs-5 d-block"></iconify-icon>
          </button>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });

  tbody.querySelectorAll('.btn-edit-car').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const carId = (e.currentTarget as HTMLElement).getAttribute('data-id') || '';
      openEditMobilModal(carId);
    });
  });

  tbody.querySelectorAll('.btn-delete-car').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const carId = (e.currentTarget as HTMLElement).getAttribute('data-id') || '';
      deleteCarAction(carId);
    });
  });
}

function renderAdminOrdersTable() {
  console.log('🔧 renderAdminOrdersTable dipanggil');
  const tbody = document.getElementById('admin-orders-tbody');
  if (!tbody) {
    console.error('❌ admin-orders-tbody tidak ditemukan!');
    return;
  }

  tbody.innerHTML = '';

  if (!orders || orders.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" class="text-center py-4 text-muted">Belum ada pesanan</td></tr>`;
    return;
  }

  const sortedOrders = [...orders].reverse();

  sortedOrders.forEach((o) => {
    let dateRange = o.dateRangeStr || `${o.startDate} - ${o.endDate}`;
    if (o.startDate && o.endDate) {
      const startParts = o.startDate.split(' ');
      const endParts = o.endDate.split(' ');
      if (startParts.length >= 2 && endParts.length >= 2) {
        const startDay = startParts[0];
        const endDay = endParts[0];
        const monthYear = startParts.slice(1).join(' ');
        dateRange = `${startDay}-${endDay} ${monthYear}`;
      }
    }

    let statusHTML = '';

    if (o.status === 'Selesai') {
      statusHTML = `<span class="badge rounded-pill px-3 py-1.5 fw-bold" style="background-color: #EFF6FF; color: #0084FF; border: 1px solid #BFDBFE; font-size: 0.8rem;">Selesai</span>`;
    } else if (o.status === 'Disewa') {
      statusHTML = `<span class="badge rounded-pill px-3 py-1.5 fw-bold" style="background-color: #FEF3C7; color: #D97706; border: 1px solid #FDE68A; font-size: 0.8rem;">Disewa</span>`;
    } else if (o.status === 'Konfirmasi') {
      statusHTML = `<button class="btn btn-sm btn-primary px-3 py-1 fw-bold rounded-pill shadow-sm btn-konfirmasi-order" data-id="${o.id}" style="font-size: 0.82rem; background-color: #FF5C00; border-color: #FF5C00;">Konfirmasi</button>`;
    } else {
      statusHTML = `<span class="badge bg-light text-dark border px-3 py-1.5 fw-semibold" style="font-size: 0.8rem;">${o.status}</span>`;
    }

    const tr = document.createElement('tr');
    tr.id = `admin-order-row-${o.id}`;
    tr.style.borderBottom = '1px solid #F1F5F9';
    tr.innerHTML = `
      <td class="py-3 px-3 text-secondary fw-semibold">${o.id}</td>
      <td class="py-3 px-3 text-dark fw-bold">${o.tenantName}</td>
      <td class="py-3 px-3 text-dark fw-medium">${o.carName}</td>
      <td class="py-3 px-3 text-secondary">${dateRange}</td>
      <td class="py-3 px-3 text-dark fw-bold">${formatRupiah(o.total)}</td>
      <td class="py-3 px-3">${statusHTML}</td>
    `;
    tbody.appendChild(tr);
  });

  tbody.querySelectorAll('.btn-konfirmasi-order').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const orderId = (e.currentTarget as HTMLElement).getAttribute('data-id') || '';
      openVerifikasiModal(orderId);
    });
  });

  console.log('✅ renderAdminOrdersTable selesai,', orders.length, 'pesanan ditampilkan');
}

function renderAdminFinance() {
  const tbody = document.getElementById('finance-tbody');
  if (!tbody) {
    console.error('❌ finance-tbody tidak ditemukan!');
    return;
  }
  tbody.innerHTML = '';

  let completedOrders = orders.filter(o => o.status === 'Selesai' || o.status === 'Disewa');

  // FILTER BERDASARKAN RENTANG TANGGAL
  if (financeSelectedStartDate && financeSelectedEndDate) {
    const start = new Date(financeSelectedStartDate);
    const end = new Date(financeSelectedEndDate);
    end.setDate(end.getDate() + 1);

    const monthsFull = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

    completedOrders = completedOrders.filter(o => {
      const startParts = o.startDate.split(' ');
      const endParts = o.endDate.split(' ');

      let orderStartDate = new Date();
      let orderEndDate = new Date();

      if (startParts.length >= 2) {
        const day = parseInt(startParts[0]);
        const month = monthsFull.indexOf(startParts[1]);
        const year = parseInt(startParts[2]);
        if (!isNaN(day) && month !== -1 && !isNaN(year)) {
          orderStartDate = new Date(year, month, day);
        }
      }

      if (endParts.length >= 2) {
        const day = parseInt(endParts[0]);
        const month = monthsFull.indexOf(endParts[1]);
        const year = parseInt(endParts[2]);
        if (!isNaN(day) && month !== -1 && !isNaN(year)) {
          orderEndDate = new Date(year, month, day);
        }
      }

      return orderStartDate >= start && orderEndDate <= end;
    });
  }

  if (completedOrders.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" class="text-center py-4 text-muted">Belum ada transaksi selesai</td></tr>`;
    return;
  }

  const sortedOrders = [...completedOrders].reverse();

  sortedOrders.forEach((o) => {
    const dateDisplay = o.timestamp || o.startDate || '-';

    let dateRange = o.dateRangeStr || `${o.startDate} - ${o.endDate}`;
    if (o.startDate && o.endDate) {
      const startParts = o.startDate.split(' ');
      const endParts = o.endDate.split(' ');
      if (startParts.length >= 2 && endParts.length >= 2) {
        const startDay = startParts[0];
        const endDay = endParts[0];
        const monthYear = startParts.slice(1).join(' ');
        dateRange = `${startDay}-${endDay} ${monthYear}`;
      }
    }

    const tr = document.createElement('tr');
    tr.style.borderBottom = '1px solid #F1F5F9';
    tr.innerHTML = `
      <td class="py-3.5 text-muted" style="font-size: 0.95rem; font-family: 'Plus Jakarta Sans', sans-serif;">${dateDisplay}</td>
      <td class="py-3.5 text-dark fw-bold text-primary small" style="font-size: 0.95rem; font-family: 'Plus Jakarta Sans', sans-serif; color: #0284C7 !important;">${o.id}</td>
      <td class="py-3.5 text-dark fw-semibold" style="font-size: 0.95rem; font-family: 'Plus Jakarta Sans', sans-serif;">${o.tenantName}</td>
      <td class="py-3.5 text-dark" style="font-size: 0.95rem; font-family: 'Plus Jakarta Sans', sans-serif;">${o.carName}</td>
      <td class="py-3.5 text-dark" style="font-size: 0.95rem; font-family: 'Plus Jakarta Sans', sans-serif;">${dateRange}</td>
      <td class="py-3.5 text-dark fw-bold" style="font-size: 0.95rem; font-family: 'Plus Jakarta Sans', sans-serif;">${formatRupiah(o.total)}</td>
    `;
    tbody.appendChild(tr);
  });

  const totalEarnings = completedOrders.reduce((sum, o) => sum + o.total, 0);

  const trTotal = document.createElement('tr');
  trTotal.style.borderTop = '2px solid #E2E8F0';
  trTotal.style.backgroundColor = '#F8FAFC';
  trTotal.innerHTML = `
    <td colspan="5" class="py-3 px-3 text-end fw-bold text-dark" style="font-size: 1rem; font-family: 'Plus Jakarta Sans', sans-serif;">TOTAL PENDAPATAN</td>
    <td class="py-3 px-3 fw-bold" style="font-size: 1.1rem; font-family: 'Plus Jakarta Sans', sans-serif; color: #EA580C;">${formatRupiah(totalEarnings)}</td>
  `;
  tbody.appendChild(trTotal);
}

// ==================== MODAL FUNCTIONS ====================
function openVerifikasiModal(orderId: string) {
  verifOrderId = orderId;
  const o = orders.find(x => x.id === orderId);
  if (!o) {
    showToast('Pesanan tidak ditemukan!', 'error');
    return;
  }

  const nameEl = document.getElementById('verif-nama-lengkap');
  if (nameEl) nameEl.textContent = o.tenantName;

  const ttlEl = document.getElementById('verif-ttl');
  if (ttlEl) {
    if (o.tenantName === 'Zaura Allysa') {
      ttlEl.textContent = 'Sleman, 17 Mei 2005';
    } else {
      ttlEl.textContent = 'Sleman, 12 April 2004';
    }
  }

  const alamatEl = document.getElementById('verif-alamat');
  if (alamatEl) {
    if (o.tenantName === 'Zaura Allysa') {
      alamatEl.textContent = 'Jl. Kabupaten';
    } else {
      alamatEl.textContent = 'Jl. Godean KM 5';
    }
  }

  const telpEl = document.getElementById('verif-telpon');
  if (telpEl) telpEl.textContent = '08123456789';

  const genderEl = document.getElementById('verif-gender');
  if (genderEl) {
    if (o.tenantName === 'Rifqy Affandi') {
      genderEl.textContent = 'Laki-laki';
    } else {
      genderEl.textContent = 'Perempuan';
    }
  }

  document.getElementById('verifikasi-pengambilan-modal')?.classList.add('show');
}

function closeVerifikasiModal() {
  document.getElementById('verifikasi-pengambilan-modal')?.classList.remove('show');
  verifOrderId = null;
}

function submitVerifikasiAction() {
  if (!verifOrderId) return;

  const orderIndex = orders.findIndex(o => o.id === verifOrderId);
  if (orderIndex === -1) {
    showToast('Pesanan tidak ditemukan!', 'error');
    return;
  }

  orders[orderIndex].status = 'Disewa';

  const carPlate = orders[orderIndex].plate;
  const carIndex = cars.findIndex(c => c.plate === carPlate);
  if (carIndex !== -1) {
    cars[carIndex].status = 'Disewa';
  }

  closeVerifikasiModal();
  renderAdminOrdersTable();
  renderAdminCarsTable();
  updateAdminDashboardStats();
  showKonfirmasiToast();
}

function showKonfirmasiToast() {
  const toast = document.getElementById('toast-konfirmasi');
  if (toast) {
    toast.classList.remove('d-none');
    setTimeout(() => {
      toast.classList.add('d-none');
    }, 3000);
  }
}

function openDocZoomModal(docType: 'KTP' | 'SIM A') {
  const titleTextEl = document.getElementById('doc-zoom-title-text');
  const imgEl = document.getElementById('doc-zoom-img') as HTMLImageElement;

  if (titleTextEl) {
    titleTextEl.textContent = `Detail Dokumen: ${docType}`;
  }

  if (imgEl) {
    if (docType === 'KTP') {
      imgEl.src = 'src/assets/images/ktp.png';
      imgEl.alt = 'Kartu Tanda Penduduk (KTP)';
    } else {
      imgEl.src = 'src/assets/images/sim a.png';
      imgEl.alt = 'Surat Izin Mengemudi (SIM A)';
    }
  }

  document.getElementById('doc-zoom-modal')?.classList.add('show');
}

function closeDocZoomModal() {
  document.getElementById('doc-zoom-modal')?.classList.remove('show');
}

function openTambahMobilModal() {
  editingCarId = null;
  document.getElementById('tambah-mobil-modal-title')!.textContent = 'Tambah Mobil';
  (document.getElementById('tambah-mobil-form') as HTMLFormElement).reset();
  removeCarPhoto();
  document.getElementById('car-status-group')?.classList.add('d-none');
  document.getElementById('tambah-mobil-modal')?.classList.add('show');
}

function openEditMobilModal(carId: string) {
  editingCarId = carId;
  const carIndex = cars.findIndex(c => c.id === carId);
  if (carIndex === -1) {
    showToast('Mobil tidak ditemukan!', 'error');
    return;
  }
  const car = cars[carIndex];

  document.getElementById('tambah-mobil-modal-title')!.textContent = 'Edit Mobil';

  (document.getElementById('car-name') as HTMLInputElement).value = car.name;
  (document.getElementById('car-transmission') as HTMLSelectElement).value = car.transmission;
  (document.getElementById('car-plate') as HTMLInputElement).value = car.plate;
  (document.getElementById('car-price') as HTMLInputElement).value = car.price.toString();

  document.getElementById('car-status-group')?.classList.remove('d-none');
  const statusSelect = document.getElementById('car-status') as HTMLSelectElement;
  if (statusSelect) {
    statusSelect.value = car.status;
  }

  if (car.image) {
    tempCarPhotoUrl = car.image;
    const preview = document.getElementById('car-photo-preview') as HTMLImageElement;
    if (preview) preview.src = car.image;
    document.getElementById('car-photo-upload-container')?.classList.add('d-none');
    document.getElementById('car-photo-preview-wrapper')?.classList.remove('d-none');
  } else {
    removeCarPhoto();
  }

  document.getElementById('tambah-mobil-modal')?.classList.add('show');
}

function closeTambahMobilModal() {
  document.getElementById('tambah-mobil-modal')?.classList.remove('show');
}

function handleCarPhotoFile(file: File) {
  const reader = new FileReader();
  reader.onload = (e) => {
    tempCarPhotoUrl = e.target?.result as string;
    const preview = document.getElementById('car-photo-preview') as HTMLImageElement;
    if (preview) preview.src = tempCarPhotoUrl;
    document.getElementById('car-photo-upload-container')?.classList.add('d-none');
    document.getElementById('car-photo-preview-wrapper')?.classList.remove('d-none');
  };
  reader.readAsDataURL(file);
}

function removeCarPhoto() {
  tempCarPhotoUrl = '';
  const input = document.getElementById('car-photo-input') as HTMLInputElement;
  if (input) input.value = '';
  document.getElementById('car-photo-upload-container')?.classList.remove('d-none');
  document.getElementById('car-photo-preview-wrapper')?.classList.add('d-none');
}

function submitCarForm() {
  const name = (document.getElementById('car-name') as HTMLInputElement).value;
  const trans = (document.getElementById('car-transmission') as HTMLSelectElement).value as 'Automatic' | 'Manual';
  const plate = (document.getElementById('car-plate') as HTMLInputElement).value;
  const price = parseInt((document.getElementById('car-price') as HTMLInputElement).value || '0');

  if (!name || !plate || !price) {
    showToast('Harap lengkapi semua data mobil!', 'error');
    return;
  }

  const finalImage = tempCarPhotoUrl || '/images/toyota_avanza_1784287804405.jpg';
  const brand = name.split(' ')[0];
  const validBrands: Car['brand'][] = ['Toyota', 'Honda', 'Mitsubishi', 'Daihatsu', 'Hyundai'];
  const selectedBrand = validBrands.includes(brand as Car['brand']) ? brand as Car['brand'] : 'Toyota';

  let status: 'Tersedia' | 'Disewa' = 'Tersedia';
  if (editingCarId !== null) {
    status = (document.getElementById('car-status') as HTMLSelectElement).value as 'Tersedia' | 'Disewa';
  }

  const carData: Car = {
    id: editingCarId || `car-${Date.now()}`,
    name: name,
    brand: selectedBrand,
    transmission: trans,
    plate: plate,
    price: price,
    capacity: name.toLowerCase().includes('yaris') || name.toLowerCase().includes('brio') ? 4 : 7,
    luggage: name.toLowerCase().includes('fortuner') || name.toLowerCase().includes('innova') ? 3 : 2,
    status: status,
    image: finalImage
  };

  if (editingCarId === null) {
    cars.push(carData);
    showToast('🚗 Mobil baru berhasil ditambahkan!', 'success');
  } else {
    const carIndex = cars.findIndex(c => c.id === editingCarId);
    if (carIndex !== -1) {
      cars[carIndex] = carData;
      showToast('✏️ Data mobil berhasil diperbarui!', 'success');
    }
  }

  closeTambahMobilModal();
  renderAdminCarsTable();
  updateAdminDashboardStats();
}

function deleteCarAction(carId: string) {
  const carIndex = cars.findIndex(c => c.id === carId);
  if (carIndex === -1) {
    showToast('Mobil tidak ditemukan!', 'error');
    return;
  }
  const car = cars[carIndex];
  if (confirm(`Apakah Anda yakin ingin menghapus mobil ${car.name} (${car.plate})?`)) {
    cars.splice(carIndex, 1);
    renderAdminCarsTable();
    updateAdminDashboardStats();
    showToast('🗑️ Mobil berhasil dihapus!', 'info');
  }
}

// ==================== PAYMENT MODAL ====================
function openPaymentModal() {
  if (selectedCarIndex === null) {
    showToast('Silakan pilih mobil terlebih dahulu!', 'error');
    return;
  }
  const car = cars[selectedCarIndex];

  let days = 2;
  const datesInput = document.getElementById('rent-dates') as HTMLInputElement;
  if (datesInput && datesInput.value) {
    const parts = datesInput.value.split(' -> ');
    if (parts.length === 2) {
      const d1Parts = parts[0].split('-');
      const d2Parts = parts[1].split('-');
      if (d1Parts.length === 3 && d2Parts.length === 3) {
        const d1 = new Date(`${d1Parts[2]}-${d1Parts[1]}-${d1Parts[0]}`);
        const d2 = new Date(`${d2Parts[2]}-${d2Parts[1]}-${d2Parts[0]}`);
        if (!isNaN(d1.getTime()) && !isNaN(d2.getTime())) {
          const diffTime = Math.abs(d2.getTime() - d1.getTime());
          days = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
        }
      }
    }
  }

  const paymentPrice = document.getElementById('payment-modal-price');
  if (paymentPrice) paymentPrice.textContent = formatRupiah(car.price * days);

  tempKtpUploaded = false;
  tempSimUploaded = false;

  const ktpBox = document.getElementById('doc-ktp-box');
  ktpBox?.classList.remove('success');
  const ktpStatus = document.getElementById('txt-ktp-status');
  if (ktpStatus) ktpStatus.textContent = 'Unggah foto KTP Anda. Format JPG, PNG. Maks 1 MB';
  const btnKtp = document.getElementById('btn-upload-ktp') as HTMLButtonElement;
  if (btnKtp) {
    btnKtp.disabled = false;
    btnKtp.classList.add('btn-primary');
    btnKtp.classList.remove('btn-success', 'btn-outline-primary');
    btnKtp.innerHTML = '<iconify-icon icon="ph:upload-simple"></iconify-icon> Unggah';
  }

  const simBox = document.getElementById('doc-sim-box');
  simBox?.classList.remove('success');
  const simStatus = document.getElementById('txt-sim-status');
  if (simStatus) simStatus.textContent = 'Unggah foto SIM A Anda. Format JPG, PNG. Maks 1 MB';
  const btnSim = document.getElementById('btn-upload-sim') as HTMLButtonElement;
  if (btnSim) {
    btnSim.disabled = false;
    btnSim.classList.add('btn-primary');
    btnSim.classList.remove('btn-success', 'btn-outline-primary');
    btnSim.innerHTML = '<iconify-icon icon="ph:upload-simple"></iconify-icon> Unggah';
  }

  const bankBtns = document.querySelectorAll('#va-selection-container .bank-option-btn');
  bankBtns.forEach(b => b.classList.remove('selected'));
  const firstBank = document.querySelector('#va-selection-container .bank-option-btn') as HTMLElement;
  firstBank?.classList.add('selected');
  tempSelectedPaymentMethod = 'BCA Virtual Account';

  startPaymentCountdown(3600);
  document.getElementById('payment-modal')?.classList.add('show');
}

function startPaymentCountdown(seconds: number) {
  if (countdownInterval) clearInterval(countdownInterval);

  let remaining = seconds;
  const timerDisplay = document.getElementById('payment-timer-countdown');

  function updateDisplay() {
    const hrs = Math.floor(remaining / 3600);
    const mins = Math.floor((remaining % 3600) / 60);
    const secs = remaining % 60;

    if (timerDisplay) {
      timerDisplay.textContent = `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
  }

  updateDisplay();
  countdownInterval = setInterval(() => {
    remaining--;
    if (remaining <= 0) {
      clearInterval(countdownInterval);
      alert('Waktu pembayaran habis! Silakan lakukan pemesanan kembali.');
      closePaymentModal();
    } else {
      updateDisplay();
    }
  }, 1000);
}

function closePaymentModal() {
  if (countdownInterval) clearInterval(countdownInterval);
  document.getElementById('payment-modal')?.classList.remove('show');
}

function simulateFileUpload(type: 'KTP' | 'SIM') {
  const btnId = type === 'KTP' ? 'btn-upload-ktp' : 'btn-upload-sim';
  const boxId = type === 'KTP' ? 'doc-ktp-box' : 'doc-sim-box';
  const statusId = type === 'KTP' ? 'txt-ktp-status' : 'txt-sim-status';

  const btn = document.getElementById(btnId) as HTMLButtonElement;
  const box = document.getElementById(boxId);
  const status = document.getElementById(statusId);

  if (!btn) return;

  btn.disabled = true;
  btn.innerHTML = '<span class="spinner-border spinner-border-sm me-1" role="status"></span> Proses';

  setTimeout(() => {
    btn.innerHTML = '<iconify-icon icon="ph:check-circle"></iconify-icon> Terunggah';
    btn.classList.remove('btn-outline-primary', 'btn-primary');
    btn.classList.add('btn-success');

    box?.classList.add('success');
    if (status) status.textContent = 'Dokumen Anda berhasil diunggah dan diverifikasi secara instan!';

    if (type === 'KTP') {
      tempKtpUploaded = true;
    } else {
      tempSimUploaded = true;
    }
  }, 1000);
}

function submitBookingAction() {
  if (selectedCarIndex === null) {
    showToast('Silakan pilih mobil terlebih dahulu!', 'error');
    return;
  }

  if (!tempKtpUploaded || !tempSimUploaded) {
    alert('Harap unggah dokumen KTP dan SIM A Anda untuk menyelesaikan proses sewa.');
    return;
  }

  const car = cars[selectedCarIndex];

  // Generate invoice number dengan format INV-902345-XX (urut)
  const baseInvoice = 'INV-902345';
  const existingOrders = orders.filter(o => o.id.startsWith(baseInvoice));
  const nextNumber = String(existingOrders.length + 1).padStart(2, '0');
  const uniqueCode = `${baseInvoice}-${nextNumber}`;

  let days = 2;
  let sDateLabel = '12 Oktober 2026';
  let eDateLabel = '14 Oktober 2026';
  let startTime = '12:00';
  let endTime = '10:00';

  const datesInput = document.getElementById('rent-dates') as HTMLInputElement;
  if (datesInput && datesInput.value) {
    const parts = datesInput.value.split(' -> ');
    if (parts.length === 2) {
      const d1Parts = parts[0].split('-');
      const d2Parts = parts[1].split('-');
      if (d1Parts.length === 3 && d2Parts.length === 3) {
        const d1 = new Date(`${d1Parts[2]}-${d1Parts[1]}-${d1Parts[0]}`);
        const d2 = new Date(`${d2Parts[2]}-${d2Parts[1]}-${d2Parts[0]}`);
        const monthsIndoFull = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
        if (!isNaN(d1.getTime()) && !isNaN(d2.getTime())) {
          sDateLabel = `${parseInt(d1Parts[0])} ${monthsIndoFull[parseInt(d1Parts[1]) - 1]} ${d1Parts[2]}`;
          eDateLabel = `${parseInt(d2Parts[0])} ${monthsIndoFull[parseInt(d2Parts[1]) - 1]} ${d2Parts[2]}`;
          const diffTime = Math.abs(d2.getTime() - d1.getTime());
          days = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
        }
      }
    }
  }

  const timeInput = document.getElementById('rent-time') as HTMLInputElement;
  if (timeInput && timeInput.value) {
    const parts = timeInput.value.split(' -> ');
    if (parts.length === 2) {
      startTime = parts[0];
      endTime = parts[1];
    }
  }

  const locationInput = document.getElementById('rent-location') as HTMLInputElement;
  const location = locationInput?.value || 'Yogyakarta';

  const activeTenantName = document.getElementById('tenant-profile-name')?.textContent || 'Ana';

  const newOrder: Order = {
    id: uniqueCode,
    tenantName: activeTenantName,
    carName: car.name,
    plate: car.plate,
    startDate: sDateLabel,
    endDate: eDateLabel,
    duration: days,
    total: car.price * days,
    ktpUploaded: true,
    simUploaded: true,
    status: 'Konfirmasi',
    paymentMethod: tempSelectedPaymentMethod,
    timestamp: 'Hari Ini, ' + new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    location: location,
    startTime: startTime,
    endTime: endTime
  };

  orders.push(newOrder);

  closePaymentModal();

  const codeDisplay = document.getElementById('success-booking-code');
  if (codeDisplay) codeDisplay.textContent = uniqueCode;

  setTimeout(() => {
    document.getElementById('success-modal')?.classList.add('show');
  }, 300);
}

function closeSuccessModal() {
  document.getElementById('success-modal')?.classList.remove('show');
}

// ==================== PRINT FUNCTIONS ====================
function openPrintReceiptModal(orderId: string) {
  const o = orders.find(x => x.id === orderId);
  if (!o) {
    showToast('Pesanan tidak ditemukan!', 'error');
    return;
  }

  const sheet = document.getElementById('print-sheet-area');
  if (!sheet) return;

  sheet.innerHTML = `
    <div class="text-center mb-4 pb-3 border-bottom">
      <h3 class="fw-bold text-dark m-0">${settings.rentalName}</h3>
      <p class="text-muted small mb-1">${settings.rentalAddress}</p>
      <p class="text-muted small mb-0">Telp: ${settings.rentalPhone} | Email: ${settings.rentalEmail}</p>
    </div>
    <div class="row mb-4">
      <div class="col-6">
        <h6 class="fw-bold text-muted small text-uppercase">RINCIAN PENYEWA</h6>
        <div class="fw-bold">${o.tenantName}</div>
        <div class="text-muted small">Pembayaran: ${o.paymentMethod}</div>
      </div>
      <div class="col-6 text-end">
        <h6 class="fw-bold text-muted small text-uppercase">FAKTUR PEMESANAN</h6>
        <div class="fw-bold text-primary">${o.id}</div>
        <div class="text-muted small">Tanggal: ${o.timestamp}</div>
      </div>
    </div>
    <table class="table table-bordered mb-4">
      <thead class="table-light">
        <tr>
          <th>Deskripsi Item</th>
          <th class="text-center">Durasi</th>
          <th class="text-end">Harga / Hari</th>
          <th class="text-end">Total</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <div class="fw-bold">Sewa Mobil ${o.carName}</div>
            <div class="text-muted small">No. Plat: ${o.plate}</div>
            <div class="text-muted small">Periode: ${o.dateRangeStr || `${o.startDate} - ${o.endDate}`}</div>
          </td>
          <td class="text-center align-middle">${o.duration} Hari</td>
          <td class="text-end align-middle">${formatRupiah(o.total / o.duration)}</td>
          <td class="text-end align-middle fw-bold text-dark">${formatRupiah(o.total)}</td>
        </tr>
      </tbody>
    </table>
    <div class="row align-items-center mb-3">
      <div class="col-7">
        <div class="border border-success text-success fw-bold d-inline-flex align-items-center gap-1 px-3 py-1.5 rounded" style="transform: rotate(-3deg); font-size: 1.1rem; letter-spacing: 1px;">
          <iconify-icon icon="ph:check-circle" class="me-1"></iconify-icon> LUNAS / PAID
        </div>
      </div>
      <div class="col-5 text-end">
        <div class="text-muted small">Total Pembayaran:</div>
        <h4 class="fw-bold text-primary m-0">${formatRupiah(o.total)}</h4>
      </div>
    </div>
    <div class="text-center text-muted small mt-5 pt-4 border-top">
      Terima kasih telah mempercayai ${settings.rentalName} untuk kebutuhan perjalanan Anda.
    </div>
  `;

  document.getElementById('print-preview-modal')?.classList.add('show');
}

function openPrintFinanceModal() {
  const completedOrders = orders.filter(o => o.status === 'Selesai' || o.status === 'Disewa');

  let filteredOrders = completedOrders;

  // Filter berdasarkan rentang tanggal jika ada
  if (financeSelectedStartDate && financeSelectedEndDate) {
    const start = new Date(financeSelectedStartDate);
    const end = new Date(financeSelectedEndDate);
    end.setDate(end.getDate() + 1);

    const monthsFull = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

    filteredOrders = completedOrders.filter(o => {
      const startParts = o.startDate.split(' ');
      const endParts = o.endDate.split(' ');

      let orderStartDate = new Date();
      let orderEndDate = new Date();

      if (startParts.length >= 2) {
        const day = parseInt(startParts[0]);
        const month = monthsFull.indexOf(startParts[1]);
        const year = parseInt(startParts[2]);
        if (!isNaN(day) && month !== -1 && !isNaN(year)) {
          orderStartDate = new Date(year, month, day);
        }
      }

      if (endParts.length >= 2) {
        const day = parseInt(endParts[0]);
        const month = monthsFull.indexOf(endParts[1]);
        const year = parseInt(endParts[2]);
        if (!isNaN(day) && month !== -1 && !isNaN(year)) {
          orderEndDate = new Date(year, month, day);
        }
      }

      return orderStartDate >= start && orderEndDate <= end;
    });
  }

  const sumEarnings = filteredOrders.reduce((sum, order) => sum + order.total, 0);

  // Format period label
  let periodLabel = 'Semua';
  if (financeSelectedStartDate && financeSelectedEndDate) {
    const startParts = financeSelectedStartDate.split('-');
    const endParts = financeSelectedEndDate.split('-');
    const monthsFull = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    const startDisplay = `${parseInt(startParts[2])} ${monthsFull[parseInt(startParts[1]) - 1]} ${startParts[0]}`;
    const endDisplay = `${parseInt(endParts[2])} ${monthsFull[parseInt(endParts[1]) - 1]} ${endParts[0]}`;
    periodLabel = `📅 ${startDisplay} → ${endDisplay}`;
  }

  const sheet = document.getElementById('print-sheet-area');
  if (!sheet) return;

  let tableRows = '';
  filteredOrders.forEach((o, index) => {
    let dateRange = o.dateRangeStr || `${o.startDate} - ${o.endDate}`;
    if (o.startDate && o.endDate) {
      const startParts = o.startDate.split(' ');
      const endParts = o.endDate.split(' ');
      if (startParts.length >= 2 && endParts.length >= 2) {
        const startDay = startParts[0];
        const endDay = endParts[0];
        const monthYear = startParts.slice(1).join(' ');
        dateRange = `${startDay}-${endDay} ${monthYear}`;
      }
    }

    tableRows += `
      <tr>
        <td class="text-center">${index + 1}</td>
        <td class="text-muted small font-monospace fw-bold">${o.id}</td>
        <td>${o.tenantName}</td>
        <td>${o.carName}</td>
        <td>${dateRange}</td>
        <td class="text-end fw-bold text-dark">${formatRupiah(o.total)}</td>
      </tr>
    `;
  });

  sheet.innerHTML = `
    <div class="text-center mb-4 pb-3 border-bottom">
      <h3 class="fw-bold text-dark m-0">${settings.rentalName}</h3>
      <h5 class="fw-semibold text-muted mb-1">LAPORAN KEUANGAN PENDAPATAN</h5>
      <p class="text-muted small mb-0">Periode: ${periodLabel}</p>
    </div>
    <div class="mb-3 text-muted small">
      Diproduksi pada: ${new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
    </div>
    <table class="table table-striped table-bordered mb-4">
      <thead class="table-dark">
        <tr>
          <th class="text-center" style="width: 50px;">No</th>
          <th>Invoice</th>
          <th>Penyewa</th>
          <th>Mobil</th>
          <th>Durasi Sewa</th>
          <th class="text-end">Jumlah Pendapatan</th>
        </tr>
      </thead>
      <tbody>
        ${tableRows || '<tr><td colspan="6" class="text-center py-4 text-muted">Belum ada transaksi sukses pada periode ini.</td></tr>'}
      </tbody>
      <tfoot class="table-light">
        <tr>
          <td colspan="5" class="text-end fw-bold">TOTAL PENDAPATAN:</td>
          <td class="text-end fw-bold text-success" style="font-size: 1.1rem;">${formatRupiah(sumEarnings)}</td>
        </tr>
      </tfoot>
    </table>
    <div class="row mt-5 pt-3">
      <div class="col-8"></div>
      <div class="col-4 text-center">
        <p class="text-muted small mb-5">Mengetahui, <br>Manajer Operasional</p>
        <div class="fw-bold border-bottom pb-1 d-inline-block px-3" style="min-width: 150px;">Rifqy Affandi</div>
        <p class="text-muted small mt-1">${settings.rentalName}</p>
      </div>
    </div>
  `;

  document.getElementById('print-preview-modal')?.classList.add('show');
}

function closePrintModal() {
  document.getElementById('print-preview-modal')?.classList.remove('show');
}

function triggerActualPrint() {
  closePrintModal();
  const toast = document.getElementById('toast-konfirmasi');
  const msg = document.getElementById('toast-message');
  if (toast && msg) {
    msg.textContent = 'Mencetak dokumen berhasil! Menghubungkan ke printer...';
    toast.classList.remove('d-none');
    setTimeout(() => {
      toast.classList.add('d-none');
    }, 4000);
  } else {
    alert('Mencetak dokumen berhasil! Menghubungkan ke printer...');
  }
  try {
    window.print();
  } catch (err) {
    console.log('Printing error:', err);
  }
}

// ==================== CALENDAR FUNCTIONS ====================
function initBookingWidgets() {
  const datesTrigger = document.getElementById('dates-trigger');
  const calendarPopover = document.getElementById('calendar-popover');
  const timeTrigger = document.getElementById('time-trigger');
  const timePopover = document.getElementById('time-popover');
  const locationTrigger = document.getElementById('location-trigger');
  const locationPopover = document.getElementById('location-popover');

  const dateInput = document.getElementById('rent-dates');
  const timeInput = document.getElementById('rent-time');
  const locationInput = document.getElementById('rent-location');

  if (dateInput) dateInput.style.cursor = 'default';
  if (timeInput) timeInput.style.cursor = 'default';
  if (locationInput) locationInput.style.cursor = 'default';

  function closeAllPopovers() {
    calendarPopover?.classList.add('d-none');
    timePopover?.classList.add('d-none');
    locationPopover?.classList.add('d-none');
  }

  const dateIcon = datesTrigger?.querySelector('.input-group-text');
  dateIcon?.addEventListener('click', (e) => {
    e.stopPropagation();
    if (calendarPopover?.classList.contains('d-none')) {
      closeAllPopovers();
      calendarPopover?.classList.remove('d-none');
      drawCalendar();
    } else {
      calendarPopover?.classList.add('d-none');
    }
  });

  const timeIcon = timeTrigger?.querySelector('.input-group-text');
  timeIcon?.addEventListener('click', (e) => {
    e.stopPropagation();
    if (timePopover?.classList.contains('d-none')) {
      closeAllPopovers();
      timePopover?.classList.remove('d-none');
      initTimePicker();
    } else {
      timePopover?.classList.add('d-none');
    }
  });

  const locationIcon = locationTrigger?.querySelector('.input-group-text');
  locationIcon?.addEventListener('click', (e) => {
    e.stopPropagation();
    if (locationPopover?.classList.contains('d-none')) {
      closeAllPopovers();
      locationPopover?.classList.remove('d-none');
    } else {
      locationPopover?.classList.add('d-none');
    }
  });

  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (!calendarPopover?.contains(target) && !datesTrigger?.contains(target)) {
      calendarPopover?.classList.add('d-none');
    }
    if (!timePopover?.contains(target) && !timeTrigger?.contains(target)) {
      timePopover?.classList.add('d-none');
    }
    if (!locationPopover?.contains(target) && !locationTrigger?.contains(target)) {
      locationPopover?.classList.add('d-none');
    }
  });

  const locOptions = document.querySelectorAll('.location-option');
  locOptions.forEach(opt => {
    opt.addEventListener('click', (e) => {
      const val = (e.currentTarget as HTMLElement).getAttribute('data-val') || 'Yogyakarta';
      const locInput = document.getElementById('rent-location') as HTMLInputElement;
      if (locInput) {
        locInput.value = val;
      }
      locationPopover?.classList.add('d-none');
      renderTenantCatalog();
    });
  });

  document.querySelector('.btn-prev-year')?.addEventListener('click', (e) => {
    e.stopPropagation();
    calendarYear--;
    drawCalendar();
  });

  document.querySelector('.btn-prev-month')?.addEventListener('click', (e) => {
    e.stopPropagation();
    calendarMonth--;
    if (calendarMonth < 0) {
      calendarMonth = 11;
      calendarYear--;
    }
    drawCalendar();
  });

  document.querySelector('.btn-next-month')?.addEventListener('click', (e) => {
    e.stopPropagation();
    calendarMonth++;
    if (calendarMonth > 11) {
      calendarMonth = 0;
      calendarYear++;
    }
    drawCalendar();
  });

  document.querySelector('.btn-next-year')?.addEventListener('click', (e) => {
    e.stopPropagation();
    calendarYear++;
    drawCalendar();
  });

  document.querySelector('.btn-confirm-time')?.addEventListener('click', (e) => {
    e.stopPropagation();
    const timeInput = document.getElementById('rent-time') as HTMLInputElement;
    if (timeInput) {
      const startItems = document.querySelectorAll('.start-time-list .time-option-item');
      const endItems = document.querySelectorAll('.end-time-list .time-option-item');

      let startTime = '12:00';
      let endTime = '10:00';

      startItems.forEach(el => {
        const element = el as HTMLElement;
        if (element.style.backgroundColor === 'rgb(0, 132, 255)' || element.style.backgroundColor === '#0084FF') {
          startTime = element.textContent || '12:00';
        }
      });

      endItems.forEach(el => {
        const element = el as HTMLElement;
        if (element.style.backgroundColor === 'rgb(0, 132, 255)' || element.style.backgroundColor === '#0084FF') {
          endTime = element.textContent || '10:00';
        }
      });

      timeInput.value = `${startTime} -> ${endTime}`;
    }
    timePopover?.classList.add('d-none');
    renderTenantCatalog();
  });

  const today = new Date();
  calendarYear = today.getFullYear();
  calendarMonth = today.getMonth();

  const todayStr = getTodayDateString();
  const tomorrowStr = getTomorrowDateString();
  const datesInput = document.getElementById('rent-dates') as HTMLInputElement;
  if (datesInput) {
    datesInput.value = `${todayStr} -> ${tomorrowStr}`;
  }

  const todayParts = todayStr.split('-');
  if (todayParts.length === 3) {
    selectedStartDate = `${todayParts[2]}-${todayParts[1]}-${todayParts[0]}`;
  }
  const tomorrowParts = tomorrowStr.split('-');
  if (tomorrowParts.length === 3) {
    selectedEndDate = `${tomorrowParts[2]}-${tomorrowParts[1]}-${tomorrowParts[0]}`;
  }

  drawCalendar();
  initTimePicker();
}

function drawCalendar() {
  const titleText = document.getElementById('calendar-title-text');
  const daysContainer = document.getElementById('calendar-days');
  if (!daysContainer) return;

  const monthsIndo = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agt', 'Sep', 'Okt', 'Nov', 'Des'];
  if (titleText) {
    titleText.textContent = `${monthsIndo[calendarMonth]} ${calendarYear}`;
  }

  daysContainer.innerHTML = '';

  const firstDayIndex = new Date(calendarYear, calendarMonth, 1).getDay();
  const startOffset = firstDayIndex === 0 ? 6 : firstDayIndex - 1;

  const totalDays = new Date(calendarYear, calendarMonth + 1, 0).getDate();
  const prevTotalDays = new Date(calendarYear, calendarMonth, 0).getDate();

  for (let i = startOffset - 1; i >= 0; i--) {
    const dayNum = prevTotalDays - i;
    const col = document.createElement('div');
    col.className = 'col text-muted py-1';
    col.style.cssText = 'width: 14.28%; opacity: 0.3; font-size: 0.8rem; cursor: default; text-align: center;';
    col.textContent = dayNum.toString();
    daysContainer.appendChild(col);
  }

  const startD = selectedStartDate ? new Date(selectedStartDate) : null;
  const endD = selectedEndDate ? new Date(selectedEndDate) : null;

  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  for (let d = 1; d <= totalDays; d++) {
    const col = document.createElement('div');
    col.className = 'col py-1 d-flex justify-content-center align-items-center position-relative';
    col.style.cssText = 'width: 14.28%; cursor: pointer; display: flex; justify-content: center; align-items: center;';

    const dayBtn = document.createElement('div');
    dayBtn.style.cssText = `
      width: 28px;
      height: 28px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.85rem;
      transition: all 0.15s ease;
      cursor: pointer;
      user-select: none;
    `;
    dayBtn.textContent = d.toString();

    const currDate = new Date(calendarYear, calendarMonth, d);
    const currStr = `${calendarYear}-${String(calendarMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;

    const isSelectedStart = selectedStartDate === currStr;
    const isSelectedEnd = selectedEndDate === currStr;
    const isBetween = startD && endD && currDate.getTime() > startD.getTime() && currDate.getTime() < endD.getTime();
    const isToday = currStr === todayStr;

    if (isToday && !isSelectedStart && !isSelectedEnd) {
      dayBtn.style.backgroundColor = '#0084FF';
      dayBtn.style.color = '#FFFFFF';
      dayBtn.style.fontWeight = 'bold';
      dayBtn.style.border = 'none';
    } else if (isSelectedStart) {
      dayBtn.style.backgroundColor = 'transparent';
      dayBtn.style.color = '#0084FF';
      dayBtn.style.fontWeight = 'bold';
      dayBtn.style.border = '2px solid #0084FF';
    } else if (isSelectedEnd) {
      dayBtn.style.backgroundColor = 'transparent';
      dayBtn.style.color = '#0084ff';
      dayBtn.style.fontWeight = 'bold';
      dayBtn.style.border = '2px solid #0084ff';
    } else if (isBetween) {
      dayBtn.style.backgroundColor = '#E0F2FE';
      dayBtn.style.color = '#0084FF';
      dayBtn.style.border = 'none';
    } else {
      dayBtn.style.backgroundColor = 'transparent';
      dayBtn.style.color = '#1E293B';
      dayBtn.style.border = 'none';
    }

    dayBtn.addEventListener('mouseenter', () => {
      if (!isSelectedStart && !isSelectedEnd && !isBetween && !isToday) {
        dayBtn.style.backgroundColor = '#F1F5F9';
      }
    });

    dayBtn.addEventListener('mouseleave', () => {
      if (!isSelectedStart && !isSelectedEnd && !isBetween && !isToday) {
        dayBtn.style.backgroundColor = 'transparent';
      } else if (isToday && !isSelectedStart && !isSelectedEnd) {
        dayBtn.style.backgroundColor = '#0084FF';
      } else if (isSelectedStart) {
        dayBtn.style.backgroundColor = 'transparent';
        dayBtn.style.border = '2px solid #0084FF';
      } else if (isSelectedEnd) {
        dayBtn.style.backgroundColor = 'transparent';
        dayBtn.style.border = '2px solid #0EA5E9';
      } else if (isBetween) {
        dayBtn.style.backgroundColor = '#E0F2FE';
      }
    });

    col.appendChild(dayBtn);

    col.addEventListener('click', (e) => {
      e.stopPropagation();
      const clickedStr = `${calendarYear}-${String(calendarMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const clickedDate = new Date(clickedStr);

      if (!selectedStartDate) {
        selectedStartDate = clickedStr;
        selectedEndDate = '';
        const datesInput = document.getElementById('rent-dates') as HTMLInputElement;
        if (datesInput) {
          const sParts = clickedStr.split('-');
          datesInput.value = `${sParts[2]}-${sParts[1]}-${sParts[0]} -> `;
        }
      } else if (selectedStartDate && !selectedEndDate) {
        const start = new Date(selectedStartDate);
        if (clickedDate < start) {
          selectedStartDate = clickedStr;
          selectedEndDate = '';
        } else if (clickedDate.getTime() === start.getTime()) {
          selectedStartDate = '';
          selectedEndDate = '';
        } else {
          selectedEndDate = clickedStr;
          const sParts = selectedStartDate.split('-');
          const eParts = selectedEndDate.split('-');
          const datesInput = document.getElementById('rent-dates') as HTMLInputElement;
          if (datesInput) {
            datesInput.value = `${sParts[2]}-${sParts[1]}-${sParts[0]} -> ${eParts[2]}-${eParts[1]}-${eParts[0]}`;
          }
          setTimeout(() => {
            document.getElementById('calendar-popover')?.classList.add('d-none');
            renderTenantCatalog();
          }, 300);
        }
      } else if (selectedStartDate && selectedEndDate) {
        selectedStartDate = clickedStr;
        selectedEndDate = '';
        const datesInput = document.getElementById('rent-dates') as HTMLInputElement;
        if (datesInput) {
          const sParts = clickedStr.split('-');
          datesInput.value = `${sParts[2]}-${sParts[1]}-${sParts[0]} -> `;
        }
      }

      drawCalendar();
    });

    daysContainer.appendChild(col);
  }

  const renderedCount = startOffset + totalDays;
  const remainingCells = 42 - renderedCount;
  for (let i = 1; i <= remainingCells; i++) {
    const col = document.createElement('div');
    col.className = 'col text-muted py-1';
    col.style.cssText = 'width: 14.28%; opacity: 0.3; font-size: 0.8rem; cursor: default; text-align: center;';
    col.textContent = i.toString();
    daysContainer.appendChild(col);
  }
}

function initTimePicker() {
  const startTimeContainer = document.querySelector('.start-time-list');
  const endTimeContainer = document.querySelector('.end-time-list');
  if (!startTimeContainer || !endTimeContainer) return;

  startTimeContainer.innerHTML = '';
  endTimeContainer.innerHTML = '';

  let tempStartTime = '12:00';
  let tempEndTime = '10:00';

  const timeInput = document.getElementById('rent-time') as HTMLInputElement;
  if (timeInput && timeInput.value) {
    const parts = timeInput.value.split(' -> ');
    if (parts.length === 2) {
      tempStartTime = parts[0];
      tempEndTime = parts[1];
    }
  }

  for (let h = 0; h < 24; h++) {
    const hh = String(h).padStart(2, '0') + ':00';

    const sOpt = document.createElement('div');
    sOpt.className = 'py-1 px-2 cursor-pointer text-center small time-option-item';
    sOpt.style.borderRadius = '4px';
    sOpt.textContent = hh;
    if (hh === tempStartTime) {
      sOpt.style.backgroundColor = '#0084FF';
      sOpt.style.color = '#FFFFFF';
      sOpt.style.fontWeight = 'bold';
    }
    sOpt.addEventListener('click', (e) => {
      e.stopPropagation();
      tempStartTime = hh;
      startTimeContainer.querySelectorAll('.time-option-item').forEach((el: any) => {
        el.style.backgroundColor = '';
        el.style.color = '';
        el.style.fontWeight = '';
      });
      sOpt.style.backgroundColor = '#0084FF';
      sOpt.style.color = '#FFFFFF';
      sOpt.style.fontWeight = 'bold';
    });
    startTimeContainer.appendChild(sOpt);

    const eOpt = document.createElement('div');
    eOpt.className = 'py-1 px-2 cursor-pointer text-center small time-option-item';
    eOpt.style.borderRadius = '4px';
    eOpt.textContent = hh;
    if (hh === tempEndTime) {
      eOpt.style.backgroundColor = '#0084FF';
      eOpt.style.color = '#FFFFFF';
      eOpt.style.fontWeight = 'bold';
    }
    eOpt.addEventListener('click', (e) => {
      e.stopPropagation();
      tempEndTime = hh;
      endTimeContainer.querySelectorAll('.time-option-item').forEach((el: any) => {
        el.style.backgroundColor = '';
        el.style.color = '';
        el.style.fontWeight = '';
      });
      eOpt.style.backgroundColor = '#0084FF';
      eOpt.style.color = '#FFFFFF';
      eOpt.style.fontWeight = 'bold';
    });
    endTimeContainer.appendChild(eOpt);
  }

  document.getElementById('btn-confirm-time')?.addEventListener('click', (e) => {
    e.stopPropagation();
    const timeInput = document.getElementById('rent-time') as HTMLInputElement;
    if (timeInput) {
      timeInput.value = `${tempStartTime} -> ${tempEndTime}`;
    }
    document.getElementById('time-popover')?.classList.add('d-none');
    renderTenantCatalog();
  });
}

// ==================== FINANCE CALENDAR ====================
function toggleFinanceCalendar(e: Event) {
  e.stopPropagation();
  console.log('🔄 Toggle finance calendar');

  const popover = document.getElementById('finance-calendar-popover');
  if (!popover) return;

  popover.classList.toggle('d-none');
  if (!popover.classList.contains('d-none')) {
    drawFinanceCalendar();
  }
}

function initFinanceCalendar() {
  console.log('🔧 initFinanceCalendar dipanggil');

  const triggerContainer = document.getElementById('finance-trigger-container');
  const triggerBtn = document.getElementById('btn-finance-calendar');
  const triggerLabel = document.getElementById('finance-date-range');
  const popover = document.getElementById('finance-calendar-popover');

  if (!triggerBtn) {
    console.error('❌ btn-finance-calendar tidak ditemukan!');
    return;
  }
  if (!triggerLabel) {
    console.error('❌ finance-date-range tidak ditemukan!');
    return;
  }
  if (!popover) {
    console.error('❌ finance-calendar-popover tidak ditemukan!');
    return;
  }

  console.log('✅ Finance calendar elements found');

  // Fungsi toggle
  function togglePopover(e: Event) {
    e.stopPropagation();
    console.log('🔄 Toggle finance calendar');

    if (popover.style.display === 'none' || popover.style.display === '' || popover.classList.contains('d-none')) {
      popover.style.display = 'block';
      popover.classList.remove('d-none');
      drawFinanceCalendar();
      console.log('✅ Finance calendar ditampilkan');
    } else {
      popover.style.display = 'none';
      popover.classList.add('d-none');
      console.log('✅ Finance calendar disembunyikan');
    }
  }

  // SEMUA BISA DIKLIK - tombol icon
  triggerBtn.addEventListener('click', togglePopover);

  // SEMUA BISA DIKLIK - teks
  triggerLabel.addEventListener('click', togglePopover);

  // SEMUA BISA DIKLIK - container (area kosong)
  if (triggerContainer) {
    triggerContainer.addEventListener('click', togglePopover);
  }

  // Click di luar untuk menutup
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    const container = document.getElementById('finance-trigger-container');
    if (!popover.contains(target) && !container?.contains(target)) {
      popover.style.display = 'none';
      popover.classList.add('d-none');
    }
  });

  // ... navigation dan reset filter
  document.querySelector('.finance-btn-prev-year')?.addEventListener('click', (e) => {
    e.stopPropagation();
    financeCalendarYear--;
    drawFinanceCalendar();
  });

  document.querySelector('.finance-btn-prev-month')?.addEventListener('click', (e) => {
    e.stopPropagation();
    financeCalendarMonth--;
    if (financeCalendarMonth < 0) {
      financeCalendarMonth = 11;
      financeCalendarYear--;
    }
    drawFinanceCalendar();
  });

  document.querySelector('.finance-btn-next-month')?.addEventListener('click', (e) => {
    e.stopPropagation();
    financeCalendarMonth++;
    if (financeCalendarMonth > 11) {
      financeCalendarMonth = 0;
      financeCalendarYear++;
    }
    drawFinanceCalendar();
  });

  document.querySelector('.finance-btn-next-year')?.addEventListener('click', (e) => {
    e.stopPropagation();
    financeCalendarYear++;
    drawFinanceCalendar();
  });

  document.getElementById('btn-finance-reset-filter')?.addEventListener('click', (e) => {
    e.stopPropagation();
    financeSelectedStartDate = null;
    financeSelectedEndDate = null;
    const dateRangeEl = document.getElementById('finance-date-range');
    if (dateRangeEl) dateRangeEl.textContent = 'Semua';
    const popover = document.getElementById('finance-calendar-popover');
    if (popover) {
      popover.style.display = 'none';
      popover.classList.add('d-none');
    }
    renderAdminFinance();
    console.log('✅ Filter direset');
  });

  drawFinanceCalendar();
  console.log('✅ initFinanceCalendar selesai');
}

function drawFinanceCalendar() {
  console.log('🔧 drawFinanceCalendar dipanggil');

  const titleText = document.getElementById('finance-calendar-title');
  const daysContainer = document.getElementById('finance-calendar-days');

  if (!daysContainer) {
    console.error('❌ finance-calendar-days tidak ditemukan!');
    return;
  }

  const monthsIndo = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agt', 'Sep', 'Okt', 'Nov', 'Des'];
  if (titleText) {
    titleText.textContent = `${monthsIndo[financeCalendarMonth]} ${financeCalendarYear}`;
  }

  daysContainer.innerHTML = '';

  const firstDayIndex = new Date(financeCalendarYear, financeCalendarMonth, 1).getDay();
  const startOffset = firstDayIndex === 0 ? 6 : firstDayIndex - 1;
  const totalDays = new Date(financeCalendarYear, financeCalendarMonth + 1, 0).getDate();
  const prevTotalDays = new Date(financeCalendarYear, financeCalendarMonth, 0).getDate();

  for (let i = startOffset - 1; i >= 0; i--) {
    const dayNum = prevTotalDays - i;
    const col = document.createElement('div');
    col.className = 'col text-muted py-1';
    col.style.cssText = 'width: 14.28%; opacity: 0.3; font-size: 0.8rem; cursor: default; text-align: center;';
    col.textContent = dayNum.toString();
    daysContainer.appendChild(col);
  }

  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  for (let d = 1; d <= totalDays; d++) {
    const col = document.createElement('div');
    col.className = 'col py-1 d-flex justify-content-center align-items-center';
    col.style.cssText = 'width: 14.28%; cursor: pointer; display: flex; justify-content: center; align-items: center;';

    const dayBtn = document.createElement('div');
    dayBtn.className = 'finance-calendar-day';
    dayBtn.textContent = d.toString();

    const currStr = `${financeCalendarYear}-${String(financeCalendarMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const isToday = currStr === todayStr;
    const isStart = financeSelectedStartDate === currStr;
    const isEnd = financeSelectedEndDate === currStr;
    const isBetween = financeSelectedStartDate && financeSelectedEndDate &&
      currStr > financeSelectedStartDate && currStr < financeSelectedEndDate;

    // STYLING SAMA PERSIS SEPERTI PENYEWA
    if (isToday && !isStart && !isEnd) {
      dayBtn.style.cssText = `
        width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; 
        justify-content: center; font-size: 0.8rem; cursor: pointer; transition: all 0.15s ease;
        border: 2px solid #0084FF; color: #0084FF; font-weight: 700;
      `;
    } else if (isStart) {
      dayBtn.style.cssText = `
        width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; 
        justify-content: center; font-size: 0.8rem; cursor: pointer; transition: all 0.15s ease;
        background-color: #0084FF !important; color: #FFFFFF !important; font-weight: 700;
      `;
    } else if (isEnd) {
      dayBtn.style.cssText = `
        width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; 
        justify-content: center; font-size: 0.8rem; cursor: pointer; transition: all 0.15s ease;
        background-color: #0EA5E9 !important; color: #FFFFFF !important; font-weight: 700;
      `;
    } else if (isBetween) {
      dayBtn.style.cssText = `
        width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; 
        justify-content: center; font-size: 0.8rem; cursor: pointer; transition: all 0.15s ease;
        background-color: #E0F2FE !important; color: #0084FF !important;
      `;
    } else {
      dayBtn.style.cssText = `
        width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; 
        justify-content: center; font-size: 0.8rem; cursor: pointer; transition: all 0.15s ease;
        color: #1E293B;
      `;
    }

    // Hover effect
    dayBtn.addEventListener('mouseenter', () => {
      if (!isStart && !isEnd && !isBetween && !isToday) {
        dayBtn.style.backgroundColor = '#F1F5F9';
      }
    });
    dayBtn.addEventListener('mouseleave', () => {
      if (!isStart && !isEnd && !isBetween && !isToday) {
        dayBtn.style.backgroundColor = 'transparent';
      }
    });

    col.appendChild(dayBtn);

    col.addEventListener('click', (e) => {
      e.stopPropagation();
      console.log('📅 Tanggal dipilih:', currStr);

      // LOGIKA PEMILIHAN TANGGAL SAMA PERSIS SEPERTI PENYEWA
      if (!financeSelectedStartDate) {
        // Belum ada tanggal start - pilih sebagai start
        financeSelectedStartDate = currStr;
        financeSelectedEndDate = null;
      } else if (financeSelectedStartDate && !financeSelectedEndDate) {
        // Sudah ada start, pilih sebagai end
        const start = new Date(financeSelectedStartDate);
        const clicked = new Date(currStr);
        if (clicked < start) {
          // Jika klik sebelum start, jadikan start baru
          financeSelectedStartDate = currStr;
          financeSelectedEndDate = null;
        } else if (clicked.getTime() === start.getTime()) {
          // Jika klik tanggal yang sama, unselect
          financeSelectedStartDate = null;
          financeSelectedEndDate = null;
        } else {
          // Pilih sebagai end
          financeSelectedEndDate = currStr;

          // Format tanggal untuk ditampilkan
          const monthsFull = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
          const sParts = financeSelectedStartDate.split('-');
          const eParts = financeSelectedEndDate.split('-');
          const displayDate = `${parseInt(sParts[2])} ${monthsFull[parseInt(sParts[1]) - 1]} ${sParts[0]} → ${parseInt(eParts[2])} ${monthsFull[parseInt(eParts[1]) - 1]} ${eParts[0]}`;

          const dateRangeEl = document.getElementById('finance-date-range');
          if (dateRangeEl) {
            dateRangeEl.textContent = `📅 ${displayDate}`;
          }

          // SEMBUNYIKAN POPOVER
          const popover = document.getElementById('finance-calendar-popover');
          if (popover) {
            popover.style.display = 'none';
            popover.classList.add('d-none');
          }

          renderAdminFinance();
        }
      } else if (financeSelectedStartDate && financeSelectedEndDate) {
        // Reset: pilih sebagai start baru
        financeSelectedStartDate = currStr;
        financeSelectedEndDate = null;
      }

      drawFinanceCalendar();
    });

    daysContainer.appendChild(col);
  }

  const renderedCount = startOffset + totalDays;
  const remainingCells = 42 - renderedCount;
  for (let i = 1; i <= remainingCells; i++) {
    const col = document.createElement('div');
    col.className = 'col text-muted py-1';
    col.style.cssText = 'width: 14.28%; opacity: 0.3; font-size: 0.8rem; cursor: default; text-align: center;';
    col.textContent = i.toString();
    daysContainer.appendChild(col);
  }

  console.log('✅ drawFinanceCalendar selesai');
}

// ==================== MODAL HANDLERS ====================
function initModalHandlers() {
  document.getElementById('btn-close-tambah-mobil')?.addEventListener('click', closeTambahMobilModal);
  document.getElementById('btn-cancel-tambah-mobil')?.addEventListener('click', closeTambahMobilModal);

  const dropZone = document.getElementById('car-photo-upload-container');
  const fileInput = document.getElementById('car-photo-input') as HTMLInputElement;

  dropZone?.addEventListener('click', () => fileInput?.click());
  dropZone?.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('dragover');
  });
  dropZone?.addEventListener('dragleave', () => {
    dropZone.classList.remove('dragover');
  });
  dropZone?.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('dragover');
    const files = e.dataTransfer?.files;
    if (files && files.length > 0) {
      handleCarPhotoFile(files[0]);
    }
  });

  fileInput?.addEventListener('change', () => {
    const files = fileInput.files;
    if (files && files.length > 0) {
      handleCarPhotoFile(files[0]);
    }
  });

  document.getElementById('btn-remove-photo')?.addEventListener('click', removeCarPhoto);
  document.getElementById('tambah-mobil-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    submitCarForm();
  });

  document.getElementById('btn-close-payment-modal')?.addEventListener('click', closePaymentModal);
  document.getElementById('btn-checkout-car')?.addEventListener('click', openPaymentModal);

  document.getElementById('btn-upload-ktp')?.addEventListener('click', () => {
    const ktpInput = document.getElementById('input-ktp-file') as HTMLInputElement;
    ktpInput?.click();
  });

  document.getElementById('input-ktp-file')?.addEventListener('change', (e) => {
    const files = (e.target as HTMLInputElement).files;
    if (files && files.length > 0) {
      simulateFileUpload('KTP');
    }
  });

  document.getElementById('btn-upload-sim')?.addEventListener('click', () => {
    const simInput = document.getElementById('input-sim-file') as HTMLInputElement;
    simInput?.click();
  });

  document.getElementById('input-sim-file')?.addEventListener('change', (e) => {
    const files = (e.target as HTMLInputElement).files;
    if (files && files.length > 0) {
      simulateFileUpload('SIM');
    }
  });

  const bankBtns = document.querySelectorAll('#va-selection-container .bank-option-btn');
  bankBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      bankBtns.forEach(b => b.classList.remove('selected'));
      const target = e.currentTarget as HTMLElement;
      target.classList.add('selected');
      tempSelectedPaymentMethod = target.getAttribute('data-bank') + ' Virtual Account';
      const walletBtns = document.querySelectorAll('#wallet-selection-container .bank-option-btn');
      walletBtns.forEach(w => w.classList.remove('selected'));
    });
  });

  const walletBtns = document.querySelectorAll('#wallet-selection-container .bank-option-btn');
  walletBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      walletBtns.forEach(b => b.classList.remove('selected'));
      const target = e.currentTarget as HTMLElement;
      target.classList.add('selected');
      tempSelectedPaymentMethod = target.getAttribute('data-bank') || 'GoPay';
      const bankBtns = document.querySelectorAll('#va-selection-container .bank-option-btn');
      bankBtns.forEach(b => b.classList.remove('selected'));
    });
  });

  document.getElementById('btn-complete-checkout')?.addEventListener('click', submitBookingAction);

  document.getElementById('btn-close-success')?.addEventListener('click', closeSuccessModal);
  document.getElementById('btn-go-to-history')?.addEventListener('click', () => {
    closeSuccessModal();
    showTenantSubView('history');
  });

  document.getElementById('btn-close-verifikasi-modal')?.addEventListener('click', closeVerifikasiModal);
  document.getElementById('btn-cancel-verifikasi')?.addEventListener('click', closeVerifikasiModal);
  document.getElementById('btn-submit-verifikasi')?.addEventListener('click', submitVerifikasiAction);

  document.getElementById('btn-zoom-ktp')?.addEventListener('click', () => openDocZoomModal('KTP'));
  document.getElementById('btn-zoom-sim')?.addEventListener('click', () => openDocZoomModal('SIM A'));
  document.getElementById('btn-close-doc-zoom')?.addEventListener('click', closeDocZoomModal);
  document.getElementById('btn-ok-doc-zoom')?.addEventListener('click', closeDocZoomModal);

  document.getElementById('btn-close-toast')?.addEventListener('click', () => {
    document.getElementById('toast-konfirmasi')?.classList.add('d-none');
  });

  document.getElementById('btn-close-print-modal')?.addEventListener('click', closePrintModal);
  document.getElementById('btn-cancel-print')?.addEventListener('click', closePrintModal);
  document.getElementById('btn-trigger-actual-print')?.addEventListener('click', triggerActualPrint);
}

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
  applySettingsToDOM();
  initLoginHandlers();
  initTenantHandlers();
  initAdminHandlers();
  initModalHandlers();
  initBookingWidgets();
  initFinanceCalendar();
  initPasswordToggles();

  showSection('login-section');
});


// ==================== TOGGLE PASSWORD VISIBILITY ====================
function togglePasswordVisibility(inputId: string, iconId: string) {
  const input = document.getElementById(inputId) as HTMLInputElement;
  const icon = document.getElementById(iconId) as HTMLElement;

  if (!input || !icon) return;

  if (input.type === 'password') {
    // Password TERSEMBUNYI -> TAMPILKAN (mata terbuka)
    input.type = 'text';
    icon.setAttribute('icon', 'ph:eye'); // Mata terbuka - sedang melihat
    icon.style.color = '#0084FF';
  } else {
    // Password TERLIHAT -> SEMBUNYIKAN (mata tertutup)
    input.type = 'password';
    icon.setAttribute('icon', 'ph:eye-closed'); // Mata tertutup - tidak melihat
    icon.style.color = '#64748B';
  }
}

// Inisialisasi toggle password
function initPasswordToggles() {
  // Login password toggle
  const toggleLogin = document.getElementById('toggle-login-password');
  if (toggleLogin) {
    toggleLogin.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      togglePasswordVisibility('login-password', 'login-password-icon');
    });
  }

  // Register password toggle
  const toggleRegister = document.getElementById('toggle-register-password');
  if (toggleRegister) {
    toggleRegister.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      togglePasswordVisibility('register-password', 'register-password-icon');
    });
  }
}
