const services = {
    "Ремонт под ключ": {
        description: "Полный цикл ремонта для вашего дома",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7m-9 2v10a2 2 0 002 2h4a2 2 0 002-2V14m-6-2h6" /></svg>`,
        tasks: ["Комплексный ремонт (демонтаж, отделка)"]
    },
    "Электрика": {
        description: "Освещение, розетки, проводка",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>`,
        tasks: ["Установка розеток", "Монтаж освещения", "Прокладка проводки"]
    },
    "Сантехника": {
        description: "Вода, трубы, смесители",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 14v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4m12-6V4a2 2 0 00-2-2H8a2 2 0 00-2 2v4m6 6v6" /></svg>`,
        tasks: ["Установка сантехники", "Замена труб", "Прочистка засоров"]
    },
    "Строительство": {
        description: "Отделка, кладка, плитка",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1" /></svg>`,
        tasks: ["Укладка плитки", "Штукатурка", "Покраска"]
    }
};

const servicesContainer = document.getElementById('servicesContainer');
const formContainer = document.getElementById('formContainer');
const orderForm = document.getElementById('orderForm');
const selectedService = document.getElementById('selectedService');
const taskList = document.getElementById('taskList');
const selectAllBtn = document.getElementById('selectAll');

Object.entries(services).forEach(([service, { description, icon, tasks }]) => {
    const card = document.createElement('div');
    card.className = 'card p-6 cursor-pointer';
    card.innerHTML = `
        <div class="icon">${icon}</div>
        <h3 class="mt-4 text-xl font-semibold text-gray-800">${service}</h3>
        <p class="mt-2 text-gray-600">${description}</p>
    `;
    card.addEventListener('click', () => {
        selectedService.textContent = service;
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const div = document.createElement('div');
            div.className = 'flex items-center';
            div.innerHTML = `
                <input type="checkbox" name="tasks" value="${task}" class="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500">
                <label class="text-gray-700">${task}</label>
            `;
            taskList.appendChild(div);
        });
        formContainer.classList.remove('hidden');
        servicesContainer.classList.add('hidden');
    });
    servicesContainer.appendChild(card);
});

selectAllBtn.addEventListener('click', () => {
    const checkboxes = taskList.querySelectorAll('input[type="checkbox"]');
    const allChecked = Array.from(checkboxes).every(cb => cb.checked);
    checkboxes.forEach(cb => cb.checked = !allChecked);
});

orderForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const address = document.getElementById('address').value.trim();
    const tasks = Array.from(taskList.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.value);

    if (!address) {
        document.getElementById('status').textContent = "Укажите адрес!";
        document.getElementById('status').classList.add('text-red-600');
        return;
    }
    if (tasks.length === 0) {
        document.getElementById('status').textContent = "Выберите хотя бы одну задачу!";
        document.getElementById('status').classList.add('text-red-600');
        return;
    }

    const orderData = { service: selectedService.textContent, tasks, address };
    if (window.Telegram?.WebApp) {
        window.Telegram.WebApp.sendData(JSON.stringify(orderData));
        document.getElementById('status').textContent = "Заказ отправлен! Ожидайте мастера!";
        document.getElementById('status').classList.remove('text-red-600');
        document.getElementById('status').classList.add('text-green-600');
        setTimeout(() => window.Telegram.WebApp.close(), 1000);
    } else {
        console.log("Order:", orderData);
        document.getElementById('status').textContent = "Заказ отправлен (проверь консоль)!";
        document.getElementById('status').classList.add('text-green-600');
    }
});

if (window.Telegram?.WebApp) {
    Telegram.WebApp.ready();
    Telegram.WebApp.MainButton.setText('Вызвать мастера').show().onClick(() => orderForm.requestSubmit());
}
