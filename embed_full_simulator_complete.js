/**
 * SimulaSeg Embed Script - Versão Completa e Funcional
 * Arquivo: embed_full_simulator_complete.js
 * Data: 07/06/2025
 * 
 * Este script carrega o simulador completo do SimulaSeg com todas as funcionalidades
 * e design fiel ao modelo de referência fornecido pelo cliente.
 */

(function() {
    // Configuração inicial
    const scriptTag = document.currentScript;
    const embedContainer = document.getElementById('simulaseg-embed');
    
    // Verificar se o container existe
    if (!embedContainer) {
        console.error('SimulaSeg: Container #simulaseg-embed não encontrado na página');
        return;
    }
    
    // Obter parâmetros do script
    const agentId = scriptTag.getAttribute('data-agent-id') || '';
    const whatsappNumber = scriptTag.getAttribute('data-whatsapp') || '14079703360';
    const email = scriptTag.getAttribute('data-email') || '';
    const message = scriptTag.getAttribute('data-message') || 'OBRIGADO !';
    const thankYouUrl = scriptTag.getAttribute('data-thank-you-url') || '';
    const formspreeId = scriptTag.getAttribute('data-formspree') || '';
    const primaryColor = scriptTag.getAttribute('data-primary-color') || '#0056b3';
    const secondaryColor = scriptTag.getAttribute('data-secondary-color') || '#28a745';
    const accentColor = scriptTag.getAttribute('data-accent-color') || '#ffc107';
    const title = scriptTag.getAttribute('data-title') || 'SIMULE SUA PROTEÇÃO COM BENEFÍCIO EM VIDA';
    const apiUrl = scriptTag.getAttribute('data-api-url') || '';
    
    // Verificar status do simulador via API
    function checkSimulatorStatus() {
        console.log('SimulaSeg: Verificando status do simulador...');
        
        // URL da API para verificar status
        const statusUrl = `${apiUrl}/api/check_simulator_status`;
        
        // Dados para enviar
        const data = {
            agent_id: agentId
        };
        
        // Fazer requisição para verificar status
        fetch(statusUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            if (data.available) {
                console.log('SimulaSeg: Simulador disponível, carregando...');
                loadSimulator();
            } else {
                console.error('SimulaSeg: Simulador não disponível:', data.message);
                showError(data.message || 'Simulador não disponível. Entre em contato com o suporte.');
            }
        })
        .catch(error => {
            console.error('SimulaSeg: Erro ao verificar status do simulador:', error);
            showError('Erro ao verificar status do simulador. Entre em contato com o suporte.');
        });
    }
    
    // Mostrar mensagem de erro
    function showError(message) {
        // Criar elemento de erro
        const errorContainer = document.createElement('div');
        errorContainer.style.backgroundColor = '#f8d7da';
        errorContainer.style.color = '#721c24';
        errorContainer.style.padding = '20px';
        errorContainer.style.borderRadius = '8px';
        errorContainer.style.margin = '20px 0';
        errorContainer.style.textAlign = 'center';
        
        // Ícone de alerta
        const alertIcon = document.createElement('div');
        alertIcon.innerHTML = '⚠️';
        alertIcon.style.fontSize = '24px';
        alertIcon.style.marginBottom = '10px';
        
        // Título do erro
        const errorTitle = document.createElement('h3');
        errorTitle.textContent = 'Erro no Simulador';
        errorTitle.style.marginBottom = '10px';
        
        // Mensagem de erro
        const errorMessage = document.createElement('p');
        errorMessage.textContent = message;
        
        // Detalhes técnicos (para debug)
        const debugDetails = document.createElement('div');
        debugDetails.innerHTML = `
            <h4 style="margin-top: 20px; color: #721c24; cursor: pointer;" onclick="this.nextElementSibling.style.display = this.nextElementSibling.style.display === 'none' ? 'block' : 'none'">▼ Detalhes técnicos (Debug)</h4>
            <pre style="text-align: left; background: #f1f1f1; padding: 10px; border-radius: 5px; display: none; margin-top: 10px; overflow: auto; max-height: 200px;">${JSON.stringify({
                "agentId": agentId,
                "apiUrl": apiUrl,
                "timestamp": new Date().toISOString()
            }, null, 2)}</pre>
        `;
        
        // Adicionar elementos ao container de erro
        errorContainer.appendChild(alertIcon);
        errorContainer.appendChild(errorTitle);
        errorContainer.appendChild(errorMessage);
        errorContainer.appendChild(debugDetails);
        
        // Limpar e adicionar ao container principal
        embedContainer.innerHTML = '';
        embedContainer.appendChild(errorContainer);
    }
    
    // Carregar o simulador completo
    function loadSimulator() {
        // Criar estilos CSS baseados no modelo de referência
        const styles = document.createElement('style');
        styles.textContent = `
            :root {
                --primary-color: ${primaryColor};
                --secondary-color: ${secondaryColor};
                --accent-color: ${accentColor};
                --dark-color: #343a40;
                --light-color: #f8f9fa;
                --gray-color: #6c757d;
                --white-color: #ffffff;
                --danger-color: #dc3545;
                --trust-color: #3a5a78;
                --shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                --border-radius: 8px;
                --transition: all 0.3s ease;
            }
            
            #simulaseg-embed * {
                box-sizing: border-box;
                margin: 0;
                padding: 0;
                font-family: 'Montserrat', sans-serif;
            }
            
            #simulaseg-embed {
                background-color: #f5f7fa;
                color: var(--dark-color);
                line-height: 1.6;
                width: 100%;
                overflow-x: hidden;
            }
            
            .simulaseg-container {
                width: 100%;
                max-width: 900px;
                margin: 0 auto;
                padding: 20px;
            }
            
            .simulaseg-header {
                text-align: center;
                margin-bottom: 30px;
                padding: 30px 0;
                background-color: var(--primary-color);
                border-radius: var(--border-radius);
            }
            
            .simulaseg-h1 {
                font-size: 2.4rem;
                color: var(--white-color);
                font-weight: 700;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }
            
            .simulaseg-card {
                background-color: var(--white-color);
                border-radius: var(--border-radius);
                box-shadow: var(--shadow);
                padding: 30px;
                margin-bottom: 30px;
            }
            
            .simulaseg-form-group {
                margin-bottom: 20px;
            }
            
            .simulaseg-label {
                display: block;
                margin-bottom: 8px;
                font-weight: 600;
                color: var(--dark-color);
            }
            
            .simulaseg-input,
            .simulaseg-select {
                width: 100%;
                padding: 12px 15px;
                border: 1px solid #ddd;
                border-radius: var(--border-radius);
                font-size: 1rem;
                transition: var(--transition);
            }
            
            .simulaseg-input:focus,
            .simulaseg-select:focus {
                border-color: var(--primary-color);
                outline: none;
                box-shadow: 0 0 0 3px rgba(0, 86, 179, 0.2);
            }
            
            .simulaseg-radio-group {
                display: flex;
                flex-wrap: wrap;
                gap: 15px;
            }
            
            .simulaseg-radio-option {
                flex: 1;
                min-width: 120px;
            }
            
            .simulaseg-radio-option input[type="radio"] {
                display: none;
            }
            
            .simulaseg-radio-option label {
                display: block;
                padding: 12px 15px;
                text-align: center;
                background-color: var(--light-color);
                border: 1px solid #ddd;
                border-radius: var(--border-radius);
                cursor: pointer;
                transition: var(--transition);
            }
            
            .simulaseg-radio-option input[type="radio"]:checked + label {
                background-color: var(--primary-color);
                color: var(--white-color);
                border-color: var(--primary-color);
            }
            
            .simulaseg-btn {
                display: inline-block;
                font-weight: 600;
                text-align: center;
                white-space: nowrap;
                vertical-align: middle;
                user-select: none;
                border: 1px solid transparent;
                padding: 12px 24px;
                font-size: 1rem;
                line-height: 1.5;
                border-radius: var(--border-radius);
                transition: var(--transition);
                cursor: pointer;
                width: 100%;
            }
            
            .simulaseg-btn-primary {
                color: var(--white-color);
                background-color: var(--primary-color);
                border-color: var(--primary-color);
            }
            
            .simulaseg-btn-primary:hover {
                background-color: #004494;
                border-color: #004494;
            }
            
            .simulaseg-btn-success {
                color: var(--white-color);
                background-color: var(--secondary-color);
                border-color: var(--secondary-color);
                font-size: 0.95rem;
                white-space: normal;
            }
            
            .simulaseg-btn-success:hover {
                background-color: #218838;
                border-color: #1e7e34;
            }
            
            .simulaseg-result-section {
                background-color: var(--primary-color);
                color: var(--white-color);
                border-radius: var(--border-radius);
                padding: 25px;
                margin-top: 30px;
                text-align: center;
                display: none;
                width: 100%;
                max-width: 100%;
                margin-left: auto;
                margin-right: auto;
                box-sizing: border-box;
                overflow: hidden;
            }
            
            .simulaseg-result-title {
                font-size: 1.2rem;
                margin-bottom: 10px;
            }
            
            .simulaseg-result-price {
                font-size: 2.5rem;
                font-weight: 700;
                margin: 15px 0;
            }
            
            .simulaseg-result-note {
                font-size: 0.9rem;
                opacity: 0.8;
                margin-bottom: 20px;
            }
            
            .simulaseg-alert-box {
                background-color: var(--danger-color);
                color: var(--white-color);
                border-radius: var(--border-radius);
                padding: 20px;
                margin: 20px 0;
                text-align: center;
                font-weight: 600;
                width: 100%;
                box-sizing: border-box;
            }
            
            .simulaseg-alert-title {
                font-size: 1.2rem;
                margin-bottom: 10px;
            }
            
            .simulaseg-alert-message {
                font-size: 1rem;
                opacity: 0.9;
            }
            
            .simulaseg-lead-section {
                background-color: var(--white-color);
                border-radius: var(--border-radius);
                padding: 25px;
                margin-top: 20px;
                box-shadow: var(--shadow);
                width: 100%;
                box-sizing: border-box;
            }
            
            .simulaseg-lead-title {
                font-size: 1.2rem;
                color: var(--primary-color);
                margin-bottom: 20px;
                text-align: center;
                font-weight: 600;
            }
            
            .simulaseg-thank-you-section {
                text-align: center;
                padding: 30px;
                background-color: var(--secondary-color);
                color: var(--white-color);
                border-radius: var(--border-radius);
                margin-top: 30px;
                display: none;
                width: 100%;
                max-width: 100%;
                margin-left: auto;
                margin-right: auto;
                box-sizing: border-box;
            }
            
            .simulaseg-thank-you-title {
                font-size: 1.5rem;
                margin-bottom: 15px;
            }
            
            .simulaseg-thank-you-message {
                font-size: 1rem;
                margin-bottom: 20px;
            }
            
            .simulaseg-row {
                display: flex;
                flex-wrap: wrap;
                margin: 0 -10px;
            }
            
            .simulaseg-col {
                flex: 1;
                padding: 0 10px;
                min-width: 200px;
            }
            
            .simulaseg-error-message {
                color: #dc3545;
                font-size: 0.9rem;
                margin-top: 5px;
                display: none;
            }
            
            .simulaseg-contact-info-section {
                background-color: var(--accent-color);
                border-radius: var(--border-radius);
                padding: 20px;
                margin-bottom: 20px;
            }
            
            .simulaseg-contact-info-title {
                font-size: 1.1rem;
                color: var(--dark-color);
                margin-bottom: 15px;
                text-align: center;
                font-weight: 600;
            }
            
            .simulaseg-whatsapp-btn {
                background-color: #25D366;
                color: white;
                border-color: #25D366;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 10px;
            }
            
            .simulaseg-whatsapp-btn:hover {
                background-color: #128C7E;
                border-color: #128C7E;
            }
            
            .simulaseg-whatsapp-icon {
                width: 20px;
                height: 20px;
            }
            
            .simulaseg-insurance-question-section {
                background-color: var(--trust-color);
                color: var(--white-color);
                border-radius: var(--border-radius);
                padding: 25px;
                margin-top: 20px;
                margin-bottom: 20px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
                border-left: 5px solid #1e3a5f;
            }
            
            .simulaseg-insurance-question-title {
                font-size: 1.3rem;
                margin-bottom: 20px;
                text-align: center;
                font-weight: 600;
            }
            
            .simulaseg-insurance-options {
                display: flex;
                flex-direction: column;
                gap: 15px;
            }
            
            .simulaseg-insurance-option {
                position: relative;
                width: 100%;
            }
            
            .simulaseg-insurance-option input[type="radio"] {
                position: absolute;
                opacity: 0;
                width: 0;
                height: 0;
            }
            
            .simulaseg-insurance-option label {
                display: block;
                padding: 15px;
                font-size: 0.95rem;
                background-color: rgba(255, 255, 255, 0.9);
                color: var(--dark-color);
                border: 1px solid rgba(255, 255, 255, 0.7);
                border-radius: var(--border-radius);
                cursor: pointer;
                transition: var(--transition);
                text-align: center;
                font-weight: 500;
                height: 50px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .simulaseg-insurance-option input[type="radio"]:checked + label {
                background-color: var(--primary-color);
                color: var(--white-color);
                border-color: var(--primary-color);
                font-weight: 600;
            }
            
            .simulaseg-insurance-option label:hover {
                background-color: var(--white-color);
                transform: translateY(-2px);
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }
            
            .simulaseg-required-indicator {
                color: var(--white-color);
                font-size: 0.9rem;
                text-align: center;
                margin-top: 15px;
                font-style: italic;
            }
            
            .simulaseg-insurance-error {
                color: var(--white-color);
                background-color: rgba(220, 53, 69, 0.8);
                padding: 8px 12px;
                border-radius: 4px;
                margin-top: 15px;
                text-align: center;
                font-size: 0.9rem;
                display: none;
            }
            
            @media (max-width: 768px) {
                .simulaseg-container {
                    padding: 10px;
                    width: 100%;
                }
                
                .simulaseg-h1 {
                    font-size: 1.8rem;
                    padding: 0 10px;
                }
                
                .simulaseg-card {
                    padding: 20px;
                }
                
                .simulaseg-row {
                    flex-direction: column;
                    margin: 0;
                }
                
                .simulaseg-col {
                    margin-bottom: 15px;
                    padding: 0;
                    width: 100%;
                }
                
                .simulaseg-radio-group {
                    gap: 10px;
                }
                
                .simulaseg-radio-option {
                    min-width: 100px;
                }
                
                .simulaseg-result-section {
                    padding: 15px;
                    margin: 0;
                    width: 100%;
                    max-width: 100%;
                    border-radius: 0;
                }
                
                .simulaseg-result-price {
                    font-size: 2rem;
                }
                
                .simulaseg-alert-box {
                    padding: 15px;
                    margin: 15px 0;
                }
                
                .simulaseg-lead-section {
                    padding: 15px;
                    margin: 15px 0 0 0;
                    width: 100%;
                }
                
                .simulaseg-btn {
                    padding: 10px 15px;
                }
                
                .simulaseg-thank-you-section {
                    padding: 20px;
                    margin: 0;
                    width: 100%;
                    max-width: 100%;
                    border-radius: 0;
                }
                
                .simulaseg-insurance-option label {
                    padding: 12px;
                    font-size: 0.85rem;
                }
                
                .simulaseg-insurance-question-title {
                    font-size: 1.2rem;
                }
            }
            
            @media (max-width: 480px) {
                .simulaseg-h1 {
                    font-size: 1.5rem;
                }
                
                .simulaseg-result-price {
                    font-size: 1.8rem;
                }
                
                .simulaseg-alert-title {
                    font-size: 1.1rem;
                }
                
                .simulaseg-alert-message {
                    font-size: 0.9rem;
                }
                
                .simulaseg-btn {
                    font-size: 0.9rem;
                    padding: 10px;
                }
                
                .simulaseg-insurance-question-title {
                    font-size: 1.1rem;
                }
            }
        `;
        
        // Adicionar fonte Montserrat
        const fontLink = document.createElement('link');
        fontLink.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap';
        fontLink.rel = 'stylesheet';
        document.head.appendChild(fontLink);
        
        // Adicionar estilos ao head
        document.head.appendChild(styles);
        
        // Criar HTML do simulador baseado no modelo de referência
        embedContainer.innerHTML = `
            <div class="simulaseg-container">
                <header class="simulaseg-header">
                    <h1 class="simulaseg-h1">${title}</h1>
                </header>
                
                <div class="simulaseg-card">
                    <form id="simulaseg-simulator-form">
                        <div class="simulaseg-row">
                            <div class="simulaseg-col">
                                <div class="simulaseg-form-group">
                                    <label class="simulaseg-label" for="simulaseg-age">Idade</label>
                                    <input type="number" id="simulaseg-age" class="simulaseg-input" min="18" max="75" placeholder="Ex: 35" required>
                                    <div class="simulaseg-error-message" id="simulaseg-age-error">Por favor, informe sua idade.</div>
                                </div>
                            </div>
                            <div class="simulaseg-col">
                                <div class="simulaseg-form-group">
                                    <label class="simulaseg-label">Gênero</label>
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
                                    <label class="simulaseg-label" for="simulaseg-coverage">Valor da Cobertura</label>
                                    <select id="simulaseg-coverage" class="simulaseg-select" required>
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
                                    <label class="simulaseg-label">Possui alguma doença grave?</label>
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
                            <label class="simulaseg-label" for="simulaseg-state">Estado</label>
                            <select id="simulaseg-state" class="simulaseg-select" required>
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
                        
                        <div class="simulaseg-row">
                            <div class="simulaseg-col">
                                <div class="simulaseg-form-group">
                                    <label class="simulaseg-label" for="simulaseg-user-name">Nome Completo</label>
                                    <input type="text" id="simulaseg-user-name" class="simulaseg-input" placeholder="Seu nome completo" required>
                                    <div class="simulaseg-error-message" id="simulaseg-name-error">Por favor, informe seu nome completo.</div>
                                </div>
                            </div>
                            <div class="simulaseg-col">
                                <div class="simulaseg-form-group">
                                    <label class="simulaseg-label" for="simulaseg-user-phone">Telefone</label>
                                    <input type="tel" id="simulaseg-user-phone" class="simulaseg-input" placeholder="(XX) XXXXX-XXXX" required>
                                    <div class="simulaseg-error-message" id="simulaseg-phone-error">Por favor, informe seu telefone.</div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                
                <div class="simulaseg-insurance-question-section" id="simulaseg-insurance-question-section">
                    <h3 class="simulaseg-insurance-question-title">Você já possui seguro de vida?</h3>
                    <div class="simulaseg-insurance-options">
                        <div class="simulaseg-insurance-option">
                            <input type="radio" id="simulaseg-has-insurance-no" name="simulaseg-has-insurance" value="no">
                            <label for="simulaseg-has-insurance-no">Não, não tenho seguro de vida</label>
                        </div>
                        <div class="simulaseg-insurance-option">
                            <input type="radio" id="simulaseg-has-insurance-yes" name="simulaseg-has-insurance" value="yes">
                            <label for="simulaseg-has-insurance-yes">Sim, já tenho seguro de vida e gostaria de melhorar</label>
                        </div>
                    </div>
                    <div class="simulaseg-required-indicator">* Campo obrigatório</div>
                    <div class="simulaseg-insurance-error" id="simulaseg-insurance-error">Por favor, selecione uma opção sobre seguro de vida.</div>
                </div>
                
                <div class="simulaseg-card">
                    <button type="button" class="simulaseg-btn simulaseg-btn-primary" id="simulaseg-calculate-btn">Simular</button>
                </div>
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
                        <input type="hidden" id="simulaseg-simulation-details" name="simulation_details">
                        <input type="hidden" id="simulaseg-hidden-phone" name="telefone">
                        <input type="hidden" id="simulaseg-hidden-name" name="nome">
                        <input type="hidden" id="simulaseg-hidden-state" name="estado">
                        <input type="hidden" id="simulaseg-hidden-email" name="email">
                        <input type="hidden" id="simulaseg-hidden-has-insurance" name="has_insurance">
                        
                        <div class="simulaseg-form-group">
                            <label class="simulaseg-label" for="simulaseg-email">E-mail</label>
                            <input type="email" id="simulaseg-email" class="simulaseg-input" name="email" required>
                            <div class="simulaseg-error-message" id="simulaseg-email-error">Por favor, informe um e-mail válido.</div>
                        </div>
                        
                        <div class="simulaseg-row">
                            <div class="simulaseg-col">
                                <button type="button" class="simulaseg-btn simulaseg-btn-success" id="simulaseg-submit-lead-btn">Receber detalhes por e-mail</button>
                            </div>
                            <div class="simulaseg-col">
                                <button type="button" class="simulaseg-btn simulaseg-whatsapp-btn" id="simulaseg-whatsapp-btn">
                                    <svg class="simulaseg-whatsapp-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                        <path fill="currentColor" d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
                                    </svg>
                                    Receber detalhes por WhatsApp
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            
            <div class="simulaseg-container">
                <div class="simulaseg-thank-you-section" id="simulaseg-thank-you-section">
                    <h2 class="simulaseg-thank-you-title">Obrigado!</h2>
                    <p class="simulaseg-thank-you-message">Recebemos suas informações e enviaremos todos os detalhes sobre seu benefício em vida em breve.</p>
                    <button type="button" class="simulaseg-btn simulaseg-btn-primary" id="simulaseg-restart-btn">Fazer nova simulação</button>
                </div>
            </div>
        `;
        
        // Aguardar um pouco para garantir que o DOM foi criado
        setTimeout(function() {
            initializeSimulator();
        }, 100);
    }
    
    // Inicializar funcionalidades do simulador
    function initializeSimulator() {
        // Obter elementos
        const calculateBtn = document.getElementById('simulaseg-calculate-btn');
        const submitLeadBtn = document.getElementById('simulaseg-submit-lead-btn');
        const whatsappBtn = document.getElementById('simulaseg-whatsapp-btn');
        const restartBtn = document.getElementById('simulaseg-restart-btn');
        const resultSection = document.getElementById('simulaseg-result-section');
        const thankYouSection = document.getElementById('simulaseg-thank-you-section');
        const leadForm = document.getElementById('simulaseg-lead-form');
        const simulationDetails = document.getElementById('simulaseg-simulation-details');
        const hiddenPhone = document.getElementById('simulaseg-hidden-phone');
        const hiddenName = document.getElementById('simulaseg-hidden-name');
        const hiddenState = document.getElementById('simulaseg-hidden-state');
        const hiddenEmail = document.getElementById('simulaseg-hidden-email');
        const hiddenHasInsurance = document.getElementById('simulaseg-hidden-has-insurance');
        const insuranceError = document.getElementById('simulaseg-insurance-error');
        
        // Configurações do agente
        const agentIdValue = agentId;
        const whatsappNumberValue = whatsappNumber;
        const agentEmailValue = email;
        const thankYouUrlValue = thankYouUrl;
        
        // Calculate button click handler
        if (calculateBtn) {
            calculateBtn.addEventListener('click', function() {
                if (validateSimulatorForm()) {
                    // Verificar a resposta sobre seguro de vida
                    const hasInsurance = document.querySelector('input[name="simulaseg-has-insurance"]:checked');
                    
                    if (!hasInsurance) {
                        // Se nenhuma opção foi selecionada, mostrar erro
                        insuranceError.style.display = 'block';
                        document.getElementById('simulaseg-insurance-question-section').scrollIntoView({ behavior: 'smooth' });
                        return;
                    }
                    
                    // Ocultar erro se estava visível
                    insuranceError.style.display = 'none';
                    
                    // Armazenar a resposta no campo oculto
                    hiddenHasInsurance.value = hasInsurance.value;
                    
                    // Enviar dados para o backend em ambos os casos
                    sendInitialLeadData().then(() => {
                        if (hasInsurance.value === 'yes') {
                            // Se já tem seguro, enviar para o WhatsApp com mensagem personalizada
                            sendImproveInsuranceWhatsAppMessage();
                        } else {
                            // Se não tem seguro, mostrar resultado da simulação
                            calculateAndShowResults();
                        }
                    }).catch(error => {
                        console.error('Erro ao enviar dados iniciais:', error);
                        // Em caso de erro, ainda assim prosseguir com o fluxo
                        if (hasInsurance.value === 'yes') {
                            sendImproveInsuranceWhatsAppMessage();
                        } else {
                            calculateAndShowResults();
                        }
                    });
                }
            });
        }
        
        // Submit lead button click handler
        if (submitLeadBtn) {
            submitLeadBtn.addEventListener('click', function() {
                if (validateLeadForm()) {
                    sendLeadData().then(() => {
                        showThankYouSection();
                    }).catch(error => {
                        console.error('Erro ao enviar dados do lead:', error);
                        // Mesmo com erro, mostrar agradecimento
                        showThankYouSection();
                    });
                }
            });
        }
        
        // WhatsApp button click handler
        if (whatsappBtn) {
            whatsappBtn.addEventListener('click', function() {
                if (validateLeadForm()) {
                    sendLeadData().then(() => {
                        sendWhatsAppMessage();
                        showThankYouSection();
                    }).catch(error => {
                        console.error('Erro ao enviar dados do lead:', error);
                        // Mesmo com erro, prosseguir com WhatsApp
                        sendWhatsAppMessage();
                        showThankYouSection();
                    });
                }
            });
        }
        
        // Restart button click handler
        if (restartBtn) {
            restartBtn.addEventListener('click', function() {
                resetSimulator();
            });
        }
        
        // Enviar dados iniciais para o backend
        function sendInitialLeadData() {
            return new Promise((resolve, reject) => {
                // Obter dados do formulário
                const userName = document.getElementById('simulaseg-user-name').value;
                const userPhone = document.getElementById('simulaseg-user-phone').value;
                const state = document.getElementById('simulaseg-state').value;
                const hasInsurance = document.querySelector('input[name="simulaseg-has-insurance"]:checked').value;
                
                // Armazenar nos campos ocultos
                hiddenName.value = userName;
                hiddenPhone.value = userPhone;
                hiddenState.value = state;
                
                // Criar objeto com dados
                const leadData = {
                    agent_id: agentIdValue,
                    name: userName,
                    phone: userPhone,
                    state: state,
                    has_insurance: hasInsurance,
                    source: window.location.href,
                    initial_contact: true
                };
                
                // Enviar dados para o backend
                fetch(`${apiUrl}/api/save_lead`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(leadData)
                })
                .then(response => response.json())
                .then(data => {
                    console.log('Dados iniciais enviados com sucesso:', data);
                    resolve(data);
                })
                .catch(error => {
                    console.error('Erro ao enviar dados iniciais:', error);
                    reject(error);
                });
            });
        }
        
        // Enviar dados completos do lead
        function sendLeadData() {
            return new Promise((resolve, reject) => {
                // Obter dados adicionais
                const emailValue = document.getElementById('simulaseg-email').value;
                
                // Atualizar campo oculto
                hiddenEmail.value = emailValue;
                
                // Criar objeto com dados completos
                const leadData = {
                    agent_id: agentIdValue,
                    name: hiddenName.value,
                    phone: hiddenPhone.value,
                    email: emailValue,
                    state: hiddenState.value,
                    has_insurance: hiddenHasInsurance.value,
                    simulation_details: simulationDetails.value,
                    source: window.location.href,
                    complete_lead: true
                };
                
                // Enviar dados para o backend
                fetch(`${apiUrl}/api/save_lead`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(leadData)
                })
                .then(response => response.json())
                .then(data => {
                    console.log('Dados completos enviados com sucesso:', data);
                    resolve(data);
                })
                .catch(error => {
                    console.error('Erro ao enviar dados completos:', error);
                    reject(error);
                });
            });
        }
        
        // Validate simulator form
        function validateSimulatorForm() {
            let isValid = true;
            
            // Validate age
            const age = document.getElementById('simulaseg-age');
            const ageError = document.getElementById('simulaseg-age-error');
            
            if (!age.value || age.value < 18 || age.value > 75) {
                ageError.style.display = 'block';
                isValid = false;
                age.focus();
            } else {
                ageError.style.display = 'none';
            }
            
            // Validate coverage
            const coverage = document.getElementById('simulaseg-coverage');
            const coverageError = document.getElementById('simulaseg-coverage-error');
            
            if (!coverage.value) {
                coverageError.style.display = 'block';
                isValid = false;
                if (age.value) coverage.focus();
            } else {
                coverageError.style.display = 'none';
            }
            
            // Validate state
            const state = document.getElementById('simulaseg-state');
            const stateError = document.getElementById('simulaseg-state-error');
            
            if (!state.value) {
                stateError.style.display = 'block';
                isValid = false;
                if (age.value && coverage.value) state.focus();
            } else {
                stateError.style.display = 'none';
            }
            
            // Validate name
            const userName = document.getElementById('simulaseg-user-name');
            const nameError = document.getElementById('simulaseg-name-error');
            
            if (!userName.value.trim()) {
                nameError.style.display = 'block';
                isValid = false;
                if (age.value && coverage.value && state.value) userName.focus();
            } else {
                nameError.style.display = 'none';
            }
            
            // Validate phone
            const userPhone = document.getElementById('simulaseg-user-phone');
            const phoneError = document.getElementById('simulaseg-phone-error');
            
            if (!userPhone.value.trim()) {
                phoneError.style.display = 'block';
                isValid = false;
                if (age.value && coverage.value && state.value && userName.value.trim()) userPhone.focus();
            } else {
                phoneError.style.display = 'none';
            }
            
            return isValid;
        }
        
        // Validate lead form
        function validateLeadForm() {
            let isValid = true;
            
            // Validate email
            const emailInput = document.getElementById('simulaseg-email');
            const emailError = document.getElementById('simulaseg-email-error');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (!emailInput.value || !emailRegex.test(emailInput.value)) {
                emailError.style.display = 'block';
                isValid = false;
                emailInput.focus();
            } else {
                emailError.style.display = 'none';
            }
            
            return isValid;
        }
        
        // Calculate and show results
        function calculateAndShowResults() {
            // Obter dados do formulário
            const age = parseInt(document.getElementById('simulaseg-age').value);
            const gender = document.querySelector('input[name="simulaseg-gender"]:checked').value;
            const coverage = parseInt(document.getElementById('simulaseg-coverage').value);
            const hasDisease = document.querySelector('input[name="simulaseg-disease"]:checked').value === 'yes';
            const state = document.getElementById('simulaseg-state').value;
            
            // Tabela de taxas simplificada (baseada em dados reais de seguros)
            const rateTable = {
                // Formato: idade_genero_cobertura_termo: valor_mensal
                '30_male_500000_20': 45,
                '30_female_500000_20': 38,
                '35_male_500000_20': 52,
                '35_female_500000_20': 44,
                '40_male_500000_20': 68,
                '40_female_500000_20': 56,
                '45_male_500000_20': 95,
                '45_female_500000_20': 78,
                '50_male_500000_20': 142,
                '50_female_500000_20': 115
            };
            
            // Termo padrão de 20 anos
            const term = 20;
            
            // Tentar encontrar correspondência exata na tabela de taxas
            const key = `${age}_${gender}_${coverage}_${term}`;
            let monthlyPremium;
            
            if (rateTable[key]) {
                // Usar correspondência exata da tabela
                monthlyPremium = rateTable[key];
            } else {
                // Calcular baseado na correspondência mais próxima e interpolação
                // Taxa base por $1000 de cobertura
                let baseRate = 0.075; // $0.075 por $1000 de cobertura por mês
                
                // Encontrar idade mais próxima na tabela de taxas para interpolação
                const ages = [30, 35, 40, 45, 50];
                let closestAge = ages.reduce((prev, curr) => {
                    return (Math.abs(curr - age) < Math.abs(prev - age) ? curr : prev);
                });
                
                // Obter taxa para idade mais próxima
                const closestKey = `${closestAge}_${gender}_500000_${term}`;
                const closestRate = rateTable[closestKey] || null;
                
                if (closestRate) {
                    // Calcular taxa baseada na proporção de cobertura
                    monthlyPremium = Math.round((closestRate / 500000) * coverage);
                    
                    // Ajustar para diferença de idade (aproximadamente 3-5% por ano)
                    const ageDiff = age - closestAge;
                    if (ageDiff > 0) {
                        monthlyPremium *= (1 + (0.04 * ageDiff)); // 4% de aumento por ano mais velho
                    } else if (ageDiff < 0) {
                        monthlyPremium *= (1 - (0.04 * Math.abs(ageDiff))); // 4% de desconto por ano mais novo
                    }
                    
                    monthlyPremium = Math.round(monthlyPremium);
                } else {
                    // Cálculo de fallback se nenhuma correspondência próxima for encontrada
                    // Ajustar para idade
                    if (age <= 25) {
                        baseRate *= 0.7;
                    } else if (age <= 30) {
                        baseRate *= 0.85;
                    } else if (age <= 35) {
                        baseRate *= 0.95;
                    } else if (age <= 40) {
                        baseRate *= 1.15;
                    } else if (age <= 45) {
                        baseRate *= 1.4;
                    } else if (age <= 50) {
                        baseRate *= 1.9;
                    } else if (age <= 55) {
                        baseRate *= 2.5;
                    } else if (age <= 60) {
                        baseRate *= 3.3;
                    } else if (age <= 65) {
                        baseRate *= 4.5;
                    } else {
                        baseRate *= 6;
                    }
                    
                    // Ajustar para gênero
                    if (gender === 'male') {
                        baseRate *= 1.15;
                    } else {
                        baseRate *= 0.9;
                    }
                    
                    // Calcular prêmio mensal
                    monthlyPremium = Math.round(baseRate * (coverage / 1000));
                }
            }
            
            // Ajustar para condição de saúde
            if (hasDisease) {
                monthlyPremium = Math.round(monthlyPremium * 1.4);
            }
            
            // Atualizar elementos de resultado
            document.getElementById('simulaseg-monthly-price').textContent = '$' + monthlyPremium + '/mês';
            
            // Adicionar detalhes da simulação ao campo oculto
            simulationDetails.value = `Idade: ${age}, Gênero: ${gender === 'male' ? 'Homem' : 'Mulher'}, Cobertura: $${coverage.toLocaleString()}, Doença Grave: ${hasDisease ? 'Sim' : 'Não'}, Estado: ${state}, Valor Mensal: $${monthlyPremium}/mês`;
            
            // Mostrar seção de resultado
            resultSection.style.display = 'block';
            
            // Rolar para seção de resultado
            resultSection.scrollIntoView({ behavior: 'smooth' });
        }
        
        // Send WhatsApp message for regular lead
        function sendWhatsAppMessage() {
            // Mensagem simplificada conforme solicitado
            const messageText = "Olá! Quero saber sobre meus benefícios em vida.";
            
            // Criar URL do WhatsApp
            const whatsappUrl = `https://wa.me/${whatsappNumberValue}?text=${encodeURIComponent(messageText)}`;
            
            // Abrir WhatsApp em nova aba
            window.open(whatsappUrl, '_blank');
        }
        
        // Send WhatsApp message for users who already have insurance
        function sendImproveInsuranceWhatsAppMessage() {
            // Mensagem personalizada para quem já tem seguro
            const messageText = "Gostaria de melhorar o meu seguro.";
            
            // Criar URL do WhatsApp
            const whatsappUrl = `https://wa.me/${whatsappNumberValue}?text=${encodeURIComponent(messageText)}`;
            
            // Abrir WhatsApp em nova aba
            window.open(whatsappUrl, '_blank');
            
            // Redirecionar para a página de agradecimento após abrir o WhatsApp
            setTimeout(function() {
                if (thankYouUrlValue) {
                    window.location.href = thankYouUrlValue;
                } else {
                    showThankYouSection();
                }
            }, 1000);
        }
        
        // Show thank you section
        function showThankYouSection() {
            resultSection.style.display = 'none';
            thankYouSection.style.display = 'block';
            thankYouSection.scrollIntoView({ behavior: 'smooth' });
        }
        
        // Reset simulator
        function resetSimulator() {
            // Reset form fields
            document.getElementById('simulaseg-simulator-form').reset();
            document.getElementById('simulaseg-lead-form').reset();
            
            // Hide sections
            resultSection.style.display = 'none';
            thankYouSection.style.display = 'none';
            insuranceError.style.display = 'none';
            
            // Hide all error messages
            const errorMessages = document.querySelectorAll('.simulaseg-error-message');
            errorMessages.forEach(error => error.style.display = 'none');
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        
        // Mostrar mensagem de sucesso no console
        console.log('SimulaSeg: Simulador carregado e inicializado com sucesso!');
    }
    
    // Iniciar verificação de status
    checkSimulatorStatus();
})();
