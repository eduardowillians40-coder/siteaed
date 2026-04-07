# DOE Framework

Este arquivo serve como o conjunto central de instruções ("DOE Framework") para o agente Antigravity, garantindo uma execução consistente e confiável.

O sistema opera dentro de uma arquitetura de 3 camadas que separa as responsabilidades para maximizar a confiabilidade. LLMs são probabilísticos, enquanto a maioria da lógica de negócios é determinística e exige consistência. Este sistema corrige essa incompatibilidade.

## A Arquitetura de 3 Camadas

### Camada 1: D - Directive (O que fazer)
- Essencialmente POPs (Procedimentos Operacionais Padrão) escritos em Markdown, ficam na pasta `directives/`.
- Definem os objetivos, entradas (inputs), ferramentas/scripts a serem usados, saídas (outputs) e casos extremos.
- Instruções em linguagem natural, como você daria a um funcionário de nível pleno.

### Camada 2: O - Orchestration (Tomada de decisão)
- Este é o agente. Trabalho: roteamento inteligente.
- Ler diretrizes, chamar ferramentas de execução na ordem correta, lidar com erros, pedir esclarecimentos, atualizar diretrizes com os aprendizados.
- O agente atua como a cola entre a intenção e a execução. Ex: Lê `directives/scrape_website.md` e usa `execution/scrape_single_site.py`.

### Camada 3: E - Execution (Fazendo o trabalho)
- Scripts (Python, JS/TS, Bash) determinísticos na pasta `execution/`.
- Variáveis de ambiente, tokens de API ficam no `.env`.
- Lidam com chamadas de API, processamento, operações de arquivos e banco de dados.

## Protocolo de Início de Sessão
Antes de tocar em qualquer coisa:
1. Leia a diretriz (directive) relevante na pasta `directives/`.
2. Liste os scripts na pasta `execution/` para ver o que já existe.
3. Verifique a pasta `.tmp/` por estados residuais da última execução.
4. Esclareça o escopo com o usuário antes de alterar arquivos.

## Princípios Operacionais

**1. Procure ferramentas primeiro**
Verifique a pasta `execution/` antes de escrever scripts. Só crie novos scripts se não existir solução.

**2. Auto-correção (Self-anneal)**
Se algo quebrar, leia o stack trace, corrija o script e teste novamente (exceto para chamadas de API pagas). Atualize as diretrizes com aprendizados.

**3. Atualize as diretrizes**
Sempre registre aprendizados, restrições e novos fluxos. Não sobrescreva sem perguntar se não for explícito.

## Quando Perguntar vs Prosseguir

**Prossiga sem perguntar:**
- Ler arquivos, executar scripts de leitura, checar estado do `.tmp/`.
- Corrigir bugs em scripts de execução já existentes.
- Gravar arquivos no `.tmp/`.

**Pergunte primeiro:**
- Criar novas diretrizes, deletar arquivos fora do `.tmp/`.
- Chamadas de API externas que geram efeitos colaterais.

**Sempre pergunte:**
- Modificar diretrizes existentes (salvo ordem contrária).
- Ações que afetam sistemas em produção. Na dúvida: pergunte!

## Fim de Sessão
Revise mudanças, adicione seção "## Aprendizados" nas diretrizes modificadas (com data). Teste novos scripts antes de finalizar.

## Organização de Arquivos
- **.tmp/**: Arquivos intermediários (excluir/regenerar sempre).
- **execution/**: Scripts determinísticos (ferramentas).
- **directives/**: POPs em Markdown.
- **.env**: Segredos/Keys.
