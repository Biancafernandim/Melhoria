document.addEventListener('DOMContentLoaded', () => {

    // --- BANCO DE DADOS (SIMULADO) ---
    const clientes = [
        { id: 1, nome: "Tech Solutions S.A.", temPreCadastro: true },
        { id: 2, nome: "Inova Corp", temPreCadastro: false },
        { id: 3, nome: "Global Logistics", temPreCadastro: false }
    ];
    const fornecedores = [
        { id: 1, nome: "Alpha Recursos Humanos" },
        { id: 2, nome: "Beta Terceirização" },
        { id: 3, nome: "Gama Facilities" }
    ];
    const unidades = [
        { id: 1, nome: "Matriz São Paulo" },
        { id: 2, nome: "Filial Rio de Janeiro" },
        { id: 3, nome: "Centro de Distribuição Curitiba" }
    ];
    const funcoes = [
        { id: 1, nome: 'Desenvolvedor Frontend' },
        { id: 2, nome: 'Desenvolvedor Backend' },
        { id: 3, nome: 'Analista de Sistemas' },
        { id: 4, nome: 'Gerente de Projetos' }
    ];
     const areas = [
        { id: 1, nome: 'Tecnologia' },
        { id: 2, nome: 'Recursos Humanos' },
        { id: 3, nome: 'Operações' }
    ];
    const movimentacaoTipos = [
        { value: "afastamento", text: "Afastamento - INSS/Licença Maternidade" },
        { value: "retorno_afastamento", text: "Retorno Afastamento - INSS/Licença Maternidade" },
        { value: "mudanca_funcao", text: "Mudança de Função" },
        { value: "transferencia_contrato", text: "Transferência Contrato" },
        { value: "transferencia_fornecedor_unidade", text: "Transferência Fornecedor/Unidade" }
    ];
    let empregados = [
        { id: 1, photoUrl: 'https://placehold.co/150x150/a9a9a9/ffffff?text=AC', situacao: "Cadastrado", nome: "Ana Carolina", cpf: "111.222.333-44", status: "Ativo", clienteId: 1, fornecedorId: 1, unidadeId: 1, dataNascimento: "1990-05-15", rg: "12.345.678-9", nomeMae: "Maria Almeida", matricula: "1001", dataInicio: "2022-01-01", dataAdmissao: "2022-01-10", funcao: "Desenvolvedora Frontend", salario: 7500.00, tipoContratacao: "CLT", dataExpedicaoRg: "2010-01-05", orgaoEmissor: "SSP/SP", ctps: "1234567", pis: "123.45678.90-1", escolaridade: "Superior Completo", cidadeResidencia: "São Paulo", estadoResidencia: "São Paulo", tipoVinculo: "Consolidação das Leis Trabalhistas", contrato: "Contrato A", area: "Tecnologia", gerencia: "Desenvolvimento", motivoAdmissao: "Substituição", dataDemissao: "", dataFim: "", motivoDemissao: "", cargaHoraria: "220h", dependentes: 0, atividades: [{nome: 'Desenvolvimento de API', data: '2023-01-15'}] },
        { id: 2, photoUrl: null, situacao: "Pré-cadastro", nome: "Bruno Costa", cpf: "222.333.444-55", status: "Ativo", clienteId: 1, fornecedorId: 1, unidadeId: 2, dataNascimento: "1988-11-20", rg: "23.456.789-0", nomeMae: "Joana Costa", matricula: "1002", dataInicio: "2021-11-10", dataAdmissao: "2021-11-15", funcao: "Analista de Sistemas", salario: 8200.00, tipoContratacao: "CLT", atividades: [] },
        { id: 3, photoUrl: 'https://placehold.co/150x150/a9a9a9/ffffff?text=CE', situacao: "Cadastrado", nome: "Carlos Eduardo", cpf: "333.444.555-66", status: "Inativo", clienteId: 2, fornecedorId: 2, unidadeId: 1, dataNascimento: "1985-02-25", rg: "34.567.890-1", nomeMae: "Sandra Pereira", matricula: "2001", dataInicio: "2020-02-20", dataAdmissao: "2020-03-01", funcao: "Gerente de Projetos", salario: 12500.00, tipoContratacao: "PJ", dataFim: "2023-10-10", atividades: [] },
        { id: 4, photoUrl: null, situacao: "Aguardando", nome: "Daniela Ferreira", cpf: "444.555.666-77", status: "Ativo", clienteId: 1, fornecedorId: 3, unidadeId: 3, dataNascimento: "1995-09-10", rg: "45.678.901-2", nomeMae: "Beatriz Ferreira", matricula: "3001", dataInicio: "2023-05-15", dataAdmissao: "2023-05-20", funcao: "Analista de RH", salario: 4800.00, tipoContratacao: "CLT", atividades: [] },
        { id: 5, photoUrl: 'https://placehold.co/150x150/a9a9a9/ffffff?text=EM', situacao: "Cadastrado", nome: "Eduardo Martins", cpf: "555.666.777-88", status: "Ativo", clienteId: 2, fornecedorId: 2, unidadeId: 1, dataNascimento: "1992-07-30", rg: "56.789.012-3", nomeMae: "Clara Martins", matricula: "1003", dataInicio: "2022-05-25", dataAdmissao: "2022-06-01", funcao: "Desenvolvedor Backend", salario: 7800.00, tipoContratacao: "CLT", atividades: [] },
    ];

    // --- SELETORES DO DOM ---
    const linkCadastroEmpregado = document.getElementById('link-cadastro-empregado');
    const linkMovimentacaoEmpregado = document.getElementById('link-movimentacao-empregado');
    const viewLista = document.getElementById('view-lista');
    const viewMovimentacao = document.getElementById('view-movimentacao');
    const viewFormulario = document.getElementById('view-formulario');
    const filtroCliente = document.getElementById('filtro-cliente');
    const filtroFornecedor = document.getElementById('filtro-fornecedor');
    const filtroUnidade = document.getElementById('filtro-unidade');
    const tabelaEmpregados = document.getElementById('tabela-empregados');
    const semResultados = document.getElementById('sem-resultados');
    const containerLista = document.getElementById('container-lista');
    const mensagemInicial = document.getElementById('mensagem-inicial');
    const btnBuscar = document.getElementById('btn-buscar');
    const formTitulo = document.getElementById('form-titulo');
    const formEmpregado = document.getElementById('form-empregado');
    const empregadoIdInput = document.getElementById('empregado-id');
    const modalClienteSelect = document.getElementById('modal-cliente');
    const modalFornecedorSelect = document.getElementById('modal-fornecedor');
    const modalUnidadeSelect = document.getElementById('modal-unidade');
    const btnNovoColaborador = document.getElementById('btn-novo-colaborador');
    const btnVoltar = document.getElementById('btn-voltar');
    const btnAbrirModalExcluir = document.getElementById('btn-abrir-modal-excluir');
    const btnIncluirAtividade = document.getElementById('btn-incluir-atividade');
    const listaAtividadesContainer = document.getElementById('lista-atividades');
    
    // --- SELETORES WIZARD ---
    const stepperNav = document.getElementById('stepper-nav');
    const formSteps = document.querySelectorAll('.form-step');
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');
    const btnSave = document.getElementById('btn-save');
    const reviewContent = document.getElementById('review-content');
    
    // --- SELETORES FOTO E BOTÕES ---
    const photoUploaderTrigger = document.getElementById('photo-uploader-trigger');
    const photoInput = document.getElementById('photo-input');
    const photoPreview = document.getElementById('photo-preview');
    const photoPlaceholder = document.getElementById('photo-placeholder');
    const removePhotoBtn = document.getElementById('remove-photo-btn');
    const btnCorrigirDatas = document.getElementById('btn-corrigir-datas');
    const btnInativarDemitir = document.getElementById('btn-inativar-demitir');
    const btnCancelarInativacao = document.getElementById('btn-cancelar-inativacao');
    const btnAtivar = document.getElementById('btn-ativar');

    // --- SELETORES MOVIMENTAÇÃO ---
    const movFiltroCliente = document.getElementById('mov-filtro-cliente');
    const movFiltroFornecedor = document.getElementById('mov-filtro-fornecedor');
    const movFiltroUnidade = document.getElementById('mov-filtro-unidade');
    const movFiltroEmpregado = document.getElementById('mov-filtro-empregado');
    const movTipoSelect = document.getElementById('mov-tipo');
    const movimentacaoCamposDinamicos = document.getElementById('movimentacao-campos-dinamicos');
    
    // --- SELETORES MODAIS ---
    const modalCorrigirDatas = document.getElementById('modal-corrigir-datas');
    const modalDatasTitle = document.getElementById('modal-datas-title');
    const modalDatasBody = document.getElementById('modal-datas-body');
    const btnSalvarDatas = document.getElementById('btn-salvar-datas');
    const modalAcaoEmpregado = document.getElementById('modal-acao-empregado');
    const modalAcaoTitle = document.getElementById('modal-acao-title');
    const acaoEmpregadoSelect = document.getElementById('acao-empregado-select');
    const containerDataFim = document.getElementById('container-data-fim');
    const containerDataDemissao = document.getElementById('container-data-demissao');
    const btnConfirmarAcaoEmpregado = document.getElementById('btn-confirmar-acao-empregado');
    const modalConfirmacao = document.getElementById('modal-confirmacao');
    const modalConfirmacaoTitle = document.getElementById('modal-confirmacao-title');
    const modalConfirmacaoIcon = document.getElementById('modal-confirmacao-icon');
    const modalConfirmacaoTexto = document.getElementById('modal-confirmacao-texto');
    const btnConfirmarAcao = document.getElementById('btn-confirmar-acao');
    const modalMovimentacao = document.getElementById('modal-movimentacao');
    const modalMovTitle = document.getElementById('modal-mov-title');
    const modalMovBody = document.getElementById('modal-mov-body');


    let atividadesTemporarias = [];
    let currentStep = 1; 
    const totalSteps = formSteps.length;
    let currentPhotoUrl = null;
    let acaoConfirmacaoPendente = null;

    // --- FUNÇÕES DE CONTROLE DE VIEW ---
    const showView = (viewToShow) => {
        [viewLista, viewFormulario, viewMovimentacao].forEach(view => view.classList.add('hidden'));
        viewToShow.classList.remove('hidden');

        linkCadastroEmpregado.classList.toggle('bg-blue-600', viewToShow !== viewMovimentacao);
        linkCadastroEmpregado.classList.toggle('hover:bg-gray-700', viewToShow === viewMovimentacao);
        linkMovimentacaoEmpregado.classList.toggle('bg-blue-600', viewToShow === viewMovimentacao);
        linkMovimentacaoEmpregado.classList.toggle('hover:bg-gray-700', viewToShow !== viewMovimentacao);
    };

    const openModal = (modal) => modal.classList.remove('hidden');
    const closeModal = (modal) => modal.classList.add('hidden');

    const updateStepView = (targetStep = currentStep) => {
        currentStep = targetStep;
        if(currentStep === totalSteps) buildReview();
        formSteps.forEach(step => step.classList.add('hidden'));
        document.getElementById(`step-${currentStep}`).classList.remove('hidden');
        stepperNav.querySelectorAll('.stepper-item').forEach((item) => {
            const step = parseInt(item.dataset.step);
            item.classList.toggle('active', step === currentStep);
            item.classList.toggle('border-blue-600', step === currentStep);
            item.classList.toggle('text-blue-600', step === currentStep);
            item.classList.toggle('text-gray-500', step !== currentStep);
            item.classList.toggle('border-transparent', step !== currentStep);
        });
        btnPrev.classList.toggle('hidden', currentStep === 1);
        btnNext.classList.toggle('hidden', currentStep === totalSteps);
        btnSave.classList.toggle('hidden', currentStep !== totalSteps);
    };

    const validateStep = (step) => {
        if (step === 1 || step > totalSteps) return true;
        const currentStepElement = document.getElementById(`step-${step}`);
        const inputs = currentStepElement.querySelectorAll('input[required], select[required]');
        let isValid = true;
        inputs.forEach(input => {
            input.classList.remove('border-red-500');
            if (!input.value || input.value === "0") {
                isValid = false;
                input.classList.add('border-red-500');
            }
        });
        if (!isValid) alert('Por favor, preencha todos os campos obrigatórios para avançar.');
        return isValid;
    };
    
    const resetPhotoUploader = () => {
        photoInput.value = '';
        photoPreview.src = '';
        photoPreview.classList.add('hidden');
        photoPlaceholder.classList.remove('hidden');
        removePhotoBtn.classList.add('hidden');
        currentPhotoUrl = null;
    };

    const buildReview = () => {
        const formatDate = (dateString) => dateString ? new Date(dateString + 'T00:00:00').toLocaleDateString('pt-BR') : 'Não preenchido';
        reviewContent.innerHTML = `
            <div class="flex flex-col md:flex-row gap-8">
                <div class="flex-shrink-0">
                    <img src="${photoPreview.src || 'https://placehold.co/150x150/e2e8f0/64748b?text=Sem+Foto'}" alt="Foto do Colaborador" class="w-[150px] h-[150px] rounded-full object-cover border-4 border-gray-200">
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 flex-1">
                    <p><strong>Nome:</strong> ${document.getElementById('nome').value || 'Não preenchido'}</p>
                    <p><strong>CPF:</strong> ${document.getElementById('cpf').value || 'Não preenchido'}</p>
                    <p><strong>Função:</strong> ${document.getElementById('funcao').value || 'Não preenchido'}</p>
                    <p><strong>Data de Início:</strong> ${formatDate(document.getElementById('data-inicio').value)}</p>
                    <p><strong>Data de Admissão:</strong> ${formatDate(document.getElementById('data-admissao').value)}</p>
                    <p><strong>Salário:</strong> R$ ${parseFloat(document.getElementById('salario').value || 0).toFixed(2).replace('.',',')}</p>
                     <p><strong>Status:</strong> ${document.getElementById('status').value}</p>
                </div>
            </div>
        `;
    };

    const popularSelect = (selectElement, items, defaultOptionText) => {
        selectElement.innerHTML = `<option value="0">${defaultOptionText}</option>`;
        items.forEach(item => {
            selectElement.innerHTML += `<option value="${item.id || item.value}">${item.nome || item.text}</option>`;
        });
    };
    
    const getSituacaoBadge = (situacao) => {
        switch (situacao) {
            case 'Pré-cadastro': return 'bg-yellow-100 text-yellow-800';
            case 'Cadastrado': return 'bg-green-100 text-green-800';
            case 'Aguardando': return 'bg-blue-100 text-blue-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const renderizarTabela = () => {
        mensagemInicial.classList.add('hidden');
        containerLista.classList.remove('hidden');
        const clienteId = parseInt(filtroCliente.value);
        const fornecedorId = parseInt(filtroFornecedor.value);
        const unidadeId = parseInt(filtroUnidade.value);
        const empregadosFiltrados = empregados.filter(e => 
            (clienteId === e.clienteId) &&
            (fornecedorId === e.fornecedorId) &&
            (unidadeId === e.unidadeId)
        );
        tabelaEmpregados.innerHTML = '';
        semResultados.classList.toggle('hidden', empregadosFiltrados.length > 0);
        empregadosFiltrados.forEach(e => {
            const statusClass = e.status === 'Ativo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
            const situacaoClass = getSituacaoBadge(e.situacao);
            const row = `
                <tr class="hover:bg-gray-50">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${e.nome}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${e.cpf}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm"><span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${situacaoClass}">${e.situacao}</span></td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm"><span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClass}">${e.status}</span></td>
                    <td class="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                        <div class="actions-dropdown">
                            <button class="action-toggle-menu text-gray-600 hover:text-blue-600">
                                <i class="fas fa-ellipsis-v"></i>
                            </button>
                            <div class="actions-menu">
                                <a class="action-edit" data-id="${e.id}"><i class="fas fa-edit w-6 mr-2"></i> Editar</a>
                                <a class="action-status" data-id="${e.id}"><i class="fas fa-toggle-on w-6 mr-2"></i> Ativar/Inativar</a>
                                <a class="action-movimentar" data-id="${e.id}"><i class="fas fa-people-arrows w-6 mr-2"></i> Movimentar</a>
                            </div>
                        </div>
                    </td>
                </tr>
            `;
            tabelaEmpregados.innerHTML += row;
        });
    };

    const renderizarAtividades = () => {
        listaAtividadesContainer.innerHTML = '';
        if (atividadesTemporarias.length === 0) {
            listaAtividadesContainer.innerHTML = '<p class="text-sm text-gray-500 text-center">Nenhuma atividade incluída.</p>';
            return;
        }
        const table = document.createElement('table');
        table.className = 'min-w-full divide-y divide-gray-200';
        table.innerHTML = `
            <thead class="bg-gray-100">
                <tr>
                    <th class="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Atividade</th>
                    <th class="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Data Início</th>
                    <th class="px-4 py-2 text-center text-xs font-medium text-gray-600 uppercase">Ação</th>
                </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
            ${atividadesTemporarias.map((atv, index) => `
                <tr>
                    <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-800">${atv.nome}</td>
                    <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-500">${new Date(atv.data + 'T00:00:00').toLocaleDateString('pt-BR')}</td>
                    <td class="px-4 py-2 whitespace-nowrap text-center">
                        <button type="button" data-index="${index}" class="btn-remover-atividade text-red-500 hover:text-red-700"><i class="fas fa-trash"></i></button>
                    </td>
                </tr>
            `).join('')}
            </tbody>
        `;
        listaAtividadesContainer.appendChild(table);
    };
    const adicionarAtividade = () => {
        const atividadeSelect = document.getElementById('atividade-select');
        const dataInput = document.getElementById('atividade-data-inicio');
        if (!dataInput.value) {
            alert('Por favor, selecione a data de início da atividade.');
            return;
        }
        atividadesTemporarias.push({
            nome: atividadeSelect.options[atividadeSelect.selectedIndex].text,
            data: dataInput.value
        });
        renderizarAtividades();
        dataInput.value = '';
    };
    const removerAtividade = (index) => {
        atividadesTemporarias.splice(index, 1);
        renderizarAtividades();
    };

    const abrirFormulario = (id = null) => {
        formEmpregado.reset();
        atividadesTemporarias = [];
        resetPhotoUploader();
        
        [btnAbrirModalExcluir, btnCorrigirDatas, btnInativarDemitir, btnCancelarInativacao, btnAtivar].forEach(btn => btn.classList.add('hidden'));

        currentStep = 1;
        updateStepView();

        if (id) {
            const empregado = empregados.find(e => e.id === id);
            if(empregado.atividades) { atividadesTemporarias = [...empregado.atividades]; }
            formTitulo.textContent = 'Editar Colaborador';
            empregadoIdInput.value = empregado.id;
            
            if(empregado.photoUrl) {
                photoPreview.src = empregado.photoUrl;
                currentPhotoUrl = empregado.photoUrl;
                photoPreview.classList.remove('hidden');
                photoPlaceholder.classList.add('hidden');
                removePhotoBtn.classList.remove('hidden');
            }
            
            Object.keys(empregado).forEach(key => {
                const el = document.getElementById(key);
                if (el) el.value = empregado[key] || '';
            });

            modalClienteSelect.value = empregado.clienteId;
            modalFornecedorSelect.value = empregado.fornecedorId;
            modalUnidadeSelect.value = empregado.unidadeId;
            
            btnAbrirModalExcluir.classList.remove('hidden');
            if(empregado.status === 'Ativo') {
                btnCorrigirDatas.classList.remove('hidden');
                btnInativarDemitir.classList.remove('hidden');
            } else { // Inativo
                btnCorrigirDatas.classList.remove('hidden');
                btnCancelarInativacao.classList.remove('hidden');
                btnAtivar.classList.remove('hidden');
            }

        } else {
            formTitulo.textContent = 'Novo Colaborador';
            empregadoIdInput.value = '';
            document.getElementById('status').value = 'Ativo';
            modalClienteSelect.value = filtroCliente.value;
            modalFornecedorSelect.value = filtroFornecedor.value;
            modalUnidadeSelect.value = filtroUnidade.value;
        }
        renderizarAtividades();
        showView(viewFormulario);
    };

    const salvarEmpregado = (e) => {
        e.preventDefault();
        const id = parseInt(empregadoIdInput.value);
        const clienteId = parseInt(modalClienteSelect.value);
        const clienteSelecionado = clientes.find(c => c.id === clienteId);

        const formData = new FormData(formEmpregado);
        const novoEmpregado = Object.fromEntries(formData.entries());
        
        novoEmpregado.photoUrl = currentPhotoUrl;
        novoEmpregado.atividades = [...atividadesTemporarias];
        novoEmpregado.clienteId = clienteId;
        novoEmpregado.fornecedorId = parseInt(modalFornecedorSelect.value);
        novoEmpregado.unidadeId = parseInt(modalUnidadeSelect.value);
        novoEmpregado.status = document.getElementById('status').value;
        novoEmpregado.salario = parseFloat(novoEmpregado.salario) || 0;

        if (id) {
            const index = empregados.findIndex(e => e.id === id);
            novoEmpregado.situacao = empregados[index].situacao;
            novoEmpregado.dataFim = empregados[index].dataFim; 
            empregados[index] = { ...empregados[index], ...novoEmpregado, id: id };
        } else {
            novoEmpregado.situacao = clienteSelecionado?.temPreCadastro ? 'Pré-cadastro' : 'Cadastrado';
            novoEmpregado.id = empregados.length > 0 ? Math.max(...empregados.map(e => e.id)) + 1 : 1;
            empregados.push(novoEmpregado);
        }
        renderizarTabela();
        showView(viewLista);
    };
    
    // --- LÓGICA DA TELA DE MOVIMENTAÇÃO ---
    const updateMovimentacaoFields = (tipo) => {
        movimentacaoCamposDinamicos.querySelectorAll(':scope > div').forEach(div => div.classList.add('hidden'));
        const titleEl = document.getElementById('mov-afastamento-retorno-title');
        
        switch(tipo) {
            case 'transferencia_fornecedor_unidade':
                document.getElementById('mov-campos-transferencia-fornecedor-unidade').classList.remove('hidden');
                break;
            case 'transferencia_contrato':
                 document.getElementById('mov-campos-transferencia-contrato').classList.remove('hidden');
                break;
            case 'mudanca_funcao':
                 document.getElementById('mov-campos-mudanca-funcao').classList.remove('hidden');
                break;
            case 'afastamento':
                titleEl.textContent = 'Afastamento';
                document.getElementById('mov-campos-afastamento-retorno').classList.remove('hidden');
                break;
             case 'retorno_afastamento':
                titleEl.textContent = 'Retorno de Afastamento';
                document.getElementById('mov-campos-afastamento-retorno').classList.remove('hidden');
                break;
        }
    };

    const popularMovimentacaoEmpregados = () => {
        const clienteId = parseInt(movFiltroCliente.value);
        const fornecedorId = parseInt(movFiltroFornecedor.value);
        const unidadeId = parseInt(movFiltroUnidade.value);
        if (clienteId === 0 || fornecedorId === 0 || unidadeId === 0) {
            popularSelect(movFiltroEmpregado, [], 'Selecione o Empregado');
            return;
        }
        const empregadosFiltrados = empregados.filter(e => e.clienteId === clienteId && e.fornecedorId === fornecedorId && e.unidadeId === unidadeId);
        popularSelect(movFiltroEmpregado, empregadosFiltrados, 'Selecione o Empregado');
    };
    
    // --- EVENT LISTENERS GERAIS ---
    linkCadastroEmpregado.addEventListener('click', (e) => { e.preventDefault(); showView(viewLista); });
    linkMovimentacaoEmpregado.addEventListener('click', (e) => { e.preventDefault(); showView(viewMovimentacao); });
    
    btnBuscar.addEventListener('click', () => {
        if (parseInt(filtroCliente.value) === 0 || parseInt(filtroFornecedor.value) === 0 || parseInt(filtroUnidade.value) === 0) {
            alert('Por favor, selecione um Cliente, um Fornecedor e uma Unidade.');
            return;
        }
        renderizarTabela();
    });

    btnNovoColaborador.addEventListener('click', () => abrirFormulario());
    btnVoltar.addEventListener('click', () => showView(viewLista));
    formEmpregado.addEventListener('submit', salvarEmpregado);
    btnIncluirAtividade.addEventListener('click', adicionarAtividade);
    listaAtividadesContainer.addEventListener('click', (e) => {
        const btnRemover = e.target.closest('.btn-remover-atividade');
        if (btnRemover) { removerAtividade(parseInt(btnRemover.dataset.index)); }
    });

    // Ações da tabela
    tabelaEmpregados.addEventListener('click', (e) => {
        const dropdown = e.target.closest('.actions-dropdown');
        if (dropdown) {
            dropdown.querySelector('.actions-menu').classList.toggle('show');
        }

        const actionTarget = e.target.closest('a[data-id]');
        if (!actionTarget) return;

        const id = parseInt(actionTarget.dataset.id);
        const empregado = empregados.find(e => e.id === id);

        if (actionTarget.classList.contains('action-edit')) abrirFormulario(id);
        if (actionTarget.classList.contains('action-status')) {
            if (empregado.status === 'Ativo') {
                abrirModalAcao('Inativar/Demitir', [{value: 'inativar', text: 'Inativar'}, {value: 'demitir', text: 'Demitir'}], id);
            } else {
                abrirModalConfirmacao({
                    title: 'Ativar Empregado',
                    text: `Tem certeza que deseja reativar o empregado ${empregado.nome}?`,
                    iconClasses: 'fas fa-check-circle text-4xl text-green-500 mb-4',
                    confirmBtnClass: 'bg-green-600 hover:bg-green-700',
                    confirmBtnText: 'Ativar',
                    onConfirm: () => {
                        const index = empregados.findIndex(e => e.id === id);
                        if(index > -1) {
                            empregados[index].status = 'Ativo';
                            empregados[index].dataFim = '';
                            empregados[index].dataDemissao = '';
                        }
                        closeModal(modalConfirmacao);
                        renderizarTabela();
                    }
                });
            }
        }
        if (actionTarget.classList.contains('action-movimentar')) {
             modalMovTitle.textContent = `Movimentação - ${empregado.nome}`;
             modalMovBody.innerHTML = movimentacaoCamposDinamicos.innerHTML;
             openModal(modalMovimentacao);
        }
    });

    window.addEventListener('click', (e) => {
        if (!e.target.closest('.actions-dropdown')) {
            document.querySelectorAll('.actions-menu.show').forEach(menu => menu.classList.remove('show'));
        }
    });

    // --- EVENT LISTENERS DO WIZARD ---
    btnNext.addEventListener('click', () => {
        if (validateStep(currentStep) && currentStep < totalSteps) updateStepView(currentStep + 1);
    });
    btnPrev.addEventListener('click', () => {
        if (currentStep > 1) updateStepView(currentStep - 1);
    });
    stepperNav.addEventListener('click', (e) => {
        const stepperItem = e.target.closest('.stepper-item');
        if (!stepperItem) return;
        const targetStep = parseInt(stepperItem.dataset.step);
        if(!targetStep || targetStep === currentStep) return;
        if(targetStep > currentStep) {
            if (Array.from({length: targetStep - currentStep}, (_, i) => currentStep + i).every(validateStep)) {
                updateStepView(targetStep);
            }
        } else {
            updateStepView(targetStep);
        }
    });
    
    // --- EVENT LISTENERS DA FOTO ---
    photoUploaderTrigger.addEventListener('click', () => photoInput.click());
    photoInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if(file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                photoPreview.src = event.target.result;
                currentPhotoUrl = event.target.result;
                photoPreview.classList.remove('hidden');
                photoPlaceholder.classList.add('hidden');
                removePhotoBtn.classList.remove('hidden');
            }
            reader.readAsDataURL(file);
        }
    });
    removePhotoBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        resetPhotoUploader();
    });

    // --- LISTENERS DA TELA DE MOVIMENTAÇÃO ---
    movTipoSelect.addEventListener('change', (e) => updateMovimentacaoFields(e.target.value));
    [movFiltroCliente, movFiltroFornecedor, movFiltroUnidade].forEach(el => el.addEventListener('change', popularMovimentacaoEmpregados));
    
    // --- LÓGICA E LISTENERS DOS MODAIS ---
    btnCorrigirDatas.addEventListener('click', () => {
        const id = parseInt(empregadoIdInput.value);
        const empregado = empregados.find(e => e.id === id);
        if(!empregado) return;
        modalDatasTitle.textContent = `Correção - ${empregado.nome}`;
        modalDatasBody.innerHTML = ''; 
        const datas = { "Data de Início": empregado.dataInicio, "Data de Admissão": empregado.dataAdmissao };
        for(const [label, value] of Object.entries(datas)) {
             modalDatasBody.innerHTML += `<div class="grid grid-cols-2 gap-4 items-center"><label class="text-sm font-medium text-gray-700">${label}</label><input type="date" data-label="${label}" value="${value || ''}" class="w-full p-2 border border-gray-300 rounded-lg"></div>`;
        }
        openModal(modalCorrigirDatas);
    });

    btnSalvarDatas.addEventListener('click', () => {
        modalDatasBody.querySelectorAll('input').forEach(input => {
            const label = input.dataset.label;
            if (label === "Data de Início") document.getElementById('data-inicio').value = input.value;
            if (label === "Data de Admissão") document.getElementById('data-admissao').value = input.value;
        });
        closeModal(modalCorrigirDatas);
    });
    
    const abrirModalAcao = (title, options, id) => {
        const empregado = empregados.find(e => e.id === id);
        if(!empregado) return;
        modalAcaoTitle.textContent = `${title} - ${empregado.nome}`;
        acaoEmpregadoSelect.innerHTML = '<option value="">Selecione...</option>' + options.map(o => `<option value="${o.value}">${o.text}</option>`).join('');
        acaoEmpregadoSelect.value = '';
        containerDataFim.classList.add('hidden');
        containerDataDemissao.classList.add('hidden');
        btnConfirmarAcaoEmpregado.dataset.id = id;
        openModal(modalAcaoEmpregado);
    };

    btnInativarDemitir.addEventListener('click', () => abrirModalAcao('Inativar/Demitir', [{value: 'inativar', text: 'Inativar'}, {value: 'demitir', text: 'Demitir'}], parseInt(empregadoIdInput.value)));
    
    btnAtivar.addEventListener('click', () => {
        const id = parseInt(empregadoIdInput.value);
        abrirModalConfirmacao({
            title: 'Ativar Empregado',
            text: `Tem certeza que deseja reativar este empregado?`,
            iconClasses: 'fas fa-check-circle text-4xl text-green-500 mb-4',
            confirmBtnClass: 'bg-green-600 hover:bg-green-700',
            confirmBtnText: 'Ativar',
            onConfirm: () => {
                const index = empregados.findIndex(e => e.id === id);
                if(index > -1) {
                    empregados[index].status = 'Ativo';
                    empregados[index].dataFim = '';
                    empregados[index].dataDemissao = '';
                }
                closeModal(modalConfirmacao);
                abrirFormulario(id);
            }
        });
    });

    acaoEmpregadoSelect.addEventListener('change', (e) => {
        const acao = e.target.value;
        containerDataFim.classList.toggle('hidden', !['inativar', 'demitir'].includes(acao));
        containerDataDemissao.classList.toggle('hidden', acao !== 'demitir');
    });

    btnConfirmarAcaoEmpregado.addEventListener('click', (e) => {
        const id = parseInt(e.target.dataset.id);
        const acao = acaoEmpregadoSelect.value;
        if (!acao) return alert('Selecione uma ação.');
        const dataFim = document.getElementById('modal-data-fim').value;
        if(!dataFim) return alert('A Data Fim é obrigatória.');
        const index = empregados.findIndex(e => e.id === id);
        if (index === -1) return;

        empregados[index].status = 'Inativo';
        empregados[index].dataFim = dataFim;
        
        if (acao === 'demitir') {
            const dataDemissao = document.getElementById('modal-data-demissao').value;
            if(!dataDemissao) return alert('A Data de Demissão é obrigatória.');
            empregados[index].dataDemissao = dataDemissao;
        }
        closeModal(modalAcaoEmpregado);
        
        // Se a ação veio da tela de edição, recarrega, senão, recarrega a tabela
        if(viewFormulario.classList.contains('hidden')) {
            renderizarTabela();
        } else {
            abrirFormulario(id);
        }
    });

    const abrirModalConfirmacao = (config) => {
        modalConfirmacaoTitle.textContent = config.title;
        modalConfirmacaoTexto.textContent = config.text;
        modalConfirmacaoIcon.className = config.iconClasses;
        btnConfirmarAcao.className = `btn-confirm text-white ${config.confirmBtnClass}`;
        btnConfirmarAcao.textContent = config.confirmBtnText;
        acaoConfirmacaoPendente = config.onConfirm;
        openModal(modalConfirmacao);
    };
    
    btnAbrirModalExcluir.addEventListener('click', () => {
        abrirModalConfirmacao({
            title: 'Confirmar Exclusão',
            text: 'Tem certeza que deseja excluir este colaborador? Esta ação não pode ser desfeita.',
            iconClasses: 'fas fa-exclamation-triangle text-4xl text-red-500 mb-4',
            confirmBtnClass: 'bg-red-600 hover:bg-red-700',
            confirmBtnText: 'Excluir',
            onConfirm: () => {
                const id = parseInt(empregadoIdInput.value);
                if (id) {
                    empregados = empregados.filter(e => e.id !== id);
                    renderizarTabela();
                    showView(viewLista);
                }
                closeModal(modalConfirmacao);
            }
        });
    });

    btnCancelarInativacao.addEventListener('click', () => {
         abrirModalConfirmacao({
            title: 'Cancelar Inativação',
            text: 'Tem certeza que deseja reativar este colaborador? A Data Fim será removida.',
            iconClasses: 'fas fa-question-circle text-4xl text-blue-500 mb-4',
            confirmBtnClass: 'bg-blue-600 hover:bg-blue-700',
            confirmBtnText: 'Reativar',
            onConfirm: () => {
                const id = parseInt(empregadoIdInput.value);
                const index = empregados.findIndex(e => e.id === id);
                if(index > -1) {
                    empregados[index].status = 'Ativo';
                    empregados[index].dataFim = '';
                }
                closeModal(modalConfirmacao);
                abrirFormulario(id);
            }
        });
    });
    
    btnConfirmarAcao.addEventListener('click', () => {
        if(acaoConfirmacaoPendente) acaoConfirmacaoPendente();
    });

    document.querySelectorAll('.modal-container').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-backdrop') || e.target.classList.contains('modal-close-btn') || e.target.classList.contains('btn-cancel')) {
                closeModal(modal);
            }
        });
    });

    // --- INICIALIZAÇÃO ---
    [filtroCliente, movFiltroCliente].forEach(s => popularSelect(s, clientes, 'Selecione o Cliente'));
    [filtroFornecedor, movFiltroFornecedor].forEach(s => popularSelect(s, fornecedores, 'Selecione o Fornecedor'));
    [filtroUnidade, movFiltroUnidade].forEach(s => popularSelect(s, unidades, 'Selecione a Unidade'));
    popularSelect(movTipoSelect, movimentacaoTipos, 'Selecione a Movimentação');
    
    popularSelect(document.getElementById('mov-nova-funcao'), funcoes, 'Selecione a Função');
    popularSelect(document.getElementById('mov-nova-area-1'), areas, 'Selecione a Área');
    popularSelect(document.getElementById('mov-nova-area-2'), areas, 'Selecione a Área');
    popularSelect(document.getElementById('mov-novo-fornecedor'), fornecedores, 'Selecione o Fornecedor');
    popularSelect(document.getElementById('mov-nova-unidade'), unidades, 'Selecione a Unidade');
    
    
    const popularSelectVinculacao = (select, data) => {
        select.innerHTML = '';
        data.forEach(item => {
           select.innerHTML += `<option value="${item.id}">${item.nome}</option>`;
        });
    };
    popularSelectVinculacao(modalClienteSelect, clientes);
    popularSelectVinculacao(modalFornecedorSelect, fornecedores);
    popularSelectVinculacao(modalUnidadeSelect, unidades);
});

