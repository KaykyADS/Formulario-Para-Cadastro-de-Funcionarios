using Azure.Data.Tables;
using Microsoft.AspNetCore.Mvc;
using TrilhaNetAzureDesafio.Context;
using TrilhaNetAzureDesafio.Models;

namespace TrilhaNetAzureDesafio.Controllers;

[ApiController]
[Route("[controller]")]
public class FuncionarioController : ControllerBase
{
    private readonly RHContext _context;

    public FuncionarioController(RHContext context, IConfiguration configuration)
    {
        _context = context;
    }

    [HttpGet("{id}")]
    public IActionResult ObterPorId(int id)
    {
        var funcionario = _context.Funcionarios.Find(id);

        if (funcionario == null)
            return NotFound();

        return Ok(funcionario);
    }

    [HttpPost]
    public IActionResult Criar(Funcionario funcionario)
    {
        _context.Funcionarios.Add(funcionario);
        _context.SaveChanges();
        return CreatedAtAction(nameof(ObterPorId), new { id = funcionario.Id }, funcionario);
    }

    [HttpPut("{id}")]
    public IActionResult Atualizar(int id, Funcionario funcionario)
    {
        var funcionarioBanco = _context.Funcionarios.Find(id);

        if (funcionarioBanco == null)
            return NotFound();

        funcionarioBanco.Nome = funcionario.Nome;
        funcionarioBanco.Endereco = funcionario.Endereco;
        funcionarioBanco.Ramal = funcionario.Ramal;
        funcionarioBanco.EmailProfissional = funcionario.EmailProfissional;
        funcionarioBanco.Departamento = funcionario.Departamento;
        funcionarioBanco.Salario = funcionario.Salario;

        _context.Update(funcionarioBanco);
        _context.SaveChanges();

        return Ok();
    }

    [HttpDelete("{id}")]
    public IActionResult Deletar(int id)
    {
        var funcionarioBanco = _context.Funcionarios.Find(id);

        if (funcionarioBanco == null)
            return NotFound();

        _context.Remove(funcionarioBanco);
        _context.SaveChanges();
        return NoContent();
    }

    [HttpGet]
    public IActionResult ObterTodos()
    {
        var funcionarios = _context.Funcionarios.ToList();
        return Ok(funcionarios);
    }

}
