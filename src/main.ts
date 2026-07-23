/**
 * Rentalku - Application State & Logic
 * Framework: Bootstrap 5.3.3
 * Separated HTML, CSS, and TS/JS
 */

// Define interfaces for Type-Safety
interface Car {
  name: string;
  brand: 'Toyota' | 'Honda' | 'Mitsubishi' | 'Daihatsu' | 'Hyundai';
  transmission: 'Automatic' | 'Manual';
  plate: string;
  price: number;
  capacity: number; // Passenger count
  luggage: number;  // Bags count
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
  duration: number; // Days
  total: number;
  ktpUploaded: boolean;
  simUploaded: boolean;
  status: 'Menunggu Pembayaran' | 'Menunggu Konfirmasi' | 'Disetujui' | 'Ditolak' | 'Selesai' | 'Disewa' | 'Konfirmasi';
  paymentMethod: string;
  timestamp: string;
  dateRangeStr?: string;
}

// 1. Core Database / Application State (Seeded with high-quality models)
let cars: Car[] = [
  {
    name: 'Toyota Yaris',
    brand: 'Toyota',
    transmission: 'Automatic',
    plate: 'AB 0902 AC',
    price: 300000,
    capacity: 7,
    luggage: 2,
    status: 'Tersedia',
    image: '/src/assets/images/toyota_yaris_1784287820376.jpg'
  },
  {
    name: 'Honda Brio',
    brand: 'Honda',
    transmission: 'Automatic',
    plate: 'AB 2502 DE',
    price: 350000,
    capacity: 5,
    luggage: 2,
    status: 'Tersedia',
    image: '/src/assets/images/honda_brio_1784288042224.jpg'
  },
  {
    name: 'Toyota Avanza',
    brand: 'Toyota',
    transmission: 'Automatic',
    plate: 'AB 3017 GI',
    price: 350000,
    capacity: 7,
    luggage: 2,
    status: 'Tersedia',
    image: '/src/assets/images/toyota_avanza_1784287804405.jpg'
  },
  {
    name: 'Toyota Innova',
    brand: 'Toyota',
    transmission: 'Automatic',
    plate: 'AB 3107 HI',
    price: 400000,
    capacity: 7,
    luggage: 2,
    status: 'Tersedia',
    image: '/src/assets/images/toyota_innova_1784288062873.jpg'
  },
  {
    name: 'Mitsubishi Xpander',
    brand: 'Mitsubishi',
    transmission: 'Automatic',
    plate: 'AB 2910 JK',
    price: 450000,
    capacity: 7,
    luggage: 2,
    status: 'Tersedia',
    image: '/src/assets/images/mitsubishi_xpander_1784288080930.jpg'
  },
  {
    name: 'Toyota Fortuner',
    brand: 'Toyota',
    transmission: 'Automatic',
    plate: 'AB 0607 NK',
    price: 500000,
    capacity: 7,
    luggage: 2,
    status: 'Tersedia',
    image: '/src/assets/images/toyota_fortuner_1784288098080.jpg'
  }
];

let orders: Order[] = [
  {
    id: 'INV-098765-01',
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
    dateRangeStr: '02-04 Juli 2026'
  },
  {
    id: 'INV-098765-02',
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
    dateRangeStr: '04-05 Juli 2026'
  },
  {
    id: 'INV-876532-03',
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
    dateRangeStr: '06-08 Juli 2026'
  },
  {
    id: 'INV-934723-04',
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
    dateRangeStr: '09-10 Juli 2026'
  }
];

// Active State Variables
let currentUser: 'guest' | 'tenant' | 'admin' = 'guest';
let selectedCarIndex: number | null = null;
let editingCarIndex: number | null = null;
let verifOrderIndex: number | null = null;


// Global Settings State
let settings = {
  rentalName: 'RentalKu',
  rentalPhone: '+62 812-3456-7890',
  rentalAddress: 'Jl. Malioboro No. 45, Gedongtengen, Kota Yogyakarta, Daerah Istimewa Yogyakarta 55271',
  rentalEmail: 'support@rentalku.com',
  timezone: 'WIB'
};

// Global Financial Periods for filtering
let currentFinancePeriodIndex = 0;
const financePeriods = [
  { label: 'Semua Periode', filter: (o: Order) => true },
  { label: '01 Juli 2026 - 05 Juli 2026', filter: (o: Order) => o.startDate.includes('02 Juli') || o.startDate.includes('04 Juli') || o.startDate.includes('02/07') || o.startDate.includes('04/07') },
  { label: '06 Juli 2026 - 10 Juli 2026', filter: (o: Order) => o.startDate.includes('06 Juli') || o.startDate.includes('09 Juli') || o.startDate.includes('06-08') || o.startDate.includes('09-10') }
];

