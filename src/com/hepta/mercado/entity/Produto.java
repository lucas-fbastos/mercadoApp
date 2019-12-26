package com.hepta.mercado.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.hepta.mercado.DTO.ProdutoDTO;

@Entity
public class Produto implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID_PRODUTO")
	private Integer id;
	
	@Column(name = "NOME")
	private String nome;
		
	@ManyToOne
	@JoinColumn(name = "ID_FABRICANTE")
	private Fabricante fabricante;
	
	@Column(name = "VOLUME")
	private Double volume;
	
	@Column(name = "UNIDADE")
	private String unidade;
	
	@Column(name = "ESTOQUE")
	private Integer estoque;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public Fabricante getFabricante() {
		return fabricante;
	}

	public void setFabricante(Fabricante fabricante) {
		this.fabricante = fabricante;
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
	
	public Produto() {
		super();
	}

	public Produto(Integer id, String nome, Fabricante fabricante, Double volume, String unidade, Integer estoque) {
		super();
		this.id = id;
		this.nome = nome;
		this.fabricante = fabricante;
		this.volume = volume;
		this.unidade = unidade;
		this.estoque = estoque;
	}

	public Produto(ProdutoDTO dto) {
		this.nome = dto.getNomeProduto();
		this.unidade = dto.getUnidade();
		this.volume = dto.getVolume();
		this.estoque = dto.getEstoque();
	}
}
