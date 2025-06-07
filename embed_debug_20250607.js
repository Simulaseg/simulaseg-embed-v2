/**
 * SimulaSeg Embed Script - Debug Version 20250607
 * US Version with dollar values and US states
 * Enhanced with better error handling and debugging
 * 
 * This script loads the insurance simulator with agent customizations
 * It uses US states and dollar values while maintaining Portuguese interface
 */
(function() {
    // Create a unique namespace to avoid conflicts
    window.SimulaSeg = window.SimulaSeg || {};
    
    // Prevent multiple initializations
    if (window.SimulaSeg.initialized) return;
    window.SimulaSeg.initialized = true;

    // Debug mode - set to true for detailed logging
    const DEBUG_MODE = true;
    
    function debugLog(message, data = null) {
        if (DEBUG_MODE) {
            console.log('SimulaSeg Debug:', message, data || '');
        }
    }

    // Get script element and data attributes
    const scripts = document.getElementsByTagName('script');
    const script = scripts[scripts.length - 1];

    // Enhanced API URL detection with fallbacks
    function detectApiUrl() {
        debugLog('Detecting API URL...');
        
        // First check if API URL is explicitly provided as a data attribute
        const explicitApiUrl = script.getAttribute('data-api-url');
        if (explicitApiUrl) {
            debugLog('Using explicit API URL:', explicitApiUrl);
            return explicitApiUrl;
        }

        // Try to extract domain from script source
        const scriptSrc = script.src || '';
        debugLog('Script source:', scriptSrc);
        
        try {
            // Extract domain from script source
            const scriptUrl = new URL(scriptSrc);
            const scriptDomain = `${scriptUrl.protocol}//${scriptUrl.hostname}${scriptUrl.port ? ':' + scriptUrl.port : ''}`;
            
            // Check if this is from jsdelivr (GitHub) or GitHub Pages
            if (scriptUrl.hostname.includes('jsdelivr.net') || scriptUrl.hostname.includes('github.io')) {
                // Default to Replit domain if script is from CDN
                const apiUrl = 'https://01eb48f3-0c67-4e54-8672-705edb2d6603-00-16dhjlhgrycbt.kirk.replit.dev';
                debugLog('Using Replit API URL:', apiUrl);
                return apiUrl;
            }
            
            // Otherwise use same domain as script
            debugLog('Using same domain as script:', scriptDomain);
            return scriptDomain;
        } catch (e) {
            debugLog('Error detecting API URL:', e);
            // Fallback to Replit domain
            const fallbackUrl = 'https://01eb48f3-0c67-4e54-8672-705edb2d6603-00-16dhjlhgrycbt.kirk.replit.dev';
            debugLog('Using fallback API URL:', fallbackUrl);
            return fallbackUrl;
        }
    }

    // Get agent data from script attributes
    const config = {
        agentId: script.getAttribute('data-agent-id') || '',
        whatsapp: script.getAttribute('data-whatsapp') || '',
        email: script.getAttribute('data-email') || '',
        secondaryEmail: script.getAttribute('data-secondary-email') || 'segsimula@gmail.com',
        message: script.getAttribute('data-message') || 'Olá, gostaria de saber mais sobre o seguro de vida.',
        thankYouUrl: script.getAttribute('data-thank-you-url') || '',
        primaryColor: script.getAttribute('data-primary-color') || '#0056b3',
        secondaryColor: script.getAttribute('data-secondary-color') || '#28a745',
        accentColor: script.getAttribute('data-accent-color') || '#ffc107',
        formspreeCode: script.getAttribute('data-formspree-code') || '',
        simulatorTitle: script.getAttribute('data-simulator-title') || 'SIMULE SUA PROTEÇÃO COM BENEFÍCIO EM VIDA',
        apiUrl: detectApiUrl()
    };

    debugLog('Configuration loaded:', config);

    // Container element
    const container = document.getElementById('simulaseg-embed');
    if (!container) {
        debugLog('ERROR: Container element not found');
        console.error('SimulaSeg: Container element not found. Please add a div with id="simulaseg-embed"');
        return;
    }

    debugLog('Container found:', container);

    // Enhanced agent status check with retries
    function checkAgentStatus(agentId, callback, retryCount = 0) {
        const maxRetries = 3;
        const apiEndpoint = `${config.apiUrl}/api/check_simulator_status`;
        
        debugLog(`Checking agent status (attempt ${retryCount + 1}/${maxRetries + 1})`, {
            agentId: agentId,
            endpoint: apiEndpoint
        });

        fetch(apiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ agent_id: agentId }),
        })
        .then(response => {
            debugLog('API Response status:', response.status);
            debugLog('API Response headers:', Object.fromEntries(response.headers.entries()));
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            debugLog('API Response data:', data);
            
            if (data.available === true) {
                debugLog('Agent is available, loading simulator');
                callback(true);
            } else {
                debugLog('Agent is not available:', data.message || 'Unknown reason');
                callback(false);
            }
        })
        .catch(error => {
            debugLog('API Error:', error);
            
            if (retryCount < maxRetries) {
                debugLog(`Retrying in 2 seconds... (${retryCount + 1}/${maxRetries})`);
                setTimeout(() => {
                    checkAgentStatus(agentId, callback, retryCount + 1);
                }, 2000);
            } else {
                debugLog('Max retries reached, agent check failed');
                callback(false);
            }
        });
    }

    // Enhanced error display
    function showError(message, details = null) {
        debugLog('Showing error:', message, details);
        
        let errorHtml = `<div style="padding: 20px; border: 2px solid #dc3545; border-radius: 8px; background-color: #f8d7da; color: #721c24; font-family: Arial, sans-serif;">
            <h4 style="margin: 0 0 10px 0;">⚠️ Erro no Simulador</h4>
            <p style="margin: 0 0 10px 0;">${message}</p>`;
        
        if (DEBUG_MODE && details) {
            errorHtml += `<details style="margin-top: 10px;">
                <summary style="cursor: pointer; font-weight: bold;">Detalhes técnicos (Debug)</summary>
                <pre style="background: #fff; padding: 10px; margin: 10px 0; border-radius: 4px; overflow: auto; font-size: 12px;">${JSON.stringify(details, null, 2)}</pre>
            </details>`;
        }
        
        errorHtml += `</div>`;
        container.innerHTML = errorHtml;
    }

    // Check if agent is active
    debugLog('Starting agent status check...');
    checkAgentStatus(config.agentId, function(isActive) {
        if (!isActive) {
            showError('Simulador não disponível. Entre em contato com o suporte.', {
                agentId: config.agentId,
                apiUrl: config.apiUrl,
                timestamp: new Date().toISOString()
            });
            return;
        }

        // Load simulator
        debugLog('Loading simulator...');
        loadSimulator();
        
        // Register simulation view
        registerSimulation(config.agentId);
    });

    // Function to register simulation
    function registerSimulation(agentId) {
        debugLog('Registering simulation for agent:', agentId);
        
        fetch(`${config.apiUrl}/api/simulation`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ agent_id: agentId }),
        })
        .then(response => response.json())
        .then(data => {
            debugLog('Simulation registered:', data);
        })
        .catch(error => {
            debugLog('Error registering simulation:', error);
        });
    }

    // Function to register lead
    function registerLead(agentId, leadData) {
        debugLog('Registering lead for agent:', agentId, leadData);
        
        fetch(`${config.apiUrl}/api/lead`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                agent_id: agentId, 
                lead_data: leadData 
            }),
        })
        .then(response => response.json())
        .then(data => {
            debugLog('Lead registered:', data);
        })
        .catch(error => {
            debugLog('Error registering lead:', error);
        });
    }

    // Function to load simulator
    function loadSimulator() {
        debugLog('Loading simulator interface...');
        
        // Add CSS styles - UPDATED WITH MODERN DESIGN
        const styles = `
            @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
            
            .simulaseg-container {
                font-family: 'Poppins', sans-serif;
                max-width: 800px;
                margin: 0 auto;
                padding: 20px;
                box-sizing: border-box;
                color: #333;
                box-shadow: 0 5px 20px rgba(0,0,0,0.05);
                border-radius: 12px;
            }
            
            .simulaseg-container * {
                box-sizing: border-box;
            }
            
            .simulaseg-header {
                background: linear-gradient(135deg, ${config.primaryColor}, ${adjustColor(config.primaryColor, -30)});
                color: white;
                padding: 20px;
                text-align: center;
                border-radius: 12px 12px 0 0;
                margin-bottom: 0;
                box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            }
            
            .simulaseg-header h1 {
                margin: 0;
                font-size: 1.6em;
                font-weight: 600;
                letter-spacing: 0.5px;
            }
            
            .simulaseg-card {
                background-color: #ffffff;
                padding: 25px;
                border-radius: 0 0 12px 12px;
                border: 1px solid #eaeaea;
                border-top: none;
            }
            
            .simulaseg-btn {
                background: linear-gradient(135deg, ${config.secondaryColor}, ${adjustColor(config.secondaryColor, -20)});
                color: white;
                border: none;
                padding: 14px 20px;
                border-radius: 8px;
                cursor: pointer;
                font-size: 1em;
                font-weight: 600;
                width: 100%;
                margin-top: 15px;
                transition: all 0.3s ease;
                box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                letter-spacing: 0.5px;
            }
            
            .simulaseg-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 12px rgba(0,0,0,0.15);
            }
        `;

        // Create style element
        const styleElement = document.createElement('style');
        styleElement.textContent = styles;
        document.head.appendChild(styleElement);

        // Create simulator HTML
        const simulatorHTML = `
            <div class="simulaseg-container">
                <div class="simulaseg-header">
                    <h1>${config.simulatorTitle}</h1>
                </div>
                <div class="simulaseg-card">
                    <p style="text-align: center; margin-bottom: 20px;">
                        ✅ Simulador carregado com sucesso!
                    </p>
                    <p style="text-align: center; margin-bottom: 20px;">
                        Agente: ${config.agentId}
                    </p>
                    <button class="simulaseg-btn" onclick="alert('Simulador funcionando! Agente: ${config.agentId}')">
                        Testar Simulador
                    </button>
                </div>
            </div>
        `;

        container.innerHTML = simulatorHTML;
        debugLog('Simulator loaded successfully');
    }

    // Helper function to adjust color brightness
    function adjustColor(color, amount) {
        const usePound = color[0] === '#';
        const col = usePound ? color.slice(1) : color;
        const num = parseInt(col, 16);
        let r = (num >> 16) + amount;
        let g = (num >> 8 & 0x00FF) + amount;
        let b = (num & 0x0000FF) + amount;
        r = r > 255 ? 255 : r < 0 ? 0 : r;
        g = g > 255 ? 255 : g < 0 ? 0 : g;
        b = b > 255 ? 255 : b < 0 ? 0 : b;
        return (usePound ? '#' : '') + (r << 16 | g << 8 | b).toString(16).padStart(6, '0');
    }

    debugLog('SimulaSeg initialization complete');
})();