function applySettingsToDOM() {
  // Update app names
  const loginTitle = document.getElementById('login-app-title');
  if (loginTitle) loginTitle.textContent = settings.rentalName;

  const tenantLogo = document.getElementById('tenant-logo');
  if (tenantLogo) {
    tenantLogo.innerHTML = `<i class="ph-fill ph-car text-primary"></i> ${settings.rentalName}`;
  }

  const adminHeaders = document.querySelectorAll('.tracking-wide');
  adminHeaders.forEach(el => {
    el.textContent = settings.rentalName;
  });

  // Prefill settings form
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

// Temporary states for payment flow
let tempKtpUploaded = false;
let tempSimUploaded = false;
let tempSelectedPaymentMethod = 'BCA';
let tempCarPhotoUrl = '';
let countdownInterval: any = null;

// Format Currency Helper
function formatRupiah(amount: number): string {
  const formatted = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(amount);
  return formatted.replace(/\s+/g, '');
}

// Interactive Date/Time/Location Popovers State & Functions
let selectedStartDate = '2026-10-12';
let selectedEndDate = '2026-10-13';
let calendarYear = 2026;
let calendarMonth = 9; // October (0-indexed)

function initBookingWidgets() {
  const datesTrigger = document.getElementById('dates-trigger');
  const calendarPopover = document.getElementById('calendar-popover');
  
  const timeTrigger = document.getElementById('time-trigger');
  const timePopover = document.getElementById('time-popover');

  const locationTrigger = document.getElementById('location-trigger');
  const locationPopover = document.getElementById('location-popover');

  // Toggle handlers
  datesTrigger?.addEventListener('click', (e) => {
    e.stopPropagation();
    calendarPopover?.classList.toggle('d-none');
    timePopover?.classList.add('d-none');
    locationPopover?.classList.add('d-none');
  });

  timeTrigger?.addEventListener('click', (e) => {
    e.stopPropagation();
    timePopover?.classList.toggle('d-none');
    calendarPopover?.classList.add('d-none');
    locationPopover?.classList.add('d-none');
  });

  locationTrigger?.addEventListener('click', (e) => {
    e.stopPropagation();
    locationPopover?.classList.toggle('d-none');
    calendarPopover?.classList.add('d-none');
    timePopover?.classList.add('d-none');
  });

  // Close when clicking outside
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

  // Location selector options
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

  // Initialize Sub-widgets
  initCalendar();
  initTimePicker();
}

function initCalendar() {
  const datesInput = document.getElementById('rent-dates') as HTMLInputElement;
  if (datesInput && datesInput.value) {
    const parts = datesInput.value.split(' -> ');
    if (parts.length === 2) {
      const startParts = parts[0].split('-');
      if (startParts.length === 3) {
        calendarYear = parseInt(startParts[2]);
        calendarMonth = parseInt(startParts[1]) - 1;
        selectedStartDate = `${startParts[2]}-${startParts[1]}-${startParts[0]}`;
      }
      const endParts = parts[1].split('-');
      if (endParts.length === 3) {
        selectedEndDate = `${endParts[2]}-${endParts[1]}-${endParts[0]}`;
      }
    }
  }

  document.getElementById('btn-prev-year')?.addEventListener('click', (e) => {
    e.stopPropagation();
    calendarYear--;
    drawCalendar();
  });
  document.getElementById('btn-prev-month')?.addEventListener('click', (e) => {
    e.stopPropagation();
    calendarMonth--;
    if (calendarMonth < 0) {
      calendarMonth = 11;
      calendarYear--;
    }
    drawCalendar();
  });
  document.getElementById('btn-next-month')?.addEventListener('click', (e) => {
    e.stopPropagation();
    calendarMonth++;
    if (calendarMonth > 11) {
      calendarMonth = 0;
      calendarYear++;
    }
    drawCalendar();
  });
  document.getElementById('btn-next-year')?.addEventListener('click', (e) => {
    e.stopPropagation();
    calendarYear++;
    drawCalendar();
  });

  drawCalendar();
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
    col.style.width = '14.28%';
    col.style.opacity = '0.3';
    col.style.fontSize = '0.8rem';
    col.textContent = dayNum.toString();
    daysContainer.appendChild(col);
  }

  const startD = selectedStartDate ? new Date(selectedStartDate) : null;
  const endD = selectedEndDate ? new Date(selectedEndDate) : null;

  for (let d = 1; d <= totalDays; d++) {
    const col = document.createElement('div');
    col.className = 'col py-1 d-flex justify-content-center align-items-center position-relative';
    col.style.width = '14.28%';
    
    const dayBtn = document.createElement('div');
    dayBtn.className = 'd-flex justify-content-center align-items-center cursor-pointer';
    dayBtn.style.width = '28px';
    dayBtn.style.height = '28px';
    dayBtn.style.borderRadius = '50%';
    dayBtn.style.fontSize = '0.85rem';
    dayBtn.style.transition = 'all 0.15s ease';
    dayBtn.textContent = d.toString();

    const currDate = new Date(calendarYear, calendarMonth, d);
    const isSelectedStart = startD && currDate.getTime() === startD.getTime();
    const isSelectedEnd = endD && currDate.getTime() === endD.getTime();
    const isBetween = startD && endD && currDate.getTime() > startD.getTime() && currDate.getTime() < endD.getTime();

    if (isSelectedStart || isSelectedEnd) {
      dayBtn.style.backgroundColor = '#0084FF';
      dayBtn.style.color = '#FFFFFF';
      dayBtn.style.fontWeight = 'bold';
    } else if (isBetween) {
      dayBtn.style.backgroundColor = '#E0F2FE';
      dayBtn.style.color = '#0084FF';
    } else {
      dayBtn.style.color = '#1E293B';
    }

    col.appendChild(dayBtn);

    col.addEventListener('click', (e) => {
      e.stopPropagation();
      const clickedStr = `${calendarYear}-${String(calendarMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const clickedDate = new Date(clickedStr);

      if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
        selectedStartDate = clickedStr;
        selectedEndDate = '';
      } else {
        const start = new Date(selectedStartDate);
        if (clickedDate < start) {
          selectedStartDate = clickedStr;
        } else {
          selectedEndDate = clickedStr;
          const sParts = selectedStartDate.split('-');
          const eParts = selectedEndDate.split('-');
          const datesInput = document.getElementById('rent-dates') as HTMLInputElement;
          if (datesInput) {
            datesInput.value = `${sParts[2]}-${sParts[1]}-${sParts[0]} -> ${eParts[2]}-${eParts[1]}-${eParts[0]}`;
          }
          document.getElementById('calendar-popover')?.classList.add('d-none');
          renderTenantCatalog();
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
    col.style.width = '14.28%';
    col.style.opacity = '0.3';
    col.style.fontSize = '0.8rem';
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
    
    // Start Time Option
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

    // End Time Option
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

// Global DOM Loaded Entry Point
document.addEventListener('DOMContentLoaded', () => {
  applySettingsToDOM();
  initLoginHandlers();
  initTenantHandlers();
  initAdminHandlers();
  initModalHandlers();
  initBookingWidgets();

  // Show login screen initially
  showSection('login-section');
});

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

  // Deactivate all tenant nav items
  const navHome = document.getElementById('tenant-nav-home');
  const navCatalog = document.getElementById('tenant-nav-catalog');
  const navHistory = document.getElementById('tenant-nav-history');

  if (navHome) {
    navHome.classList.remove('text-primary', 'fw-semibold', 'active');
    navHome.classList.add('text-muted', 'fw-medium');
    navHome.setAttribute('style', 'color: #64748B !important; font-size: 0.95rem; font-weight: 500;');
  }
  if (navCatalog) {
    navCatalog.classList.remove('text-primary', 'fw-semibold', 'active');
    navCatalog.classList.add('text-muted', 'fw-medium');
    navCatalog.setAttribute('style', 'color: #64748B !important; font-size: 0.95rem; font-weight: 500;');
  }
  if (navHistory) {
    navHistory.classList.remove('text-primary', 'fw-semibold', 'active');
    navHistory.classList.add('text-muted', 'fw-medium');
    navHistory.setAttribute('style', 'color: #64748B !important; font-size: 0.95rem; font-weight: 500;');
  }

  if (viewId === 'catalog') {
    document.getElementById('tenant-catalog-view')?.classList.remove('d-none');
    if (navCatalog) {
      navCatalog.classList.add('text-primary', 'fw-semibold', 'active');
      navCatalog.classList.remove('text-muted', 'fw-medium');
      navCatalog.setAttribute('style', 'color: #0084FF !important; font-size: 0.95rem; font-weight: 600;');
    }
    renderTenantCatalog();
  } else if (viewId === 'detail') {
    document.getElementById('tenant-detail-view')?.classList.remove('d-none');
    renderCarDetail();
  } else if (viewId === 'history') {
    document.getElementById('tenant-history-view')?.classList.remove('d-none');
    if (navHistory) {
      navHistory.classList.add('text-primary', 'fw-semibold', 'active');
      navHistory.classList.remove('text-muted', 'fw-medium');
      navHistory.setAttribute('style', 'color: #0084FF !important; font-size: 0.95rem; font-weight: 600;');
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

  // Set all sidebar links inactive
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
interface AppUser {
  name: string;
  email: string;
  password?: string;
  role: 'tenant' | 'admin';
  phone?: string;
}

const DEFAULT_USERS: AppUser[] = [
  {
    name: 'Ana Wijaya',
    email: 'ana@rentalku.com',
    password: 'password123',
    role: 'tenant',
    phone: '08123456781'
  },
  {
    name: 'Owner RentalKu',
    email: 'admin@rentalku.com',
    password: 'password123',
    role: 'admin',
    phone: '08123456782'
  },
  {
    name: 'Budi Santoso',
    email: 'budi@email.com',
    password: 'password123',
    role: 'tenant',
    phone: '08123456789'
  }
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
  // Double-check if already exists
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

  let registerRole: 'tenant' | 'admin' = 'tenant';

  // Toggle Register Role
  function setRegisterRole(role: 'tenant' | 'admin') {
    registerRole = role;
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

  // Toggle Tabs
  function showTab(view: 'login' | 'register') {
    if (view === 'login') {
      // Tab active styling
      tabLogin.className = "btn w-50 py-2 fw-bold rounded-2 bg-white text-primary shadow-sm border-0";
      tabRegister.className = "btn w-50 py-2 fw-semibold rounded-2 text-muted border-0 bg-transparent";
      
      // Containers toggle
      loginForm?.classList.remove('d-none');
      registerForm?.classList.add('d-none');
    } else {
      // Tab active styling
      tabRegister.className = "btn w-50 py-2 fw-bold rounded-2 bg-white text-primary shadow-sm border-0";
      tabLogin.className = "btn w-50 py-2 fw-semibold rounded-2 text-muted border-0 bg-transparent";
      
      // Containers toggle
      registerForm?.classList.remove('d-none');
      loginForm?.classList.add('d-none');
    }
  }

  registerRoleTenant?.addEventListener('click', () => setRegisterRole('tenant'));
  registerRoleAdmin?.addEventListener('click', () => setRegisterRole('admin'));

  // Event listeners for tab headers
  tabLogin?.addEventListener('click', () => showTab('login'));
  tabRegister?.addEventListener('click', () => showTab('register'));

  // Event listeners for footer text links
  linkToRegister?.addEventListener('click', (e) => {
    e.preventDefault();
    showTab('register');
  });
  linkToLogin?.addEventListener('click', (e) => {
    e.preventDefault();
    showTab('login');
  });

  // Quick fill buttons for demo accounts
  const quickFillTenant = document.getElementById('quick-fill-tenant');
  const quickFillAdmin = document.getElementById('quick-fill-admin');

  quickFillTenant?.addEventListener('click', () => {
    const emailEl = document.getElementById('login-email') as HTMLInputElement;
    const passEl = document.getElementById('login-password') as HTMLInputElement;
    if (emailEl) emailEl.value = 'ana@rentalku.com';
    if (passEl) passEl.value = 'password123';
  });

  quickFillAdmin?.addEventListener('click', () => {
    const emailEl = document.getElementById('login-email') as HTMLInputElement;
    const passEl = document.getElementById('login-password') as HTMLInputElement;
    if (emailEl) emailEl.value = 'admin@rentalku.com';
    if (passEl) passEl.value = 'password123';
  });

  // Submit Login Action
  btnLoginSubmit?.addEventListener('click', () => {
    const emailInput = (document.getElementById('login-email') as HTMLInputElement).value.trim();
    const passwordInput = (document.getElementById('login-password') as HTMLInputElement).value.trim();

    if (!emailInput || !passwordInput) {
      alert('Silakan masukkan email dan kata sandi Anda.');
      return;
    }

    // Lookup user in database list
    const users = getUsers();
    const matchedUser = users.find(u => u.email.toLowerCase() === emailInput.toLowerCase());

    if (!matchedUser) {
      alert('Email belum terdaftar. Silakan daftar akun terlebih dahulu atau gunakan akun demo.');
      return;
    }

    if (matchedUser.password !== passwordInput) {
      alert('Kata sandi salah. Silakan coba lagi.');
      return;
    }

    // Login Successful!
    if (matchedUser.role === 'tenant') {
      currentUser = 'tenant';
      
      // Set Profile Name
      const profNameEl = document.getElementById('tenant-profile-name');
      if (profNameEl) profNameEl.textContent = matchedUser.name;

      showSection('tenant-section');
      showTenantSubView('catalog');
    } else {
      currentUser = 'admin';
      showSection('admin-section');
      showAdminSubView('cars');
    }
  });

  // Submit Register Action
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

    const newUser: AppUser = {
      name,
      email,
      phone,
      password,
      role: registerRole
    };

    const isSaved = saveUser(newUser);
    if (!isSaved) {
      alert('Email sudah terdaftar. Silakan gunakan email lain atau silakan masuk.');
      return;
    }

    alert(`Pendaftaran Berhasil sebagai ${registerRole === 'tenant' ? 'Penyewa' : 'Admin/Pemilik'}! Anda akan otomatis masuk.`);

    if (registerRole === 'tenant') {
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




// ==================== 2. TENANT (PENYEWA) CONTROLLER ====================
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
  document.getElementById('breadcrumb-catalog-btn')?.addEventListener('click', (e) => {
    e.preventDefault();
    showTenantSubView('catalog');
  });

  // Logout Tenant
  document.getElementById('tenant-btn-logout')?.addEventListener('click', () => {
    currentUser = 'guest';
    showSection('login-section');
  });

  // Search filter and sorter events
  document.getElementById('btn-apply-filters')?.addEventListener('click', () => {
    renderTenantCatalog();
  });

  document.getElementById('btn-reset-filters')?.addEventListener('click', () => {
    resetFilters();
  });

  document.getElementById('btn-reset-empty-filters')?.addEventListener('click', () => {
    resetFilters();
  });

  document.getElementById('sort-price')?.addEventListener('change', () => {
    renderTenantCatalog();
  });

  // History book now button
  document.getElementById('btn-history-book-now')?.addEventListener('click', () => {
    showTenantSubView('catalog');
  });

  // Mutually exclusive behavior for Kapasitas Penumpang checkboxes
  const capCheckboxes = document.querySelectorAll('.capacity-checkbox') as NodeListOf<HTMLInputElement>;
  capCheckboxes.forEach(cb => {
    cb.addEventListener('change', (e) => {
      const target = e.target as HTMLInputElement;
      if (target.id === 'cap-all') {
        if (target.checked) {
          // If "Semua" is checked, uncheck all others
          capCheckboxes.forEach(other => {
            if (other.id !== 'cap-all') other.checked = false;
          });
        }
      } else {
        if (target.checked) {
          // If a specific one is checked, uncheck "Semua"
          const allCb = document.getElementById('cap-all') as HTMLInputElement;
          if (allCb) allCb.checked = false;
        } else {
          // If all specific ones are unchecked, check "Semua"
          const anyChecked = Array.from(capCheckboxes).some(other => other.id !== 'cap-all' && other.checked);
          if (!anyChecked) {
            const allCb = document.getElementById('cap-all') as HTMLInputElement;
            if (allCb) allCb.checked = true;
          }
        }
      }
    });
  });

  // Mutually exclusive behavior for Transmisi checkboxes
  const transCheckboxes = document.querySelectorAll('.transmission-checkbox') as NodeListOf<HTMLInputElement>;
  transCheckboxes.forEach(cb => {
    cb.addEventListener('change', (e) => {
      const target = e.target as HTMLInputElement;
      if (target.id === 'trans-all') {
        if (target.checked) {
          transCheckboxes.forEach(other => {
            if (other.id !== 'trans-all') other.checked = false;
          });
        }
      } else {
        if (target.checked) {
          const allCb = document.getElementById('trans-all') as HTMLInputElement;
          if (allCb) allCb.checked = false;
        } else {
          const anyChecked = Array.from(transCheckboxes).some(other => other.id !== 'trans-all' && other.checked);
          if (!anyChecked) {
            const allCb = document.getElementById('trans-all') as HTMLInputElement;
            if (allCb) allCb.checked = true;
          }
        }
      }
    });
  });
}

function resetFilters() {
  // Reset checkboxes
  const capAll = document.getElementById('cap-all') as HTMLInputElement;
  if (capAll) capAll.checked = true;
  const capCbs = document.querySelectorAll('.capacity-checkbox') as NodeListOf<HTMLInputElement>;
  capCbs.forEach(cb => {
    if (cb.id !== 'cap-all') cb.checked = false;
  });

  const transAll = document.getElementById('trans-all') as HTMLInputElement;
  if (transAll) transAll.checked = true;
  const transCbs = document.querySelectorAll('.transmission-checkbox') as NodeListOf<HTMLInputElement>;
  transCbs.forEach(cb => {
    if (cb.id !== 'trans-all') cb.checked = false;
  });

  // Uncheck brand checkboxes
  const checkBoxes = document.querySelectorAll('.brand-checkbox') as NodeListOf<HTMLInputElement>;
  checkBoxes.forEach(box => {
    box.checked = false;
  });

  renderTenantCatalog();
}

// Render Cars grid for Tenants
function renderTenantCatalog() {
  const grid = document.getElementById('tenant-cars-grid');
  if (!grid) return;

  grid.innerHTML = '';

  // Get active capacity filters from checkboxes
  const capacityCheckboxes = document.querySelectorAll('.capacity-checkbox') as NodeListOf<HTMLInputElement>;
  let selectedCapacities: string[] = [];
  capacityCheckboxes.forEach(cb => {
    if (cb.checked) {
      selectedCapacities.push(cb.value);
    }
  });
  const hasCapacityFilter = selectedCapacities.length > 0 && !selectedCapacities.includes('all');

  // Get active transmission filters from checkboxes
  const transmissionCheckboxes = document.querySelectorAll('.transmission-checkbox') as NodeListOf<HTMLInputElement>;
  let selectedTransmissions: string[] = [];
  transmissionCheckboxes.forEach(cb => {
    if (cb.checked) {
      selectedTransmissions.push(cb.value);
    }
  });
  const hasTransFilter = selectedTransmissions.length > 0 && !selectedTransmissions.includes('all');

  // Selected brands checkboxes
  const brandCheckboxes = document.querySelectorAll('.brand-checkbox') as NodeListOf<HTMLInputElement>;
  const activeBrands: string[] = [];
  brandCheckboxes.forEach(cb => {
    if (cb.checked) activeBrands.push(cb.value);
  });

  // Filter the cars array
  let filteredCars = cars.filter(car => {
    // 1. Filter capacity
    if (hasCapacityFilter) {
      let match = false;
      if (selectedCapacities.includes('4') && car.capacity === 4) match = true;
      if (selectedCapacities.includes('5-6') && (car.capacity >= 5 && car.capacity <= 6)) match = true;
      if (selectedCapacities.includes('7') && car.capacity >= 7) match = true;
      if (!match) return false;
    }

    // 2. Filter transmission
    if (hasTransFilter) {
      if (!selectedTransmissions.includes(car.transmission)) return false;
    }

    // 3. Filter brand (type)
    if (activeBrands.length > 0 && !activeBrands.includes(car.brand)) return false;

    return true;
  });

  // Sorting
  const sortSelect = document.getElementById('sort-price') as HTMLSelectElement;
  const sortVal = sortSelect?.value || 'lowest';
  if (sortVal === 'lowest') {
    filteredCars.sort((a, b) => a.price - b.price);
  } else {
    filteredCars.sort((a, b) => b.price - a.price);
  }

  // Handle empty state
  const emptyState = document.getElementById('catalog-empty-state');
  if (filteredCars.length === 0) {
    emptyState?.classList.remove('d-none');
    return;
  } else {
    emptyState?.classList.add('d-none');
  }

  // Render cards
  filteredCars.forEach((car) => {
    // Find original index in master cars list
    const originalIndex = cars.findIndex(c => c.plate === car.plate);

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
            <button class="btn btn-black w-100 py-2.5 fw-semibold btn-pesan-mobil" data-index="${originalIndex}" id="btn-pesan-${originalIndex}">Pesan</button>
          </div>
        </div>
      </div>
    `;
    grid.appendChild(cardCol);
  });

  // Add click events to Pesan buttons
  const pesanBtns = grid.querySelectorAll('.btn-pesan-mobil');
  pesanBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = parseInt((e.currentTarget as HTMLElement).getAttribute('data-index') || '0');
      selectedCarIndex = idx;
      showTenantSubView('detail');
    });
  });
}

