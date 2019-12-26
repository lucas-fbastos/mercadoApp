package com.hepta.mercado.DTO;

public class ProdutoDTO {

	private String  nome;
	private Integer cdFabricante;
	private Double  volume;
	private String  unidade;
	private Integer estoque;
	private Integer id;

	public Integer getId() {
		return id;
	}
	public void setId(Integer cdProduto) {
		this.id = cdProduto;
	}
	public String getNome() {
		return nome;
	}
	public void setNome(String nomeProduto) {
		this.nome = nomeProduto;
	}
	
	public Integer getCdFabricante() {
		return cdFabricante;
	}
	public void setCdFabricante(Integer cdFabricante) {
		this.cdFabricante = cdFabricante;
	}
	public Double getVolume() {
		return volume;
	}
	public void setVolume(Double volume) {
		this.volume = volume;
	}
	public String getUnidade() {
		return unidade;
	}
	public void setUnidade(String unidade) {
		this.unidade = unidade;
	}
	public Integer getEstoque() {
		return estoque;
	}
	public void setEstoque(Integer estoque) {
		this.estoque = estoque;
	}
	public ProdutoDTO(String nomeProduto, Integer cdFabricante, Double volume, String unidade,
			Integer estoque) {
		super();
		this.nome = nomeProduto;
		this.cdFabricante = cdFabricante;
		this.volume = volume;
		this.unidade = unidade;
		this.estoque = estoque;
	}
	public ProdutoDTO() {
		super();
	}

	
}
