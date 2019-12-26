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
			menu.createProdutoForm(produto, false);
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
    	cdProd:'',
    	nmProduto: '',
    },
    created: function(){
    },
    methods:{
    	showModalDelete: function(){
    		$("#modalDelete").modal('show');
    	},
		setInfo: function(produto){
			this.cdProd    = produto.id;
			this.nmProduto = produto.nome;
		},
    	deletar: function(){
    		axios.delete("/mercado/rs/produtos/"+this.cdProd)
			.then(response => { window.location.reload(true);
			}).catch(function (error){
				errorModal.modalError("Erro interno", "Não foi possível deletar o produto");
			}).finally(function(){
				$('#modalDelete').modal('hide');
			});
    	}
    }
});

var nav = new Vue({
	el:"#nav",
    data: {
   
    },
    created: function(){
        let vm =  this;
        
    },
    methods:{
		openModal: function(error,msg){
			document.getElementById("formulario").reset();
			document.getElementById('hidden_id').value('0');
			menu.openModal();
		},
    }
});

var menu = new Vue({
	el:"#modalProduto",
    data: {
    	produto: {
    		id:            0,
    		unidade:      '',
	        nome:         '',
	        cdFabricante:  0,
	        volume:       '',
	        estoque:       0
    	},
    	isNovo: true,
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
    		this.$refs.cdProduto.value    = null;
    		this.$refs.nomeProduto.value  = '';
    		this.$refs.cdFabricante.value = 0;
    		this.$refs.volume.value       = '';
    		this.$refs.estoque.value      = 0;
    		this.$refs.unidade.value      = '';
    	},
    	openModal: function(){
    		$('#modalProduto').modal('show');
    	},
    	
    	createProdutoForm: function(produto, isNovo){
    		this.isNovo = isNovo;
    		this.$refs.cdProduto.value    = produto.id;
    		this.$refs.nomeProduto.value  = produto.nome
    		this.$refs.cdFabricante.value = produto.cdFabricante;
    		this.$refs.volume.value       = produto.volume;
    		this.$refs.estoque.value      = produto.estoque;
    		this.$refs.unidade.value      = produto.unidade;
    		$('#modalProduto').modal('show');
    	},
		cadastro: function(){
			const modalProd = this;
			if(modalProd.validaForm()){
				modalProd.produto.id           = null;
				modalProd.produto.nome         = modalProd.$refs.nomeProduto.value;
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
					
				this.produto.nome         = this.$refs.nomeProduto.value;
				this.produto.cdFabricante = this.$refs.cdFabricante.value;
				this.produto.volume       = this.$refs.volume.value;
				this.produto.estoque      = this.$refs.estoque.value;
				this.produto.unidade      = this.$refs.unidade.value;
				this.produto.id           = this.$refs.cdProduto.value;
				axios.put("/mercado/rs/produtos/"+this.produto.id,this.produto)
				.then(response => {window.location.reload(true);
				}).catch(function (error) {
					errorModal.modalError("Erro interno", "Não foi possível atualizar o produto");
				}).finally(function() {
					$('#modalProduto').modal('hide');
				});
			}
		},
    }
});