// Render Car details page
function renderCarDetail() {
  if (selectedCarIndex === null) return;
  const car = cars[selectedCarIndex];

  // Load detail text/badges
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

  // Standard multi-day rental pricing setup
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

  // Set ringkasan sewa values
  const pickupDate = document.getElementById('sum-pickup-date');
  if (pickupDate) pickupDate.textContent = sDateLabel;
  const pickupTime = document.getElementById('sum-pickup-time');
  if (pickupTime) pickupTime.textContent = pTime;

  const returnDate = document.getElementById('sum-return-date');
  if (returnDate) returnDate.textContent = eDateLabel;
  const returnTime = document.getElementById('sum-return-time');
  if (returnTime) returnTime.textContent = rTime;

  const sumDuration = document.getElementById('sum-duration');
  if (sumDuration) sumDuration.textContent = `${days} hari`;
}

// Render Tenant past bookings list
function renderTenantHistory() {
  const tbody = document.getElementById('history-orders-tbody');
  const emptyState = document.getElementById('history-empty-state');
  const tableCard = document.getElementById('history-table-card');

  if (!tbody) return;
  tbody.innerHTML = '';

  // Get active tenant profile name from DOM
  const activeTenantName = document.getElementById('tenant-profile-name')?.textContent || 'Ana';

  // Filter orders related to active tenant name
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
    let statusClass = '';
    if (o.status === 'Selesai' || o.status === 'Disetujui') {
      statusClass = 'status-badge-available';
    } else if (o.status === 'Menunggu Pembayaran' || o.status === 'Menunggu Konfirmasi') {
      statusClass = 'status-badge-rented';
    } else {
      statusClass = 'bg-danger-subtle text-danger px-3 py-1.5 rounded-pill small fw-semibold';
    }

    const tr = document.createElement('tr');
    tr.id = `tenant-history-row-${o.id}`;
    tr.innerHTML = `
      <td class="fw-bold text-primary small">${o.id}</td>
      <td class="fw-semibold text-dark">${o.carName}</td>
      <td><span class="badge bg-light text-dark border">${o.plate}</span></td>
      <td>${o.duration} Hari</td>
      <td class="fw-bold">${formatRupiah(o.total)}</td>
      <td><span class="${statusClass}">${o.status}</span></td>
      <td class="text-end">
        <button class="btn btn-outline-primary btn-sm btn-print-receipt d-inline-flex align-items-center gap-1 ms-auto" data-id="${o.id}" id="btn-print-${o.id}">
          <iconify-icon icon="ph:printer" class="align-middle"></iconify-icon> Cetak Bukti
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  // Printer click simulation
  const printBtns = tbody.querySelectorAll('.btn-print-receipt');
  printBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const orderId = (e.currentTarget as HTMLElement).getAttribute('data-id') || '';
      openPrintReceiptModal(orderId);
    });
  });
}


// ==================== 3. ADMIN / OWNER CONTROLLER ====================
function initAdminHandlers() {
  // Sidebar links
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

  // Logout Admin
  document.getElementById('admin-btn-logout')?.addEventListener('click', () => {
    currentUser = 'guest';
    showSection('login-section');
  });
  document.getElementById('admin-header-btn-logout')?.addEventListener('click', () => {
    currentUser = 'guest';
    showSection('login-section');
  });

  // View All Orders from Dashboard button
  document.getElementById('btn-dash-view-all-orders')?.addEventListener('click', (e) => {
    e.preventDefault();
    showAdminSubView('orders');
  });

  // Add Car trigger
  document.getElementById('btn-show-tambah-mobil')?.addEventListener('click', () => {
    openTambahMobilModal();
  });

  // Save Settings settings trigger
  document.getElementById('btn-save-settings')?.addEventListener('click', () => {
    const nameVal = (document.getElementById('settings-rental-name') as HTMLInputElement).value;
    const phoneVal = (document.getElementById('settings-rental-phone') as HTMLInputElement).value;
    const addrVal = (document.getElementById('settings-rental-address') as HTMLTextAreaElement).value;
    const emailVal = (document.getElementById('settings-rental-email') as HTMLInputElement).value;
    const tzVal = (document.getElementById('settings-rental-timezone') as HTMLSelectElement).value;

    if (!nameVal || !phoneVal || !addrVal || !emailVal) {
      alert('Harap lengkapi semua bidang pengaturan!');
      return;
    }

    settings.rentalName = nameVal;
    settings.rentalPhone = phoneVal;
    settings.rentalAddress = addrVal;
    settings.rentalEmail = emailVal;
    settings.timezone = tzVal;

    // Apply settings changes immediately across the DOM
    applySettingsToDOM();

    // Show a beautiful toast notification
    const toast = document.getElementById('toast-konfirmasi');
    const msg = document.getElementById('toast-message');
    if (toast && msg) {
      msg.textContent = 'Pengaturan rental berhasil diperbarui!';
      toast.classList.remove('d-none');
      setTimeout(() => {
        toast.classList.add('d-none');
      }, 4000);
    } else {
      alert('Pengaturan rental berhasil diperbarui!');
    }
  });

  // Financial page calendar date filter toggle
  const toggleCalBtn = document.getElementById('btn-finance-calendar');
  toggleCalBtn?.addEventListener('click', () => {
    currentFinancePeriodIndex = (currentFinancePeriodIndex + 1) % financePeriods.length;
    const dateRangeEl = document.getElementById('finance-date-range');
    if (dateRangeEl) dateRangeEl.textContent = financePeriods[currentFinancePeriodIndex].label;
    renderAdminFinance();
  });

  const toggleCalLabel = document.getElementById('finance-date-range');
  toggleCalLabel?.addEventListener('click', () => {
    currentFinancePeriodIndex = (currentFinancePeriodIndex + 1) % financePeriods.length;
    const dateRangeEl = document.getElementById('finance-date-range');
    if (dateRangeEl) dateRangeEl.textContent = financePeriods[currentFinancePeriodIndex].label;
    renderAdminFinance();
  });

  // Financial page print report trigger
  document.getElementById('btn-print-finance')?.addEventListener('click', () => {
    openPrintFinanceModal();
  });
}

function updateAdminDashboardStats() {
  // 1. Total Unit Cars
  const totalCarsEl = document.getElementById('dash-total-cars');
  if (totalCarsEl) totalCarsEl.textContent = cars.length.toString();

  // 2. Active rentals / pending
  const activeCount = orders.filter(o => o.status === 'Disetujui' || o.status === 'Selesai').length;
  const activeOrdersEl = document.getElementById('dash-active-orders');
  if (activeOrdersEl) activeOrdersEl.textContent = activeCount.toString();

  // 3. Pending Confirmations
  const pendingCount = orders.filter(o => o.status === 'Menunggu Konfirmasi' || o.status === 'Menunggu Pembayaran').length;
  const pendingOrdersEl = document.getElementById('dash-pending-orders');
  if (pendingOrdersEl) pendingOrdersEl.textContent = pendingCount.toString();

  // 4. Total Earnings calculation
  const completedOrders = orders.filter(o => o.status === 'Selesai' || o.status === 'Disetujui');
  const sumEarnings = completedOrders.reduce((sum, order) => sum + order.total, 0);
  const totalEarningsEl = document.getElementById('dash-total-earnings');
  if (totalEarningsEl) totalEarningsEl.textContent = formatRupiah(sumEarnings);

  // 5. Update circular availability gauge
  const availableCars = cars.filter(c => c.status === 'Tersedia').length;
  const availPct = Math.round((availableCars / cars.length) * 100) || 0;
  
  const gaugeEl = document.getElementById('status-gauge');
  if (gaugeEl) {
    gaugeEl.style.borderTopColor = '#0D6EFD';
    // Smooth gauge approximation by turning the circle
    gaugeEl.style.transform = `rotate(${(availPct / 100) * 360}deg)`;
  }

  const gaugePctEl = document.getElementById('gauge-avail-pct');
  if (gaugePctEl) gaugePctEl.textContent = `${availPct}%`;

  const gaugeAvailCnt = document.getElementById('gauge-avail-cnt');
  if (gaugeAvailCnt) gaugeAvailCnt.textContent = availableCars.toString();

  const gaugeRentedCnt = document.getElementById('gauge-rented-cnt');
  if (gaugeRentedCnt) gaugeRentedCnt.textContent = (cars.length - availableCars).toString();

  // 6. Populate Latest Log Table (Connected to Pemesanan)
  const tbody = document.getElementById('dash-orders-tbody');
  if (tbody) {
    tbody.innerHTML = '';
    const sortedOrders = [...orders].reverse().slice(0, 5); // latest orders connected
    sortedOrders.forEach((o) => {
      const globalIdx = orders.findIndex(item => item.id === o.id);
      let statusHTML = '';
      if (o.status === 'Selesai') {
        statusHTML = `<span class="badge rounded-pill px-3 py-1.5 fw-bold" style="background-color: #EFF6FF; color: #0084FF; border: 1px solid #BFDBFE; font-size: 0.8rem;">Selesai</span>`;
      } else if (o.status === 'Disewa') {
        statusHTML = `<span class="badge rounded-pill px-3 py-1.5 fw-bold" style="background-color: #FEF3C7; color: #D97706; border: 1px solid #FDE68A; font-size: 0.8rem;">Disewa</span>`;
      } else if (o.status === 'Konfirmasi') {
        statusHTML = `<button class="btn btn-sm btn-primary px-3 py-1 fw-bold rounded-pill shadow-sm btn-konfirmasi-order" data-index="${globalIdx >= 0 ? globalIdx : 0}" style="font-size: 0.82rem; background-color: #FF5C00; border-color: #FF5C00;">Konfirmasi</button>`;
      } else {
        statusHTML = `<span class="badge bg-light text-dark border px-3 py-1.5 fw-semibold" style="font-size: 0.8rem;">${o.status}</span>`;
      }

      const tr = document.createElement('tr');
      tr.style.borderBottom = '1px solid #F1F5F9';
      tr.innerHTML = `
        <td class="py-3 px-3 text-secondary fw-semibold" style="font-size: 0.9rem; font-family: 'Plus Jakarta Sans', sans-serif;">${o.id}</td>
        <td class="py-3 px-3 text-dark fw-bold" style="font-size: 0.9rem; font-family: 'Plus Jakarta Sans', sans-serif;">${o.tenantName}</td>
        <td class="py-3 px-3 text-dark fw-medium" style="font-size: 0.9rem; font-family: 'Plus Jakarta Sans', sans-serif;">${o.carName}</td>
        <td class="py-3 px-3 text-secondary" style="font-size: 0.88rem; font-family: 'Plus Jakarta Sans', sans-serif;">${o.dateRangeStr || `${o.startDate} - ${o.endDate}`}</td>
        <td class="py-3 px-3 text-dark fw-bold" style="font-size: 0.9rem; font-family: 'Plus Jakarta Sans', sans-serif;">${formatRupiah(o.total)}</td>
        <td class="py-3 px-3">${statusHTML}</td>
      `;
      tbody.appendChild(tr);
    });

    // Attach click listeners to "Konfirmasi" buttons on Dashboard
    tbody.querySelectorAll('.btn-konfirmasi-order').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt((e.currentTarget as HTMLElement).getAttribute('data-index') || '0');
        openVerifikasiModal(idx);
      });
    });
  }
}

// Render Cars Manage Table (CRUD)
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
    tr.id = `admin-car-row-${index}`;
    tr.style.borderBottom = '1px solid #F1F5F9';
    tr.innerHTML = `
      <td class="py-3 px-3 text-muted fw-medium" style="font-size: 0.9rem; font-family: 'Plus Jakarta Sans', sans-serif;">${index + 1}</td>
      <td class="py-3 px-3 text-dark fw-bold" style="font-size: 0.9rem; font-family: 'Plus Jakarta Sans', sans-serif;">${car.name}</td>
      <td class="py-3 px-3 text-secondary fw-medium" style="font-size: 0.9rem; font-family: 'Plus Jakarta Sans', sans-serif;">${car.transmission}</td>
      <td class="py-3 px-3 text-dark fw-semibold" style="font-size: 0.9rem; font-family: 'Plus Jakarta Sans', sans-serif;"><span class="badge bg-light text-dark border px-2.5 py-1" style="font-weight: 600; font-size: 0.82rem;">${car.plate}</span></td>
      <td class="py-3 px-3 text-dark fw-bold" style="font-size: 0.9rem; font-family: 'Plus Jakarta Sans', sans-serif;">${formatRupiah(car.price)}</td>
      <td class="py-3 px-3" style="font-size: 0.9rem; font-family: 'Plus Jakarta Sans', sans-serif;">${statusHTML}</td>
      <td class="py-3 px-3 text-center">
        <div class="d-flex align-items-center justify-content-center gap-2">
          <button class="btn btn-sm btn-light border p-1.5 rounded-2 btn-edit-car" data-index="${index}" id="btn-edit-car-${index}" style="color: #2563EB;" title="Edit Mobil">
            <iconify-icon icon="ph:pencil-simple" class="fs-5 d-block"></iconify-icon>
          </button>
          <button class="btn btn-sm btn-light border p-1.5 rounded-2 btn-delete-car" data-index="${index}" id="btn-delete-car-${index}" style="color: #EF4444;" title="Hapus Mobil">
            <iconify-icon icon="ph:trash" class="fs-5 d-block"></iconify-icon>
          </button>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });

  // Action listeners for Edit & Delete
  tbody.querySelectorAll('.btn-edit-car').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const index = parseInt((e.currentTarget as HTMLElement).getAttribute('data-index') || '0');
      openEditMobilModal(index);
    });
  });

  tbody.querySelectorAll('.btn-delete-car').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const index = parseInt((e.currentTarget as HTMLElement).getAttribute('data-index') || '0');
      deleteCarAction(index);
    });
  });
}

