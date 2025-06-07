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
            .simulaseg-row {
                display: flex;
                flex-wrap: wrap;
                margin-bottom: 20px;
                gap: 20px;
            }
            .simulaseg-col {
                flex: 1;
                min-width: 200px;
            }
            .simulaseg-form-group {
                margin-bottom: 20px;
            }
            .simulaseg-form-group label {
                display: block;
                margin-bottom: 8px;
                font-weight: 500;
                color: #444;
                font-size: 0.95em;
            }
            .simulaseg-form-group input,
            .simulaseg-form-group select {
                width: 100%;
                padding: 12px;
                border: 2px solid #e0e0e0;
                border-radius: 8px;
                font-family: 'Poppins', sans-serif;
                font-size: 0.95em;
                transition: all 0.3s ease;
            }
            .simulaseg-form-group input:focus,
            .simulaseg-form-group select:focus {
                border-color: ${config.primaryColor};
                outline: none;
                box-shadow: 0 0 0 3px ${hexToRgba(config.primaryColor, 0.2)};
            }
            .simulaseg-radio-group {
                display: flex;
                gap: 20px;
            }
            .simulaseg-radio-option {
                display: flex;
                align-items: center;
            }
            .simulaseg-radio-option input {
                margin-right: 8px;
                width: auto;
                accent-color: ${config.primaryColor};
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
            .simulaseg-btn:active {
                transform: translateY(0);
            }
            .simulaseg-result-section {
                margin-top: 25px;
                padding: 20px;
                background-color: #f8f9fa;
                border-radius: 10px;
                display: none;
                border-left: 4px solid ${config.primaryColor};
                box-shadow: 0 4px 6px rgba(0,0,0,0.05);
            }
            .simulaseg-result-title {
                font-size: 1.2em;
                margin-bottom: 15px;
                font-weight: 600;
                color: #333;
            }
            .simulaseg-result-price {
                font-size: 1.8em;
                color: ${config.primaryColor};
                font-weight: 700;
                margin-bottom: 15px;
            }
            .simulaseg-result-note {
                font-size: 0.85em;
                color: #666;
                margin-bottom: 15px;
                line-height: 1.5;
            }
            .simulaseg-alert-box {
                background-color: #e7f5ff;
                border: 1px solid #b8daff;
                padding: 15px;
                border-radius: 8px;
                margin-bottom: 20px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.05);
            }
            .simulaseg-alert-title {
                font-weight: 600;
                margin-bottom: 8px;
                color: #0056b3;
            }
            .simulaseg-lead-section {
                margin-top: 25px;
                padding-top: 20px;
                border-top: 1px solid #eaeaea;
            }
            .simulaseg-thank-you-section {
                text-align: center;
                padding: 30px;
                background-color: #f0f9ff;
                border-radius: 10px;
                margin-top: 25px;
                display: none;
                box-shadow: 0 4px 6px rgba(0,0,0,0.05);
            }
            .simulaseg-thank-you-title {
                font-size: 1.6em;
                margin-bottom: 15px;
                color: ${config.primaryColor};
                font-weight: 600;
            }
            .simulaseg-whatsapp-btn {
                background-color: #25D366;
                color: white;
                text-decoration: none;
                padding: 12px 20px;
                border-radius: 8px;
                display: inline-block;
                margin-top: 20px;
                font-weight: 600;
                transition: all 0.3s ease;
                box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            }
            .simulaseg-whatsapp-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 12px rgba(0,0,0,0.15);
            }
            .simulaseg-error-message {
                color: #dc3545;
                font-size: 0.85em;
                margin-top: 6px;
                display: none;
            }
            .simulaseg-contact-info-title,
            .simulaseg-insurance-question-title {
                font-size: 1.15em;
                margin-bottom: 15px;
                border-bottom: 1px solid #eaeaea;
                padding-bottom: 8px;
                font-weight: 600;
                color: #444;
            }
            .simulaseg-insurance-options {
                margin-bottom: 15px;
            }
            .simulaseg-insurance-option {
                margin-bottom: 8px;
            }
            .simulaseg-required-indicator {
                font-size: 0.85em;
                color: #666;
                margin-top: 6px;
            }
            .simulaseg-insurance-error {
                color: #dc3545;
                font-size: 0.85em;
                margin-top: 6px;
                display: none;
            }
            @media (max-width: 600px) {
                .simulaseg-col {
                    flex: 100%;
                    margin-bottom: 15px;
                }
                .simulaseg-container {
                    padding: 15px;
                }
                .simulaseg-header {
                    padding: 15px;
                }
                .simulaseg-card {
                    padding: 20px;
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
                        
                        <div id="simulaseg-result" class="simulaseg-result-section">
                            <div class="simulaseg-result-title">Valor estimado do seguro:</div>
                            <div class="simulaseg-result-price" id="simulaseg-price">$0.00/mês</div>
                            <div class="simulaseg-result-note">Este é um valor estimado. O valor final pode variar de acordo com a avaliação completa.</div>
                            
                            <div class="simulaseg-lead-section">
                                <div class="simulaseg-contact-info-title">Seus dados para simular</div>
                                
                                <div class="simulaseg-row">
                                    <div class="simulaseg-col">
                                        <div class="simulaseg-form-group">
                                            <label for="simulaseg-name">Nome Completo</label>
                                            <input type="text" id="simulaseg-name" placeholder="Seu nome completo" required>
                                            <div class="simulaseg-error-message" id="simulaseg-name-error">Por favor, informe seu nome.</div>
                                        </div>
                                    </div>
                                    <div class="simulaseg-col">
                                        <div class="simulaseg-form-group">
                                            <label for="simulaseg-phone">Telefone</label>
                                            <input type="tel" id="simulaseg-phone" placeholder="+1 (XXX) XXX-XXXX" required>
                                            <div class="simulaseg-error-message" id="simulaseg-phone-error">Por favor, informe seu telefone.</div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="simulaseg-form-group">
                                    <label for="simulaseg-email">Email</label>
                                    <input type="email" id="simulaseg-email" placeholder="seu@email.com">
                                    <div class="simulaseg-error-message" id="simulaseg-email-error">Por favor, informe um email válido.</div>
                                </div>
                                
                                <div class="simulaseg-insurance-question-title">Você já tem seguro de vida atualmente?</div>
                                <div class="simulaseg-insurance-options">
                                    <div class="simulaseg-insurance-option">
                                        <input type="radio" id="simulaseg-has-insurance-yes" name="simulaseg-has-insurance" value="yes">
                                        <label for="simulaseg-has-insurance-yes">Sim, já tenho seguro de vida</label>
                                    </div>
                                    <div class="simulaseg-insurance-option">
                                        <input type="radio" id="simulaseg-has-insurance-no" name="simulaseg-has-insurance" value="no" checked>
                                        <label for="simulaseg-has-insurance-no">Não, não tenho seguro de vida</label>
                                    </div>
                                </div>
                                <div class="simulaseg-insurance-error" id="simulaseg-insurance-error">Por favor, selecione uma opção.</div>
                                
                                <div class="simulaseg-required-indicator">* Esta informação é necessária para prosseguir</div>
                                
                                <button type="button" id="simulaseg-submit-btn" class="simulaseg-btn">Simular</button>
                            </div>
                        </div>
                        
                        <button type="button" id="simulaseg-calculate-btn" class="simulaseg-btn">Calcular</button>
                    </form>
                    
                    <div id="simulaseg-thank-you" class="simulaseg-thank-you-section">
                        <div class="simulaseg-thank-you-title">Obrigado pelo seu interesse!</div>
                        <p>Recebemos sua solicitação e entraremos em contato em breve.</p>
                        <p>Se preferir, entre em contato diretamente pelo WhatsApp:</p>
                        <a href="#" id="simulaseg-whatsapp-link" class="simulaseg-whatsapp-btn" target="_blank">Falar pelo WhatsApp</a>
                    </div>
                </div>
            </div>
        `;
        
        // Add event listeners
        document.getElementById('simulaseg-calculate-btn').addEventListener('click', calculateInsurance);
        document.getElementById('simulaseg-submit-btn').addEventListener('click', submitLead);
        
        // Set WhatsApp link
        updateWhatsAppLink();
        
        // Function to calculate insurance
        function calculateInsurance() {
            // Get form values
            const age = document.getElementById('simulaseg-age').value;
            const gender = document.querySelector('input[name="simulaseg-gender"]:checked').value;
            const coverage = document.getElementById('simulaseg-coverage').value;
            const hasDisease = document.querySelector('input[name="simulaseg-disease"]:checked').value === 'yes';
            const state = document.getElementById('simulaseg-state').value;
            
            // Validate form
            let isValid = true;
            
            if (!age || age < 18 || age > 75) {
                document.getElementById('simulaseg-age-error').style.display = 'block';
                isValid = false;
            } else {
                document.getElementById('simulaseg-age-error').style.display = 'none';
            }
            
            if (!coverage) {
                document.getElementById('simulaseg-coverage-error').style.display = 'block';
                isValid = false;
            } else {
                document.getElementById('simulaseg-coverage-error').style.display = 'none';
            }
            
            if (!state) {
                document.getElementById('simulaseg-state-error').style.display = 'block';
                isValid = false;
            } else {
                document.getElementById('simulaseg-state-error').style.display = 'none';
            }
            
            if (!isValid) {
                return;
            }
            
            // Calculate price based on factors
            let baseRate = 0;
            
            // Base rate by coverage
            switch (coverage) {
                case '100000':
                    baseRate = 15;
                    break;
                case '250000':
                    baseRate = 25;
                    break;
                case '500000':
                    baseRate = 40;
                    break;
                case '750000':
                    baseRate = 55;
                    break;
                case '1000000':
                    baseRate = 70;
                    break;
                default:
                    baseRate = 15;
            }
            
            // Adjust for age
            const ageMultiplier = 1 + ((age - 18) * 0.02);
            
            // Adjust for gender (slightly lower for women based on statistical life expectancy)
            const genderMultiplier = gender === 'female' ? 0.9 : 1;
            
            // Adjust for health condition
            const healthMultiplier = hasDisease ? 1.5 : 1;
            
            // Adjust for state (simplified - in reality would be more complex)
            let stateMultiplier = 1;
            const highCostStates = ['CA', 'NY', 'NJ', 'MA', 'CT'];
            const mediumCostStates = ['FL', 'IL', 'TX', 'WA', 'OR', 'CO'];
            
            if (highCostStates.includes(state)) {
                stateMultiplier = 1.2;
            } else if (mediumCostStates.includes(state)) {
                stateMultiplier = 1.1;
            }
            
            // Calculate final price
            const monthlyPrice = baseRate * ageMultiplier * genderMultiplier * healthMultiplier * stateMultiplier;
            
            // Display result
            document.getElementById('simulaseg-price').textContent = `$${monthlyPrice.toFixed(2)}/mês`;
            document.getElementById('simulaseg-result').style.display = 'block';
            document.getElementById('simulaseg-calculate-btn').style.display = 'none';
            
            // Scroll to results
            document.getElementById('simulaseg-result').scrollIntoView({ behavior: 'smooth' });
        }
        
        // Function to submit lead
        function submitLead() {
            // Get form values
            const age = document.getElementById('simulaseg-age').value;
            const gender = document.querySelector('input[name="simulaseg-gender"]:checked').value;
            const coverage = document.getElementById('simulaseg-coverage').value;
            const hasDisease = document.querySelector('input[name="simulaseg-disease"]:checked').value === 'yes';
            const state = document.getElementById('simulaseg-state').value;
            const name = document.getElementById('simulaseg-name').value;
            const phone = document.getElementById('simulaseg-phone').value;
            const email = document.getElementById('simulaseg-email').value;
            const hasInsurance = document.querySelector('input[name="simulaseg-has-insurance"]:checked').value === 'yes';
            
            // Validate form
            let isValid = true;
            
            if (!name) {
                document.getElementById('simulaseg-name-error').style.display = 'block';
                isValid = false;
            } else {
                document.getElementById('simulaseg-name-error').style.display = 'none';
            }
            
            if (!phone) {
                document.getElementById('simulaseg-phone-error').style.display = 'block';
                isValid = false;
            } else {
                document.getElementById('simulaseg-phone-error').style.display = 'none';
            }
            
            if (email && !isValidEmail(email)) {
                document.getElementById('simulaseg-email-error').style.display = 'block';
                isValid = false;
            } else {
                document.getElementById('simulaseg-email-error').style.display = 'none';
            }
            
            if (!isValid) {
                return;
            }
            
            // Prepare lead data
            const leadData = {
                name: name,
                phone: phone,
                email: email || 'Não informado',
                age: age,
                gender: gender === 'male' ? 'Masculino' : 'Feminino',
                coverage: coverage,
                has_disease: hasDisease ? 'Sim' : 'Não',
                state: state,
                has_insurance: hasInsurance ? 'Sim' : 'Não',
                monthly_price: document.getElementById('simulaseg-price').textContent,
                agent_name: 'Agente SimulaSeg',
                agent_email: config.email
            };
            
            // Register lead
            registerLead(config.agentId, leadData);
            
            // Submit to Formspree if code is provided
            if (config.formspreeCode) {
                submitToFormspree(leadData);
            }
            
            // Show thank you message
            document.getElementById('simulaseg-result').style.display = 'none';
            document.getElementById('simulaseg-thank-you').style.display = 'block';
            
            // Redirect if URL is provided
            if (config.thankYouUrl) {
                setTimeout(function() {
                    window.location.href = config.thankYouUrl;
                }, 3000);
            }
        }
        
        // Function to submit to Formspree
        function submitToFormspree(leadData) {
            if (!config.formspreeCode) return;
            
            const formspreeUrl = `https://formspree.io/f/${config.formspreeCode}`;
            
            fetch(formspreeUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(leadData)
            })
            .catch(error => {
                console.error('SimulaSeg: Error submitting to Formspree:', error);
            });
        }
        
        // Function to validate email
        function isValidEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }
        
        // Function to update WhatsApp link
        function updateWhatsAppLink() {
            const whatsappLink = document.getElementById('simulaseg-whatsapp-link');
            if (whatsappLink && config.whatsapp) {
                const message = encodeURIComponent(config.message);
                whatsappLink.href = `https://wa.me/${config.whatsapp}?text=${message}`;
            }
        }
    }
    
    // Helper function to adjust color brightness
    function adjustColor(hex, percent) {
        // Convert hex to RGB
        let r = parseInt(hex.substring(1, 3), 16);
        let g = parseInt(hex.substring(3, 5), 16);
        let b = parseInt(hex.substring(5, 7), 16);
        
        // Adjust brightness
        r = Math.max(0, Math.min(255, r + percent));
        g = Math.max(0, Math.min(255, g + percent));
        b = Math.max(0, Math.min(255, b + percent));
        
        // Convert back to hex
        return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }
    
    // Helper function to convert hex to rgba
    function hexToRgba(hex, alpha) {
        // Convert hex to RGB
        let r = parseInt(hex.substring(1, 3), 16);
        let g = parseInt(hex.substring(3, 5), 16);
        let b = parseInt(hex.substring(5, 7), 16);
        
        // Return rgba
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
})();
