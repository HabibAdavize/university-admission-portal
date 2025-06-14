// Global Variables
let currentUser = null;
let transferRequests = [];

// Utility Functions
function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.textContent = message;
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 6px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;

  switch (type) {
    case "success":
      notification.style.backgroundColor = "#28a745";
      break;
    case "error":
      notification.style.backgroundColor = "#dc3545";
      break;
    case "warning":
      notification.style.backgroundColor = "#ffc107";
      notification.style.color = "#212529";
      break;
    default:
      notification.style.backgroundColor = "#17a2b8";
  }

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 3000);
}

function navigateToPage(page) {
  window.location.href = page;
}

// Sidebar Toggle Function
function toggleSidebar() {
  const sidebar = document.querySelector(".sidebar");
  const backdrop = document.querySelector(".sidebar-backdrop");
  const toggleBtn = document.querySelector(".sidebar-toggle-btn");
  const openIcon = toggleBtn?.querySelector(".open-icon");
  const closeIcon = toggleBtn?.querySelector(".close-icon");

  sidebar?.classList.toggle("open");
  backdrop?.classList.toggle("show");

  const isOpen = sidebar?.classList.contains("open");
  if (openIcon && closeIcon) {
    openIcon.style.display = isOpen ? "none" : "inline";
    closeIcon.style.display = isOpen ? "inline" : "none";
  }
}

// Highlight the active sidebar link
function updateSidebarActiveState() {
  const path = window.location.pathname.split("/").pop();
  document.querySelectorAll(".sidebar-nav a").forEach((link) => {
    const href = link.getAttribute("href");
    const isActive = href === path;
    link.parentElement.classList.toggle("active", isActive);
  });
}

// Inject sidebar HTML and attach events
window.addEventListener("DOMContentLoaded", () => {
  const placeholder = document.getElementById("sidebar-placeholder");

  if (placeholder) {
    fetch("components/sidebar.html")
      .then((res) => res.text())
      .then((html) => {
        placeholder.innerHTML = html;

        const toggleBtn = document.querySelector(".sidebar-toggle-btn");
        const backdrop = document.querySelector(".sidebar-backdrop");

        toggleBtn?.addEventListener("click", toggleSidebar);
        backdrop?.addEventListener("click", toggleSidebar);

        updateSidebarActiveState();
      })
      .catch((err) => {
        console.error("Failed to load sidebar:", err);
      });
  }
});

// Reset sidebar state on desktop resize
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    const sidebar = document.querySelector(".sidebar");
    const backdrop = document.querySelector(".sidebar-backdrop");
    const toggleBtn = document.querySelector(".sidebar-toggle-btn");
    const openIcon = toggleBtn?.querySelector(".open-icon");
    const closeIcon = toggleBtn?.querySelector(".close-icon");

    sidebar?.classList.remove("open");
    backdrop?.classList.remove("show");

    if (openIcon && closeIcon) {
      openIcon.style.display = "inline";
      closeIcon.style.display = "none";
    }
  }
});

// Reset on page show (for back/forward navigation)
window.addEventListener("pageshow", () => {
  const sidebar = document.querySelector(".sidebar");
  const backdrop = document.querySelector(".sidebar-backdrop");
  const toggleBtn = document.querySelector(".sidebar-toggle-btn");
  const openIcon = toggleBtn?.querySelector(".open-icon");
  const closeIcon = toggleBtn?.querySelector(".close-icon");

  sidebar?.classList.remove("open");
  backdrop?.classList.remove("show");

  if (openIcon && closeIcon) {
    openIcon.style.display = "inline";
    closeIcon.style.display = "none";
  }
});



//Hero Section Toogle
document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.querySelector(".menu-toggle");
  const nav = document.querySelector("nav");
  const openIcon = toggleBtn.querySelector(".open-icon");
  const closeIcon = toggleBtn.querySelector(".close-icon");

  toggleBtn.addEventListener("click", () => {
    nav.classList.toggle("open");

    const isOpen = nav.classList.contains("open");

    // Toggle icons
    openIcon.style.display = isOpen ? "none" : "inline";
    closeIcon.style.display = isOpen ? "inline" : "none";
  });
});