// Render Orders Management Table
function renderAdminOrdersTable() {
  const tbody = document.getElementById('admin-orders-tbody');
  if (!tbody) return;

  tbody.innerHTML = '';

  orders.forEach((o, index) => {
    let statusHTML = '';
    if (o.status === 'Selesai') {
      statusHTML = `<span class="badge rounded-pill px-3 py-1.5 fw-bold" style="background-color: #EFF6FF; color: #0084FF; border: 1px solid #BFDBFE; font-size: 0.8rem;">Selesai</span>`;
    } else if (o.status === 'Disewa') {
      statusHTML = `<span class="badge rounded-pill px-3 py-1.5 fw-bold" style="background-color: #FEF3C7; color: #D97706; border: 1px solid #FDE68A; font-size: 0.8rem;">Disewa</span>`;
    } else if (o.status === 'Konfirmasi') {
      statusHTML = `<button class="btn btn-sm btn-primary px-3 py-1 fw-bold rounded-pill shadow-sm btn-konfirmasi-order" data-index="${index}" style="font-size: 0.82rem; background-color: #FF5C00; border-color: #FF5C00;">Konfirmasi</button>`;
    } else {
      statusHTML = `<span class="badge bg-light text-dark border px-3 py-1.5 fw-semibold" style="font-size: 0.8rem;">${o.status}</span>`;
    }

    const tr = document.createElement('tr');
    tr.id = `admin-order-row-${index}`;
    tr.style.borderBottom = '1px solid #F1F5F9';
    tr.innerHTML = `
      <td class="py-3 px-3 text-secondary fw-semibold" style="font-size: 0.9rem; font-family: 'Plus Jakarta Sans', sans-serif;">${o.id}</td>
      <td class="py-3 px-3 text-dark fw-bold" style="font-size: 0.9rem; font-family: 'Plus Jakarta Sans', sans-serif;">${o.tenantName}</td>
      <td class="py-3 px-3 text-dark fw-medium" style="font-size: 0.9rem; font-family: 'Plus Jakarta Sans', sans-serif;">${o.carName}</td>
      <td class="py-3 px-3 text-secondary" style="font-size: 0.88rem; font-family: 'Plus Jakarta Sans', sans-serif;">${o.dateRangeStr || `${o.startDate} - ${o.endDate}`}</td>
      <td class="py-3 px-3 text-dark fw-bold" style="font-size: 0.9rem; font-family: 'Plus Jakarta Sans', sans-serif;">${formatRupiah(o.total)}</td>
      <td class="py-3 px-3">${statusHTML}</td>
    `;
    tbody.appendChild(tr);
  });

  // Attach click listener to "Konfirmasi" buttons
  tbody.querySelectorAll('.btn-konfirmasi-order').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = parseInt((e.currentTarget as HTMLElement).getAttribute('data-index') || '0');
      openVerifikasiModal(idx);
    });
  });
}

