
const API_CONFIGS = [
    {
        url: 'https://api.covibe.cn/api/netdisk',
        keys: ['70dd370f-9160-da34-056d-a222a1253e50057ca819', '70dd370f-9160-da34-056d-a222a1253e50057ca819']
    }
];

const IP_CARD_CONFIGS = [
    {
        url: 'https://api.covibe.cn/api/ip-card',
        keys: ['440b8f54-8494-3dcf-893d-d0588841beb7775fb5c1', '440b8f54-8494-3dcf-893d-d0588841beb7775fb5c1']
    }
];

let currentConfigIndex = 0;
let currentKeyIndex = 0;
let currentDirectLink = '';
let currentFileName = '';
let selectedFormat = 'text';
let ipCardKeyIndex = 0;

const CONTACTS = {
    qq: '123456789',
    github: 'https://github.com/',
    email: 'email@example.com',
    telegram: 'https://t.me/'
};

const GREETINGS = {
    morning: {
        icon: '🌅',
        text: '早上好！',
        subtitle: '愿您有美好的一天',
        lucideIcon: 'sun',
        class: 'morning'
    },
    afternoon: {
        icon: '☀️',
        text: '下午好！',
        subtitle: '午后时光，继续加油',
        lucideIcon: 'sun',
        class: 'afternoon'
    },
    evening: {
        icon: '🌆',
        text: '傍晚好！',
        subtitle: '夕阳西下，美好黄昏',
        lucideIcon: 'sunset',
        class: 'evening'
    },
    night: {
        icon: '🌙',
        text: '晚上好！',
        subtitle: '夜深了，注意休息',
        lucideIcon: 'moon',
        class: 'night'
    }
};

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.format-option').forEach(option => {
        option.addEventListener('click', function() {
            document.querySelectorAll('.format-option').forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            selectedFormat = this.dataset.format;
        });
    });

    loadIPCard();
    updateGreeting();
    setInterval(updateGreeting, 60000);
});

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('open');
}

function openContact(type) {
    switch(type) {
        case 'qq':
            showToast(`QQ号: ${CONTACTS.qq}`, 'success');
            navigator.clipboard.writeText(CONTACTS.qq).catch(() => {});
            break;
        case 'github':
            window.open(CONTACTS.github, '_blank');
            break;
        case 'email':
            window.location.href = `mailto:${CONTACTS.email}`;
            break;
        case 'telegram':
            window.open(CONTACTS.telegram, '_blank');
            break;
    }
}

function loadIPCard() {
    const img = document.getElementById('ipCardImg');
    const error = document.getElementById('ipCardError');
    
    error.style.display = 'none';
    img.style.display = 'block';
    
    const apiKey = IP_CARD_CONFIGS[0].keys[ipCardKeyIndex % IP_CARD_CONFIGS[0].keys.length];
    ipCardKeyIndex++;
    
    img.src = `${IP_CARD_CONFIGS[0].url}?apikey=${apiKey}&type=svg`;
}

function updateGreeting() {
    const now = new Date();
    const hour = now.getHours();
    
    let greetingType;
    if (hour >= 5 && hour < 12) {
        greetingType = 'morning';
    } else if (hour >= 12 && hour < 17) {
        greetingType = 'afternoon';
    } else if (hour >= 17 && hour < 21) {
        greetingType = 'evening';
    } else {
        greetingType = 'night';
    }
    
    const greeting = GREETINGS[greetingType];
    const greetingCard = document.getElementById('greetingCard');
    const greetingTitle = document.getElementById('greetingTitle');
    const greetingIcon = document.getElementById('greetingIcon');
    const greetingText = document.getElementById('greetingText');
    const greetingTime = document.getElementById('greetingTime');
    
    greetingCard.classList.remove('morning', 'afternoon', 'evening', 'night');
    greetingCard.classList.add(greeting.class);
    
    greetingTitle.innerHTML = `<svg data-lucide="${greeting.lucideIcon}" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg><span>早晚问候</span>`;
    greetingIcon.textContent = greeting.icon;
    greetingText.textContent = greeting.text;
    greetingTime.textContent = greeting.subtitle;
}