// Authentication Functions
function togglePasswordVisibility() {
  const passwordInput = document.getElementById("password");
  const toggleButton = document.querySelector(".toggle-password i");

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    toggleButton.classList.remove("fa-eye");
    toggleButton.classList.add("fa-eye-slash");
  } else {
    passwordInput.type = "password";
    toggleButton.classList.remove("fa-eye-slash");
    toggleButton.classList.add("fa-eye");
  }
}

function validateLoginForm() {
  const studentId = document.getElementById("studentId").value;
  const password = document.getElementById("password").value;
  let isValid = true;

  // Reset previous error messages
  clearErrors();

  // Validate Student ID
  if (!studentId) {
    displayError("studentId", "Student ID is required");
    isValid = false;
  } else if (!/^\d{12}[A-Z]{2}$/.test(studentId)) {
    displayError(
      "studentId",
      "Please enter a valid Student ID (12 digits followed by 2 uppercase letters)"
    );
    isValid = false;
  }

  // Validate Password
  if (!password) {
    displayError("password", "Password is required");
    isValid = false;
  } else if (password.length < 6) {
    displayError("password", "Password must be at least 6 characters");
    isValid = false;
  }

  if (isValid) {
    // Store user session
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("studentId", studentId);
    localStorage.setItem("studentName", "Olamide");
    showNotification("Login successful! Redirecting...", "success");

    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 1000);
  }

  return false; // Prevent form submission
}

function displayError(inputId, message) {
  const input = document.getElementById(inputId);
  const errorDiv = document.createElement("div");
  errorDiv.className = "error-message";
  errorDiv.textContent = message;

  input.parentNode.appendChild(errorDiv);
  input.style.borderColor = "#dc3545";
}

function clearErrors() {
  const errorMessages = document.querySelectorAll(".error-message");
  errorMessages.forEach((error) => error.remove());

  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) => {
    input.style.borderColor = "#ddd";
  });
}

function checkLoginStatus() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const currentPage = window.location.pathname;

  // Pages that require authentication
  const protectedPages = [
    "dashboard.html",
    "program.html",
    "application.html",
    "payments.html",
    "admission-status.html",
    "profile.html",
    "documents.html",
    "transfer-requests.html",
    "fees-receipts.html",
  ];

  const isProtectedPage = protectedPages.some((page) =>
    currentPage.includes(page)
  );

  if (isProtectedPage && !isLoggedIn) {
    showNotification("Please login to access this page", "warning");
    setTimeout(() => {
      window.location.href = "login.html";
    }, 1500);
  }
}

function logout() {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("studentId");
  localStorage.removeItem("studentName");
  showNotification("Logged out successfully", "success");
  setTimeout(() => {
    window.location.href = "index.html";
  }, 1000);
}

// Dashboard Functions
function initDashboard() {
  if (document.querySelector(".dashboard-body")) {
    const studentName = localStorage.getItem("studentName") || "Student";
    const welcomeHeading = document.querySelector(".welcome-message h2");
    if (welcomeHeading) {
      welcomeHeading.textContent = `Welcome back ${studentName}!`;
    }

    // Update sidebar active state
    updateSidebarActiveState();
  }
}

function updateSidebarActiveState() {
  const currentPage = window.location.pathname;
  const sidebarLinks = document.querySelectorAll(".sidebar-nav li");

  sidebarLinks.forEach((li) => {
    li.classList.remove("active");
    const link = li.querySelector("a");
    if (link && currentPage.includes(link.getAttribute("href"))) {
      li.classList.add("active");
    }
  });
}

// Progress Steps Functions
function toggleStep(stepNumber) {
  const details = document.getElementById(`step-${stepNumber}-details`);
  const header = details.previousElementSibling;
  const icon = header.querySelector(".toggle-icon");

  if (details.style.display === "none" || details.style.display === "") {
    details.style.display = "block";
    header.classList.add("expanded");
  } else {
    details.style.display = "none";
    header.classList.remove("expanded");
  }
}