function openVerifikasiModal(idx: number) {
  verifOrderIndex = idx;
  const o = orders[idx];
  
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
  verifOrderIndex = null;
}

function openDocZoomModal(docType: 'KTP' | 'SIM A') {
  const titleTextEl = document.getElementById('doc-zoom-title-text');
  const imgEl = document.getElementById('doc-zoom-img') as HTMLImageElement;
  
  if (titleTextEl) {
    titleTextEl.textContent = `Detail Dokumen: ${docType}`;
  }

  if (imgEl) {
    if (docType === 'KTP') {
      imgEl.src = '/src/assets/images/indonesia_ktp_mockup_1784629847316.jpg';
      imgEl.alt = 'Kartu Tanda Penduduk (KTP)';
    } else {
      imgEl.src = '/src/assets/images/indonesia_sim_mockup_1784629865756.jpg';
      imgEl.alt = 'Surat Izin Mengemudi (SIM A)';
    }
  }

  document.getElementById('doc-zoom-modal')?.classList.add('show');
}

function closeDocZoomModal() {
  document.getElementById('doc-zoom-modal')?.classList.remove('show');
}

function submitVerifikasiAction() {
  if (verifOrderIndex === null) return;
  
  orders[verifOrderIndex].status = 'Disewa';
  
  const carPlate = orders[verifOrderIndex].plate;
  const carIndex = cars.findIndex(c => c.plate === carPlate);
  if (carIndex !== -1) {
    cars[carIndex].status = 'Disewa';
  }

  closeVerifikasiModal();
  renderAdminOrdersTable();
  updateAdminDashboardStats();
  showKonfirmasiToast();
}