function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const iconSvg = type === 'success' 
        ? '<svg data-lucide="check-circle" class="toast-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22,4 12,14.01 9,11.01"/></svg>'
        : '<svg data-lucide="x-circle" class="toast-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>';
    
    toast.innerHTML = `
        <div class="toast-content">
            ${iconSvg}
            <span class="toast-text">${message}</span>
        </div>
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => toast.classList.add('show'), 100);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => document.body.removeChild(toast), 300);
    }, 3000);
}

function updateStatus(text, type = 'info') {
    const statusText = document.getElementById('statusText');
    statusText.textContent = text;
}

function extractDownloadLink(result, format) {
    let downloadLink = '';
    let fileName = '';
    
    if (format === 'json') {
        try {
            const jsonResult = JSON.parse(result);
            
            const possiblePaths = [
                'data.download_url',
                'data.dlink',
                'data.url',
                'data.direct_link',
                'download_url',
                'dlink',
                'url',
                'direct_link',
                'link',
                'result.download_url',
                'result.dlink',
                'result.url'
            ];
            
            for (const path of possiblePaths) {
                const value = getNestedValue(jsonResult, path);
                if (value && typeof value === 'string' && (value.startsWith('http') || value.startsWith('//'))) {
                    downloadLink = value.startsWith('//') ? 'https:' + value : value;
                    break;
                }
            }
            
            const fileNamePaths = [
                'data.filename',
                'data.server_filename',
                'data.name',
                'data.title',
                'filename',
                'server_filename',
                'name',
                'title',
                'result.filename',
                'result.name'
            ];
            
            for (const path of fileNamePaths) {
                const value = getNestedValue(jsonResult, path);
                if (value && typeof value === 'string') {
                    fileName = value;
                    break;
                }
            }
            
        } catch (e) {
            console.error('JSON解析失败:', e);
        }
    } else {
        const trimmedResult = result.trim();
        if (trimmedResult.startsWith('http') || trimmedResult.startsWith('//')) {
            downloadLink = trimmedResult.startsWith('//') ? 'https:' + trimmedResult : trimmedResult;
        }
    }
    
    return { downloadLink, fileName };
}

function getNestedValue(obj, path) {
    return path.split('.').reduce((current, key) => {
        return current && current[key] !== undefined ? current[key] : null;
    }, obj);
}

document.getElementById('parseForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const url = formData.get('url');
    const pwd = formData.get('pwd');
    
    document.getElementById('loading').classList.add('show');
    document.getElementById('resultSection').classList.remove('show');
    updateStatus('正在尝试解析...', 'info');
    
    let success = false;
    let lastError = '';
    let attemptCount = 0;
    
    for (let configIndex = 0; configIndex < API_CONFIGS.length && !success; configIndex++) {
        const config = API_CONFIGS[(currentConfigIndex + configIndex) % API_CONFIGS.length];
        
        for (let keyIndex = 0; keyIndex < config.keys.length && !success; keyIndex++) {
            attemptCount++;
            const apiKey = config.keys[(currentKeyIndex + keyIndex) % config.keys.length];
            updateStatus(`正在使用第 ${attemptCount} 个节点解析...`, 'info');
            
            try {
                const apiUrl = new URL(config.url);
                apiUrl.searchParams.append('apikey', apiKey);
                apiUrl.searchParams.append('type', 'parse');
                apiUrl.searchParams.append('url', url);
                if (pwd) {
                    apiUrl.searchParams.append('pwd', pwd);
                }
                apiUrl.searchParams.append('format', selectedFormat);
                
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 15000);
                
                const response = await fetch(apiUrl, {
                    signal: controller.signal,
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
                    }
                });
                
                clearTimeout(timeoutId);
                const result = await response.text();
                
                if (response.ok && result && !result.toLowerCase().includes('error') && !result.includes('失败') && !result.includes('错误')) {
                    success = true;
                    currentConfigIndex = (currentConfigIndex + configIndex) % API_CONFIGS.length;
                    currentKeyIndex = (currentKeyIndex + keyIndex) % config.keys.length;
                    
                    document.getElementById('loading').classList.remove('show');
                    
                    const { downloadLink, fileName } = extractDownloadLink(result, selectedFormat);
                    currentDirectLink = downloadLink;
                    currentFileName = fileName;
                    
                    const resultSection = document.getElementById('resultSection');
                    const resultHeader = document.getElementById('resultHeader');
                    const resultContent = document.getElementById('resultContent');
                    const downloadBtn = document.getElementById('downloadBtn');
                    
                    resultSection.className = 'result-section show';
                    resultHeader.className = 'result-header';
                    resultHeader.innerHTML = '<svg data-lucide="check-circle" class="result-header-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22,4 12,14.01 9,11.01"/></svg><span class="result-title">解析完成</span>';
                    
                    if (selectedFormat === 'json') {
                        try {
                            const jsonResult = JSON.parse(result);
                            resultContent.innerHTML = `<pre>${JSON.stringify(jsonResult, null, 2)}</pre>`;
                        } catch {
                            resultContent.textContent = result;
                        }
                    } else {
                        resultContent.textContent = result;
                    }
                    
                    if (currentDirectLink) {
                        downloadBtn.style.display = 'inline-flex';
                        showToast('解析成功！已找到下载链接');
                    } else {
                        downloadBtn.style.display = 'none';
                        showToast('解析完成，但未找到直接下载链接', 'error');
                    }
                    
                    break;
                } else {
                    lastError = result || '解析失败';
                }
                
            } catch (error) {
                if (error.name === 'AbortError') {
                    lastError = '请求超时';
                } else {
                    lastError = error.message;
                }
                console.error(`节点 ${attemptCount} 请求失败:`, error);
            }
        }
    }
    
    if (!success) {
        document.getElementById('loading').classList.remove('show');
        
        const resultSection = document.getElementById('resultSection');
        const resultHeader = document.getElementById('resultHeader');
        const resultContent = document.getElementById('resultContent');
        
        resultSection.className = 'result-section show';
        resultHeader.className = 'result-header error';
        resultHeader.innerHTML = '<svg data-lucide="x-circle" class="result-header-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg><span class="result-title">解析失败</span>';
        resultContent.textContent = `解析失败: ${lastError}`;
        
        document.getElementById('downloadBtn').style.display = 'none';
        currentDirectLink = '';
        currentFileName = '';
        
        showToast('解析失败，请检查链接是否有效', 'error');
    }
});

function clearForm() {
    document.getElementById('parseForm').reset();
    document.getElementById('resultSection').classList.remove('show');
    document.getElementById('loading').classList.remove('show');
    currentDirectLink = '';
    currentFileName = '';
    
    document.querySelectorAll('.format-option').forEach(opt => opt.classList.remove('active'));
    document.querySelector('[data-format="text"]').classList.add('active');
    selectedFormat = 'text';
}

function downloadFile() {
    if (!currentDirectLink) {
        showToast('未找到有效的下载链接', 'error');
        return;
    }
    
    const fileName = currentFileName || '文件';
    const confirmMessage = `确定要下载文件吗？\n\n文件名: ${fileName}\n\n点击"确定"将在新窗口打开下载链接`;
    
    if (confirm(confirmMessage)) {
        window.open(currentDirectLink, '_blank');
        showToast('已打开下载链接');
    }
}

function copyDirectLink() {
    const resultContent = document.getElementById('resultContent');
    let textToCopy = currentDirectLink || resultContent.textContent;
    
    navigator.clipboard.writeText(textToCopy).then(() => {
        const copyBtn = document.getElementById('copyBtn');
        const originalHTML = copyBtn.innerHTML;
        
        copyBtn.innerHTML = '<svg data-lucide="check" class="action-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>已复制';
        copyBtn.classList.add('copied');
        
        setTimeout(() => {
            copyBtn.innerHTML = originalHTML;
            copyBtn.classList.remove('copied');
        }, 2000);
        
        showToast('链接已复制到剪贴板');
    }).catch(() => {
        const textArea = document.createElement('textarea');
        textArea.value = textToCopy;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            showToast('链接已复制到剪贴板');
        } catch (err) {
            showToast('复制失败，请手动复制', 'error');
        }
        document.body.removeChild(textArea);
    });
}
