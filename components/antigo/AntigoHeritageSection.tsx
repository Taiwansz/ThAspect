import React from "react";
import { Database, FileCode, GitBranch, ArrowUpRight, Terminal } from "lucide-react";

export const AntigoHeritageSection: React.FC = () => {
  const artifacts = [
    {
      title: "ThAspectbd.sql",
      desc: "Script DDL relacional em MySQL estruturando as entidades Clientes, Produtos, Carrinho, Pedidos, Cupons e Recomendacoes.",
      type: "SQL DDL",
      path: "/v1/ThAspectbd.sql",
    },
    {
      title: "ThAspect - DER.pdf",
      desc: "Diagrama Entidade-Relacionamento visual oficial definindo as chaves estrangeiras, cardinalidades e integridade referencial.",
      type: "DIAGRAMA DER",
      path: "/v1/ThAspect - DER.pdf",
    },
    {
      title: "DOCUMENTACAO THASPECT.pdf",
      desc: "Documentacao técnica de engenharia e especificacao funcional com a arquitetura inicial em Flask/Bootstrap e telas do MVP.",
      type: "ESPECIFICACAO",
      path: "/v1/DOCUMENTAÇÃO THASPECT.pdf",
    },
    {
      title: "ThAspect.pdf",
      desc: "Documento formal de analise de requisitos da base de dados relacional registrado em agosto de 2024.",
      type: "REQUISITOS",
      path: "/v1/ThAspect.pdf",
    },
  ];

  return (
    <section id="heritage" className="py-24 bg-[#E8DFD1]/50 border-b border-[#E8DFD1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 border-b-2 border-[#1F1F1F]">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[#0057FF] uppercase mb-2">
              <Database className="w-4 h-4 text-[#0057FF]" />
              <span>ORIGENS ACADÊMICAS // CS-VAULT</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-[#1F1F1F] uppercase tracking-tight">
              A LINHAGEM TÉCNICA V1
            </h2>
          </div>

          <div className="mt-4 md:mt-0 text-xs font-mono text-[#555] max-w-sm">
            Antes de ser marca de moda, ThAspect nasceu como arquitetura de software e
            modelagem de banco de dados relacional.
          </div>
        </div>

        {/* Content Layout: Code & Architecture Display */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: SQL Terminal Window */}
          <div className="lg:col-span-6 bg-[#1F1F1F] text-[#FAF8F3] rounded-sm border border-[#333] overflow-hidden shadow-xl">
            {/* Terminal Window Header */}
            <div className="bg-[#141414] px-4 py-3 border-b border-[#333] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#0057FF]" />
                <span className="text-xs font-mono font-bold text-[#FAF8F3]">
                  ThAspectbd.sql — DDL SCHEMA (V1)
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#FF6A00] bg-[#FF6A00]/10 px-2 py-0.5 border border-[#FF6A00]/30">
                MySQL 8.0
              </span>
            </div>

            {/* Code Body */}
            <pre className="p-6 text-xs font-mono text-[#E8DFD1] overflow-x-auto leading-relaxed">
              <code>{`-- ThAspect Relational Database Schema (V1)
CREATE DATABASE ThAspectDB;
USE ThAspectDB;

CREATE TABLE Clientes (
    ID_Cliente INT AUTO_INCREMENT PRIMARY KEY,
    Nome VARCHAR(255) NOT NULL,
    Email VARCHAR(255) NOT NULL UNIQUE,
    Senha VARCHAR(255) NOT NULL,
    Endereco TEXT NOT NULL,
    Telefone VARCHAR(20),
    Data_Cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Produtos (
    ID_Produto INT AUTO_INCREMENT PRIMARY KEY,
    Nome VARCHAR(255) NOT NULL,
    Tamanho VARCHAR(50),
    Preco DECIMAL(10, 2) NOT NULL,
    Quantidade_Estoque INT NOT NULL
);

CREATE TABLE Carrinho (
    ID_Carrinho INT AUTO_INCREMENT PRIMARY KEY,
    ID_Cliente INT,
    Data_Criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ID_Cliente) REFERENCES Clientes(ID_Cliente)
);

CREATE TABLE Cupons (
    ID_Cupom INT AUTO_INCREMENT PRIMARY KEY,
    Codigo VARCHAR(50) NOT NULL UNIQUE,
    Desconto DECIMAL(5, 2) NOT NULL,
    Data_Expiracao DATE NOT NULL
);`}</code>
            </pre>

            <div className="px-6 py-3 bg-[#171717] border-t border-[#333] text-[11px] font-mono text-[#888] flex items-center justify-between">
              <span>ORIGEM: BANCO DE DADOS E APLICACOES</span>
              <span className="text-[#0057FF]">CS-VAULT-2026</span>
            </div>
          </div>

          {/* Right Column: Historical Artifact Cards */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <div className="text-xs font-mono text-[#666] uppercase tracking-wider mb-1">
              ARTEFATOS DA PRIMEIRA VERSAO PRESERVADOS NO REPOSITÓRIO:
            </div>

            {artifacts.map((art, idx) => (
              <div
                key={idx}
                className="p-5 bg-[#FAF8F3] border border-[#E8DFD1] hover:border-[#1F1F1F] transition-all rounded-sm perspective-hover"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <FileCode className="w-5 h-5 text-[#0057FF]" />
                    <h3 className="text-sm font-bold font-mono text-[#1F1F1F]">
                      {art.title}
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 bg-[#E8DFD1] text-[#1F1F1F] font-bold">
                    {art.type}
                  </span>
                </div>

                <p className="mt-2 text-xs text-[#555] leading-relaxed">
                  {art.desc}
                </p>

                <div className="mt-4 pt-3 border-t border-[#E8DFD1] flex items-center justify-between text-[11px] font-mono">
                  <span className="text-[#888]">Armazenado em: /v1/{art.title}</span>
                  <span className="text-[#0057FF] font-semibold flex items-center gap-1">
                    HISTORICO INTEGRAL
                  </span>
                </div>
              </div>
            ))}

            <div className="p-4 bg-[#1F1F1F] text-[#FAF8F3] text-xs font-mono rounded-sm flex items-center justify-between border-l-4 border-[#0057FF]">
              <span>AUTORES ORIGINAIS (V1):</span>
              <span className="text-[#E8DFD1]">Matheus Sousa, Felipe Pinete, Juan Pedro</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