function showKonfirmasiToast() {
  const toast = document.getElementById('toast-konfirmasi');
  if (toast) {
    toast.classList.remove('d-none');
    setTimeout(() => {
      toast.classList.add('d-none');
    }, 4000);
  }
}

// Render Finances Report Table
function renderAdminFinance() {
  const tbody = document.getElementById('finance-tbody');
  if (!tbody) return;

  tbody.innerHTML = '';

  const completedOrders = orders.filter(o => o.status === 'Selesai' || o.status === 'Disewa');

  completedOrders.forEach(o => {
    const tr = document.createElement('tr');
    tr.style.borderBottom = '1px solid #F1F5F9';
    tr.innerHTML = `
      <td class="py-3.5 text-muted" style="font-size: 0.95rem; font-family: 'Plus Jakarta Sans', sans-serif;">${o.timestamp}</td>
      <td class="py-3.5 text-dark fw-bold text-primary small" style="font-size: 0.95rem; font-family: 'Plus Jakarta Sans', sans-serif; color: #0284C7 !important;">${o.id}</td>
      <td class="py-3.5 text-dark fw-semibold" style="font-size: 0.95rem; font-family: 'Plus Jakarta Sans', sans-serif;">${o.tenantName}</td>
      <td class="py-3.5 text-dark" style="font-size: 0.95rem; font-family: 'Plus Jakarta Sans', sans-serif;">${o.carName}</td>
      <td class="py-3.5 text-dark" style="font-size: 0.95rem; font-family: 'Plus Jakarta Sans', sans-serif;">${o.dateRangeStr || `${o.startDate} - ${o.endDate}`}</td>
      <td class="py-3.5 text-dark fw-bold" style="font-size: 0.95rem; font-family: 'Plus Jakarta Sans', sans-serif;">${formatRupiah(o.total)}</td>
    `;
    tbody.appendChild(tr);
  });
}


