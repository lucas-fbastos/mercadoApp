package com.hepta.mercado.rest;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.GenericEntity;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import com.hepta.mercado.DTO.ProdutoDTO;
import com.hepta.mercado.entity.Fabricante;
import com.hepta.mercado.entity.Produto;
import com.hepta.mercado.persistence.FabricanteDAO;
import com.hepta.mercado.persistence.ProdutoDAO;

@Path("/produtos")
public class ProdutoService {
	
	@Context
	private HttpServletRequest request;

	@Context
	private HttpServletResponse response;

	private ProdutoDAO dao;
	
	private FabricanteDAO fabricanteDao;
	
	public ProdutoService() {
		dao = new ProdutoDAO();
		fabricanteDao = new FabricanteDAO();
	}
	
	protected void setRequest(HttpServletRequest request) {
		this.request = request;
	}
	
	/**
	 * Adiciona novo produto no mercado
	 * 
	 * @param produto: Novo produto
	 * @return response 201 (Created) - Conseguiu adicionar
	 */
	@Path("/")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	@POST
	public Response produtoCreate(ProdutoDTO produtoDTO) {
		Produto produto = new Produto(produtoDTO);
		Fabricante fabricante;
		try {
			fabricante = fabricanteDao.find(produtoDTO.getCdFabricante());
			produto.setFabricante(fabricante);
			dao.save(produto);
			return Response.status(Status.CREATED).build();
		} catch (Exception e) {
			e.printStackTrace();
			return Response.status(Status.INTERNAL_SERVER_ERROR).build();
		}
	}
	
	/**
	 * Lista todos os produtos do mercado
	 * 
	 * @return response 200 (OK) - Conseguiu listar
	 */
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	@GET
	public Response produtoRead() {
		List<Produto> produtos = new ArrayList<>();
		try {
			produtos = dao.getAll();
		} catch(Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).entity("Erro ao buscar produtos").build();
		}
		
		GenericEntity<List<Produto>> entity = new GenericEntity<List<Produto>>(produtos) {};
		return Response.status(Status.OK).entity(entity).build();
	}
	
	/**
	 * Atualiza um produto no mercado
	 * 
	 * @param id: id do produto
	 * @param produto: Produto atualizado
	 * @return response 200 (OK) - Conseguiu atualiza
	 */
	@Path("/{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	@PUT
	public Response produtoUpdate(@PathParam("id") Integer id, ProdutoDTO produtoDTO) {
		Produto produto = new Produto(produtoDTO);
		try {
			Fabricante fabricante = fabricanteDao.find(produtoDTO.getCdFabricante());
			if(fabricante == null) {
				return Response.status(Status.NOT_FOUND).build();
			}
			produto.setFabricante(fabricante);
			dao.update(produto);
			GenericEntity<Produto> entity = new GenericEntity<Produto>(produto) {};
			return Response.status(Status.OK).entity(entity).build();
		} catch (Exception e) {
			e.printStackTrace();
			return Response.status(Status.INTERNAL_SERVER_ERROR).build();
		}
	}
	
	/**
	 * Remove um produto do mercado
	 * 
	 * @param id: id do produto
	 * @return response 204 (No Content) - Conseguiu remover
	 */
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	@DELETE
	public Response produtoDelete(@PathParam("id") Integer id) {
		try {
			dao.delete(id);
			return Response.status(Status.NO_CONTENT).build();
		} catch (Exception e) {
			e.printStackTrace();
			return Response.status(Status.INTERNAL_SERVER_ERROR).build();
		}
	}

}
