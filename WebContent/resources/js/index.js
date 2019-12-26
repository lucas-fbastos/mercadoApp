var inicio = new Vue({
	el:"#inicio",
    data: {
        listaProdutos: [],
        listaProdutosHeader: [
			{sortable: true, key: "nome", label:"Nome"},
			{sortable: true, key: "fabricante.nome", label:"Fabricante"},
			{sortable: true, key: "volume", label:"Volume"},
			{sortable: true, key: "unidade", label:"Unidade"},
			{sortable: true, key: "estoque", label:"Estoque"}
		],
		
    },
    created: function(){
        let vm =  this;
        vm.buscaProdutos();
    },
    methods:{
        buscaProdutos: function(){
			const vm = this;
			axios.get("/mercado/rs/produtos")
			.then(response => {vm.listaProdutos = response.data;
			}).catch(function (error) {
				errorModal.modalError("Erro interno", "Não foi possível listar os produtos");
			}).finally(function() {
				
			});
		},
		atualizaProdutoModal: function(produto){
			menu.createProdutoForm(produto);
			menu.openModal();
		},
		openModalDelete: function(produto){

			modalDelete.setInfo(produto);
			modalDelete.showModalDelete();
		},
    }
});

var errorModal = new Vue({
	el:"#modalError",
    data: {
    	msg:'',
        error:'' ,
    },
    created: function(){
    	
    },
    methods:{
		modalError: function(error,msg){
			const vm = this;
			vm.msg   = msg;
			vm.error = error;
			$('#modalError').modal('show');
		},
    }
});

var modalDelete = new Vue({
	el:"#modalDelete",
    data: {
    	cdprod:'',
    	nmProduto: '',
    },
    created: function(){
    },
    methods:{
    	showModalDelete: function(){
    		$("#modalDelete").modal('show');
    	},
		setInfo: function(produto){
			this.cdProd    = produto.cdProduto;
			this.nmProduto = produto.nome;
		}
    }
});

var nav = new Vue({
	el:"#nav",
    data: {
    	msg:'',
        error:'' ,
    },
    created: function(){
        let vm =  this;
        
    },
    methods:{
		openModal: function(error,msg){
			document.getElementById("formulario").reset();
			menu.openModal();
		},
    }
});

var menu = new Vue({
	el:"#modalProduto",
    data: {
    	produto: {
    		cdProduto:    0,
    		unidade:      '',
	        nomeProduto:  '',
	        cdFabricante:  0,
	        volume:       '',
	        estoque:       0
    	},
    	errors: [],
        listaFabricantes: [],
    },
    created: function(){
        let vm =  this;
        vm.buscarFabricantes();
    },
    methods:{
    	validaForm: function(){
    		const modalProd = this;
    		this.errors = [];
    		if(modalProd.$refs.nomeProduto.value && modalProd.$refs.cdFabricante.value 
    			&& modalProd.$refs.volume.value && modalProd.$refs.estoque.value  &&
    			modalProd.$refs.unidade.value ){
				return true;
			}
    		if (!modalProd.$refs.nomeProduto.value) {
    			modalProd.errors.push('O nome é obrigatório.');
    		}
    		if (!modalProd.$refs.cdFabricante.value) {
    			modalProd.errors.push('O fabricante é obrigatório.');
    		}
    		if (!modalProd.$refs.volume.value) {
    			modalProd.errors.push('O volume é obrigatório.');
    		}
    		if (!modalProd.$refs.estoque.value) {
    			modalProd.errors.push('A quantidade em estoque é obrigatória.');
    		}
    		if (!modalProd.$refs.unidade.value) {
    			modalProd.errors.push('A unidade em estoque é obrigatória.');
    		}
 
    		return false;
    	},
    	clearForm: function(){
    		this.$refs.cdProduto.value    = 0;
    		this.$refs.nomeProduto.value  = '';
    		this.$refs.cdFabricante.value = 0;
    		this.$refs.volume.value       = '';
    		this.$refs.estoque.value      = 0;
    		this.$refs.unidade.value      = '';
    	},
    	openModal: function(){
    		$('#modalProduto').modal('show');
    	},
    	createProdutoForm(produto){
    		this.$refs.cdProduto.value    = produto.cdProduto;
    		this.$refs.nomeProduto.value  = produto.nome
    		this.$refs.cdFabricante.value = produto.cdFabricante;
    		this.$refs.volume.value       = produto.volume;
    		this.$refs.estoque.value      = produto.estoque;
    		this.$refs.unidade.value      = produto.unidade;
    	},
		cadastro: function(){
			const modalProd = this;
			if(modalProd.validaForm()){
					
				modalProd.produto.nomeProduto  = modalProd.$refs.nomeProduto.value;
				modalProd.produto.cdFabricante = modalProd.$refs.cdFabricante.value;
				modalProd.produto.volume       = modalProd.$refs.volume.value;
				modalProd.produto.estoque      = modalProd.$refs.estoque.value;
				modalProd.produto.unidade      = modalProd.$refs.unidade.value;
				axios.post("/mercado/rs/produtos/",modalProd.produto)
				.then(response => { window.location.reload(true);
				}).catch(function (error){
					errorModal.modalError("Erro interno", "Não foi possível cadastrar o produto");
				}).finally(function(){
					$('#modalProduto').modal('hide');
				});
			}
		},
		buscarFabricantes: function(){
			const vm = this;
			axios.get("/mercado/rs/fabricante")
			.then(response => {vm.listaFabricantes = response.data;
			}).catch(function (error) {
				errorModal.modalError("Erro interno", "Não foi possível buscar os fabricantes");
			}).finally(function() {
			});
		},
		atualizaProduto: function(){
			const vm = this;
			if(vm.validaForm()){
					
				this.produto.nomeProduto  = this.$refs.nomeProdutoAtt.value;
				this.produto.cdFabricante = this.$refs.cdFabricanteAtt.value;
				this.produto.volume       = this.$refs.volumeAtt.value;
				this.produto.estoque      = this.$refs.estoqueAtt.value;
				this.produto.unidade      = this.$refs.unidadeAtt.value;
				
				axios.put("/mercado/rs/produtos/"+produto.cdProduto,this.produto)
				.then(response => {vm.listaProdutos = response.data;
				}).catch(function (error) {
					errorModal.modalError("Erro interno", "Não foi possível atualizar os serviços");
				}).finally(function() {
					$('#modalProduto').modal('hide');
				});
			}
		},
    }
});