// ==================== 4. MODALS & POPUPS ACTIONS ====================
function initModalHandlers() {
  // Tambah Mobil Close buttons
  document.getElementById('btn-close-tambah-mobil')?.addEventListener('click', closeTambahMobilModal);
  document.getElementById('btn-cancel-tambah-mobil')?.addEventListener('click', closeTambahMobilModal);

  // Drag & drop handlers for Tambah Mobil photo
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

  document.getElementById('btn-remove-photo')?.addEventListener('click', () => {
    removeCarPhoto();
  });

  // Tambah Mobil Form Submit
  document.getElementById('tambah-mobil-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    submitCarForm();
  });

  // Checkouts & Payments Modal Closures
  document.getElementById('btn-close-payment-modal')?.addEventListener('click', closePaymentModal);
  document.getElementById('btn-cancel-checkout')?.addEventListener('click', closePaymentModal);
  document.getElementById('btn-checkout-car')?.addEventListener('click', openPaymentModal);

  // Simulated Document Uploads in Payment modal
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

  // Payment Bank buttons selections
  const bankBtns = document.querySelectorAll('#va-selection-container .bank-option-btn');
  bankBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      bankBtns.forEach(b => b.classList.remove('selected'));
      const target = e.currentTarget as HTMLElement;
      target.classList.add('selected');
      tempSelectedPaymentMethod = target.getAttribute('data-bank') + ' Virtual Account';
      
      // Close wallet selections
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
      
      // Close bank selections
      const bankBtns = document.querySelectorAll('#va-selection-container .bank-option-btn');
      bankBtns.forEach(b => b.classList.remove('selected'));
    });
  });

  // Finish checkout trigger
  document.getElementById('btn-complete-checkout')?.addEventListener('click', submitBookingAction);

  // Close Success Screen
  document.getElementById('btn-close-success')?.addEventListener('click', closeSuccessModal);
  document.getElementById('btn-go-to-history')?.addEventListener('click', () => {
    closeSuccessModal();
    showTenantSubView('history');
  });

  // Copy Booking Code Button
  document.getElementById('btn-copy-code')?.addEventListener('click', () => {
    const codeSpan = document.getElementById('success-booking-code');
    if (codeSpan) {
      const code = codeSpan.textContent || '';
      navigator.clipboard.writeText(code).then(() => {
        const btn = document.getElementById('btn-copy-code');
        if (btn) {
          btn.innerHTML = '<iconify-icon icon="ph:check-bold" style="font-size: 1.5rem; color: #10B981;"></iconify-icon>';
          setTimeout(() => {
            btn.innerHTML = '<iconify-icon icon="ph:copy-simple" style="font-size: 1.5rem;"></iconify-icon>';
          }, 2000);
        }
      }).catch(err => {
        console.error('Gagal menyalin kode:', err);
      });
    }
  });

  // Verifikasi Pengambilan Modal Closures & Actions
  document.getElementById('btn-close-verifikasi-modal')?.addEventListener('click', closeVerifikasiModal);
  document.getElementById('btn-cancel-verifikasi')?.addEventListener('click', closeVerifikasiModal);
  document.getElementById('btn-submit-verifikasi')?.addEventListener('click', submitVerifikasiAction);

  // Document Zoom Modal Handlers
  document.getElementById('btn-zoom-ktp')?.addEventListener('click', () => {
    openDocZoomModal('KTP');
  });
  document.getElementById('btn-zoom-sim')?.addEventListener('click', () => {
    openDocZoomModal('SIM A');
  });
  document.getElementById('btn-close-doc-zoom')?.addEventListener('click', closeDocZoomModal);
  document.getElementById('btn-ok-doc-zoom')?.addEventListener('click', closeDocZoomModal);

  // Close Toast
  document.getElementById('btn-close-toast')?.addEventListener('click', () => {
    document.getElementById('toast-konfirmasi')?.classList.add('d-none');
  });

  // Print Modal Closures & Actions
  document.getElementById('btn-close-print-modal')?.addEventListener('click', closePrintModal);
  document.getElementById('btn-cancel-print')?.addEventListener('click', closePrintModal);
  document.getElementById('btn-trigger-actual-print')?.addEventListener('click', triggerActualPrint);
}