// Admission Status Functions
function switchTab(tabName) {
  // Remove active class from all tabs and content
  document
    .querySelectorAll(".tab-button")
    .forEach((btn) => btn.classList.remove("active"));
  document
    .querySelectorAll(".tab-content")
    .forEach((content) => content.classList.remove("active"));

  // Add active class to clicked tab and corresponding content
  event.target.classList.add("active");
  document.getElementById(tabName).classList.add("active");
}

function printAdmissionLetter() {
  showNotification("Generating admission letter...", "info");
  setTimeout(() => {
    showNotification("Admission letter downloaded successfully!", "success");
  }, 2000);
}

// Payment Functions
function formatCardNumber(input) {
  let value = input.value.replace(/\s/g, "").replace(/[^0-9]/gi, "");
  let formattedValue = value.match(/.{1,4}/g)?.join(" ") || value;
  input.value = formattedValue;
}

function formatExpiryDate(input) {
  let value = input.value.replace(/\D/g, "");
  if (value.length >= 2) {
    value = value.substring(0, 2) + "/" + value.substring(2, 4);
  }
  input.value = value;
}

function validatePaymentForm() {
  const paymentMethod = document.querySelector(
    'input[name="paymentMethod"]:checked'
  ).value;
  const agreeTerms = document.getElementById("agreeTerms").checked;

  if (!agreeTerms) {
    showNotification(
      "Please agree to the Terms & Conditions and Privacy Policy",
      "error"
    );
    return false;
  }

  if (paymentMethod === "creditcard") {
    const cardNumber = document.getElementById("cardNumber").value;
    const cardName = document.getElementById("cardName").value;
    const expiryDate = document.getElementById("expiryDate").value;
    const cvv = document.getElementById("cvv").value;

    if (!cardNumber || cardNumber.replace(/\s/g, "").length < 16) {
      showNotification("Please enter a valid card number", "error");
      return false;
    }

    if (!cardName.trim()) {
      showNotification("Please enter the name on card", "error");
      return false;
    }

    if (!expiryDate || expiryDate.length < 5) {
      showNotification("Please enter a valid expiry date", "error");
      return false;
    }

    if (!cvv || cvv.length < 3) {
      showNotification("Please enter a valid CVV", "error");
      return false;
    }
  }

  // Simulate payment processing
  showNotification("Processing payment...", "info");
  setTimeout(() => {
    showNotification("Payment processed successfully!", "success");
    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 2000);
  }, 3000);

  return false; // Prevent actual form submission
}

// Document Functions
function viewDocument(documentType) {
  const modal = document.getElementById("documentModal");
  const modalTitle = document.getElementById("modalTitle");

  const documentTitles = {
    "jamb-result": "JAMB Result",
    "o-level-result": "O Level Result",
    "birth-certificate": "Certificate of Birth",
    "origin-certificate": "Certificate of Origin",
    "screening-result": "Pre-Admission Screening Result",
    "screening-form": "Pre-Admission Screening Registration Form",
  };

  modalTitle.textContent = documentTitles[documentType] || "Document Viewer";
  modal.style.display = "block";

  showNotification("Document loaded successfully", "success");
}

function closeModal() {
  const modal = document.getElementById("documentModal");
  modal.style.display = "none";
}

function downloadDocument() {
  showNotification("Document download started...", "info");
  setTimeout(() => {
    showNotification("Document downloaded successfully!", "success");
  }, 1500);
}

function printDocument() {
  showNotification("Opening print dialog...", "info");
  setTimeout(() => {
    window.print();
  }, 500);
}

function triggerFileUpload() {
  document.getElementById("fileUpload").click();
}

function addSignature() {
  showNotification(
    "Signature feature would open a signature pad in a real application",
    "info"
  );
}

// Transfer Request Functions
function openTransferModal() {
  document.getElementById("transferModal").style.display = "block";
}

function closeTransferModal() {
  document.getElementById("transferModal").style.display = "none";
  document.getElementById("transferForm").reset();
}

