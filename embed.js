// SimulaSeg Embed Script
// Este script injeta o simulador de seguro de vida exatamente como o modelo original
// Versão: 2.0.0

(function() {
    // Função para obter os atributos do script
    function getScriptAttributes() {
        const script = document.currentScript;
        return {
            agentId: script.getAttribute('data-agent-id') || '',
            whatsapp: script.getAttribute('data-whatsapp') || '',
            email: script.getAttribute('data-email') || '',
            secondaryEmail: script.getAttribute('data-secondary-email') || 'segsimula@gmail.com',
            message: script.getAttribute('data-message') || 'Olá, gostaria de mais informações sobre seguro de vida.',
            thankYouUrl: script.getAttribute('data-thank-you-url') || '',
            primaryColor: script.getAttribute('data-primary-color') || '#0056b3',
            secondaryColor: script.getAttribute('data-secondary-color') || '#28a745',
            accentColor: script.getAttribute('data-accent-color') || '#ffc107',
            formspreeCode: script.getAttribute('data-formspree-code') || '',
            simulatorTitle: script.getAttribute('data-simulator-title') || 'SIMULE SUA PROTEÇÃO COM BENEFÍCIO EM VIDA'
        };
    }

    // Obter configurações
    const config = getScriptAttributes();

    // Criar o simulador exatamente como o modelo original
    function createSimulator() {
        const container = document.getElementById('simulaseg-embed');
        if (!container) return;

        // Injetar o HTML completo do simulador
        container.innerHTML = `
        <div class="container">
            <header>
                <h1>${config.simulatorTitle}</h1>
            </header>
            
            <div class="card">
                <form id="simulator-form">
                    <div class="row">
                        <div class="col">
                            <div class="form-group">
                                <label for="age">Idade</label>
                                <input type="number" id="age" min="18" max="75" placeholder="Ex: 35" required>
                                <div class="error-message" id="age-error">Por favor, informe sua idade.</div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="form-group">
                                <label>Gênero</label>
                                <div class="radio-group">
                                    <div class="radio-option">
                                        <input type="radio" id="gender-male" name="gender" value="male" checked>
                                        <label for="gender-male">Homem</label>
                                    </div>
                                    <div class="radio-option">
                                        <input type="radio" id="gender-female" name="gender" value="female">
                                        <label for="gender-female">Mulher</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="row">
                        <div class="col">
                            <div class="form-group">
                                <label for="coverage">Cobertura Desejada</label>
                                <select id="coverage" required>
                                    <option value="">Selecione um valor</option>
                                    <option value="100000">$100,000</option>
                                    <option value="250000">$250,000</option>
                                    <option value="500000" selected>$500,000</option>
                                    <option value="750000">$750,000</option>
                                    <option value="1000000">$1,000,000</option>
                                </select>
                                <div class="error-message" id="coverage-error">Por favor, selecione uma cobertura.</div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="form-group">
                                <label for="state">Estado</label>
                                <select id="state" required>
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
                                <div class="error-message" id="state-error">Por favor, selecione seu estado.</div>
                            </div>
                        </div>
                    </div>
                    
                    <button type="button" id="calculate-btn" class="btn btn-success">Calcular</button>
                </form>
                
                <div id="result-section" class="result-section">
                    <div class="result-title">Resultado da Simulação</div>
                    
                    <div class="row">
                        <div class="col">
                            <div>Cobertura por Morte:</div>
                            <div>Cobertura por Invalidez:</div>
                            <div>Doenças Graves:</div>
                        </div>
                        <div class="col" style="text-align: right;">
                            <div id="death-coverage">$500,000.00</div>
                            <div id="disability-coverage">$500,000.00</div>
                            <div id="critical-illness">$250,000.00</div>
                        </div>
                    </div>
                    
                    <div class="result-price">
                        <span id="monthly-price">$29.99</span>
                    </div>
                    
                    <div class="result-note">
                        Valor mensal estimado para o perfil informado.
                    </div>
                    
                    <button type="button" id="more-info-btn" class="btn btn-success">Quero mais informações</button>
                </div>
                
                <div id="lead-section" class="lead-section" style="display: none;">
                    <div class="lead-title">Preencha seus dados para receber mais informações</div>
                    
                    <form id="lead-form" action="https://formspree.io/f/${config.formspreeCode}" method="POST">
                        <input type="hidden" name="age" id="lead-age">
                        <input type="hidden" name="gender" id="lead-gender">
                        <input type="hidden" name="coverage" id="lead-coverage">
                        <input type="hidden" name="state" id="lead-state">
                        <input type="hidden" name="monthly_price" id="lead-monthly-price">
                        <input type="hidden" name="_subject" value="Novo Lead do Simulador de Seguro">
                        
                        <div class="row">
                            <div class="col">
                                <div class="form-group">
                                    <label for="name">Nome Completo</label>
                                    <input type="text" id="name" name="name" required>
                                    <div class="error-message" id="name-error">Por favor, informe seu nome.</div>
                                </div>
                            </div>
                            <div class="col">
                                <div class="form-group">
                                    <label for="email">Email</label>
                                    <input type="email" id="email" name="email" required>
                                    <div class="error-message" id="email-error">Por favor, informe um email válido.</div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="row">
                            <div class="col">
                                <div class="form-group">
                                    <label for="phone">Telefone</label>
                                    <input type="tel" id="phone" name="phone" placeholder="+1 (XXX) XXX-XXXX" required>
                                    <div class="error-message" id="phone-error">Por favor, informe seu telefone.</div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="row">
                            <div class="col">
                                <button type="button" id="whatsapp-btn" class="btn whatsapp-btn">
                                    <svg class="whatsapp-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                        <path fill="currentColor" d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
                                    </svg>
                                    WhatsApp
                                </button>
                            </div>
                            <div class="col">
                                <button type="submit" id="submit-btn" class="btn btn-primary">Enviar</button>
                            </div>
                        </div>
                    </form>
                </div>
                
                <div id="thank-you-section" class="thank-you-section">
                    <div class="thank-you-title">NOS VEMOS EM BREVE!</div>
                    <div class="thank-you-message">
                        Obrigado pelo seu interesse. Um de nossos especialistas entrará em contato em breve.
                    </div>
                </div>
                
                <div class="disclaimer">
                    Simulação para fins ilustrativos. Não constitui proposta formal de seguro.
                </div>
            </div>
        </div>
        `;

        // Adicionar estilos
        addStyles();
        
        // Adicionar event listeners
        setupEventListeners();
    }

    // Adicionar estilos CSS
    function addStyles() {
        const style = document.createElement('style');
        style.textContent = `
        /* Estilos para o simulador */
        #simulaseg-embed {
            font-family: 'Montserrat', sans-serif;
        }
        
        #simulaseg-embed :root {
            --primary-color: ${config.primaryColor};
            --secondary-color: ${config.secondaryColor};
            --accent-color: ${config.accentColor};
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
        
        #simulaseg-embed .container {
            width: 100%;
            max-width: 900px;
            margin: 0 auto;
            padding: 20px;
        }
        
        #simulaseg-embed header {
            text-align: center;
            margin-bottom: 30px;
            padding: 30px 0;
            background-color: ${config.primaryColor};
            border-radius: 8px;
        }
        
        #simulaseg-embed h1 {
            font-size: 2.4rem;
            color: #ffffff;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        #simulaseg-embed .card {
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            padding: 30px;
            margin-bottom: 30px;
        }
        
        #simulaseg-embed .form-group {
            margin-bottom: 20px;
        }
        
        #simulaseg-embed label {
            display: block;
            margin-bottom: 8px;
            font-weight: 600;
            color: #343a40;
        }
        
        #simulaseg-embed input[type="text"],
        #simulaseg-embed input[type="number"],
        #simulaseg-embed input[type="tel"],
        #simulaseg-embed input[type="email"],
        #simulaseg-embed input[type="date"],
        #simulaseg-embed select {
            width: 100%;
            padding: 12px 15px;
            border: 1px solid #ddd;
            border-radius: 8px;
            font-size: 1rem;
            transition: all 0.3s ease;
        }
        
        #simulaseg-embed input[type="text"]:focus,
        #simulaseg-embed input[type="number"]:focus,
        #simulaseg-embed input[type="tel"]:focus,
        #simulaseg-embed input[type="email"]:focus,
        #simulaseg-embed input[type="date"]:focus,
        #simulaseg-embed select:focus {
            border-color: ${config.primaryColor};
            outline: none;
            box-shadow: 0 0 0 3px rgba(0, 86, 179, 0.2);
        }
        
        #simulaseg-embed .radio-group {
            display: flex;
            flex-wrap: wrap;
            gap: 15px;
        }
        
        #simulaseg-embed .radio-option {
            flex: 1;
            min-width: 120px;
        }
        
        #simulaseg-embed .radio-option input[type="radio"] {
            display: none;
        }
        
        #simulaseg-embed .radio-option label {
            display: block;
            padding: 12px 15px;
            text-align: center;
            background-color: #f8f9fa;
            border: 1px solid #ddd;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        #simulaseg-embed .radio-option input[type="radio"]:checked + label {
            background-color: ${config.primaryColor};
            color: #ffffff;
            border-color: ${config.primaryColor};
        }
        
        #simulaseg-embed .btn {
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
            border-radius: 8px;
            transition: all 0.3s ease;
            cursor: pointer;
            width: 100%;
        }
        
        #simulaseg-embed .btn-primary {
            color: #ffffff;
            background-color: ${config.primaryColor};
            border-color: ${config.primaryColor};
        }
        
        #simulaseg-embed .btn-primary:hover {
            background-color: #004494;
            border-color: #004494;
        }
        
        #simulaseg-embed .btn-success {
            color: #ffffff;
            background-color: ${config.secondaryColor};
            border-color: ${config.secondaryColor};
            font-size: 0.95rem;
            white-space: normal;
        }
        
        #simulaseg-embed .btn-success:hover {
            background-color: #218838;
            border-color: #1e7e34;
        }
        
        #simulaseg-embed .result-section {
            background-color: ${config.primaryColor};
            color: #ffffff;
            border-radius: 8px;
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
        
        #simulaseg-embed .result-title {
            font-size: 1.2rem;
            margin-bottom: 10px;
        }
        
        #simulaseg-embed .result-price {
            font-size: 2.5rem;
            font-weight: 700;
            margin: 15px 0;
        }
        
        #simulaseg-embed .result-note {
            font-size: 0.9rem;
            opacity: 0.8;
            margin-bottom: 20px;
        }
        
        #simulaseg-embed .lead-section {
            background-color: #ffffff;
            border-radius: 8px;
            padding: 25px;
            margin-top: 20px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            width: 100%;
            box-sizing: border-box;
        }
        
        #simulaseg-embed .lead-title {
            font-size: 1.2rem;
            color: ${config.primaryColor};
            margin-bottom: 20px;
            text-align: center;
            font-weight: 600;
        }
        
        #simulaseg-embed .thank-you-section {
            text-align: center;
            padding: 30px;
            background-color: ${config.secondaryColor};
            color: #ffffff;
            border-radius: 8px;
            margin-top: 30px;
            display: none;
            width: 100%;
            max-width: 100%;
            margin-left: auto;
            margin-right: auto;
            box-sizing: border-box;
        }
        
        #simulaseg-embed .thank-you-title {
            font-size: 1.5rem;
            margin-bottom: 15px;
        }
        
        #simulaseg-embed .thank-you-message {
            font-size: 1rem;
            margin-bottom: 20px;
        }
        
        #simulaseg-embed .row {
            display: flex;
            flex-wrap: wrap;
            margin: 0 -10px;
        }
        
        #simulaseg-embed .col {
            flex: 1;
            padding: 0 10px;
            min-width: 200px;
        }
        
        #simulaseg-embed .error-message {
            color: #dc3545;
            font-size: 0.9rem;
            margin-top: 5px;
            display: none;
        }
        
        #simulaseg-embed .whatsapp-btn {
            background-color: #25D366;
            color: white;
            border-color: #25D366;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
        }
        
        #simulaseg-embed .whatsapp-btn:hover {
            background-color: #128C7E;
            border-color: #128C7E;
        }
        
        #simulaseg-embed .whatsapp-icon {
            width: 20px;
            height: 20px;
        }
        
        #simulaseg-embed .disclaimer {
            font-size: 0.8rem;
            color: #6c757d;
            text-align: center;
            margin-top: 15px;
        }
        
        /* Responsividade */
        @media (max-width: 768px) {
            #simulaseg-embed .container {
                padding: 10px;
                width: 100%;
            }
            
            #simulaseg-embed h1 {
                font-size: 1.8rem;
                padding: 0 10px;
            }
            
            #simulaseg-embed .card {
                padding: 20px;
            }
            
            #simulaseg-embed .row {
                flex-direction: column;
                margin: 0;
            }
            
            #simulaseg-embed .col {
                margin-bottom: 15px;
                padding: 0;
                width: 100%;
            }
        }
        
        @media (max-width: 480px) {
            #simulaseg-embed h1 {
                font-size: 1.5rem;
            }
            
            #simulaseg-embed .result-price {
                font-size: 1.8rem;
            }
            
            #simulaseg-embed .btn {
                font-size: 0.9rem;
                padding: 10px;
            }
        }
        `;
        document.head.appendChild(style);
        
        // Adicionar fonte Montserrat
        const fontLink = document.createElement('link');
        fontLink.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap';
        fontLink.rel = 'stylesheet';
        document.head.appendChild(fontLink);
    }

    // Configurar os event listeners
    function setupEventListeners() {
        // Botão de calcular
        const calculateBtn = document.getElementById('calculate-btn');
        if (calculateBtn) {
            calculateBtn.addEventListener('click', function() {
                calculateQuote();
            });
        }
        
        // Botão de mais informações
        const moreInfoBtn = document.getElementById('more-info-btn');
        if (moreInfoBtn) {
            moreInfoBtn.addEventListener('click', function() {
                showLeadForm();
            });
        }
        
        // Botão de WhatsApp
        const whatsappBtn = document.getElementById('whatsapp-btn');
        if (whatsappBtn) {
            whatsappBtn.addEventListener('click', function() {
                sendWhatsApp();
            });
        }
        
        // Formulário de lead
        const leadForm = document.getElementById('lead-form');
        if (leadForm) {
            leadForm.addEventListener('submit', function(e) {
                e.preventDefault();
                submitLeadForm();
            });
        }
    }

    // Calcular cotação
    function calculateQuote() {
        const age = document.getElementById('age').value;
        const gender = document.querySelector('input[name="gender"]:checked').value;
        const coverage = document.getElementById('coverage').value;
        const state = document.getElementById('state').value;
        
        // Validar campos
        if (!validateFields(age, coverage, state)) {
            return;
        }
        
        // Calcular preço mensal
        const monthlyPrice = calculateMonthlyPrice(age, gender, coverage, state);
        
        // Atualizar resultados
        document.getElementById('death-coverage').textContent = formatCurrency(coverage);
        document.getElementById('disability-coverage').textContent = formatCurrency(coverage);
        document.getElementById('critical-illness').textContent = formatCurrency(coverage / 2);
        document.getElementById('monthly-price').textContent = formatCurrency(monthlyPrice);
        
        // Mostrar seção de resultados
        document.getElementById('result-section').style.display = 'block';
        
        // Rolar para a seção de resultados
        document.getElementById('result-section').scrollIntoView({ behavior: 'smooth' });
    }

    // Validar campos
    function validateFields(age, coverage, state) {
        let isValid = true;
        
        // Validar idade
        if (!age || age < 18 || age > 75) {
            document.getElementById('age-error').style.display = 'block';
            isValid = false;
        } else {
            document.getElementById('age-error').style.display = 'none';
        }
        
        // Validar cobertura
        if (!coverage) {
            document.getElementById('coverage-error').style.display = 'block';
            isValid = false;
        } else {
            document.getElementById('coverage-error').style.display = 'none';
        }
        
        // Validar estado
        if (!state) {
            document.getElementById('state-error').style.display = 'block';
            isValid = false;
        } else {
            document.getElementById('state-error').style.display = 'none';
        }
        
        return isValid;
    }

    // Calcular preço mensal
    function calculateMonthlyPrice(age, gender, coverage, state) {
        // Base rate per $1000 of coverage
        let baseRate = 0.1;
        
        // Age factor
        let ageFactor = 1 + ((age - 18) * 0.02);
        
        // Gender factor (women typically have lower rates)
        let genderFactor = (gender === 'female') ? 0.85 : 1;
        
        // State factor (simplified)
        let stateFactor = 1;
        const highRateStates = ['FL', 'NY', 'CA', 'TX', 'NJ'];
        if (highRateStates.includes(state)) {
            stateFactor = 1.2;
        }
        
        // Coverage factor (discount for higher coverage)
        let coverageFactor = 1;
        if (coverage >= 500000) {
            coverageFactor = 0.9;
        } else if (coverage >= 250000) {
            coverageFactor = 0.95;
        }
        
        // Calculate monthly price
        let monthlyPrice = (baseRate * (coverage / 1000) * ageFactor * genderFactor * stateFactor * coverageFactor) / 12;
        
        // Round to 2 decimal places
        return Math.round(monthlyPrice * 100) / 100;
    }

    // Mostrar formulário de lead
    function showLeadForm() {
        // Preencher campos ocultos
        document.getElementById('lead-age').value = document.getElementById('age').value;
        document.getElementById('lead-gender').value = document.querySelector('input[name="gender"]:checked').value;
        document.getElementById('lead-coverage').value = document.getElementById('coverage').value;
        document.getElementById('lead-state').value = document.getElementById('state').value;
        document.getElementById('lead-monthly-price').value = document.getElementById('monthly-price').textContent;
        
        // Mostrar seção de lead
        document.getElementById('lead-section').style.display = 'block';
        
        // Rolar para a seção de lead
        document.getElementById('lead-section').scrollIntoView({ behavior: 'smooth' });
    }

    // Enviar WhatsApp
    function sendWhatsApp() {
        const name = document.getElementById('name').value;
        const age = document.getElementById('age').value;
        const coverage = document.getElementById('coverage').value;
        const monthlyPrice = document.getElementById('monthly-price').textContent;
        
        if (!name) {
            document.getElementById('name-error').style.display = 'block';
            return;
        }
        
        const message = encodeURIComponent(`${config.message}\n\nNome: ${name}\nIdade: ${age}\nCobertura: ${formatCurrency(coverage)}\nPreço Mensal: ${monthlyPrice}`);
        const whatsappUrl = `https://wa.me/${config.whatsapp}?text=${message}`;
        
        // Enviar dados para o email secundário
        sendSecondaryEmail();
        
        // Abrir WhatsApp
        window.open(whatsappUrl, '_blank');
    }

    // Enviar formulário de lead
    function submitLeadForm() {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        
        // Validar campos
        if (!name || !email || !phone) {
            if (!name) document.getElementById('name-error').style.display = 'block';
            if (!email) document.getElementById('email-error').style.display = 'block';
            if (!phone) document.getElementById('phone-error').style.display = 'block';
            return;
        }
        
        // Enviar dados para o email secundário
        sendSecondaryEmail();
        
        // Enviar formulário para Formspree
        const form = document.getElementById('lead-form');
        const formData = new FormData(form);
        
        fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                showThankYou();
            } else {
                alert('Ocorreu um erro ao enviar o formulário. Por favor, tente novamente.');
            }
        }).catch(error => {
            console.error('Error:', error);
            alert('Ocorreu um erro ao enviar o formulário. Por favor, tente novamente.');
        });
    }

    // Enviar email secundário
    function sendSecondaryEmail() {
        if (!config.secondaryEmail) return;
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const age = document.getElementById('age').value;
        const gender = document.querySelector('input[name="gender"]:checked').value;
        const coverage = document.getElementById('coverage').value;
        const state = document.getElementById('state').value;
        const monthlyPrice = document.getElementById('monthly-price').textContent;
        
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('age', age);
        formData.append('gender', gender);
        formData.append('coverage', coverage);
        formData.append('state', state);
        formData.append('monthly_price', monthlyPrice);
        formData.append('agent_email', config.email);
        formData.append('_subject', 'Novo Lead do Simulador de Seguro');
        
        // Enviar para o email secundário via Formspree
        fetch(`https://formspree.io/f/${config.formspreeCode}`, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        }).catch(error => {
            console.error('Error sending secondary email:', error);
        });
    }

    // Mostrar mensagem de agradecimento
    function showThankYou() {
        document.getElementById('lead-section').style.display = 'none';
        document.getElementById('thank-you-section').style.display = 'block';
        
        // Redirecionar se houver URL de agradecimento
        if (config.thankYouUrl) {
            setTimeout(() => {
                window.location.href = config.thankYouUrl;
            }, 2000);
        }
    }

    // Formatar valor como moeda
    function formatCurrency(value) {
        return '$' + parseFloat(value).toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }

    // Inicializar o simulador
    createSimulator();
})();