// Print Simulation helper functions
function closePrintModal() {
  document.getElementById('print-preview-modal')?.classList.remove('show');
}

function triggerActualPrint() {
  closePrintModal();
  
  // Show a success toast!
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

  // Try standard print
  try {
    window.print();
  } catch (err) {
    console.log('Printing error:', err);
  }
}

function openPrintReceiptModal(orderId: string) {
  const o = orders.find(x => x.id === orderId);
  if (!o) return;

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
      Terima kasih telah mempercayai ${settings.rentalName} untuk kebutuhan perjalanan Anda. Semoga perjalanan menyenangkan!
    </div>
  `;

  document.getElementById('print-preview-modal')?.classList.add('show');
}

function openPrintFinanceModal() {
  const completedOrders = orders.filter(o => o.status === 'Selesai' || o.status === 'Disewa');
  const activePeriod = financePeriods[currentFinancePeriodIndex];
  const filteredOrders = completedOrders.filter(activePeriod.filter);
  const sumEarnings = filteredOrders.reduce((sum, order) => sum + order.total, 0);

  const sheet = document.getElementById('print-sheet-area');
  if (!sheet) return;

  let tableRows = '';
  filteredOrders.forEach((o, index) => {
    tableRows += `
      <tr>
        <td class="text-center">${index + 1}</td>
        <td class="text-muted small font-monospace fw-bold">${o.id}</td>
        <td>${o.tenantName}</td>
        <td>${o.carName}</td>
        <td>${o.dateRangeStr || `${o.startDate} - ${o.endDate}`}</td>
        <td class="text-end fw-bold text-dark">${formatRupiah(o.total)}</td>
      </tr>
    `;
  });

  sheet.innerHTML = `
    <div class="text-center mb-4 pb-3 border-bottom">
      <h3 class="fw-bold text-dark m-0">${settings.rentalName}</h3>
      <h5 class="fw-semibold text-muted mb-1">LAPORAN KEUANGAN PENDAPATAN</h5>
      <p class="text-muted small mb-0">Periode: ${activePeriod.label}</p>
    </div>

    <div class="mb-3 text-muted small">
      Diproduksi secara otomatis oleh sistem manajemen pada: ${new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
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

// Tambah / Edit Car Modal triggers
function openTambahMobilModal() {
  editingCarIndex = null;
  document.getElementById('tambah-mobil-modal-title')!.textContent = 'Tambah Mobil';
  (document.getElementById('tambah-mobil-form') as HTMLFormElement).reset();
  removeCarPhoto();
  document.getElementById('car-status-group')?.classList.add('d-none');
  document.getElementById('tambah-mobil-modal')?.classList.add('show');
}

function openEditMobilModal(index: number) {
  editingCarIndex = index;
  const car = cars[index];

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

  // Validate photo or default to placeholder
  const finalImage = tempCarPhotoUrl || '/src/assets/images/toyota_avanza_1784287804405.jpg'; // fallback
  const brand = name.split(' ')[0] as any; // Simple heuristic brand parser

  let status: 'Tersedia' | 'Disewa' = 'Tersedia';
  if (editingCarIndex !== null) {
    status = (document.getElementById('car-status') as HTMLSelectElement).value as 'Tersedia' | 'Disewa';
  }

  const carData: Car = {
    name: name,
    brand: ['Toyota', 'Honda', 'Mitsubishi', 'Daihatsu', 'Hyundai'].includes(brand) ? brand : 'Toyota',
    transmission: trans,
    plate: plate,
    price: price,
    capacity: name.toLowerCase().includes('yaris') || name.toLowerCase().includes('brio') ? 4 : 7, // sensible defaults
    luggage: name.toLowerCase().includes('fortuner') || name.toLowerCase().includes('innova') ? 3 : 2,
    status: status,
    image: finalImage
  };

  if (editingCarIndex === null) {
    // Add mode
    cars.push(carData);
    alert('Mobil baru berhasil ditambahkan!');
  } else {
    // Edit mode
    cars[editingCarIndex] = carData;
    alert('Data mobil berhasil diperbarui!');
  }

  closeTambahMobilModal();
  renderAdminCarsTable();
  updateAdminDashboardStats();
}

function deleteCarAction(index: number) {
  const car = cars[index];
  if (confirm(`Apakah Anda yakin ingin menghapus mobil ${car.name} (${car.plate})?`)) {
    cars.splice(index, 1);
    renderAdminCarsTable();
    updateAdminDashboardStats();
  }
}

// Payments Modal Actions & Countdown Engine
function openPaymentModal() {
  if (selectedCarIndex === null) return;
  const car = cars[selectedCarIndex];

  // Load prices in payment modal based on dynamic duration
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

  // Reset uploaded file statuses
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

  // Set default payment method button to active
  const bankBtns = document.querySelectorAll('#va-selection-container .bank-option-btn');
  bankBtns.forEach(b => b.classList.remove('selected'));
  const firstBank = document.querySelector('#va-selection-container .bank-option-btn') as HTMLElement;
  firstBank?.classList.add('selected');
  tempSelectedPaymentMethod = 'BCA Virtual Account';

  // Start countdown timer: 1 hour (59m 59s)
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
  }, 1000); // 1s simulation delay
}

function submitBookingAction() {
  if (selectedCarIndex === null) return;

  // Enforce document uploading for realism
  if (!tempKtpUploaded || !tempSimUploaded) {
    alert('Harap unggah dokumen KTP dan SIM A Anda untuk menyelesaikan proses sewa.');
    return;
  }

  const car = cars[selectedCarIndex];
  
  // Generate invoice code with INV- prefix consistently (e.g. INV-892014)
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  const uniqueCode = `INV-${randomNum}`;
  
  // Format dates for record dynamically from search inputs
  let days = 2;
  let sDateLabel = '12 Oktober 2026';
  let eDateLabel = '14 Oktober 2026';

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
    status: 'Menunggu Konfirmasi', // goes to admin approval!
    paymentMethod: tempSelectedPaymentMethod,
    timestamp: 'Hari Ini, ' + new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
  };

  orders.push(newOrder);

  // Close timer and checkout modal
  closePaymentModal();

  // Load unique code in success popup
  const codeDisplay = document.getElementById('success-booking-code');
  if (codeDisplay) codeDisplay.textContent = uniqueCode;

  // Trigger success screen overlay
  setTimeout(() => {
    document.getElementById('success-modal')?.classList.add('show');
  }, 300);
}

function closeSuccessModal() {
  document.getElementById('success-modal')?.classList.remove('show');
}
