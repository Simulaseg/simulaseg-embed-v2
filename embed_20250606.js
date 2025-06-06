/**
 * SimulaSeg Embed Script - Version 20250606
 * US Version with dollar values and US states
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
    
    // Get script element and data attributes
    const scripts = document.getElementsByTagName('script');
    const script = scripts[scripts.length - 1];
    
    // Automatically detect API URL based on script source or use data attribute if provided
    function detectApiUrl() {
        // First check if API URL is explicitly provided as a data attribute
        const explicitApiUrl = script.getAttribute('data-api-url');
        if (explicitApiUrl) return explicitApiUrl;
        
        // Try to extract domain from script src
        const scriptSrc = script.src || '';
        try {
            // Extract domain from script source
            const scriptUrl = new URL(scriptSrc);
            const scriptDomain = `${scriptUrl.protocol}//${scriptUrl.hostname}${scriptUrl.port ? ':' + scriptUrl.port : ''}`;
            
            // Check if this is from jsdelivr (GitHub)
            if (scriptUrl.hostname.includes('jsdelivr.net')) {
                // Default to Replit domain if script is from CDN
                return 'https://01eb48f3-0c67-4e54-8672-705edb2d6603-00-16dhjlhgrycbt.kirk.replit.dev/api';
            }
            
            // Otherwise use same domain as script
            return `${scriptDomain}/api`;
        } catch (e) {
            console.error('SimulaSeg: Error detecting API URL:', e);
            // Fallback to Replit domain
            return 'https://01eb48f3-0c67-4e54-8672-705edb2d6603-00-16dhjlhgrycbt.kirk.replit.dev/api';
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
    
    // Log the detected API URL for debugging
    console.log('SimulaSeg: Using API URL:', config.apiUrl);
    
    // Container element
    const container = document.getElementById('simulaseg-embed');
    if (!container) {
        console.error('SimulaSeg: Container element not found. Please add a div with id="simulaseg-embed"');
        return;
    }
    
    // Check if agent is active
    checkAgentStatus(config.agentId, function(isActive) {
        if (!isActive) {
            container.innerHTML = '<p>Erro: Simulador não disponível. Entre em contato com o suporte.</p>';
            return;
        }
        
        // Load simulator
        loadSimulator();
        
        // Register simulation view
        registerSimulation(config.agentId);
    });
    
    // Function to check agent status
    function checkAgentStatus(agentId, callback) {
        fetch(`${config.apiUrl}/check_simulator_status`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ agent_id: agentId }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('SimulaSeg: Agent status check response:', data);
            callback(data.available === true);
        })
        .catch(error => {
            console.error('SimulaSeg: Error checking agent status:', error);
            callback(false);
        });
    }
    
    // Function to register simulation
    function registerSimulation(agentId) {
        fetch(`${config.apiUrl}/register_simulation`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ agent_id: agentId }),
        })
        .catch(error => {
            console.error('SimulaSeg: Error registering simulation:', error);
        });
    }
    
    // Function to register lead
    function registerLead(agentId, leadData) {
        fetch(`${config.apiUrl}/register_lead`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                agent_id: agentId,
                lead_data: leadData
            }),
        })
        .catch(error => {
            console.error('SimulaSeg: Error registering lead:', error);
        });
    }
    
    // Function to load simulator
    function loadSimulator() {
        // Add CSS styles
        const styles = `
            .simulaseg-container {
                font-family: 'Arial', sans-serif;
                max-width: 800px;
                margin: 0 auto;
                padding: 20px;
                box-sizing: border-box;
                color: #333;
            }
            .simulaseg-container * {
                box-sizing: border-box;
            }
            .simulaseg-header {
                background-color: ${config.primaryColor};
                color: white;
                padding: 15px;
                text-align: center;
                border-radius: 5px 5px 0 0;
                margin-bottom: 0;
            }
            .simulaseg-header h1 {
                margin: 0;
                font-size: 1.5em;
            }
            .simulaseg-card {
                background-color: #f9f9f9;
                padding: 20px;
                border-radius: 0 0 5px 5px;
                border: 1px solid #ddd;
                border-top: none;
            }
            .simulaseg-row {
                display: flex;
                flex-wrap: wrap;
                margin-bottom: 15px;
            }
            .simulaseg-col {
                flex: 1;
                padding: 0 10px;
                min-width: 200px;
            }
            .simulaseg-form-group {
                margin-bottom: 15px;
            }
            .simulaseg-form-group label {
                display: block;
                margin-bottom: 5px;
                font-weight: bold;
            }
            .simulaseg-form-group input,
            .simulaseg-form-group select {
                width: 100%;
                padding: 8px;
                border: 1px solid #ddd;
                border-radius: 4px;
            }
            .simulaseg-radio-group {
                display: flex;
                gap: 15px;
            }
            .simulaseg-radio-option {
                display: flex;
                align-items: center;
            }
            .simulaseg-radio-option input {
                margin-right: 5px;
                width: auto;
            }
            .simulaseg-btn {
                background-color: ${config.secondaryColor};
                color: white;
                border: none;
                padding: 10px 15px;
                border-radius: 4px;
                cursor: pointer;
                font-size: 1em;
                width: 100%;
                margin-top: 10px;
            }
            .simulaseg-btn:hover {
                opacity: 0.9;
            }
            .simulaseg-result-section {
                margin-top: 20px;
                padding: 15px;
                background-color: #f0f0f0;
                border-radius: 5px;
                display: none;
            }
            .simulaseg-result-title {
                font-size: 1.2em;
                margin-bottom: 10px;
            }
            .simulaseg-result-price {
                font-size: 1.5em;
                color: ${config.primaryColor};
                font-weight: bold;
                margin-bottom: 10px;
            }
            .simulaseg-result-note {
                font-size: 0.8em;
                color: #666;
                margin-bottom: 15px;
            }
            .simulaseg-alert-box {
                background-color: #e7f5ff;
                border: 1px solid #b8daff;
                padding: 10px;
                border-radius: 4px;
                margin-bottom: 15px;
            }
            .simulaseg-alert-title {
                font-weight: bold;
                margin-bottom: 5px;
            }
            .simulaseg-lead-section {
                margin-top: 15px;
            }
            .simulaseg-thank-you-section {
                text-align: center;
                padding: 20px;
                background-color: #e7f5ff;
                border-radius: 5px;
                margin-top: 20px;
                display: none;
            }
            .simulaseg-thank-you-title {
                font-size: 1.5em;
                margin-bottom: 10px;
                color: ${config.primaryColor};
            }
            .simulaseg-whatsapp-btn {
                background-color: #25D366;
                color: white;
                text-decoration: none;
                padding: 10px 15px;
                border-radius: 4px;
                display: inline-block;
                margin-top: 15px;
            }
            .simulaseg-error-message {
                color: #dc3545;
                font-size: 0.8em;
                margin-top: 5px;
                display: none;
            }
            .simulaseg-contact-info-title,
            .simulaseg-insurance-question-title {
                font-size: 1.1em;
                margin-bottom: 10px;
                border-bottom: 1px solid #ddd;
                padding-bottom: 5px;
            }
            .simulaseg-insurance-options {
                margin-bottom: 10px;
            }
            .simulaseg-insurance-option {
                margin-bottom: 5px;
            }
            .simulaseg-required-indicator {
                font-size: 0.8em;
                color: #666;
                margin-top: 5px;
            }
            .simulaseg-insurance-error {
                color: #dc3545;
                font-size: 0.8em;
                margin-top: 5px;
                display: none;
            }
            @media (max-width: 600px) {
                .simulaseg-col {
                    flex: 100%;
                    margin-bottom: 10px;
                }
            }
        `;
        
        // Create style element
        const styleElement = document.createElement('style');
        styleElement.textContent = styles;
        document.head.appendChild(styleElement);
        
        // Create simulator HTML
        container.innerHTML = `
            <div class="simulaseg-container">
                <div class="simulaseg-header">
                    <h1>${config.simulatorTitle}</h1>
                </div>
                
                <div class="simulaseg-card">
                    <form id="simulaseg-form">
                        <div class="simulaseg-row">
                            <div class="simulaseg-col">
                                <div class="simulaseg-form-group">
                                    <label for="simulaseg-age">Idade</label>
                                    <input type="number" id="simulaseg-age" min="18" max="75" placeholder="Ex: 35" required>
                                    <div class="simulaseg-error-message" id="simulaseg-age-error">Por favor, informe sua idade.</div>
                                </div>
                            </div>
                            <div class="simulaseg-col">
                                <div class="simulaseg-form-group">
                                    <label>Gênero</label>
                                    <div class="simulaseg-radio-group">
                                        <div class="simulaseg-radio-option">
                                            <input type="radio" id="simulaseg-gender-male" name="simulaseg-gender" value="male" checked>
                                            <label for="simulaseg-gender-male">Homem</label>
                                        </div>
                                        <div class="simulaseg-radio-option">
                                            <input type="radio" id="simulaseg-gender-female" name="simulaseg-gender" value="female">
                                            <label for="simulaseg-gender-female">Mulher</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="simulaseg-row">
                            <div class="simulaseg-col">
                                <div class="simulaseg-form-group">
                                    <label for="simulaseg-coverage">Valor da Cobertura</label>
                                    <select id="simulaseg-coverage" required>
                                        <option value="">Selecione um valor</option>
                                        <option value="100000">$100,000</option>
                                        <option value="250000">$250,000</option>
                                        <option value="500000">$500,000</option>
                                        <option value="750000">$750,000</option>
                                        <option value="1000000">$1,000,000</option>
                                    </select>
                                    <div class="simulaseg-error-message" id="simulaseg-coverage-error">Por favor, selecione um valor de cobertura.</div>
                                </div>
                            </div>
                            <div class="simulaseg-col">
                                <div class="simulaseg-form-group">
                                    <label>Possui alguma doença grave?</label>
                                    <div class="simulaseg-radio-group">
                                        <div class="simulaseg-radio-option">
                                            <input type="radio" id="simulaseg-disease-no" name="simulaseg-disease" value="no" checked>
                                            <label for="simulaseg-disease-no">Não</label>
                                        </div>
                                        <div class="simulaseg-radio-option">
                                            <input type="radio" id="simulaseg-disease-yes" name="simulaseg-disease" value="yes">
                                            <label for="simulaseg-disease-yes">Sim</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="simulaseg-form-group">
                            <label for="simulaseg-state">Estado</label>
                            <select id="simulaseg-state" required>
                                <option value="">Selecione seu estado</option>
                                <option value="AL">Alabama</option>
                                <option value="AK">Alaska</option>
                                <option value="AZ">Arizona</option>
                                <option value="AR">Arkansas</option>
                                <option value="CA">California</option>
                                <option value="CO">Colorado</option>
                                <option value="CT">Connecticut</option>
                                <option value="DE">Delaware</option>
                                <option value="FL">Florida</option>
                                <option value="GA">Georgia</option>
                                <option value="HI">Hawaii</option>
                                <option value="ID">Idaho</option>
                                <option value="IL">Illinois</option>
                                <option value="IN">Indiana</option>
                                <option value="IA">Iowa</option>
                                <option value="KS">Kansas</option>
                                <option value="KY">Kentucky</option>
                                <option value="LA">Louisiana</option>
                                <option value="ME">Maine</option>
                                <option value="MD">Maryland</option>
                                <option value="MA">Massachusetts</option>
                                <option value="MI">Michigan</option>
                                <option value="MN">Minnesota</option>
                                <option value="MS">Mississippi</option>
                                <option value="MO">Missouri</option>
                                <option value="MT">Montana</option>
                                <option value="NE">Nebraska</option>
                                <option value="NV">Nevada</option>
                                <option value="NH">New Hampshire</option>
                                <option value="NJ">New Jersey</option>
                                <option value="NM">New Mexico</option>
                                <option value="NY">New York</option>
                                <option value="NC">North Carolina</option>
                                <option value="ND">North Dakota</option>
                                <option value="OH">Ohio</option>
                                <option value="OK">Oklahoma</option>
                                <option value="OR">Oregon</option>
                                <option value="PA">Pennsylvania</option>
                                <option value="RI">Rhode Island</option>
                                <option value="SC">South Carolina</option>
                                <option value="SD">South Dakota</option>
                                <option value="TN">Tennessee</option>
                                <option value="TX">Texas</option>
                                <option value="UT">Utah</option>
                                <option value="VT">Vermont</option>
                                <option value="VA">Virginia</option>
                                <option value="WA">Washington</option>
                                <option value="WV">West Virginia</option>
                                <option value="WI">Wisconsin</option>
                                <option value="WY">Wyoming</option>
                                <option value="DC">District of Columbia</option>
                            </select>
                            <div class="simulaseg-error-message" id="simulaseg-state-error">Por favor, selecione seu estado.</div>
                        </div>
                        
                        <!-- Seção de dados de contato -->
                        <div class="simulaseg-contact-info-section">
                            <h3 class="simulaseg-contact-info-title">Seus dados para simular</h3>
                            <div class="simulaseg-row">
                                <div class="simulaseg-col">
                                    <div class="simulaseg-form-group">
                                        <label for="simulaseg-user-name">Nome Completo</label>
                                        <input type="text" id="simulaseg-user-name" placeholder="Seu nome completo" required>
                                        <div class="simulaseg-error-message" id="simulaseg-user-name-error">Por favor, informe seu nome completo.</div>
                                    </div>
                                </div>
                                <div class="simulaseg-col">
                                    <div class="simulaseg-form-group">
                                        <label for="simulaseg-user-phone">Telefone</label>
                                        <input type="tel" id="simulaseg-user-phone" placeholder="+1 (XXX) XXX-XXXX" required>
                                        <div class="simulaseg-error-message" id="simulaseg-user-phone-error">Por favor, informe um telefone válido.</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Seção de pergunta sobre seguro de vida -->
                        <div class="simulaseg-insurance-question-section" id="simulaseg-insurance-question-section">
                            <h3 class="simulaseg-insurance-question-title">Você já tem seguro de vida atualmente?</h3>
                            <div class="simulaseg-insurance-options">
                                <div class="simulaseg-insurance-option">
                                    <input type="radio" id="simulaseg-insurance-yes" name="simulaseg-has-insurance" value="yes">
                                    <label for="simulaseg-insurance-yes">Sim, já tenho seguro de vida</label>
                                </div>
                                <div class="simulaseg-insurance-option">
                                    <input type="radio" id="simulaseg-insurance-no" name="simulaseg-has-insurance" value="no">
                                    <label for="simulaseg-insurance-no">Não, não tenho seguro de vida</label>
                                </div>
                            </div>
                            <p class="simulaseg-required-indicator">* Esta informação é necessária para prosseguir</p>
                            <div class="simulaseg-insurance-error" id="simulaseg-insurance-error">Por favor, selecione uma opção para continuar</div>
                        </div>
                        
                        <button type="button" class="simulaseg-btn" id="simulaseg-calculate-btn">Simular</button>
                    </form>
                </div>
                
                <div class="simulaseg-result-section" id="simulaseg-result-section">
                    <h2 class="simulaseg-result-title">Seguro de vida com benefício em vida</h2>
                    <div class="simulaseg-result-price" id="simulaseg-monthly-price">$57/mês</div>
                    <p class="simulaseg-result-note">Esta é uma simulação básica. O valor real pode variar após análise completa.</p>
                    
                    <div class="simulaseg-alert-box">
                        <p class="simulaseg-alert-title">Quer saber exatamente quanto você teria de benefício em vida?</p>
                        <p class="simulaseg-alert-message">Complete seu e-mail abaixo para receber informações detalhadas.</p>
                    </div>
                    
                    <div class="simulaseg-lead-section">
                        <form id="simulaseg-lead-form">
                            <div class="simulaseg-form-group">
                                <label for="simulaseg-user-email">E-mail</label>
                                <input type="email" id="simulaseg-user-email" placeholder="seu@email.com" required>
                                <div class="simulaseg-error-message" id="simulaseg-user-email-error">Por favor, informe um e-mail válido.</div>
                            </div>
                            
                            <button type="button" class="simulaseg-btn" id="simulaseg-submit-btn">Receber Cotação Detalhada</button>
                        </form>
                    </div>
                </div>
                
                <div class="simulaseg-thank-you-section" id="simulaseg-thank-you-section">
                    <h2 class="simulaseg-thank-you-title">Obrigado!</h2>
                    <p>Recebemos suas informações e entraremos em contato em breve com mais detalhes sobre suas opções de seguro de vida.</p>
                    
                    <a href="#" class="simulaseg-whatsapp-btn" id="simulaseg-whatsapp-btn">
                        Falar agora via WhatsApp
                    </a>
                </div>
            </div>
        `;
        
        // Add event listeners
        document.getElementById('simulaseg-calculate-btn').addEventListener('click', calculateSimulation);
        document.getElementById('simulaseg-submit-btn').addEventListener('click', submitLead);
        
        // Set WhatsApp link
        const whatsappBtn = document.getElementById('simulaseg-whatsapp-btn');
        whatsappBtn.href = `https://wa.me/${config.whatsapp}?text=${encodeURIComponent(config.message)}`;
    }
    
    // Function to calculate simulation
    function calculateSimulation() {
        // Validate form
        const age = document.getElementById('simulaseg-age').value;
        const coverage = document.getElementById('simulaseg-coverage').value;
        const state = document.getElementById('simulaseg-state').value;
        const name = document.getElementById('simulaseg-user-name').value;
        const phone = document.getElementById('simulaseg-user-phone').value;
        const hasInsurance = document.querySelector('input[name="simulaseg-has-insurance"]:checked');
        
        // Reset error messages
        document.querySelectorAll('.simulaseg-error-message').forEach(el => el.style.display = 'none');
        document.getElementById('simulaseg-insurance-error').style.display = 'none';
        
        // Validate fields
        let isValid = true;
        
        if (!age) {
            document.getElementById('simulaseg-age-error').style.display = 'block';
            isValid = false;
        }
        
        if (!coverage) {
            document.getElementById('simulaseg-coverage-error').style.display = 'block';
            isValid = false;
        }
        
        if (!state) {
            document.getElementById('simulaseg-state-error').style.display = 'block';
            isValid = false;
        }
        
        if (!name) {
            document.getElementById('simulaseg-user-name-error').style.display = 'block';
            isValid = false;
        }
        
        if (!phone) {
            document.getElementById('simulaseg-user-phone-error').style.display = 'block';
            isValid = false;
        }
        
        if (!hasInsurance) {
            document.getElementById('simulaseg-insurance-error').style.display = 'block';
            isValid = false;
        }
        
        if (!isValid) return;
        
        // Calculate price based on age, coverage, and state
        const coverageValue = parseInt(coverage);
        const ageValue = parseInt(age);
        const gender = document.querySelector('input[name="simulaseg-gender"]:checked').value;
        const hasDisease = document.querySelector('input[name="simulaseg-disease"]:checked').value === 'yes';
        
        // Base rate per $1,000 of coverage
        let baseRate = 0.15;
        
        // Adjust for age
        if (ageValue < 30) {
            baseRate = 0.12;
        } else if (ageValue < 40) {
            baseRate = 0.15;
        } else if (ageValue < 50) {
            baseRate = 0.22;
        } else if (ageValue < 60) {
            baseRate = 0.35;
        } else {
            baseRate = 0.55;
        }
        
        // Adjust for gender
        if (gender === 'female') {
            baseRate *= 0.85;
        }
        
        // Adjust for health condition
        if (hasDisease) {
            baseRate *= 1.5;
        }
        
        // State factors
        const stateFactors = {
            'CA': 1.2, 'NY': 1.15, 'FL': 1.1, 'TX': 1.05,
            'IL': 1.0, 'PA': 1.0, 'OH': 0.95, 'MI': 0.95,
            'GA': 1.0, 'NC': 0.95, 'NJ': 1.1, 'VA': 0.95,
            'WA': 1.05, 'AZ': 1.0, 'MA': 1.1, 'TN': 0.9,
            'IN': 0.9, 'MO': 0.9, 'MD': 1.0, 'WI': 0.9,
            'MN': 0.95, 'CO': 1.0, 'AL': 0.9, 'SC': 0.95,
            'LA': 1.05, 'KY': 0.9, 'OR': 1.0, 'OK': 0.95,
            'CT': 1.05, 'IA': 0.9, 'MS': 0.95, 'AR': 0.9,
            'KS': 0.9, 'UT': 0.95, 'NV': 1.0, 'NM': 0.95,
            'WV': 0.95, 'NE': 0.9, 'ID': 0.95, 'HI': 1.1,
            'ME': 1.0, 'NH': 1.0, 'RI': 1.05, 'MT': 0.95,
            'DE': 1.0, 'SD': 0.9, 'ND': 0.9, 'AK': 1.1,
            'DC': 1.15, 'VT': 1.0, 'WY': 0.95
        };
        
        const stateFactor = stateFactors[state] || 1.0;
        
        // Calculate monthly premium
        const monthlyPremium = (coverageValue * baseRate * stateFactor) / 1000;
        
        // Format and display result
        document.getElementById('simulaseg-monthly-price').textContent = formatCurrency(monthlyPremium) + '/mês';
        
        // Show results section
        document.getElementById('simulaseg-result-section').style.display = 'block';
        
        // Scroll to results
        document.getElementById('simulaseg-result-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    // Function to submit lead
    function submitLead() {
        const email = document.getElementById('simulaseg-user-email').value;
        
        // Validate email
        if (!email) {
            document.getElementById('simulaseg-user-email-error').style.display = 'block';
            return;
        }
        
        // Get form data
        const name = document.getElementById('simulaseg-user-name').value;
        const phone = document.getElementById('simulaseg-user-phone').value;
        const age = document.getElementById('simulaseg-age').value;
        const gender = document.querySelector('input[name="simulaseg-gender"]:checked').value;
        const coverage = document.getElementById('simulaseg-coverage').value;
        const state = document.getElementById('simulaseg-state').value;
        const hasDisease = document.querySelector('input[name="simulaseg-disease"]:checked').value === 'yes';
        const hasInsurance = document.querySelector('input[name="simulaseg-has-insurance"]:checked').value === 'yes';
        
        // Prepare lead data
        const leadData = {
            name: name,
            email: email,
            phone: phone,
            age: age,
            gender: gender,
            coverage: coverage,
            state: state,
            has_disease: hasDisease,
            has_insurance: hasInsurance
        };
        
        // Send lead to Formspree if code is provided
        if (config.formspreeCode) {
            const formData = new FormData();
            Object.keys(leadData).forEach(key => {
                formData.append(key, leadData[key]);
            });
            
            fetch(`https://formspree.io/f/${config.formspreeCode}`, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .catch(error => {
                console.error('SimulaSeg: Error sending lead to Formspree:', error);
            });
        }
        
        // Register lead in SimulaSeg system
        registerLead(config.agentId, leadData);
        
        // Show thank you section
        document.getElementById('simulaseg-result-section').style.display = 'none';
        document.getElementById('simulaseg-thank-you-section').style.display = 'block';
        
        // Redirect to thank you URL if provided
        if (config.thankYouUrl) {
            setTimeout(() => {
                window.location.href = config.thankYouUrl;
            }, 3000);
        }
    }
    
    // Helper function to format currency
    function formatCurrency(value) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(value);
    }
})();