function submitTransferRequest() {
  const form = document.getElementById("transferForm");
  const formData = new FormData(form);

  const destinationProgramme =
    formData.get("destinationProgramme") ||
    document.getElementById("destinationProgramme").value;
  const destinationDepartment =
    formData.get("destinationDepartment") ||
    document.getElementById("destinationDepartment").value;
  const targetLevel =
    formData.get("targetLevel") || document.getElementById("targetLevel").value;
  const transferSession =
    formData.get("transferSession") ||
    document.getElementById("transferSession").value;
  const reason =
    formData.get("reason") || document.getElementById("reason").value;

  if (
    !destinationProgramme ||
    !destinationDepartment ||
    !targetLevel ||
    !transferSession ||
    !reason
  ) {
    showNotification("Please fill in all required fields", "error");
    return false;
  }

  // Add to transfer requests
  const newRequest = {
    id: Date.now(),
    destinationProgramme,
    destinationDepartment,
    targetLevel,
    transferSession,
    status: "Pending",
    cgpa: "N/A",
    fee: "₦5,000.00",
    reason,
    dateSubmitted: new Date().toLocaleDateString(),
  };

  transferRequests.push(newRequest);
  localStorage.setItem("transferRequests", JSON.stringify(transferRequests));

  showNotification("Transfer request submitted successfully!", "success");
  closeTransferModal();

  // Update table if on transfer requests page
  if (document.getElementById("transferTableBody")) {
    addTransferRequestToTable(newRequest);
  }

  return false;
}

function addTransferRequestToTable(request) {
  const tableBody = document.getElementById("transferTableBody");
  const noDataRow = tableBody.querySelector(".no-data");

  if (noDataRow) {
    noDataRow.remove();
  }

  const row = document.createElement("tr");
  row.innerHTML = `
        <td>${request.destinationProgramme}</td>
        <td>${request.destinationDepartment}</td>
        <td><span class="status-badge pending">${request.status}</span></td>
        <td>${request.targetLevel}</td>
        <td>${request.transferSession}</td>
        <td>${request.cgpa}</td>
        <td>${request.fee}</td>
        <td>
            <button class="action-btn get-status" onclick="viewTransferDetails(${request.id})">View</button>
        </td>
    `;

  tableBody.appendChild(row);
}

function viewTransferDetails(requestId) {
  const request = transferRequests.find((r) => r.id === requestId);
  if (request) {
    showNotification(
      `Transfer request details: ${request.destinationProgramme} - ${request.status}`,
      "info"
    );
  }
}

function filterBySession() {
  const selectedSession = document.getElementById("academicSession").value;
  showNotification(`Filtering by session: ${selectedSession || "All"}`, "info");
}

