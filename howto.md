# Instruções
Para rodar o projeto siga as instruções descritas abaixo

*Execute o script SQL **mercado.sql** para criar a base de dados com base no Dump existente
*A aplicação está configurada com o mesmo usuário e senha do banco de dados na versão disponibilizada no repositório original user:'root', senha:'root'
*Instale o web server apache tomcat 8.5 ['https://www-eu.apache.org/dist/tomcat/tomcat-8/v8.5.50/bin/apache-tomcat-8.5.50.zip]
*Adicione o servidor baixado na IDE de sua preferência (o projeto foi desenvolvido utilizando o Eclipse e o sts)
*Importe o projeto como 'Projeto Maven' e certifique que as dependências foram baixadas (alt+f5 para forçar o download válido para o Eclipse)
*Ao executar o serviço Tomcat o projeto ficará disponível em "localhost:{porta Destinada ao tomcat}/mercado/" (por padrão a porta **8080** é a utilizada)


O projeto comtempla os itens 1 ao 3 da lista solicitada, assim sendo infelizmente não implementei os testes em Junit.

1. Front-end usando HTML, CSS e Javascript
2. Web Services RESTful em Java usando Jersey
3. Integração com Banco de Dados 
4. Testes de integração

Requisitos: 

* java 8
* tomcat 8.5
* mysql
* maven
