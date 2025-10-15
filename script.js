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
    let empregados = [
        { id: 1, photoUrl: 'https://placehold.co/150x150/a9a9a9/ffffff?text=AC', situacao: "Cadastrado", nome: "Ana Carolina", cpf: "111.222.333-44", status: "Ativo", clienteId: 1, fornecedorId: 1, unidadeId: 1, dataNascimento: "1990-05-15", rg: "12.345.678-9", nomeMae: "Maria Almeida", matricula: "1001", dataAdmissao: "2022-01-10", funcao: "Desenvolvedora Frontend", salario: 7500.00, tipoContratacao: "CLT", dataExpedicaoRg: "2010-01-05", orgaoEmissor: "SSP/SP", ctps: "1234567", pis: "123.45678.90-1", escolaridade: "Superior Completo", cidadeResidencia: "São Paulo", estadoResidencia: "São Paulo", tipoVinculo: "Consolidação das Leis Trabalhistas", contrato: "Contrato A", area: "Tecnologia", gerencia: "Desenvolvimento", motivoAdmissao: "Substituição", dataDemissao: "", motivoDemissao: "", cargaHoraria: "220h", dependentes: 0, atividades: [{nome: 'Desenvolvimento de API', data: '2023-01-15'}] },
        { id: 2, photoUrl: null, situacao: "Pré-cadastro", nome: "Bruno Costa", cpf: "222.333.444-55", status: "Ativo", clienteId: 1, fornecedorId: 1, unidadeId: 2, dataNascimento: "1988-11-20", rg: "23.456.789-0", nomeMae: "Joana Costa", matricula: "1002", dataAdmissao: "2021-11-15", funcao: "Analista de Sistemas", salario: 8200.00, tipoContratacao: "CLT", atividades: [] },
        { id: 3, photoUrl: 'https://placehold.co/150x150/a9a9a9/ffffff?text=CE', situacao: "Cadastrado", nome: "Carlos Eduardo", cpf: "333.444.555-66", status: "Inativo", clienteId: 2, fornecedorId: 2, unidadeId: 1, dataNascimento: "1985-02-25", rg: "34.567.890-1", nomeMae: "Sandra Pereira", matricula: "2001", dataAdmissao: "2020-03-01", funcao: "Gerente de Projetos", salario: 12500.00, tipoContratacao: "PJ", atividades: [] },
        { id: 4, photoUrl: null, situacao: "Aguardando", nome: "Daniela Ferreira", cpf: "444.555.666-77", status: "Ativo", clienteId: 1, fornecedorId: 3, unidadeId: 3, dataNascimento: "1995-09-10", rg: "45.678.901-2", nomeMae: "Beatriz Ferreira", matricula: "3001", dataAdmissao: "2023-05-20", funcao: "Analista de RH", salario: 4800.00, tipoContratacao: "CLT", atividades: [] },
        { id: 5, photoUrl: 'https://placehold.co/150x150/a9a9a9/ffffff?text=EM', situacao: "Cadastrado", nome: "Eduardo Martins", cpf: "555.666.777-88", status: "Ativo", clienteId: 2, fornecedorId: 2, unidadeId: 1, dataNascimento: "1992-07-30", rg: "56.789.012-3", nomeMae: "Clara Martins", matricula: "1003", dataAdmissao: "2022-06-01", funcao: "Desenvolvedor Backend", salario: 7800.00, tipoContratacao: "CLT", atividades: [] },
    ];

    // --- SELETORES DO DOM ---
    const viewLista = document.getElementById('view-lista');
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
    
    // --- SELETORES PARA O WIZARD ---
    const stepperItems = document.querySelectorAll('.stepper-item');
    const formSteps = document.querySelectorAll('.form-step');
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');
    const btnSave = document.getElementById('btn-save');
    const reviewContent = document.getElementById('review-content');
    
    // --- SELETORES PARA FOTO E NOVOS BOTÕES ---
    const photoUploaderTrigger = document.getElementById('photo-uploader-trigger');
    const photoInput = document.getElementById('photo-input');
    const photoPreview = document.getElementById('photo-preview');
    const photoPlaceholder = document.getElementById('photo-placeholder');
    const removePhotoBtn = document.getElementById('remove-photo-btn');
    const btnCorrigirDatas = document.getElementById('btn-corrigir-datas');
    const btnInativarDemitir = document.getElementById('btn-inativar-demitir');
    
    // --- SELETORES DE MODAIS ---
    const modalCorrigirDatas = document.getElementById('modal-corrigir-datas');
    const modalDatasTitle = document.getElementById('modal-datas-title');
    const modalDatasBody = document.getElementById('modal-datas-body');
    const modalInativarDemitir = document.getElementById('modal-inativar-demitir');
    const modalInativarTitle = document.getElementById('modal-inativar-title');
    const modalConfirmarExcluir = document.getElementById('modal-confirmar-excluir');
    const btnConfirmarExclusao = document.getElementById('btn-confirmar-exclusao');


    let atividadesTemporarias = [];
    let currentStep = 1; 
    const totalSteps = formSteps.length;
    let currentPhotoUrl = null;

    // --- FUNÇÕES DE CONTROLE DE VIEW ---
    const showListView = () => {
        viewLista.classList.remove('hidden');
        viewFormulario.classList.add('hidden');
    };
    const showFormView = () => {
        viewLista.classList.add('hidden');
        viewFormulario.classList.remove('hidden');
    };

    // --- FUNÇÕES DE CONTROLE DE MODAIS ---
    const openModal = (modal) => modal.classList.remove('hidden');
    const closeModal = (modal) => modal.classList.add('hidden');


    // --- FUNÇÃO: ATUALIZAR ETAPAS (WIZARD) ---
    const updateStepView = () => {
        if(currentStep === totalSteps) {
            buildReview();
        }

        formSteps.forEach(step => step.classList.add('hidden'));
        document.getElementById(`step-${currentStep}`).classList.remove('hidden');

        stepperItems.forEach((item) => {
            const step = parseInt(item.dataset.step);
            if (step === currentStep) {
                item.classList.add('active', 'border-blue-600', 'text-blue-600');
                item.classList.remove('text-gray-500', 'border-transparent');
            } else {
                item.classList.remove('active', 'border-blue-600', 'text-blue-600');
                item.classList.add('text-gray-500', 'border-transparent');
            }
        });

        btnPrev.classList.toggle('hidden', currentStep === 1);
        btnNext.classList.toggle('hidden', currentStep === totalSteps);
        btnSave.classList.toggle('hidden', currentStep !== totalSteps);
    };

    // --- FUNÇÃO: VALIDAR ETAPA ATUAL ---
    const validateStep = (step) => {
        if (step === 1) return true;
        
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
        if (!isValid) {
            alert('Por favor, preencha todos os campos obrigatórios.');
        }
        return isValid;
    };
    
    // --- FUNÇÃO: RESETAR UPLOAD DE FOTO ---
    const resetPhotoUploader = () => {
        photoInput.value = '';
        photoPreview.src = '';
        photoPreview.classList.add('hidden');
        photoPlaceholder.classList.remove('hidden');
        removePhotoBtn.classList.add('hidden');
        currentPhotoUrl = null;
    };

    // --- FUNÇÃO: CONSTRUIR RESUMO PARA REVISÃO ---
    const buildReview = () => {
        reviewContent.innerHTML = `
            <div class="flex flex-col md:flex-row gap-8">
                <div class="flex-shrink-0">
                    <img src="${photoPreview.src || 'https://placehold.co/150x150/e2e8f0/64748b?text=Sem+Foto'}" alt="Foto do Colaborador" class="w-[150px] h-[150px] rounded-full object-cover border-4 border-gray-200">
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 flex-1">
                    <p><strong>Nome:</strong> ${document.getElementById('nome').value || 'Não preenchido'}</p>
                    <p><strong>CPF:</strong> ${document.getElementById('cpf').value || 'Não preenchido'}</p>
                    <p><strong>Função:</strong> ${document.getElementById('funcao').value || 'Não preenchido'}</p>
                    <p><strong>Data de Admissão:</strong> ${document.getElementById('data-admissao').value ? new Date(document.getElementById('data-admissao').value + 'T00:00:00').toLocaleDateString('pt-BR') : 'Não preenchido'}</p>
                    <p><strong>Salário:</strong> R$ ${parseFloat(document.getElementById('salario').value || 0).toFixed(2).replace('.',',')}</p>
                     <p><strong>Status:</strong> ${document.getElementById('status').value}</p>
                </div>
            </div>
        `;
    };

    // --- FUNÇÕES GERAIS ---
    const popularSelect = (selectElement, items, defaultOptionText) => {
        selectElement.innerHTML = `<option value="0">${defaultOptionText}</option>`;
        items.forEach(item => {
            selectElement.innerHTML += `<option value="${item.id}">${item.nome}</option>`;
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
                        <button class="btn-editar text-blue-600 hover:text-blue-900" data-id="${e.id}"><i class="fas fa-edit"></i></button>
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
        
        btnAbrirModalExcluir.classList.add('hidden');
        btnCorrigirDatas.classList.add('hidden');
        btnInativarDemitir.classList.add('hidden');
        
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
            
            document.getElementById('nome').value = empregado.nome || '';
            document.getElementById('cpf').value = empregado.cpf || '';
            document.getElementById('status').value = empregado.status || 'Ativo';
            document.getElementById('pais-contratacao').value = empregado.paisContratacao || 'Brasil';
            document.getElementById('data-nascimento').value = empregado.dataNascimento || '';
            document.getElementById('rg').value = empregado.rg || '';
            document.getElementById('data-expedicao-rg').value = empregado.dataExpedicaoRg || '';
            document.getElementById('orgao-emissor').value = empregado.orgaoEmissor || '';
            document.getElementById('ctps').value = empregado.ctps || '';
            document.getElementById('pis').value = empregado.pis || '';
            document.getElementById('nome-mae').value = empregado.nomeMae || '';
            document.getElementById('escolaridade').value = empregado.escolaridade || 'Ensino Médio Completo';
            document.getElementById('cidade-residencia').value = empregado.cidadeResidencia || '';
            document.getElementById('estado-residencia').value = empregado.estadoResidencia || 'São Paulo';
            document.getElementById('matricula').value = empregado.matricula || '';
            document.getElementById('tipo-vinculo').value = empregado.tipoVinculo || 'Consolidação das Leis Trabalhistas';
            document.getElementById('contrato').value = empregado.contrato || '';
            document.getElementById('area').value = empregado.area || 'Tecnologia';
            document.getElementById('gerencia').value = empregado.gerencia || 'Desenvolvimento';
            document.getElementById('data-admissao').value = empregado.dataAdmissao || '';
            document.getElementById('motivo-admissao').value = empregado.motivoAdmissao || 'Primeiro Emprego';
            document.getElementById('data-demissao').value = empregado.dataDemissao || '';
            document.getElementById('motivo-demissao').value = empregado.motivoDemissao || 'Pedido de Demissão';
            document.getElementById('carga-horaria').value = empregado.cargaHoraria || '220h';
            document.getElementById('dependentes').value = empregado.dependentes || 0;
            document.getElementById('funcao').value = empregado.funcao || '';
            document.getElementById('salario').value = empregado.salario || '';
            document.getElementById('tipo-contratacao').value = empregado.tipoContratacao || 'CLT';

            modalClienteSelect.value = empregado.clienteId;
            modalFornecedorSelect.value = empregado.fornecedorId;
            modalUnidadeSelect.value = empregado.unidadeId;
            
            btnAbrirModalExcluir.classList.remove('hidden');
            if(empregado.status === 'Ativo') {
                btnCorrigirDatas.classList.remove('hidden');
                btnInativarDemitir.classList.remove('hidden');
            }

        } else {
            formTitulo.textContent = 'Novo Colaborador';
            empregadoIdInput.value = '';
            modalClienteSelect.value = filtroCliente.value;
            modalFornecedorSelect.value = filtroFornecedor.value;
            modalUnidadeSelect.value = filtroUnidade.value;
        }
        renderizarAtividades();
        showFormView();
    };

    const salvarEmpregado = (e) => {
        e.preventDefault();
        const id = parseInt(empregadoIdInput.value);
        const clienteId = parseInt(modalClienteSelect.value);
        const clienteSelecionado = clientes.find(c => c.id === clienteId);

        const novoEmpregado = {
            photoUrl: currentPhotoUrl,
            nome: document.getElementById('nome').value,
            cpf: document.getElementById('cpf').value,
            status: document.getElementById('status').value,
            paisContratacao: document.getElementById('pais-contratacao').value,
            dataNascimento: document.getElementById('data-nascimento').value,
            rg: document.getElementById('rg').value,
            dataExpedicaoRg: document.getElementById('data-expedicao-rg').value,
            orgaoEmissor: document.getElementById('orgao-emissor').value,
            ctps: document.getElementById('ctps').value,
            pis: document.getElementById('pis').value,
            nomeMae: document.getElementById('nome-mae').value,
            escolaridade: document.getElementById('escolaridade').value,
            cidadeResidencia: document.getElementById('cidade-residencia').value,
            estadoResidencia: document.getElementById('estado-residencia').value,
            matricula: document.getElementById('matricula').value,
            tipoVinculo: document.getElementById('tipo-vinculo').value,
            contrato: document.getElementById('contrato').value,
            area: document.getElementById('area').value,
            gerencia: document.getElementById('gerencia').value,
            dataAdmissao: document.getElementById('data-admissao').value,
            motivoAdmissao: document.getElementById('motivo-admissao').value,
            dataDemissao: document.getElementById('data-demissao').value,
            motivoDemissao: document.getElementById('motivo-demissao').value,
            cargaHoraria: document.getElementById('carga-horaria').value,
            dependentes: document.getElementById('dependentes').value,
            funcao: document.getElementById('funcao').value,
            salario: parseFloat(document.getElementById('salario').value) || 0,
            tipoContratacao: document.getElementById('tipo-contratacao').value,
            atividades: [...atividadesTemporarias],
            clienteId: clienteId,
            fornecedorId: parseInt(modalFornecedorSelect.value),
            unidadeId: parseInt(modalUnidadeSelect.value)
        };

        if (id) {
            const index = empregados.findIndex(e => e.id === id);
            novoEmpregado.situacao = empregados[index].situacao; 
            empregados[index] = { ...empregados[index], ...novoEmpregado, id: id };
        } else {
            novoEmpregado.situacao = clienteSelecionado?.temPreCadastro ? 'Pré-cadastro' : 'Cadastrado';
            novoEmpregado.id = empregados.length > 0 ? Math.max(...empregados.map(e => e.id)) + 1 : 1;
            empregados.push(novoEmpregado);
        }
        renderizarTabela();
        showListView();
    };
    
    const excluirEmpregado = () => {
        const id = parseInt(empregadoIdInput.value);
        if (id) {
            empregados = empregados.filter(e => e.id !== id);
            renderizarTabela();
            showListView();
        }
        closeModal(modalConfirmarExcluir);
    };
    
    // --- EVENT LISTENERS ---
    btnBuscar.addEventListener('click', () => {
        if (parseInt(filtroCliente.value) === 0 || parseInt(filtroFornecedor.value) === 0 || parseInt(filtroUnidade.value) === 0) {
            alert('Por favor, selecione um Cliente, um Fornecedor e uma Unidade para realizar a busca.');
            return;
        }
        renderizarTabela();
    });

    btnNovoColaborador.addEventListener('click', () => abrirFormulario());
    btnVoltar.addEventListener('click', showListView);
    btnAbrirModalExcluir.addEventListener('click', () => openModal(modalConfirmarExcluir));
    btnConfirmarExclusao.addEventListener('click', excluirEmpregado);
    formEmpregado.addEventListener('submit', salvarEmpregado);
    btnIncluirAtividade.addEventListener('click', adicionarAtividade);
    listaAtividadesContainer.addEventListener('click', (e) => {
        const btnRemover = e.target.closest('.btn-remover-atividade');
        if (btnRemover) { removerAtividade(parseInt(btnRemover.dataset.index)); }
    });
    tabelaEmpregados.addEventListener('click', (e) => {
        const btnEditar = e.target.closest('.btn-editar');
        if (btnEditar) { abrirFormulario(parseInt(btnEditar.dataset.id)); }
    });

    // --- EVENT LISTENERS PARA O WIZARD ---
    btnNext.addEventListener('click', () => {
        if (validateStep(currentStep) && currentStep < totalSteps) {
            currentStep++;
            updateStepView();
        }
    });
    btnPrev.addEventListener('click', () => {
        if (currentStep > 1) {
            currentStep--;
            updateStepView();
        }
    });
    
    // --- EVENT LISTENERS PARA FOTO E NOVOS BOTÕES ---
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
    
    btnCorrigirDatas.addEventListener('click', () => {
        const id = parseInt(empregadoIdInput.value);
        const empregado = empregados.find(e => e.id === id);
        if(!empregado) return;

        modalDatasTitle.textContent = `Correção de Datas - ${empregado.nome}`;
        modalDatasBody.innerHTML = ''; // Limpa conteúdo anterior

        const datas = {
            "Data de Admissão": empregado.dataAdmissao,
            "Data de Demissão": empregado.dataDemissao,
            "Data de Nascimento": empregado.dataNascimento,
            "Data Expedição (RG)": empregado.dataExpedicaoRg
        };

        for(const [label, value] of Object.entries(datas)) {
            if(value) {
                modalDatasBody.innerHTML += `
                    <div class="grid grid-cols-2 gap-4 items-center">
                        <label class="text-sm font-medium text-gray-700">${label}</label>
                        <input type="date" value="${value}" class="w-full p-2 border border-gray-300 rounded-lg">
                    </div>
                `;
            }
        }
        openModal(modalCorrigirDatas);
    });
    
    btnInativarDemitir.addEventListener('click', () => {
         const id = parseInt(empregadoIdInput.value);
        const empregado = empregados.find(e => e.id === id);
        if(!empregado) return;
        modalInativarTitle.textContent = `Inativar/Demitir - ${empregado.nome}`;
        openModal(modalInativarDemitir);
    });

    // Event listeners para fechar modais
    [modalCorrigirDatas, modalInativarDemitir, modalConfirmarExcluir].forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-backdrop') || e.target.classList.contains('modal-close-btn') || e.target.classList.contains('btn-cancel')) {
                closeModal(modal);
            }
        });
    });

    // --- INICIALIZAÇÃO ---
    popularSelect(filtroCliente, clientes, 'Selecione o Cliente');
    popularSelect(filtroFornecedor, fornecedores, 'Selecione o Fornecedor');
    popularSelect(filtroUnidade, unidades, 'Selecione a Unidade');
    
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