// Fees & Receipts Functions
function searchTransactions() {
  const searchTerm = document.getElementById("searchInput").value.toLowerCase();
  const tableRows = document.querySelectorAll("#feesTableBody tr");

  tableRows.forEach((row) => {
    const text = row.textContent.toLowerCase();
    if (text.includes(searchTerm)) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
}

function printReceipt(transactionId) {
  showNotification(
    `Generating receipt for transaction: ${transactionId}`,
    "info"
  );
  setTimeout(() => {
    showNotification("Receipt printed successfully!", "success");
  }, 1500);
}

function getStatus(transactionId) {
  showNotification(`Checking status for transaction: ${transactionId}`, "info");
  setTimeout(() => {
    showNotification("Transaction status updated", "success");
  }, 1000);
}

function getStamp(transactionId) {
  showNotification(
    `Generating stamp for transaction: ${transactionId}`,
    "info"
  );
  setTimeout(() => {
    showNotification("Payment stamp generated successfully!", "success");
  }, 1500);
}

// Profile Functions
function editProfile(section) {
  showNotification(
    `Editing ${section} section. This feature would allow inline editing of profile information.`,
    "info"
  );
}

// File Upload Handling
function handleFileUpload(files) {
  if (files.length > 0) {
    let fileNames = Array.from(files)
      .map((file) => file.name)
      .join(", ");
    showNotification(`Selected files: ${fileNames}`, "success");

    // Simulate file upload
    setTimeout(() => {
      showNotification("Files uploaded successfully!", "success");
    }, 2000);
  }
}

// Initialize Payment Method Selection
function initPaymentMethods() {
  const paymentOptions = document.querySelectorAll(
    'input[name="paymentMethod"]'
  );
  paymentOptions.forEach((option) => {
    option.addEventListener("change", function () {
      // Hide all payment details
      document.querySelectorAll(".payment-details").forEach((details) => {
        details.style.display = "none";
      });

      // Show selected payment details
      const selectedDetails = document.getElementById(this.value + "-details");
      if (selectedDetails) {
        selectedDetails.style.display = "block";
      }
    });
  });

  // Initialize credit card details as visible (default selection)
  const creditCardDetails = document.getElementById("creditcard-details");
  if (creditCardDetails) {
    creditCardDetails.style.display = "block";
  }
}

// Event Listeners and Initialization
document.addEventListener("DOMContentLoaded", function () {
  // Check authentication status
  checkLoginStatus();

  // Initialize dashboard
  initDashboard();

  // Initialize payment methods
  initPaymentMethods();

  // Load transfer requests from localStorage
  const savedRequests = localStorage.getItem("transferRequests");
  if (savedRequests) {
    transferRequests = JSON.parse(savedRequests);

    // Populate transfer requests table if on that page
    const transferTableBody = document.getElementById("transferTableBody");
    if (transferTableBody && transferRequests.length > 0) {
      const noDataRow = transferTableBody.querySelector(".no-data");
      if (noDataRow) {
        noDataRow.remove();
      }

      transferRequests.forEach((request) => {
        addTransferRequestToTable(request);
      });
    }
  }

  // Card number formatting
  const cardNumberInput = document.getElementById("cardNumber");
  if (cardNumberInput) {
    cardNumberInput.addEventListener("input", function () {
      formatCardNumber(this);
    });
  }

  // Expiry date formatting
  const expiryDateInput = document.getElementById("expiryDate");
  if (expiryDateInput) {
    expiryDateInput.addEventListener("input", function () {
      formatExpiryDate(this);
    });
  }

  // CVV input restriction
  const cvvInput = document.getElementById("cvv");
  if (cvvInput) {
    cvvInput.addEventListener("input", function () {
      this.value = this.value.replace(/\D/g, "");
    });
  }

  // File upload handling
  const fileUpload = document.getElementById("fileUpload");
  if (fileUpload) {
    fileUpload.addEventListener("change", function (e) {
      handleFileUpload(e.target.files);
    });
  }

  // Edit buttons functionality
  const editButtons = document.querySelectorAll(".edit-btn");
  editButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const section = this.closest(".subsection, .profile-section");
      const sectionName = section.querySelector("h2, h3").textContent;
      editProfile(sectionName);
    });
  });

  // Responsive navigation toggle
  const mobileBreakpoint = 768;

});

// Close modals when clicking outside
window.addEventListener("click", function (event) {
  const documentModal = document.getElementById("documentModal");
  const transferModal = document.getElementById("transferModal");

  if (event.target === documentModal) {
    closeModal();
  }

  if (event.target === transferModal) {
    closeTransferModal();
  }
});

// Keyboard shortcuts
document.addEventListener("keydown", function (event) {
  // ESC key to close modals
  if (event.key === "Escape") {
    const documentModal = document.getElementById("documentModal");
    const transferModal = document.getElementById("transferModal");

    if (documentModal && documentModal.style.display === "block") {
      closeModal();
    }

    if (transferModal && transferModal.style.display === "block") {
      closeTransferModal();
    }
  }

  // Ctrl+L for logout (when logged in)
  if (event.ctrlKey && event.key === "l") {
    event.preventDefault();
    if (localStorage.getItem("isLoggedIn")) {
      logout();
    }
  }
});

// Add CSS animations
const style = document.createElement("style");
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .notification {
        animation: slideIn 0.3s ease;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    .modal {
        animation: fadeIn 0.3s ease;
    }
    
    @keyframes slideUp {
        from {
            transform: translateY(20px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    .modal-content {
        animation: slideUp 0.3s ease;
    }
`;
document.head.appendChild(style);

// Export functions for global access
window.UniversityPortal = {
  login: validateLoginForm,
  logout: logout,
  navigateToPage: navigateToPage,
  showNotification: showNotification,
  toggleStep: toggleStep,
  switchTab: switchTab,
  viewDocument: viewDocument,
  printReceipt: printReceipt,
  getStatus: getStatus,
  getStamp: getStamp,
};
