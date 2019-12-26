package com.hepta.mercado.DTO;

public class ProdutoDTO {

	private String  nomeProduto;
	private Integer cdFabricante;
	private Double  volume;
	private String  unidade;
	private Integer estoque;
	private Integer cdProduto;

	public Integer getCdProduto() {
		return cdProduto;
	}
	public void setCdProduto(Integer cdProduto) {
		this.cdProduto = cdProduto;
	}
	public String getNomeProduto() {
		return nomeProduto;
	}
	public void setNomeProduto(String nomeProduto) {
		this.nomeProduto = nomeProduto;
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
		this.nomeProduto = nomeProduto;
		this.cdFabricante = cdFabricante;
		this.volume = volume;
		this.unidade = unidade;
		this.estoque = estoque;
	}
	public ProdutoDTO() {
		super();
	}

	
}
